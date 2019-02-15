import {get} from "./ajax";
import {randomDelay} from "./delay";

export function addTrackingLinks() {
    const swapMgr = document.getElementById('swap-mgr');
    swapMgr && swapMgr.querySelectorAll('div.left.lgray-11').forEach(div => {
        if (!div.textContent.includes("Track")) {
            return;
        }

        const next = div.nextElementSibling;
        const text = next.textContent;
        if (text) {
            next.innerHTML = `<a href="https://www.17track.net/en/track?nums=${text}" target="_blank">${text}</a>`;
        }
    });
}

export function showAllPrices() {
    document.querySelectorAll('table.swap-coin tr').forEach((tr: HTMLTableRowElement) => {
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
    });
}

export function addConflictHandling() {
    hiliteConflicts();

    if (!document.getElementById('need-swap-list')) {
        const tables = document.querySelectorAll('table.swap-coin');
        tables.forEach((table: HTMLTableElement) => {
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
                    hiliteConflicts();
                })
            });
        });
    }
}

function hiliteConflicts() {
    const needSwapList = !!document.getElementById('need-swap-list');
    const tables = document.querySelectorAll('table.swap-coin');
    tables.forEach((table: HTMLTableElement) => {
        const rows = table.querySelectorAll('tr');

        let checked: Array<HTMLTableRowElement>;
        if (needSwapList) {
            // @ts-ignore
            checked = rows;
        } else {
            checked = [];
            rows.forEach((r: HTMLTableRowElement) => {
                if (r.querySelector('input.swap-checkbox:checked')) {
                    checked.push(r);
                } else {
                    r.classList.remove('conflict');
                }
            });

            const heading = <HTMLHeadingElement>table.previousElementSibling;
            if (heading.tagName.toLowerCase() === 'h2') {
                const all = <HTMLInputElement>heading.querySelector('input.swap-country-checkbox');
                all.checked = checked.length === rows.length;
            }
        }

        checked.forEach((r: HTMLTableRowElement) => {
            const data = r.dataset;
            const selector = `tr[data-tooltip-name=${JSON.stringify(data.tooltipName)}]` +
                `[data-tooltip-subject=${JSON.stringify(data.tooltipSubject)}]` +
                `[data-tooltip-variety=${JSON.stringify(data.tooltipVariety)}]` +
                `[data-tooltip-km=${JSON.stringify(data.tooltipKm)}]`;
            const rows = table.querySelectorAll(selector);
            let dup: Array<HTMLTableRowElement>;
            if (needSwapList) {
                // @ts-ignore
                dup = rows;
            } else {
                dup = [];
                rows.forEach((r: HTMLTableRowElement) => {
                    if (r.querySelector('input.swap-checkbox:checked')) {
                        dup.push(r);
                    }
                });
            }

            const hasConflicts = dup.length > 1;
            dup.forEach((r: HTMLTableRowElement) => {
                r.classList.toggle('conflict', hasConflicts);
            });
        });
    });
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
            button.addEventListener('click', () => {
                if (!confirm('Are you sure you want to delete these coins?')) {
                    return false;
                }

                let queue = Promise.resolve();
                soldList.forEach(sold => {
                    queue = queue.then(() => {
                        const {href} = (<HTMLAnchorElement>sold.querySelector('a.act'));
                        return get(href);
                    }).then(() => {
                        const tree = document.getElementById('tree');
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
        document.querySelectorAll('table.swap-coin').forEach(table => {
            table.querySelectorAll('tr').forEach((tr: HTMLTableRowElement) => {
                const markedElement = tr.querySelector('td span[class^="marked-"]');
                const marked = markedElement && markedElement.classList;
                const myCond = marked && CN.get(marked.item(0).split('marked-').pop()) || 0;
                const condElement = tr.querySelector('td.td-cond');
                const cond = condElement && CM.get(condElement.textContent) || 0;
                if (myCond && (!cond || cond <= myCond)) {
                    tr.classList.add('ignore');
                }
            });
        });
    }
}
