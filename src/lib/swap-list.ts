import { getCountryId } from '../data/countries';
import separateCountries from '../data/separate-countries.json';
import { text } from './ajax';
import { getConditionCell } from './coin-list';
import { Param } from './common/params';
import { Color, ColorValues, Condition, ConditionValues } from './cond';
import { _ } from './lang';
import { updateLinkHref, updateOnClickHref } from './links';
import { getPayPalPrice } from './paypal';
import { formatNumber, parsePrice } from './prices';
import { getShippingPrice } from './shipping';
import { getReserveCountElement } from './swap-utils';
import { getSwapTab, setActiveSwapTab, Tab } from './swap/tabs';
import { getHashParam, loc } from './url';
import { documentFragment, reload } from './utils';

export function addSwapTitle(): void {
    const title = [...document.querySelectorAll('#swap-mgr div.leftCol > div.user-info > .wrap')]
        .map((e) => e.textContent)
        .join(' / ');
    if (title) {
        document.title = `${title} - ${document.title}`;
    }
}

export function markSeparateCountries(): void {
    for (const list of document.querySelectorAll<HTMLHeadingElement>(
        '#swap-list, #take-swap-list'
    )) {
        for (const h2 of list.querySelectorAll<HTMLHeadingElement>('h2')) {
            if (separateCountries.includes(h2.id)) {
                h2.classList.add('separate-country');
            }
        }
        for (const a of list.querySelectorAll<HTMLHeadingElement>(
            'table.swap-coin td a.dgray-13'
        )) {
            if (a.textContent?.includes('euro')) {
                a.classList.add('separate-country');
            }
        }
    }
}

export function addTrackingLinks(): void {
    const swapMgr = document.getElementById('swap-mgr');
    if (swapMgr) {
        const trackingNumbers = swapMgr.querySelectorAll('div.left.lgray-11');
        for (const div of trackingNumbers) {
            if (!div.textContent?.includes('Track')) {
                continue;
            }

            const next = div.nextElementSibling;
            const text = next?.textContent;
            if (text) {
                next.innerHTML = `<a href="https://www.17track.net/en/track?nums=${text}" target="_blank">${text}</a>`;
            }
        }
    }
}

export function listenForReserveCountChange(): void {
    const reserveElement = getReserveCountElement();
    if (!reserveElement) {
        return;
    }

    const parentElement = reserveElement.parentElement;
    if (!parentElement) {
        return;
    }

    const totalElement = parentElement.previousElementSibling;
    if (!totalElement) {
        return;
    }

    const total = +(totalElement.querySelector('.right')?.textContent || 0);
    const toggle = () => {
        const count = +reserveElement.textContent || 0;
        const someMissing = count < total;
        const allReserved = count === total;
        parentElement.classList.toggle('some-missing', someMissing);
        parentElement.classList.toggle('all-reserved', allReserved);
    };

    toggle();

    const observer = new MutationObserver(toggle);
    observer.observe(reserveElement, { childList: true, characterData: true, subtree: true });
}

export function calcTotalPrices(): void {
    const tree = document.querySelector('#swap-mgr #tree');
    if (!tree) {
        return;
    }

    const tabs = [...document.querySelectorAll('.region-list .region')];
    if (!tabs.length) {
        console.error('[DEV] Missing swap tabs');
        return;
    }

    const titles = tabs.map((r) => r.textContent.replaceAll(/\(.*?\)/g, '')?.trim() || '');

    const lists = document.querySelectorAll('.swap-list');
    if (!lists.length) {
        console.error('[DEV] Missing swap lists');
        return;
    }

    const sections = tree.querySelectorAll('.region.list-link');
    if (!sections.length) {
        console.error('[DEV] Missing price sections');
        return;
    }

    const hasAllSections = sections.length > 1;
    let currentPriceDiff = 0;
    let totalPriceDiff = 0;

    for (const section of sections) {
        const title = section.querySelector('.left')?.textContent;
        if (!title) {
            console.error('[DEV] Missing title', { section });
            continue;
        }

        const priceRow = (
            section.nextElementSibling?.matches('.swap-reserve')
                ? section.nextElementSibling.nextElementSibling
                : section.nextElementSibling
        )?.querySelector('.right');
        if (!priceRow) {
            console.error('[DEV] Missing price line', { section });
            continue;
        }

        const [prefix, price, suffix] = priceRow.querySelectorAll('span');
        if (!price) {
            console.error(`[DEV] Missing price for title "${title}"`, { priceRow });
            continue;
        }

        const current = titles.findIndex((t) => t === title);
        if (current < 0) {
            console.error(`[DEV] Missing index for title "${title}"`, { titles });
            continue;
        }
        const currentTab = getSwapTab(tabs[current]);
        if (!currentTab) {
            console.warn(`[DEV] Missing tab for title "${title}"`);
            continue;
        }

        const give = currentTab === Tab.GIVE;

        const priceCells = lists[current]?.querySelectorAll('tr:not(.del) .price');
        if (!priceCells?.length) {
            console.error(`[DEV] Missing price cells for title "${title}"`, {
                titleIndex: current,
                lists,
            });
            continue;
        }

        let totalPrice = 0;
        for (const cell of priceCells) {
            let cellPrice = cell.querySelector('.gray-11.price-tooltip');
            if (!cellPrice) {
                cellPrice = cell.querySelector('.blue-13');
                if (!cellPrice) {
                    console.error(`[DEV] Missing price in cell`, { cell });
                    continue;
                }
            }
            totalPrice += parsePrice(cellPrice.textContent) ?? 0;
        }
        totalPriceDiff += give ? -totalPrice : totalPrice;

        price.style = '';
        price.classList.add('blue-13');

        const currentPrice = parsePrice(price.textContent) ?? 0;
        currentPriceDiff += give ? -currentPrice : currentPrice;

        const diff = currentPrice - totalPrice;

        const priceDiv = (price: number | string) =>
            `<div class="right lgray-11 clear-right">${
                typeof price === 'number' ? formatNumber(price) : price
            }</div>`;

        const priceDiff = (price: number) =>
            `<span class="price-tooltip ${
                (give ? price < 0 : price > 0) ? 'price-over' : 'price-under'
            }">${`${price > 0 ? '+' : '&minus;'} ${prefix?.textContent} ${formatNumber(
                Math.abs(price)
            )} ${suffix?.textContent}`.trim()}</span>`;

        if (diff) {
            priceRow.insertAdjacentHTML('afterend', priceDiv(priceDiff(diff)));
        }
        priceRow.insertAdjacentHTML('afterend', priceDiv(totalPrice));
        priceRow.parentElement?.classList.add(diff ? 'price-triple' : 'price-double');

        if (!give) {
            continue;
        }

        console.info(`[DEV]`, price);
        const weightLine = price.closest('a.region')?.nextElementSibling;
        console.info(`[DEV]`, weightLine);
        const weight = parsePrice(weightLine?.querySelector('.right')?.textContent) ?? 0;
        console.info(`[DEV]`, weight);
        const country =
            getCountryId(
                tree.previousElementSibling?.querySelector('.gray-11')?.textContent ?? ''
            ) ?? '';
        console.info(`[DEV]`, country);
        const shippingPrice = getShippingPrice(country, weight);
        console.info(`[DEV]`, shippingPrice);
        if (shippingPrice > 0) {
            totalPrice = currentPrice + shippingPrice;
            const totalDescription = `${formatNumber(currentPrice)} + ${formatNumber(
                shippingPrice
            )} <s>${_('shipping')}</s>`;
            const { price: ppPrice, charges: ppCharges } = getPayPalPrice(country, totalPrice);
            const ppDescription = `${formatNumber(totalPrice)} + ${formatNumber(ppCharges)} <s>${_(
                'PayPal charges'
            )}</s>`;
            weightLine?.insertAdjacentHTML(
                'afterend',
                `
                <a class="region price-section price-line">
                    <div class="left dgray-13">${_('Shipping')}</div>
                    <div class="right blue-13"><u>€</u>${formatNumber(shippingPrice)}</div>
                </a>
                <a class="region price-line price-double">
                    <div class="left lgray-11">${_('Total')}</div>
                    <div class="right gray-12"><u>€</u>${formatNumber(totalPrice)}</div>
                    <div class="right lgray-11">&hairsp;<small>(</small>${totalDescription}<small>)</small></div>
                </a>
                <a class="region price-line price-double">
                    <div class="left lgray-11">PayPal</div>
                    <div class="right gray-12"><u>€</u>${formatNumber(ppPrice)}</div>
                    <div class="right lgray-11">&hairsp;<small>(</small>${ppDescription}<small>)</small></div>
                </a>
                `
            );
        }

        if (hasAllSections && (currentPriceDiff || totalPriceDiff)) {
            weightLine?.insertAdjacentHTML(
                'afterend',
                `
            <a class="region price-section price-line price-double">
                <div class="left dgray-13">${_('Difference')}</div>
                <div class="right blue-13">${priceDiff(currentPriceDiff)}</div>
                <div class="right lgray-11">${priceDiff(totalPriceDiff)}</div>
            </a>
            `
            );
        }
    }
}

export function addOpenedTabsHandler(): void {
    const get =
        document.querySelector('#tree a.list-link:not([href]):first-child .right')?.textContent ||
        '0';
    const [, currentStatus] =
        document
            .querySelector('#tree .user-info + div span[class^="swap-status"]')
            ?.className.match(/swap-status(\d+)/) || [];
    const currentTab =
        getHashParam<Tab>(Param.TAB) ||
        (localStorage.getItem(Param.TAB) as Tab) ||
        (get === '0' || currentStatus === '1' || currentStatus === '2' ? Tab.GIVE : Tab.GET);
    const tabElements = document.querySelectorAll<HTMLLIElement>(
        `#swap-mgr div.widerightCol > ul.region-list > li.region`
    );
    for (const tabElement of tabElements) {
        const tab = getSwapTab(tabElement);
        tabElement.addEventListener('click', () => setActiveSwapTab(tab));
        if (tab === currentTab) {
            tabElement.click();
        }
    }
}

export function duplicatePagination(): void {
    const swapList = document.getElementById('swap-list') as HTMLDivElement;
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

    const heading = table.previousElementSibling as HTMLHeadingElement;
    if (!heading || !heading.matches('h2')) {
        return;
    }

    const parent = lastPages.parentElement;
    if (!parent) {
        return;
    }

    const clone = parent.cloneNode(true) as HTMLDivElement;
    clone.style.height = '30px';
    heading.insertAdjacentElement('beforebegin', clone);
}

function updatePriceCell(tr: HTMLTableRowElement, newPrice?: string): void {
    const tdCond = getConditionCell(tr);
    if (!tdCond) {
        return;
    }

    const td = tdCond.nextElementSibling as HTMLTableCellElement;
    if (!td) {
        return;
    }

    td.classList.add('price');
    const myPriceElement = td.querySelector<HTMLSpanElement>('span.blue-13');
    if (!myPriceElement) {
        return;
    }

    if (newPrice) {
        myPriceElement.textContent = newPrice;
    }
    const myPrice = +(myPriceElement?.textContent || 0);
    const prefix = td.querySelector('span.gray-11:first-child')?.textContent;
    const suffix = td.querySelector('span.gray-11:last-child')?.textContent;
    let tooltipPrice = tr.dataset?.tooltipPrice;
    if (!tooltipPrice) {
        return;
    }

    for (const span of td.querySelectorAll(
        'span[data-price-percent], span[data-price-tooltip], span[data-price-cond]'
    )) {
        span.remove();
    }

    if (prefix) {
        tooltipPrice = tooltipPrice.replace(prefix, '');
    }
    if (suffix) {
        tooltipPrice = tooltipPrice.replace(suffix, '');
    }
    const price = +tooltipPrice;
    if (price > myPrice) {
        myPriceElement.style.color = 'green';
    } else if (price < myPrice) {
        myPriceElement.style.color = 'brown';
    } else {
        myPriceElement.style.color = '';
    }
    myPriceElement.classList.remove('price-times');
    if (!isNaN(price) && myPrice !== price) {
        const rel = myPrice / price;
        let percent = '';
        if (rel >= 2) {
            percent = `<span class="gray-11 price-times" data-price-percent>&times;${rel
                .toFixed(rel >= 10 ? 0 : 1)
                .replace('.0', '')}</span>`;
            myPriceElement.classList.add('price-times');
        } else {
            const pRel = (rel - 1) * 100;
            const pFix = pRel.toFixed();
            if (+pFix >= 50) {
                percent = `<span class="gray-11 price-times" data-price-percent>+${pFix}%</span>`;
            } else if (+pFix > 0) {
                percent = `<span class="gray-11 price-over" data-price-percent>+${pFix}%</span>`;
            } else if (+pFix < 0) {
                percent = `<span class="gray-11 price-under" data-price-percent>&minus;${(-pFix).toFixed()}%</span>`;
            }
        }
        td.insertAdjacentHTML(
            'beforeend',
            `${percent}<span class="gray-11 price-tooltip" data-price-tooltip>${prefix}${formatNumber(
                price
            )}${suffix}</span>`
        );
    }
}

export function showAllPrices(): void {
    const swapRows = document.querySelectorAll<HTMLTableRowElement>('table.swap-coin tr');
    for (const tr of swapRows) {
        updatePriceCell(tr);
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
            r.classList.remove('conflict', 'ignored');
            return false;
        });

        const heading = table.previousElementSibling as HTMLHeadingElement;
        if (heading.tagName.toLowerCase() === 'h2') {
            const all = heading.querySelector<HTMLInputElement>(
                'input.swap-country-checkbox, input.edit-country-checkbox'
            );
            if (all) {
                all.checked = checked.length === rows.length;
            }
        }
        if (!needSwapList) {
            rows = checked;
        }

        const byYear = loc().searchParams.get('v') === 'need-by-year';
        for (const r of rows) {
            const data = r.dataset as TooltipDataset;
            const { tooltipName, tooltipSubject, tooltipVariety, tooltipKm } = { ...data };
            // const selector = `tr[data-tooltip-name=${JSON.stringify(tooltipName)}]` +
            //     `[data-tooltip-subject=${JSON.stringify(tooltipSubject)}]` +
            //     `[data-tooltip-variety=${JSON.stringify(tooltipVariety)}]` +
            //     `[data-tooltip-km=${JSON.stringify(tooltipKm)}]`;

            const selectors = [];
            if (tooltipKm) {
                selectors.push(`[data-tooltip-km=${JSON.stringify(tooltipKm)}]`);
                if (byYear) {
                    selectors.push(`tr[data-tooltip-name=${JSON.stringify(tooltipName)}]`);
                }
            } else {
                selectors.push(`tr[data-tooltip-name=${JSON.stringify(tooltipName)}]`);
                if (tooltipSubject) {
                    selectors.push(`[data-tooltip-subject=${JSON.stringify(tooltipSubject)}]`);
                }
                if (tooltipVariety) {
                    selectors.push(`[data-tooltip-variety=${JSON.stringify(tooltipVariety)}]`);
                }
            }

            const matchedRows = [...table.querySelectorAll(selectors.join(''))];
            const checkedRows = !needSwapList
                ? matchedRows.filter((r) => !!r.querySelector('input.swap-checkbox:checked'))
                : matchedRows;

            const hasChecked = checkedRows.length > 0;
            for (const r of matchedRows) {
                r.classList.toggle(
                    'ignored',
                    hasChecked && !r.querySelector('input.swap-checkbox:checked')
                );
            }

            const hasConflicts = checkedRows.length > 1;
            for (const r of checkedRows) {
                r.classList.toggle('conflict', hasConflicts);
            }
        }
    }
}

export function addConflictHandling(): void {
    highlightConflicts();

    const checkboxes = document.querySelectorAll<HTMLInputElement>(
        '#swap-list table.swap-coin input.swap-checkbox'
    );
    for (const checkbox of checkboxes) {
        checkbox.addEventListener('click', (e) => {
            const target = e.target as HTMLInputElement;
            if (!target.checked) {
                const row = target.closest('tr');
                if (row) {
                    row.classList.remove('conflict');
                }
            }
            highlightConflicts();
        });
    }

    const countryCheckboxes = document.querySelectorAll<HTMLInputElement>(
        '#swap-list h2 input.swap-country-checkbox'
    );
    for (const checkbox of countryCheckboxes) {
        checkbox.addEventListener('click', (e) => {
            const target = e.target as HTMLInputElement;
            if (!target.checked) {
                const country = target.closest('h2');
                if (country) {
                    const rows = country.nextElementSibling?.querySelectorAll('tr');
                    if (rows) {
                        for (const row of rows) {
                            row.classList.remove('conflict');
                        }
                    }
                }
            }
            highlightConflicts();
        });
    }
}

function getSoldCountElement(fragment: ParentNode): Element | null {
    return fragment.querySelector('#tree a.region.list-link div.right.blue-13 sup');
}

function getSoldList(fragment: ParentNode): NodeListOf<Element> {
    return fragment.querySelectorAll('table.swap-coin tr.del');
}

function getSoid(sold: Element): string | undefined {
    return sold.querySelector<HTMLAnchorElement>('a.act')?.href.match(/soid=(\d+)/)?.[1];
}

function getSoids(soldList: NodeListOf<Element>): Set<string> {
    return new Set([...soldList].map(getSoid).filter(Boolean) as string[]);
}

export function checkSold(): void {
    const needSwapList = document.getElementById('need-swap-list');
    if (!needSwapList) {
        return;
    }

    const soldList = getSoldList(needSwapList);
    if (!soldList.length) {
        return;
    }

    const actionBoard = needSwapList.querySelector('.action-board');
    if (!actionBoard) {
        return;
    }

    const delAllButtonId = 'act-del-all';
    const icon = actionBoard.querySelector('a#act-d')?.innerHTML;
    actionBoard.insertAdjacentHTML(
        'beforeend',
        `
            <a class="btn-s btn-gray ico-del" id="${delAllButtonId}">
                <span>${icon}</span>
                <span>${icon}</span>
            </a>`
    );

    const button = document.getElementById(delAllButtonId);
    if (!button) {
        console.error('[DEV] Missing delete button');
        return;
    }

    const soldText = getSoldCountElement(document);
    button.addEventListener('click', async () => {
        if (!confirm('Are you sure you want to delete these coins?')) {
            return false;
        }

        // TODO remove all deleted coins at once by selecting them and clicking "Delete selected"
        const sid = needSwapList.dataset.sid;
        if (!sid) {
            console.error('[DEV] Missing SID');
            return;
        }

        const ids = new Set([...soldList].map(getSoid).filter(Boolean));
        if (!ids.size) {
            console.error('[DEV] Missing SOID');
            return;
        }

        const url = new URL(`https://en.ucoin.net/swap-mgr/`);
        url.searchParams.set('f', 'd');
        url.searchParams.set('soid', [...ids].join(','));
        url.searchParams.set('sid', sid);
        const response = documentFragment(await fetch(url).then(text));
        if (!response) {
            console.error('[DEV] Missing response');
            return;
        }

        if (soldText) {
            const newText = getSoldCountElement(response);
            if (newText) {
                soldText.textContent = newText.textContent;
            } else {
                soldText.remove();
            }
        }

        const newSwapList = response.getElementById('need-swap-list');
        const newIds = newSwapList ? getSoids(getSoldList(newSwapList)) : new Set<string>();
        for (const sold of soldList) {
            const id = getSoid(sold);
            if (!id || newIds.has(id)) {
                continue;
            }
            newIds.delete(id);
            sold.remove();
        }

        if (!newIds.size) {
            button.remove();
        } else {
            reload();
        }
    });
}

export function ignoreUnwanted(): void {
    if (document.getElementById('need-swap-list')) {
        return;
    }

    const tables = document.querySelectorAll('table.swap-coin');
    for (const table of tables) {
        const rows = table.querySelectorAll<HTMLTableRowElement>('tr');
        for (const tr of rows) {
            const markedElement = tr.querySelector('td span[class^="marked-"]');
            const markedClass = markedElement && markedElement.classList.item(0);
            const myCond =
                (markedClass && ColorValues[+(markedClass.split('marked-').pop() || 0) as Color]) ||
                0;
            const condElement = getConditionCell(tr);
            const cond =
                (condElement && ConditionValues[condElement.textContent as Condition]) || 0;
            if (myCond && (!cond || cond <= myCond)) {
                tr.classList.add('ignore');
            }
        }
    }
}

export function removeRowHrefFromSwapList(): void {
    const swap = document.getElementById('swap-mgr');
    if (!swap) {
        return;
    }

    for (const row of swap.querySelectorAll('table.offer-list tr[data-href]')) {
        row.removeAttribute('data-href');
    }
}

// TODO add async load on filters and sorting
// TODO add a11y kbd navigation to filters
export function fixFilterLinks() {
    const tree = document.getElementById('tree');
    if (!tree) {
        return;
    }

    for (const a of tree.querySelectorAll<HTMLAnchorElement>('.filter-container .list-link')) {
        updateLinkHref(a);
    }

    for (const f of tree.querySelectorAll('.filter-container .filter-box-active')) {
        const name = f.getAttribute('id')?.replace(/-filter/, '');
        const div = f.querySelector<HTMLDivElement>('.close');
        if (name && div) {
            updateOnClickHref(div, [name === 'condition' ? 'cond' : name]);
        }
    }
}

export function expandUserInfo() {
    const swapInfo = document.getElementById('swap-info');
    if (!swapInfo) {
        return;
    }

    const button = document.getElementById('message');
    if (!button) {
        return;
    }

    const info = swapInfo.querySelector('.text');
    if (info) {
        button.insertAdjacentElement('beforebegin', info);
    }

    const message = swapInfo.querySelector('a.btn-s.btn-gray');
    if (message) {
        button.replaceWith(message);
    }
}
