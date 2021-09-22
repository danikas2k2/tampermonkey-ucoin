import { get } from './ajax';
import { ColorValues, ConditionValues } from './cond';
import { randomDelay } from './delay';
import { getHashParam, updateLocationHash } from './url';

export function addThumbnails(): void {
    for (const row of document.querySelectorAll<HTMLTableRowElement>('table.swap-coin tr')) {
        const d = row.dataset;
        console.info(d);
        row.querySelector('td')?.insertAdjacentHTML(
            'beforebegin',
            `
            <th style="width: 100px" class="thumbnails">
                <img src="${d.tooltipImgpath}/${d.tooltipSample}-1c/${d.tooltipCode}.jpg" class="thumbnail" loading="lazy" alt="obverse"/>
                <img src="${d.tooltipImgpath}/${d.tooltipSample}-2c/${d.tooltipCode}.jpg" class="thumbnail" loading="lazy" alt="reverse"/>
            </th>
        `
        );
    }
}

export function addTrackingLinks(): void {
    const swapMgr = document.getElementById('swap-mgr');
    if (swapMgr) {
        const trackingNumbers = swapMgr.querySelectorAll('div.left.lgray-11');
        for (const div of trackingNumbers) {
            if (!div.textContent.includes('Track')) {
                continue;
            }

            const next = div.nextElementSibling;
            const text = next.textContent;
            if (text) {
                next.innerHTML = `<a href='https://www.17track.net/en/track?nums=${text}' target='_blank'>${text}</a>`;
            }
        }
    }
}

const TAB_PARAM = 't';
const TAB_TAKE = 'take';
const TAB_NEED = 'need';

function setActiveSwapTab(tab: string): void {
    updateLocationHash((params) => params.set(TAB_PARAM, tab));
}

export function addOpenedTabsHandler(): void {
    const [needTab, takeTab] = document.querySelectorAll<HTMLLIElement>(
        `#swap-mgr div.widerightCol > ul.region-list > li.region`
    );
    let currentTab = getHashParam(TAB_PARAM) || TAB_TAKE;
    if (needTab) {
        needTab.addEventListener('click', () => setActiveSwapTab(TAB_NEED));
        if (currentTab === TAB_NEED) {
            needTab.click();
        }
    }
    if (takeTab) {
        takeTab.addEventListener('click', () => setActiveSwapTab(TAB_TAKE));
        if (currentTab === TAB_TAKE) {
            takeTab.click();
        }
    }
}

export function duplicatePagination(): void {
    const swapList = <HTMLDivElement>document.getElementById('swap-list');
    if (!swapList) {
        return;
    }

    const pages = swapList.querySelectorAll<HTMLDivElement>('div.pages');
    if (pages.length > 1) {
        return;
    }

    const lastPages = pages.item(pages.length - 1);
    if (!lastPages.children.length) {
        return;
    }

    const table = swapList.querySelector<HTMLTableElement>('table.swap-coin');
    if (!table) {
        return;
    }

    const heading = <HTMLHeadingElement>table.previousElementSibling;
    if (!heading || !heading.matches('h2')) {
        return;
    }

    const parent = lastPages.parentElement;
    if (!parent) {
        return;
    }

    const clone = <HTMLDivElement>parent.cloneNode(true);
    clone.style.height = '30px';
    heading.insertAdjacentElement('beforebegin', clone);
}

export function showAllPrices(): void {
    const swapRows = document.querySelectorAll<HTMLTableRowElement>('table.swap-coin tr');
    for (const tr of swapRows) {
        const td = tr.querySelector('.td-cond + *');
        if (td) {
            const myPriceElement = td.querySelector<HTMLSpanElement>('span.blue-13');
            const myPrice = +myPriceElement?.textContent;
            const prefix = td.querySelector('span.gray-11:first-child')?.textContent;
            const suffix = td.querySelector('span.gray-11:last-child')?.textContent;
            const tooltipPrice = tr.dataset?.tooltipPrice;
            if (tooltipPrice) {
                const price = +tooltipPrice.replace(prefix, '').replace(suffix, '');
                if (!isNaN(price) && myPrice !== price) {
                    const rel = myPrice / price;
                    let percent;
                    if (rel >= 2) {
                        percent = `<span class='gray-11' style='color:darkred;font-weight:bold'>&times;${rel
                            .toFixed(rel >= 10 ? 0 : 1)
                            .replace('.0', '')}</span>`;
                        myPriceElement.style.color = 'darkred';
                        myPriceElement.style.fontWeight = 'bold';
                    } else {
                        const prel = (rel - 1) * 100;
                        if (prel >= 50) {
                            percent = `<span class='gray-11' style='color:darkred;font-weight:bold'>+${prel.toFixed()}%</span>`;
                        } else if (prel >= 0) {
                            percent = `<span class='gray-11' style='color:brown'>+${prel.toFixed()}%</span>`;
                        } else {
                            percent = `<span class='gray-11' style='color:green'>&minus;${Math.abs(
                                prel
                            ).toFixed()}%</span>`;
                        }
                    }
                    td.insertAdjacentHTML(
                        'beforeend',
                        ` ${percent}<br/><span class='gray-11'>${prefix}${price.toFixed(2)}${suffix}</span>`
                    );
                }
            }
        }
    }
}

interface TooltipDataset extends DOMStringMap {
    tooltipImgpath: string;
    tooltipCode: string;
    tooltipName: string;
    tooltipSubject: string;
    tooltipVariety: string;
    tooltipKm: string;
    tooltipPrice: string;
}

function highlightConflicts(): void {
    const needSwapList = !!document.getElementById('need-swap-list');
    const tables = document.querySelectorAll('#swap-list table.swap-coin');
    for (const table of tables) {
        let rows = [...table.querySelectorAll('tr')];
        const checked = rows.filter((r: HTMLTableRowElement): boolean => {
            if (r.querySelector('input.swap-checkbox:checked')) {
                return true;
            }
            r.classList.remove('conflict');
            return false;
        });
        const heading = <HTMLHeadingElement>table.previousElementSibling;
        if (heading.tagName.toLowerCase() === 'h2') {
            const all = heading.querySelector<HTMLInputElement>(
                'input.swap-country-checkbox, input.edit-country-checkbox'
            );
            all.checked = checked.length === rows.length;
        }
        if (!needSwapList) {
            rows = checked;
        }

        for (const r of rows) {
            const data = <TooltipDataset>r.dataset;
            const { tooltipName, tooltipSubject, tooltipVariety, tooltipKm } = { ...data };
            // const selector = `tr[data-tooltip-name=${JSON.stringify(tooltipName)}]` +
            //     `[data-tooltip-subject=${JSON.stringify(tooltipSubject)}]` +
            //     `[data-tooltip-variety=${JSON.stringify(tooltipVariety)}]` +
            //     `[data-tooltip-km=${JSON.stringify(tooltipKm)}]`;
            let selector = ``;
            if (tooltipKm) {
                selector = `${selector}[data-tooltip-km=${JSON.stringify(tooltipKm)}]`;
            } else {
                selector = `${selector}tr[data-tooltip-name=${JSON.stringify(tooltipName)}]`;
                if (tooltipSubject) {
                    selector = `${selector}[data-tooltip-subject=${JSON.stringify(tooltipSubject)}]`;
                }
            }
            if (tooltipVariety) {
                selector = `${selector}[data-tooltip-variety=${JSON.stringify(tooltipVariety)}]`;
            }
            let rows = [...table.querySelectorAll(selector)];
            if (!needSwapList) {
                rows = rows.filter((r) => !!r.querySelector('input.swap-checkbox:checked'));
            }
            const hasConflicts = rows.length > 1;
            for (const r of rows) {
                r.classList.toggle('conflict', hasConflicts);
            }
        }
    }
}

export function addConflictHandling(): void {
    highlightConflicts();

    const checkboxes = document.querySelectorAll<HTMLInputElement>('#swap-list table.swap-coin input.swap-checkbox');
    for (const checkbox of checkboxes) {
        checkbox.addEventListener('click', (e) => {
            const target = <HTMLInputElement>e.target;
            if (!target.checked) {
                const row = target.closest('tr');
                if (row) {
                    row.classList.remove('conflict');
                }
            }
            highlightConflicts();
        });
    }

    const countryCheckboxes = document.querySelectorAll<HTMLInputElement>('#swap-list h2 input.swap-country-checkbox');
    for (const checkbox of countryCheckboxes) {
        checkbox.addEventListener('click', (e) => {
            const target = <HTMLInputElement>e.target;
            if (!target.checked) {
                const country = target.closest('h2');
                if (country) {
                    const rows = country.nextElementSibling.querySelectorAll('tr');
                    for (const row of rows) {
                        row.classList.remove('conflict');
                    }
                }
            }
            highlightConflicts();
        });
    }
}

export function checkSold(): void {
    const needSwapList = document.getElementById('need-swap-list');
    if (!needSwapList) {
        return;
    }

    const soldList = needSwapList.querySelectorAll('table.swap-coin tr.del');
    let soldCount = soldList.length;
    if (!soldCount) {
        return;
    }

    const delAllButtonId = 'act-d-all';

    const actionBoard = needSwapList.querySelector('.action-board');
    if (!actionBoard) {
        return;
    }

    actionBoard.insertAdjacentHTML(
        'beforeend',
        `<a class='btn-s btn-gray ico-del' id='${delAllButtonId}' style='float: right;'><div class='ico-16'></div></a>`
    );

    const button = document.getElementById(delAllButtonId);
    if (!button) {
        return;
    }

    button.addEventListener('click', async () => {
        // eslint-disable-next-line no-alert
        if (!confirm('Are you sure you want to delete these coins?')) {
            return false;
        }

        let isFirstRequest = true;
        for await (const sold of soldList) {
            if (!isFirstRequest) {
                await randomDelay();
            }
            isFirstRequest = false;

            const { href } = sold.querySelector<HTMLAnchorElement>('a.act');
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

export function ignoreUnwanted(): void {
    if (!document.getElementById('need-swap-list')) {
        const tables = document.querySelectorAll('table.swap-coin');
        for (const table of tables) {
            const rows = table.querySelectorAll<HTMLTableRowElement>('tr');
            for (const tr of rows) {
                const markedElement = tr.querySelector('td span[class^="marked-"]');
                const markedClass = markedElement && markedElement.classList.item(0);
                const myCond = (markedClass && ColorValues.get(+markedClass.split('marked-').pop())) || 0;
                const condElement = tr.querySelector('td.td-cond');
                const cond = (condElement && ConditionValues.get(condElement.textContent)) || 0;
                if (myCond && (!cond || cond <= myCond)) {
                    tr.classList.add('ignore');
                }
            }
        }
    }
}

export function removeRowHrefFromSwapList(): void {
    const swapMgr = document.getElementById('swap-mgr');
    if (!swapMgr) {
        return;
    }

    const rows = swapMgr.querySelectorAll('table.offer-list tr[data-href]');
    for (const row of rows) {
        row.removeAttribute('data-href');
    }
}
