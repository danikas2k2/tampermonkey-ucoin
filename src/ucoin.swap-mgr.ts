// ==UserScript==
// @name         uCoin: Swap-Manager
// @namespace    https://ucoin.net/
// @version      0.2.0
// @description  Show all prices
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @match        https://*.ucoin.net/swap-mgr/*
// @match        https://*.ucoin.net/swap-list/*
// ==/UserScript==

import {randomDelay} from './lib/delay';
import {get} from './lib/ajax';

(() => {

    document.head.insertAdjacentHTML("beforeend", `
        <style type='text/css'>
            #swap-list .swap-coin tr,
            #swap-mgr .swap-coin tr { transition: opacity .25s, background .25s; }
            
            #swap-list .swap-coin tr[ignore],
            #swap-mgr .swap-coin tr[ignore] { opacity: .5; }
            
            #swap-list .swap-coin tr.mark[ignore],
            #swap-mgr .swap-coin tr.mark[ignore],
            #swap-list .swap-coin tr[ignore][conflict],
            #swap-mgr .swap-coin tr[ignore][conflict] { opacity: .75; }
            
            #swap-iist .swap-coin tr[conflict],
            #swap-mgr .swap-coin tr[conflict] { background: #fdd; }
            
            #swap-list .swap-coin tr.mark[conflict],
            #swap-mgr .swap-coin tr.mark[conflict] { background: #fed; }
        </style>`);

    const CN = new Map([
        ['7', 1],
        ['8', 2],
        ['9', 3],
        ['10', 4],
        ['11', 5],
        ['12', 6],
        ['3', 7],
        ['2', 8],
        ['1', 9],
    ]);

    const CM = new Map([
        ['G', 1],
        ['VG', 2],
        ['F', 3],
        ['VF', 4],
        ['XF', 5],
        ['UNC', 6],
        ['PRF', 7],
        ['PRF', 8],
    ]);

    const needSwapList = document.getElementById('need-swap-list');
    const isSelected = !!needSwapList;
    const actionBoard = needSwapList && needSwapList.querySelector('.action-board');

    const tree     = document.getElementById('tree');
    const table     = document.querySelector('table.swap-coin');
    const list      = table.querySelectorAll('tr');

    addTrackingLinks();
    showAllPrices();
    hiliteConflicting();
    if (!isSelected) {
        handleCheckEvent();
        grayOutUnwanted();
    } else {
        checkSold();
    }

    function checkSold() {
        const soldList = table.querySelectorAll('tr.del');
        let soldCount = soldList.length;
        if (soldCount) {
            const delAllButtonId = 'act-d-all';
            actionBoard.insertAdjacentHTML("beforeend", `<a class="btn-s btn-gray ico-del" id="${delAllButtonId}" style="float: right;"><div class="ico-16"></div></a>`);
            const button = document.getElementById(delAllButtonId);
            button.addEventListener('click', () => {
                if (!confirm('Are you sure you want to delete these coins?')) {
                    return false;
                }

                let queue   = Promise.resolve();
                soldList.forEach(sold => {
                    queue = queue.then(() => {
                        const {href} = (<HTMLAnchorElement>sold.querySelector('a.act'));
                        return get(href);
                    }).then(() => {
                        const soldCountElement = tree.querySelector('a.region.list-link div.right.blue-13 sup');
                        if (--soldCount) {
                            soldCountElement.textContent = `&nbsp;-${soldCount}`;
                        } else {
                            soldCountElement.remove();
                        }
                        sold.remove();
                    }).then(randomDelay());
                });
                queue.then(() => {
                    button.remove();
                });
            });
        }
    }

    function showAllPrices() {
        list.forEach((tr: HTMLTableRowElement) => {
            const td          = tr.querySelector('.td-cond + *');
            const myPrice      = +td.querySelector('span.blue-13').textContent;
            const prefix       = td.querySelector('span.gray-11:first-child').textContent;
            const suffix       = td.querySelector('span.gray-11:last-child').textContent;
            const tooltipPrice = tr.dataset.tooltipPrice;
            if (tooltipPrice) {
                const price = +tooltipPrice.replace(prefix, '').replace(suffix, '');
                if (!isNaN(price) && myPrice !== price) {
                    td.insertAdjacentHTML("beforeend", `<br/><span class="gray-11">${prefix}${price.toFixed(2)}${suffix}</span>`);
                }
            }
        });
    }

    function grayOutUnwanted() {
        list.forEach((tr: HTMLTableRowElement) => {
            const marked    = tr.querySelector('td span[class^="marked-"]').classList;
            const myQuality = marked && CN.get(marked.item(0).split('marked-').pop()) || 0;
            const quality   = CM.get(tr.querySelector('td.td-cond').textContent) || 0;
            if (myQuality && (!quality || quality <= myQuality)) {
                tr.classList.add('ignore');
            }
        });
    }

    function hiliteConflicting() {
        let query = isSelected ? 'tr' : 'tr:has(input.swap-checkbox:checked)';
        let checked = table.querySelectorAll(query);
        checked.forEach((tr: HTMLTableRowElement) => {
            const data = tr.dataset;
            const dup = table.querySelectorAll(`${query}[data-tooltip-name=${JSON.stringify(data.tooltipName)}]` +
                `[data-tooltip-subject=${JSON.stringify(data.tooltipSubject)}]` +
                `[data-tooltip-variety=${JSON.stringify(data.tooltipVariety)}]` +
                `[data-tooltip-km=${JSON.stringify(data.tooltipKm)}]`);
            const hasConflicts = dup.length > 1;
            dup.forEach(tr => {
                tr.classList.toggle('conflict', hasConflicts);
            });
        });
    }

    function handleCheckEvent() {
        table.querySelectorAll('input.swap-checkbox, input.swap-country-checkbox').forEach((input: HTMLInputElement) => {
            input.addEventListener('click', e => {
                const input = <HTMLInputElement>e.target;
                if (!input.checked) {
                    let parent = input.parentElement;
                    while (parent && parent.tagName !== 'tr') {
                        parent = parent.parentElement;
                    }
                    if (parent) {
                        parent.classList.remove('conflict');
                    }
                }
                hiliteConflicting();
            })
        });
    }

    function addTrackingLinks() {
        const swapMgr = document.getElementById('swap-mgr');
        swapMgr.querySelectorAll('div.left.lgray-11:contains("Track")+div.right.gray-11').forEach(div => {
            const text = div.textContent;
            if (text) {
                div.innerHTML = `<a href="https://www.17track.net/en/track?nums=${text}">${text}</a>`;
            }
        });
    }

})();
