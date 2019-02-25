declare var CoinSwapFormOn: (...args: string[]) => void;

import {CoinSwapFormOnMatcher, getSwapLinks, getSwapLinksWithMatches} from "./swap-links";
import {randomDelay} from "./delay";
import {post} from "./ajax";

export function addSwapComments() {
    for (const a of getSwapLinks()) {
        addSwapComment(a);
    }
}

export async function addSwapButtons() {
    const mySwap = <HTMLElement> document.getElementById('my-swap-block');
    if (!mySwap) {
        return;
    }

    if (mySwap.classList.contains('hide')) {
        mySwap.classList.remove('hide');
        mySwap.style.display = '';

        const showButton = <HTMLElement> mySwap.previousSibling;
        showButton.classList.add('hide');
        showButton.style.display = 'none';
    }

    const swapBlock = <HTMLElement> mySwap.querySelector('#swap-block');

    const div = document.createElement('div');
    div.style.maxHeight = '400px';
    div.style.overflowX = 'hidden';
    div.style.overflowY = 'auto';
    swapBlock.insertAdjacentElement("afterbegin", div);
    for (const {a} of getSwapLinksWithMatches()) {
        div.insertAdjacentElement("beforeend", a);
    }

    const buttonSet = swapBlock.querySelector('center');
    const variants = new Map();
    let couldExpand = false, couldCombine = false;

    updateButtons();

    function updateSwapVariants(): void {
        couldExpand = false;
        couldCombine = false;
        variants.clear();

        for (const {a, m} of getSwapLinksWithMatches()) {
            const {uniq, usid, cond, price, info, vid, strqty} = m;
            const qty = +strqty;
            if (qty > 1) {
                couldExpand = true;
            }

            let variant;
            if (variants.has(uniq)) {
                variant = variants.get(uniq);
                variant.total += qty;
                couldCombine = true;
            } else {
                variant = {a, usid, cond, price, info, vid, qty, total: qty};
            }

            variants.set(uniq, variant);
        }
    }

    function updateButtons() {
        updateSwapVariants();
        couldExpand ? addExpandButtons() : removeExpandButtons();
        couldCombine ? addCombineButtons() : removeCombineButtons();
    }

    function removeButtons() {
        removeExpandButtons();
        removeCombineButtons();
    }

    function updateLinkQty(a: HTMLAnchorElement, qty: number) {
        if (a.hasAttribute('onClick')) {
            a.setAttribute('onClick', a.getAttribute('onClick').replace(CoinSwapFormOnMatcher,
                `CoinSwapFormOn('$<usid>', '$<cond>', '$<price>', '$<info>', '$<vid>', '${qty}', '$<replica>'`));
        }

        for (const span of a.querySelectorAll('span.left.dblue-13')) {
            span.remove();
        }
        if (qty > 1) {
            for (const span of a.querySelectorAll('span.left.gray-13.wrap')) {
                span.insertAdjacentHTML("afterend", `<span class="left dblue-13"><span>&times;</span>${qty}</span>`);
            }
        }
    }

    // expandTo - number of links (0 for unlimited)
    async function expandClicked(expandTo = 0) {
        removeButtons();

        console.log(`EXPANDING...`);

        let isAddFailed = false;
        let isUpdFailed = false;
        let isFirstQuery = true;

        for await (const {a, m} of getSwapLinksWithMatches()) {
            const {uniq, usid, cond, price, info, vid, strqty} = m;
            const qty = +strqty;

            const n = expandTo > 0 ? Math.min(qty, expandTo) : qty;
            if (n <= 1) {
                console.log(`IGNORING ${uniq} ${usid}`);
                continue; // return?
            }

            for (let i = n, qq = qty, q = Math.floor(qq / i); i > 1; i--, q = Math.floor(qq / i)) {
                qq -= q;
                if (!isFirstQuery) {
                    await randomDelay();
                }
                isFirstQuery = false;

                console.log(`ADDING ${uniq} ${n - i + 1} -> ${q}`);
                const addR = await addSwapCoin(cond, `${q}`, vid, info, price);
                if (!addR) {
                    isAddFailed = true;
                    break;
                }

                const links = new Set();
                for (const l of getSwapLinks()) {
                    if (!l.hasAttribute('onClick')) {
                        continue;
                    }

                    const m = <CoinSwapFormOnMatchResult> l.getAttribute('onClick').match(CoinSwapFormOnMatcher);
                    if (m && m.groups) {
                        links.add(m.groups.usid);
                    }
                }

                for (const l of getSwapLinks(addR)) {
                    if (!l.hasAttribute('onClick')) {
                        continue;
                    }
                    const m = <CoinSwapFormOnMatchResult> l.getAttribute('onClick').match(CoinSwapFormOnMatcher);
                    const usid = m && m.groups && m.groups.usid;
                    if (!usid || links.has(usid)) {
                        continue;
                    }
                    links.add(usid);
                    styleSwapLink(l);
                    a.insertAdjacentElement("afterend", l);
                    addSwapComment(l);
                }

                if (!isFirstQuery) {
                    await randomDelay();
                }
                isFirstQuery = false;

                console.log(`UPDATING ${uniq} ${usid} -> ${qq}`);
                const updR = await updSwapCoin(usid, cond, `${qq}`, vid, info, price);
                if (!updR) {
                    isUpdFailed = true;
                    break;
                }

                updateLinkQty(a, qq);
            }

            if (isAddFailed || isUpdFailed) {
                break;
            }
        }

        if (isAddFailed) {
            console.log('ADD FAILED :(');
        } else if (isUpdFailed) {
            console.log('UPDATE FAILED :(');
        } else {
            console.log('DONE!');
        }

        updateButtons();
    }

    function addExpandButton(id: string, text: string, clickHandler: () => void) {
        const expand = document.getElementById(id);
        if (expand) {
            expand.style.display = '';
        } else {
            buttonSet.insertAdjacentHTML("beforeend",
                `<button id="${id}" type="button" class="btn--expander btn-s btn-blue">${text}</button>`);
            document.getElementById(id).addEventListener("click", clickHandler);
        }
    }

    function addExpandButtons() {
        addExpandButton('expand', 'Ex/All', () => expandClicked());
        addExpandButton('expand-x5', 'Ex/5', () => expandClicked(5));
        addExpandButton('expand-x10', 'Ex/10', () => expandClicked(10));
    }

    async function combineClicked() {
        removeButtons();

        console.log(`COMBINING...`);

        let isDelFailed = false;
        let isUpdFailed = false;
        let isFirstQuery = true;

        for await (const {a, m} of getSwapLinksWithMatches()) {
            const {uniq, usid, cond, price, info, vid, strqty} = m;
            const qty = +strqty;

            if (!variants.has(uniq)) {
                console.log(`IGNORING ${usid}`);
                continue;
            }

            const variant = variants.get(uniq);
            const {usid: vusid} = variant;

            if (usid != vusid) {
                if (!isFirstQuery) {
                    await randomDelay();
                }
                isFirstQuery = false;

                console.log(`REMOVING ${usid}`);
                const delR = await delSwapCoin(usid);
                if (!delR) {
                    isDelFailed = true;
                    break;
                }

                a.remove();

                if (!isFirstQuery) {
                    await randomDelay();
                }
                isFirstQuery = false;

                let {qty: vqty} = variant;
                vqty += qty;
                console.log(`UPDATING ${vusid} -> ${vqty}`);
                const updR = await updSwapCoin(vusid, cond, vqty, vid, info, price);
                if (!updR) {
                    isUpdFailed = true;
                    break;
                }

                const {a: va} = variant;
                updateLinkQty(va, vqty);
                variant.qty = vqty;
            }
       }

        if (isDelFailed) {
            console.log('ADD FAILED :(');
        } else if (isUpdFailed) {
            console.log('UPDATE FAILED :(');
        } else {
            console.log('DONE!');
        }

        updateButtons();
    }

    function addCombineButtons() {
        const id = 'combine';
        const combine = document.getElementById(id);
        if (combine) {
            combine.style.display = '';
        } else {
            buttonSet.insertAdjacentHTML("beforeend",
                `<button id="${id}" type="button" class="btn--combiner btn-s btn-blue" style="margin: 8px 2px 0">Combine</button>`);
            document.getElementById(id).addEventListener("click", () => combineClicked());
        }
    }

    function removeExpandButtons() {
        for (const b of <NodeListOf<HTMLButtonElement>> buttonSet.querySelectorAll('button.btn--expander')) {
            b.style.display = 'none';
        }
    }

    function removeCombineButtons() {
        for (const b of <NodeListOf<HTMLButtonElement>> buttonSet.querySelectorAll('button.btn--combiner')) {
            b.style.display = 'none';
        }
    }

    async function addSwapCoin(cond: string, qty: string, vid: string, info: string, price: string) {
        return await updSwapCoin('', cond, qty, vid, info, price, 'addswapcoin');
    }

    async function delSwapCoin(usid: string) {
        return await updSwapCoin(usid, '', '', '', '', '', 'delswapcoin');
    }

    async function updSwapCoin(usid: string, cond: string, qty: string, vid: string, info: string, price: string, action: SwapFormAction = 'editswapcoin') {
        const swapForm = <HTMLFormElement> document.getElementById('swap-form');

        const data = new FormData(swapForm);
        data.set('usid', usid);
        data.set('condition', cond);
        data.set('qty', qty);
        data.set('swap-variety', vid);
        data.set('comment', info);
        data.set('price', price);
        data.set('action', action);

        const response = await post(document.location.href, data);
        console.log(response);
        if (response.status !== 200) {
            return null;
        }

        const text = await response.text();
        const temp = document.createElement('template');
        temp.innerHTML = text;
        return temp.content;
    }
}

function addSwapComment(a: HTMLAnchorElement): void {
    if (a.hasAttribute('onClick')) {
        const m = <CoinSwapFormOnMatchResult> a.getAttribute('onClick').match(CoinSwapFormOnMatcher);
        if (m && m.groups) {
            const {info} = m.groups;
            if (info && !a.querySelector('.comments')) {
                a.insertAdjacentHTML("beforeend",
                    `<span class="right dgray-11 wrap comments" title="${info}"><div class="ico-16"></div> ${info}</span>`);
            }
        }
    }
}

export function addSwapFormQtyButtons() {
    const qty = <HTMLInputElement> document.getElementById('swap-qty');
    qty.setAttribute('inputmode', 'numeric');
    qty.addEventListener("focus", e => (<HTMLInputElement> e.target).setSelectionRange(0, (<HTMLInputElement> e.target).value.length));

    addQtyCtrlButton("afterend", 'minus', '&minus;', v => v - 1);
    addQtyCtrlButton("beforebegin", 'plus10', '+10', v => v + 10);
    addQtyCtrlButton("beforebegin", 'plus5', '+5', v => v + 5);
    addQtyCtrlButton("beforebegin", 'plus', '+', v => v + 1);

    function addQtyCtrlButton(where: InsertPosition, id: string, text: string, valueChanger: (prevValue: number) => number): void {
        const qtyId = `swap-qty-${id}`;
        qty.insertAdjacentHTML(where, `<button id="${qtyId}" type="button" class="btn-s btn-gray btn-ctrl">${text}</button>`);
        document.getElementById(qtyId).addEventListener('click', () => {
            qty.value = `${valueChanger(+qty.value)}`;
        });
    }
}

export function addSwapColorMarkers() {
    const id = 'swap-cond-fieldset';
    const cond = document.getElementById('swap-cond');
    cond.insertAdjacentHTML("afterend", `<fieldset id="${id}"><legend class="gray-12" style="padding:5px;">Condition</legend></fieldset>`);
    const fieldset = document.getElementById(id);

    const options = cond.querySelectorAll('option');
    for (const o of options) {
        const val = o.value;
        const text = val ? o.textContent : 'Without condition';
        const checked = (val === '3') ? 'checked' : '';
        const style = o.getAttribute('style') || '';
        fieldset.insertAdjacentHTML("beforeend", `<label class="dgray-12" style="margin-top:0;${style}"><input name="condition" value="${val}" ${checked} type="radio"/>${text}</label>`);
    }

    cond.remove();

    const _onCoinSwapForm = CoinSwapFormOn;
    if (!_onCoinSwapForm) {
        return;
    }

    CoinSwapFormOn = function (...args: any[]) {
        _onCoinSwapForm(...args);
        (<HTMLInputElement> fieldset.querySelector(`input[name="condition"][value="${args[1]}"]`)).checked = true;
    };

    const mySwap = <HTMLElement> document.getElementById('my-swap-block');
    const swapBlock = <HTMLElement> mySwap.querySelector('#swap-block');
    const addButton = swapBlock.querySelector('center button.btn-s.btn-gray');
    if (!addButton) {
        return;
    }

    const buttonSetId = 'swap-button-set';
    addButton.insertAdjacentHTML("afterend", `<div id="${buttonSetId}" class="btn-set"/>`);
    addButton.remove();

    const buttonSet = document.getElementById(buttonSetId);
    if (!buttonSet) {
        return;
    }

    addSwapMarker('?', 6, 0);
    addSwapMarker('G', 7, 6);
    addSwapMarker('VG', 8, 5);
    addSwapMarker('F', 9, 4);
    addSwapMarker('VF', 10, 3);
    addSwapMarker('XF', 11, 2);
    addSwapMarker('UN', 12, 1);
    addSwapMarker('PR', 3, 7);
    addSwapMarker('CP', 5, 100);

    function addSwapMarker(text: string, color: number, value: number): void {
        const markerId = `marked-${value}`;
        const markerClass = `marked-${color}`;
        buttonSet.insertAdjacentHTML("beforeend", `<div id="${markerId}" class="${markerClass}">${text}</div>`);
        document.getElementById(markerId).addEventListener("click", () => CoinSwapFormOn('', `${value}`));
    }
}

const ConditionColors = new Map([
    ['G', 7],
    ['VG', 8],
    ['F', 9],
    ['VF', 10],
    ['XF', 11],
    ['UNC', 12],
    ['PRF', 3],
    ['BU', 4],
]);

export function styleSwapLink(a: HTMLAnchorElement) {
    const condBlock = a.querySelector(`.left.dgray-11`);
    const cond = condBlock.textContent;
    condBlock.classList.add(`marked-${ConditionColors.get(cond)}`);

    const mintBlock = a.querySelector(`.left.gray-13`);
    const mint = mintBlock.textContent;
    const parts = mint.split(' ');
    const y = parts.shift();
    if (parts.length) {
        mintBlock.textContent = y;
        mintBlock.insertAdjacentHTML("beforeend", ` <span class="lgray-11">${parts.join(' ')}</span>`);
    }
}

export function styleSwapLists() {
    const listOfLinks = <NodeListOf<HTMLAnchorElement>> document.querySelectorAll('#swap-block a.list-link');
    for (const a of listOfLinks) {
        styleSwapLink(a);
    }
}
