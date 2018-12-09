// ==UserScript==
// @name         uCoin: Coin
// @namespace    https://ucoin.net/
// @version      0.2.0
// @description  Fix tag links, add publicity toggler, expand/combine swap coins, and update swap prices
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @match        https://*.ucoin.net/coin/*
// ==/UserScript==

'use strict';

import {randomDelay} from './lib/delay';
import {updateLinkHref} from './lib/links';
import {err, info, ok} from './lib/notify';
import {post} from './lib/ajax';
// import {getPrice, getPriceConfig} from './lib/prices';
// import {sp} from './lib/utils';

(() => {
    const loc = document.location.href;

    const coin = <HTMLElement>document.getElementById('coin');
    if (!coin) {
        err('No coin wrapper found!');
        return;
    }

    const coinFormWrapper = <HTMLDivElement>document.getElementById('coin-form');
    if (!coinFormWrapper) {
        err('No coin form wrapper found!');
        return;
    }

    const coinForm = <HTMLFormElement>coinFormWrapper.querySelector('form');
    if (!coinForm) {
        err('No coin form found!');
        return;
    }

    const swapForm = <HTMLFormElement>document.getElementById('swap-form');
    if (!swapForm) {
        err('No swap form found!');
        return;
    }

    const swapBlock: HTMLElement = document.getElementById('swap-block');
    if (!swapBlock) {
        err('No swap block found!');
        return;
    }




    fixTagLinks();

    if (document.getElementById('user-menu')) {
        initFormImprovements();

        if (loc.includes('ucid=')) {
            initPublicityToggler();
        }
    }

    if (swapBlock) {
        // initSwapPriceUpdater();
        initSwapFormImprovements();
        addSwapComments();
        addSwapButtons();
    }

    function getSwapLinks(d: DocumentFragment = document): NodeListOf<HTMLAnchorElement> {
        const swapBlock = d.getElementById('swap-block');
        if (!swapBlock) {
            return <NodeListOf<HTMLAnchorElement>>new NodeList();
        }

        return swapBlock.querySelectorAll('a.list-link');
    }

    function addSwapComments() {
        document.head.insertAdjacentHTML("beforeend", `
            <style type="text/css">
                #coin #swap-block a {
                    position: relative;
                }
                #coin #swap-block a .comments {
                    position: absolute;
                    width: auto;
                    left: 100%;
                    text-align: left;
                }
                #coin #swap-block a:active .comments,
                #coin #swap-block a:focus .comments,
                #coin #swap-block a:hover .comments,
                #coin #swap-block a .comments:active,
                #coin #swap-block a .comments:focus,
                #coin #swap-block a .comments:hover {
                    max-width: 100%;
                    overflow: visible;
                }
                #coin #swap-block a .comments .ico-16 {
                    display: inline-block;
                    vertical-align: middle;
                    background-position: -16px 0;
                }
            </style>`);

        getSwapLinks().forEach(a => {
            addSwapComment(a);
        });
    }

    //                             CoinSwapFormOn(  usid,      cond,      price,     info,      vid,       qty,       replica)
    const CoinSwapFormOnMatcher = /CoinSwapFormOn\('([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)'/;
    const onClick = 'onclick';

    function addSwapComment(a: HTMLAnchorElement): void {
        if (a.hasAttribute(onClick)) {
            const m = a.getAttribute(onClick).match(CoinSwapFormOnMatcher);
            if (m && m[4]) {
                if (!a.querySelector('.comments')) {
                    a.insertAdjacentHTML("beforeend",
                        `<span class="right dgray-11 wrap comments" title="${m[4]}"><div class="ico-16"></div> ${m[4]}</span>`);
                }
            }
        }
    }

    function forEachSwapLink(fn: (a: HTMLAnchorElement, m: RegExpMatchArray) => void): void {
        getSwapLinks().forEach(a => {
            if (a.querySelector('> div.ico-16')) {
                return;
            }

            if (a.hasAttribute(onClick)) {
                const m = a.getAttribute(onClick).match(CoinSwapFormOnMatcher);
                if (m) {
                    const [, , cond, , info, vid] = m;
                    m[0] = `${cond} ${vid} ${info}`;
                    fn(a, m);
                }
            }
        });
    }

    function addSwapButtons() {
        document.head.insertAdjacentHTML("beforeend", `
            <style type="text/css">
                #coin #swap-block .btn--combiner,
                #coin #swap-block .btn--expander {
                    margin: 8px 2px 0;
                }
            </style>`);

        const buttonSet = swapBlock.querySelector('center');
        const variants = new Map();
        let couldExpand = false, couldCombine = false;

        function updateSwapVariants(): void {
            couldExpand = false;
            couldCombine = false;
            variants.clear();
            forEachSwapLink((a: HTMLAnchorElement, m: RegExpMatchArray) => {
                const [uniq, usid, cond, price, info, vid, qty] = m;
                if (+qty > 1) {
                    couldExpand = true;
                }

                let variant;
                if (variants.has(uniq)) {
                    variant = variants.get(uniq);
                    variant.qty += +qty;
                    couldCombine = true;
                } else {
                    variant = {usid, cond, price, info, vid, qty: +qty};
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
            if (a.hasAttribute(onClick)) {
                a.setAttribute(onClick, a.getAttribute(onClick).replace(CoinSwapFormOnMatcher,
                    `CoinSwapFormOn('$1', '$2', '$3', '$4', '$5', '${qty}'`));
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

            forEachSwapLink((a, m) => {
                const [uniq, usid, cond, price, info, vid, sqty] = m;
                const qty = +sqty;

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
                                    if (!l.hasAttribute(onClick)) {
                                        return;
                                    }
                                    const m = l.getAttribute(onClick).match(CoinSwapFormOnMatcher);
                                    if (m && m[1]) {
                                        links.add(m[1]);
                                    }
                                });
                                getSwapLinks(r).forEach(l => {
                                    if (!l.hasAttribute(onClick)) {
                                        return;
                                    }
                                    const m = l.getAttribute(onClick).match(CoinSwapFormOnMatcher);
                                    const usid = m && m[1];
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
                expand.style.display = 'block';
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

            forEachSwapLink((a, m) => {
                const [uniq, usid, cond, price, info, vid, qty] = m;

                let variant;
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
                combine.style.display = 'block';
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

        updateButtons();
    }


    function fixTagLinks() {
        const tags = document.getElementById('tags');
        if (tags) {
            tags.querySelectorAll('a[href^="/gallery/"]').forEach(updateLinkHref);
        }
    }

    function initPublicityToggler() {
        const viewId = 'my-func-block';
        const narrowButton = 'narrowButton';

        document.head.insertAdjacentHTML("beforeend", `
            <style type="text/css">
                #${viewId} .${narrowButton} {
                    padding-left: 14px;
                    padding-right: 14px;
                }
            </style>`);

        const view = <HTMLDivElement>document.getElementById(viewId);
        const edit = <HTMLButtonElement>view.querySelector('button.btn-blue');
        const status = <HTMLDivElement>view.querySelector('.status-line .left');
        let replaceStatus = <HTMLTableRowElement>view.querySelector('.status-line + table tr:has(span.status2)');

        edit.classList.add(narrowButton);
        edit.querySelectorAll('+ a.btn-gray').forEach(gray => {
            gray.classList.add(narrowButton);
        });

        const form = <HTMLFormElement> coinForm.querySelector('form');
        let replace = (<HTMLInputElement>form.querySelector('input[name=replace]')).checked;
        let checked = (<HTMLInputElement>form.querySelector('input[name=public]')).checked;

        const visibilityButton = <HTMLButtonElement>edit.cloneNode();
        edit.insertAdjacentElement("afterend", visibilityButton);
        visibilityButton.removeAttribute(onClick);
        visibilityButton.classList.add(narrowButton);
        visibilityButton.addEventListener("click", () => {
            postPublicityForm(loc, form, !checked).then(() => {
                checked = !checked;
                updatePublicityStatus();
                checked ? ok('Coin public') : info('Coin private');
            });
        });

        const replacementButton = <HTMLButtonElement>edit.cloneNode();
        visibilityButton.insertAdjacentElement("beforebegin", replacementButton);
        replacementButton.removeAttribute(onClick);
        replacementButton.classList.add(narrowButton);
        replacementButton.addEventListener("click", () => {
            postReplacementForm(loc, form, !replace).then(() => {
                replace = !replace;
                updateReplacementStatus();
                replace ? err('Should be replaced') : info('No replace required');
            });
        });

        let prevKeyCode = -1;
        document.body.addEventListener("keydown", e => {
            if (e.keyCode === prevKeyCode) {
                if (e.keyCode === 72 || e.keyCode === 83) {
                    visibilityButton.click();
                }
                if (e.keyCode === 82) {
                    replacementButton.click();
                }
            }
            prevKeyCode = e.keyCode;
        });

        updatePublicityStatus();
        updateReplacementStatus();

        function updatePublicityStatus() {
            visibilityButton.innerText = checked ? 'H' : 'S';
            status.innerText = checked ? 'Public' : 'Private';
            if (checked) {
                visibilityButton.classList.add('btn-gray');
                visibilityButton.classList.remove('btn-blue');
                status.classList.add('status1');
                status.classList.remove('status0');
            } else {
                visibilityButton.classList.add('btn-blue');
                visibilityButton.classList.remove('btn-gray');
                status.classList.add('status0');
                status.classList.remove('status1');
            }
        }

        function updateReplacementStatus() {
            replacementButton.innerText = 'R';
            if (replace) {
                replacementButton.classList.add('btn-gray');
                replacementButton.classList.remove('btn-blue');
                if (!replaceStatus) {
                    const table = <HTMLTableElement>view.querySelector('.status-line + table');
                    if (table) {
                        table.insertAdjacentHTML("beforeend", `<tr><td class="lgray-12" colspan="2"><span class="set status2 wrap" style="max-width: 232px;width: 232px;padding: 0;display: block;margin-top: 6px;">Need to replace</span></td></tr>`);
                        replaceStatus = table.querySelector('tr:last-child');
                    }
                } else if (replaceStatus) {
                    replaceStatus.remove();
                    replaceStatus = null;
                }
            } else {
                replacementButton.classList.add('btn-blue');
                replacementButton.classList.remove('btn-gray');
            }
        }
    }

    function initFormImprovements() {
        const buyResetId = 'date-reset-link';

        document.head.insertAdjacentHTML("beforeend", `
            <style type="text/css">
                #${buyResetId} {
                    font-size: 16px;
                    font-weight: bold;
                    width: 22px;
                    height: 22px;
                    display: inline-block;
                    text-align: center;
                }     
            </style>`);

        const form = <HTMLFormElement>coinForm.querySelector('form');
        const cond = <HTMLSelectElement>document.getElementById('condition');

        const buyYear = <HTMLInputElement>document.getElementById('buy_year');
        const buyMonth = <HTMLInputElement>document.getElementById('buy_month');
        buyMonth.insertAdjacentHTML("beforebegin", `<a id="${buyResetId}" href="#">&#x21BB;</a>`);
        const buyReset = document.getElementById(buyResetId);
        buyReset.addEventListener("click", () => {
            const d = new Date();
            const y = d.getFullYear();
            const m = d.getMonth() + 1;
            buyMonth.value = (m < 10) ? `0${m}` : `${m}`;
            buyYear.value = `${y}`;
            return false;
        });

        const CN = new Map([
            ['6', '7'],  // G
            ['5', '8'],  // VG
            ['4', '9'],  // F
            ['3', '10'], // VF
            ['2', '11'], // XF
            ['1', '12'], // UNC
            ['7', '3'],  // PRf
        ]);

        // @ts-ignore
        const CL = new Map([...CN.entries()].map(([k, v]) => [v, k])); // switch conditions and colors

        form.querySelectorAll('table div[class^="marked-"]').forEach((div:HTMLDivElement) => {
            if (div.id === 'set-color') {
                return;
            }
            div.addEventListener('click', e => {
                const div = <HTMLDivElement>e.target;
                let color = null;
                div.classList.forEach((c:string) => {
                    if (c.startsWith('marked-')) {
                        color = c.split('-', 3)[1];
                    }
                });
                if (CL.has(color)) {
                    cond.value = CL.get(color);
                }
            });
        });


        const tableColor = <HTMLInputElement>document.getElementById('table-color');
        const setColor = document.getElementById('set-color');

        cond.addEventListener('change', e => {
            setColor.classList.remove(`marked-${tableColor.value}`);
            const condition = (<HTMLSelectElement>e.target).value;
            if (CN.has(condition)) {
                tableColor.value = CN.get(condition);
            }
            setColor.classList.add(`marked-${tableColor.value}`);
        });
    }


    function postPublicityForm(url: string, form: HTMLFormElement, checked: boolean) {
        const input: HTMLInputElement = form.querySelector('input[name=public]');
        if (input) {
            input.checked = checked;
        }
        return post(url, new FormData(form));
    }

    function postReplacementForm(url: string, form: HTMLFormElement, replace: boolean) {
        const input: HTMLInputElement = form.querySelector('input[name=replace]');
        if (input) {
            input.checked = replace;
        }
        return post(url, new FormData(form));
    }

    type UcoinSwapAction = 'addswapcoin' | 'delswapcoin' | 'editswapcoin';

    function updSwapCoin(usid: string, cond: string, qty: string, vid: string, info: string, price: string, action: UcoinSwapAction = 'editswapcoin') {
        const data = new FormData(swapForm);
        data.set('usid', usid);
        data.set('condition', cond);
        data.set('qty', qty);
        data.set('swap-variety', vid);
        data.set('comment', info);
        data.set('price', price);
        data.set('action', action);
        return post(loc, data)
            .then(response => response.text())
            .then(text => {
                const fragment = document.createDocumentFragment();
                fragment.textContent = text;
                return fragment;
            });
    }

    function addSwapCoin(cond: string, qty: string, vid: string, info: string, price: string) {
        return updSwapCoin('', cond, qty, vid, info, price, 'addswapcoin');
    }

    function delSwapCoin(usid: string) {
        return updSwapCoin(usid, '', '', '', '', '', 'delswapcoin');
    }


    /*function initSwapPriceUpdater() {
        getPriceConfig().then(config => {
            const country = sp($('th:contains("Country") + td', coin).text());
            const name = sp($('th:contains("Denomination") + td', coin).text());
            const subject = sp($('th:contains("Subject") + td', coin).text());
            const price = sp($('a[href="#price"] span', coin).text());
            const varieties = $(`+h3 +table td`, $('#variety', coin));

            let queue = $.when();

            forEachSwapLink((i, a, m) => {
                const $a = $(a);
                const onClick = $a.attr('onclick');
                const [uniq, usid, cond, pp, info, vid, qty] = m;

                const varietyPrice = vid && sp($(`a[href*="vid=${vid}#"]`, varieties).text()).replace(/[^0-9.]/g, '') || price;

                const year = sp($('span.left.gray-13', $a).text());
                const q = sp($('span.left.dgray-11', $a).text());

                const p = getPrice(config, country, name, subject, year, q, info, varietyPrice);
                if (p === false || p === pp || p === `${pp}.00`) {
                    return;
                }

                queue = queue.then(() => updSwapCoin(usid, cond, qty, vid, info, p)).then(() => {
                    $a.css("transition", "background-color .5s").css("background-color", "#C4F9AC")
                        .find('span.right')
                        .html(`<span class="lgray-11">€ </span>${p}<span class="lgray-11"></span>`)
                        .css({
                            "font-weight": "bold",
                            "color": (p === price) ? "" : ((p > price) ? "brown" : "green")
                        });
                }).then(randomDelay());
            });
        });
    }*/

    function initSwapFormImprovements() {
        if (swapForm) {
            document.head.insertAdjacentHTML("beforeend", `
                <style type="text/css">
                    #coin #swap-form .btn-ctrl {
                        float: right;
                        margin: 14px 3px 0;
                        height: 26px;
                    }
                    #coin #swap-form .btn-ctrl + .btn-ctrl {
                        margin-right: 0;
                    }
                    #coin #swap-form #swap-qty {
                        margin-top: 1em;
                    }
                    #coin #swap-block center div.btn-set {
                        display: flex;
                        justify-content: space-between;
                        margin: 0 1em;
                    }
                    #coin #swap-block center div.btn-set div {
                        flex: 0 0 20px;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        cursor: pointer;
                        padding: 1px;
                    }
                </style>`)

            const qty = <HTMLInputElement>document.getElementById('swap-qty');
            qty.setAttribute('inputmode', 'numeric');
            qty.addEventListener("focus", e => (<HTMLInputElement>e.target).setSelectionRange(0, (<HTMLInputElement>e.target).value.length));

            const addQtyCtrlButton = function (where: InsertPosition, id: string, text: string, valueChanger: (prevValue: number) => number): void {
                const qtyId = `swap-qty-${id}`;
                qty.insertAdjacentHTML(where, `<button id="${qtyId}" type="button" class="btn-s btn-gray btn-ctrl">${text}</button>`);
                document.getElementById(qtyId).addEventListener('click', () => {
                    qty.value = `${valueChanger(+qty.value)}`;
                });
            };

            addQtyCtrlButton("afterend", 'minus', '&minus;', v => v - 1);
            addQtyCtrlButton("afterbegin", 'plus10', '+10', v => v + 10);
            addQtyCtrlButton("afterbegin", 'plus5', '+5', v => v + 5);
            addQtyCtrlButton("afterbegin", 'plus', '+', v => v + 1);

            const id = 'swap-cond-fieldset';
            const cond = document.getElementById('swap-cond');
            cond.insertAdjacentHTML("afterend", `<fieldset id="${id}"><legend class="gray-12" style="padding:5px;">Condition</legend></fieldset>`);
            const fieldset = document.getElementById(id);

            cond.querySelectorAll('option').forEach((o: HTMLOptionElement) => {
                const val = o.value;
                const text = val ? o.text : 'Without condition';
                const checked = (val === '3') ? 'checked' : '';
                const style = o.getAttribute('style') || '';
                fieldset.insertAdjacentHTML("beforeend", `<label class="dgray-12" style="margin-top:0px;${style}"><input name="condition" value="${val}" ${checked} type="radio"/>${text}</label>`);
            });

            cond.remove();

            // @ts-ignore
            const _onCoinSwapForm = CoinSwapFormOn;
            if (!_onCoinSwapForm) {
                return;
            }

            const CoinSwapFormOn = function (...args: any[]) {
                _onCoinSwapForm(...args);
                (<HTMLInputElement>swapForm.querySelector(`input[name="condition"][value="${args[1]}"]`)).checked = true;
            };

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

            const addSwapMarker = function (text: string, color: number, value: number): void {
                const markerId = `marked-${value}`;
                const markerClass = `marked-${color}`;
                buttonSet.insertAdjacentHTML("beforeend", `<div id="${markerId}" class="${markerClass}">${text}</div>`);
                document.getElementById(markerId).addEventListener("click", () => CoinSwapFormOn('', `${value}`));
            };

            addSwapMarker('?', 6, 0);
            addSwapMarker('G', 7, 6);
            addSwapMarker('VG', 8, 5);
            addSwapMarker('F', 9, 4);
            addSwapMarker('VF', 10, 3);
            addSwapMarker('XF', 11, 2);
            addSwapMarker('UN', 12, 1);
            addSwapMarker('PR', 3, 7);
            addSwapMarker('CP', 5, 100);
        }
    }

})();
