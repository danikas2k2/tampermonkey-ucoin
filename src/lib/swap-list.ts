import {get} from "./ajax";
import {randomDelay} from "./delay";

export function addTrackingLinks() {
    const swapMgr = document.getElementById('swap-mgr');
    if (swapMgr) {
        const trackingNumbers = swapMgr.querySelectorAll('div.left.lgray-11');
        for (const div of trackingNumbers) {
            if (!div.textContent.includes("Track")) {
                continue;
            }

            const next = div.nextElementSibling;
            const text = next.textContent;
            if (text) {
                next.innerHTML = `<a href="https://www.17track.net/en/track?nums=${text}" target="_blank">${text}</a>`;
            }
        }
    }
}

export function showAllPrices() {
    const swapRows = <NodeListOf<HTMLTableRowElement>> document.querySelectorAll('table.swap-coin tr');
    for (const tr of swapRows) {
        const td = tr.querySelector('.td-cond + *');
        const myPrice = +td.querySelector('span.blue-13').textContent;
        const prefix = td.querySelector('span.gray-11:first-child').textContent;
        const suffix = td.querySelector('span.gray-11:last-child').textContent;
        const tooltipPrice = tr.dataset.tooltipPrice;
        if (tooltipPrice) {
            const price = +tooltipPrice.replace(prefix, '').replace(suffix, '');
            if (!isNaN(price) && myPrice !== price) {
                td.insertAdjacentHTML("beforeend", `<br/><span class="gray-11">${prefix}${price.toFixed(2)}${suffix}</span>`);
            }
        }
    }
}

export function addConflictHandling() {
    highlightConflicts();

    if (!document.getElementById('need-swap-list')) {
        const tables = <NodeListOf<HTMLTableElement>> document.querySelectorAll('table.swap-coin');
        for (const table of tables) {
            const checkboxes = <NodeListOf<HTMLInputElement>> table.querySelectorAll('input.swap-checkbox, input.swap-country-checkbox');
            for (const checkbox of checkboxes) {
                checkbox.addEventListener('click', e => {
                    const input = <HTMLInputElement> e.target;
                    if (!input.checked) {
                        let parent = input.parentElement;
                        while (parent && parent.tagName !== 'tr') {
                            parent = parent.parentElement;
                        }
                        if (parent) {
                            parent.classList.remove('conflict');
                        }
                    }
                    highlightConflicts();
                });
            }
        }
    }
}

function highlightConflicts() {
    const needSwapList = !!document.getElementById('need-swap-list');
    const tables = document.querySelectorAll('table.swap-coin');
    for (const table of tables) {
        let rows = [...table.querySelectorAll('tr')];
        const checked = rows.filter((r: HTMLTableRowElement) => {
            if (r.matches('tr input.swap-checkbox:checked')) {
                return true;
            }
            r.classList.remove('conflict');
        });
        const heading = <HTMLHeadingElement> table.previousElementSibling;
        if (heading.tagName.toLowerCase() === 'h2') {
            const all = <HTMLInputElement> heading.querySelector('input.swap-country-checkbox, input.edit-country-checkbox');
            all.checked = checked.length === rows.length;
        }
        if (!needSwapList) {
            rows = checked;
        }

        for (const r of rows) {
            const data = r.dataset;
            const selector = `tr[data-tooltip-name=${JSON.stringify(data.tooltipName)}]` +
                `[data-tooltip-subject=${JSON.stringify(data.tooltipSubject)}]` +
                `[data-tooltip-variety=${JSON.stringify(data.tooltipVariety)}]` +
                `[data-tooltip-km=${JSON.stringify(data.tooltipKm)}]`;
            let rows = [...table.querySelectorAll(selector)];
            if (!needSwapList) {
                rows = rows.filter(r => r.matches('tr input.swap-checkbox:checked'));
            }
            const hasConflicts = rows.length > 1;
            for (const r of rows) {
                r.classList.toggle('conflict', hasConflicts);
            }
        }
    }
}

export function checkSold() {
    const needSwapList = document.getElementById('need-swap-list');
    if (needSwapList) {
        const table = document.querySelector('table.swap-coin');
        const soldList = table.querySelectorAll('tr.del');
        let soldCount = soldList.length;
        if (soldCount) {
            const delAllButtonId = 'act-d-all';
            const actionBoard = needSwapList.querySelector('.action-board');
            actionBoard.insertAdjacentHTML("beforeend", `<a class="btn-s btn-gray ico-del" id="${delAllButtonId}" style="float: right;"><div class="ico-16"></div></a>`);
            const button = document.getElementById(delAllButtonId);
            button.addEventListener('click', async () => {
                if (!confirm('Are you sure you want to delete these coins?')) {
                    return false;
                }

                let isFirstRequest = true;
                for await (const sold of soldList) {
                    if (!isFirstRequest) {
                        await randomDelay();
                    }
                    isFirstRequest = false;

                    const {href} = (<HTMLAnchorElement> sold.querySelector('a.act'));
                    await get(href);

                    const tree = document.getElementById('tree');
                    const soldCountElement = tree.querySelector('a.region.list-link div.right.blue-13 sup');
                    if (--soldCount) {
                        soldCountElement.textContent = `&nbsp;-${soldCount}`;
                    } else {
                        soldCountElement.remove();
                    }
                    sold.remove();
                }

                button.remove();
            });
        }
    }
}


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
    ['BU', 8],
]);

export function ignoreUnwanted() {
    if (!document.getElementById('need-swap-list')) {
        const tables = document.querySelectorAll('table.swap-coin');
        for (const table of tables) {
            const rows = <NodeListOf<HTMLTableRowElement>> table.querySelectorAll('tr');
            for (const tr of rows) {
                const markedElement = tr.querySelector('td span[class^="marked-"]');
                const marked = markedElement && markedElement.classList;
                const myCond = marked && CN.get(marked.item(0).split('marked-').pop()) || 0;
                const condElement = tr.querySelector('td.td-cond');
                const cond = condElement && CM.get(condElement.textContent) || 0;
                if (myCond && (!cond || cond <= myCond)) {
                    tr.classList.add('ignore');
                }
            }
        }
    }
}
