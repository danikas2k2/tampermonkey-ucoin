import {CoinSwapFormOnMatcher, forEachSwapLink, getSwapLinks} from "./swap-links";
import {randomDelay} from "./delay";
import {post} from "./ajax";

export function addSwapComments() {
    getSwapLinks().forEach(a => {
        addSwapComment(a);
    });
}

export function addSwapButtons() {
    const mySwap = <HTMLElement>document.getElementById('my-swap-block');
    const swapBlock = <HTMLElement>mySwap.querySelector('#swap-block');
    const buttonSet = swapBlock.querySelector('center');
    const variants = new Map();
    let couldExpand = false, couldCombine = false;

    updateButtons();

    function updateSwapVariants(): void {
        couldExpand = false;
        couldCombine = false;
        variants.clear();
        forEachSwapLink((a: HTMLAnchorElement, m: CoinSwapFormOnMatchGroups) => {
            const {uniq, usid, cond, price, info, vid, strqty} = m;
            const qty = +strqty;
            if (qty > 1) {
                couldExpand = true;
            }

            let variant;
            if (variants.has(uniq)) {
                variant = variants.get(uniq);
                variant.qty += qty;
                couldCombine = true;
            } else {
                variant = {usid, cond, price, info, vid, qty};
            }

            variants.set(uniq, variant);
        });
    }

    function updateButtons() {
        updateSwapVariants();
        couldExpand ? addExpandButtons() : removeExpandButtons();
        couldCombine ? addCombineButtons() : removeCombineButtons();
    }

    function disableButtons() {
        buttonSet.querySelectorAll('button.btn--combiner,button.btn--expander').forEach((combiner: HTMLButtonElement) => {
            combiner.classList.add('btn-white');
            combiner.classList.remove('btn-blue');
            combiner.disabled = true;
        });
    }

    function enableButtons() {
        buttonSet.querySelectorAll('button.btn--combiner,button.btn--expander').forEach((combiner: HTMLButtonElement) => {
            combiner.classList.add('btn-blue');
            combiner.classList.remove('btn-white');
            combiner.disabled = false;
        });
    }

    function updateLinkQty(a: HTMLAnchorElement, qty: number) {
        if (a.hasAttribute('onClick')) {
            a.setAttribute('onClick', a.getAttribute('onClick').replace(CoinSwapFormOnMatcher,
                `CoinSwapFormOn('$<usid>', '$<cond>', '$<price>', '$<info>', '$<vid>', '${qty}', '$<replica>'`));
        }

        a.querySelectorAll('span.left.dblue-13').forEach(a => a.remove());
        if (qty > 1) {
            a.querySelectorAll('span.left.gray-13.wrap').forEach(a =>
                a.insertAdjacentHTML("afterend", `<span class="left dblue-13"><span>&times;</span>${qty}</span>`));
        }
    }

    // expandTo - number of links (0 for unlimited)
    function expandClicked(expandTo = 0) {
        disableButtons();

        console.log(`EXPANDING...`);

        let queue = Promise.resolve();

        forEachSwapLink((a: HTMLAnchorElement, m: CoinSwapFormOnMatchGroups) => {
            const {uniq, usid, cond, price, info, vid, strqty} = m;
            const qty = +strqty;

            const n = expandTo > 0 ? Math.min(qty, expandTo) : qty;
            if (n <= 1) {
                queue = queue
                    .then(() => console.log(`IGNORING ${uniq} ${usid}`));
                return;
            }

            for (let i = n, qq = qty, q = Math.floor(qq / i); i > 0; i--, qq -= q, q = Math.floor(qq / i)) {
                if (i > 1) {
                    queue = queue
                        .then(() => console.log(`ADDING ${uniq} ${n - i + 1} -> ${q}`))
                        .then(() => addSwapCoin(cond, `${q}`, vid, info, price))
                        .then(r => {
                            const links = new Set();
                            getSwapLinks().forEach(l => {
                                if (!l.hasAttribute('onClick')) {
                                    return;
                                }
                                const m = <CoinSwapFormOnMatchResult>l.getAttribute('onClick').match(CoinSwapFormOnMatcher);
                                if (m && m.groups) {
                                    links.add(m.groups.usid);
                                }
                            });
                            getSwapLinks(r).forEach(l => {
                                if (!l.hasAttribute('onClick')) {
                                    return;
                                }
                                const m = <CoinSwapFormOnMatchResult>l.getAttribute('onClick').match(CoinSwapFormOnMatcher);
                                const usid = m && m.groups && m.groups.usid;
                                if (!usid || links.has(usid)) {
                                    return;
                                }
                                links.add(usid);
                                a.insertAdjacentElement("afterend", l);
                                addSwapComment(l);
                            });
                        })
                        .then(randomDelay());
                } else {
                    queue = queue
                        .then(() => console.log(`UPDATING ${uniq} ${usid} -> 1`))
                        .then(() => updSwapCoin(usid, cond, `${q}`, vid, info, price))
                        .then(() => updateLinkQty(a, q))
                        .then(randomDelay());
                }
            }
        });

        queue.then(() => {
            console.log('DONE!');
            enableButtons();
            updateButtons();
        });
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

    function combineClicked() {
        disableButtons();

        console.log(`COMBINING...`);

        let queue = Promise.resolve();

        forEachSwapLink((a: HTMLAnchorElement, m: CoinSwapFormOnMatchGroups) => {
            const {uniq, usid, cond, price, info, vid, strqty} = m;
            const qty = +strqty;

            if (variants.has(uniq)) {
                if (usid != variants.get(uniq).usid) {
                    queue = queue
                        .then(() => console.log(`REMOVING ${usid}`))
                        .then(() => delSwapCoin(usid))
                        .then(() => a.remove())
                        .then(randomDelay());
                } else {
                    const vqty = variants.get(uniq).qty;
                    if (qty != vqty) {
                        queue = queue
                            .then(() => console.log(`UPDATING ${usid} -> ${vqty}`))
                            .then(() => updSwapCoin(usid, cond, vqty, vid, info, price))
                            .then(() => updateLinkQty(a, vqty))
                            .then(randomDelay());
                    } else {
                        queue = queue
                            .then(() => console.log(`IGNORING ${usid}`));
                    }
                }
            } else {
                queue = queue
                    .then(() => console.log(`IGNORING ${usid}`));
            }
        });

        queue.then(() => {
            console.log('DONE!');
            enableButtons();
            updateButtons();
        });
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
        buttonSet.querySelectorAll('button.btn--expander').forEach((b: HTMLElement) => {
            b.style.display = 'none';
        })
    }

    function removeCombineButtons() {
        buttonSet.querySelectorAll('button.btn--combiner').forEach((b: HTMLElement) => {
            b.style.display = 'none';
        })
    }

    function addSwapCoin(cond: string, qty: string, vid: string, info: string, price: string) {
        return updSwapCoin('', cond, qty, vid, info, price, 'addswapcoin');
    }

    function delSwapCoin(usid: string) {
        return updSwapCoin(usid, '', '', '', '', '', 'delswapcoin');
    }

    function updSwapCoin(usid: string, cond: string, qty: string, vid: string, info: string, price: string, action: SwapFormAction = 'editswapcoin') {
        const swapForm = <HTMLFormElement>document.getElementById('swap-form');
        const data = new FormData(swapForm);
        data.set('usid', usid);
        data.set('condition', cond);
        data.set('qty', qty);
        data.set('swap-variety', vid);
        data.set('comment', info);
        data.set('price', price);
        data.set('action', action);
        return post(document.location.href, data)
            .then(response => response.text())
            .then(text => {
                const temp = document.createElement('template');
                temp.innerHTML = text;
                return temp.content;
            });
    }
}

function addSwapComment(a: HTMLAnchorElement): void {
    if (a.hasAttribute('onClick')) {
        const m = <CoinSwapFormOnMatchResult>a.getAttribute('onClick').match(CoinSwapFormOnMatcher);
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
    const qty = <HTMLInputElement>document.getElementById('swap-qty');
    qty.setAttribute('inputmode', 'numeric');
    qty.addEventListener("focus", e => (<HTMLInputElement>e.target).setSelectionRange(0, (<HTMLInputElement>e.target).value.length));

    addQtyCtrlButton("afterend", 'minus', '&minus;', v => v - 1);
    addQtyCtrlButton("afterbegin", 'plus10', '+10', v => v + 10);
    addQtyCtrlButton("afterbegin", 'plus5', '+5', v => v + 5);
    addQtyCtrlButton("afterbegin", 'plus', '+', v => v + 1);

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

    cond.querySelectorAll('option').forEach((o: HTMLOptionElement) => {
        const val = o.value;
        const text = val ? o.text : 'Without condition';
        const checked = (val === '3') ? 'checked' : '';
        const style = o.getAttribute('style') || '';
        fieldset.insertAdjacentHTML("beforeend", `<label class="dgray-12" style="margin-top:0;${style}"><input name="condition" value="${val}" ${checked} type="radio"/>${text}</label>`);
    });

    cond.remove();

    // @ts-ignore
    const _onCoinSwapForm = window.CoinSwapFormOn;
    if (!_onCoinSwapForm) {
        return;
    }

    const CoinSwapFormOn = function (...args: any[]) {
        _onCoinSwapForm(...args);
        const swapForm = <HTMLFormElement>document.getElementById('swap-form');
        (<HTMLInputElement>swapForm.querySelector(`input[name="condition"][value="${args[1]}"]`)).checked = true;
    };

    const mySwap = <HTMLElement>document.getElementById('my-swap-block');
    const swapBlock = <HTMLElement>mySwap.querySelector('#swap-block');
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

export function styleSwapLists() {
    document.querySelectorAll('#swap-block a.list-link').forEach((a: HTMLAnchorElement) => {
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
    });
}
