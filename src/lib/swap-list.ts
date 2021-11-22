import { countryRegions, getCountryId, separateCountries } from '../data/countries';
import { Europe, PayPal_Europe, PayPal_UK } from '../data/regions';
import { get } from './ajax';
import { Color, ColorValues, Condition, ConditionValues } from './cond';
import { randomDelay } from './delay';
import { getPriceByConditions } from './prices';
import { UID } from './uid';
import { getHashParam, updateLocationHash } from './url';
import { cancel, scrollIntoView } from './utils';

export function addSwapTitle() {
    const title = [...document.querySelectorAll('#swap-mgr div.leftCol > div.user-info > .wrap')]
        .map((e) => e.textContent)
        .join(' / ');
    if (title) {
        document.title = `${title} - ${document.title}`;
    }
}

export function addThumbnails(): void {
    for (const row of document.querySelectorAll<HTMLTableRowElement>('table.swap-coin tr')) {
        const { tooltipImgpath, tooltipSample, tooltipCode } = row.dataset;
        row.querySelector('td')?.insertAdjacentHTML(
            row.querySelector('div.reserve') || document.body.id === 'swap-list' ? 'beforebegin' : 'afterend',
            `
            <th style='width: 100px' class='thumbnails'>
                ${
                    tooltipImgpath && tooltipSample && tooltipCode
                        ? `
                    <img src='${tooltipImgpath}/${tooltipSample}-1c/${tooltipCode}.jpg' class='thumbnail' loading='lazy' alt='obverse'/>
                    <img src='${tooltipImgpath}/${tooltipSample}-2c/${tooltipCode}.jpg' class='thumbnail' loading='lazy' alt='reverse'/>
                `
                        : ''
                }
            </th>
        `
        );
    }
}

export function markSeparateCountries(): void {
    for (const list of document.querySelectorAll<HTMLHeadingElement>('#swap-list, #take-swap-list')) {
        for (const h2 of list.querySelectorAll<HTMLHeadingElement>('h2')) {
            if (separateCountries.includes(h2.id)) {
                h2.classList.add('separate-country');
            }
        }
        for (const a of list.querySelectorAll<HTMLHeadingElement>('table.swap-coin td a.dgray-13')) {
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
                next.innerHTML = `<a href='https://www.17track.net/en/track?nums=${text}' target='_blank'>${text}</a>`;
            }
        }
    }
}

export function calcTotalPrices(): void {
    const tree = document.querySelector('#swap-mgr #tree');
    if (tree) {
        const prices = tree.querySelectorAll(
            '.region.list-link + .region .right, .region.list-link + .swap-reserve + .region .right'
        );
        const lists = document.querySelectorAll('.swap-list');
        for (const [i, priceSection] of prices.entries()) {
            const price = priceSection.querySelector('span:not(.lgray-11)');
            if (!price) {
                continue;
            }
            const priceCells = lists[i].querySelectorAll('tr:not(.del) .td-price');
            let sum = 0;
            for (const priceCell of priceCells) {
                let currentPrice = priceCell.querySelector('.gray-11.price-tooltip');
                if (!currentPrice) {
                    currentPrice = priceCell.querySelector('.blue-13');
                }
                if (!currentPrice) {
                    continue;
                }
                let p = currentPrice.textContent!;
                const suffixes = currentPrice!.parentElement!.querySelectorAll('.gray-11');
                for (const s of suffixes) {
                    if (s !== currentPrice) {
                        p = p.replace(s.textContent!, '');
                    }
                }
                sum += +p;
            }
            price.classList.add('blue-13');
            const currentPrice = +(price.textContent || 0);
            const diff = currentPrice - sum;
            price.parentElement?.insertAdjacentHTML(
                'beforeend',
                `
                <span class='lgray-11 price-tooltip'>
                    ${price.previousElementSibling?.textContent}
                    ${sum.toFixed(2)}
                    ${price.nextElementSibling?.textContent}
                </span>
                ${
                    diff
                        ? `
                        <span class='lgray-11 price-tooltip ${
                            (i ? diff < 0 : diff > 0) ? 'price-over' : 'price-under'
                        }'>
                            ${diff > 0 ? '+' : '&minus;'}
                            ${price.previousElementSibling?.textContent}
                            ${Math.abs(diff).toFixed(2)}
                            ${price.nextElementSibling?.textContent}
                        </span>
                        `
                        : ''
                }
                `
            );
            price.parentElement?.parentElement?.classList.add(diff ? 'price-triple' : 'price-double');

            if (i) {
                const weightLine = price.closest('a.region')?.nextElementSibling;
                const weight = +(weightLine?.querySelector('.right')?.textContent || 0);
                const country = getCountryId(tree.previousElementSibling?.querySelector('.gray-11')?.textContent || '');
                const shippingPrice = getShippingPrice(country, weight);
                const totalPrice = currentPrice + shippingPrice;
                const [paypalPrice, paypalDescription] = getPayPalPrice(country, totalPrice);

                weightLine?.insertAdjacentHTML(
                    'afterend',
                    `
                    <a class='region price-line'>
                        <div class='left lgray-11'>Shipping</div>
                        <div class='right gray-11'>€ ${shippingPrice.toFixed(2)}</div>
                    </a>
                    <a class='region price-line'>
                        <div class='left lgray-11'>Total</div>
                        <div class='right gray-11'>€ ${totalPrice.toFixed(2)}</div>
                    </a>
                    <a class='region price-line price-double'>
                        <div class='left lgray-11'>PayPal</div>
                        <div class='right gray-11'>€ ${paypalPrice.toFixed(2)}</div>
                        <div class='right lgray-11'>${paypalDescription}</div>
                    </a>
                    `
                );
            }
        }
    }
}

function getShippingPrice(country: string, weight: number): number {
    if (country === 'lithuania') {
        if (weight <= 450) {
            return 1.5;
        }
        if (weight <= 900) {
            return 2;
        }
        if (weight <= 1900) {
            return 2.5;
        }
        return 5;
    }

    if (countryRegions[country].includes(Europe)) {
        if (weight <= 450) {
            return 4.5;
        }
        if (weight <= 900) {
            return 7.5;
        }
        if (weight <= 1900) {
            return 10;
        }
        if (weight <= 2900) {
            return 20;
        }
        if (weight <= 5500) {
            return 25;
        }
        if (weight <= 8500) {
            return 30;
        }
        return 50;
    }

    if (weight <= 450) {
        return 5.5;
    }
    if (weight <= 900) {
        return 10;
    }
    if (weight <= 1900) {
        return 15;
    }
    if (weight <= 2900) {
        return 40;
    }
    if (weight <= 3800) {
        return 50;
    }
    if (weight <= 4700) {
        return 60;
    }
    if (weight <= 5500) {
        return 70;
    }
    if (weight <= 6500) {
        return 80;
    }
    if (weight <= 7500) {
        return 90;
    }
    if (weight <= 8500) {
        return 100;
    }
    return 150;
}

function getPayPalPrice(country: string, price: number): [number, string] {
    let percents = 3.4;
    let fixed = 0.35;

    if (countryRegions[country].includes(PayPal_UK)) {
        percents += 1.29;
    } else if (!countryRegions[country].includes(PayPal_Europe)) {
        percents += 1.99;
    }

    return [
        price * (1 + percents / 100) + fixed,
        `${price.toFixed(2)} + ${percents.toFixed(2)}% + ${fixed.toFixed(2)}`,
    ];
}

const TAB_PARAM = 't';
const TAB_TAKE = 'take';
const TAB_NEED = 'need';

async function setActiveSwapTab(tab: string) {
    await updateLocationHash((params) => params.set(TAB_PARAM, tab));
}

export function addOpenedTabsHandler(): void {
    const [needTab, takeTab] = document.querySelectorAll<HTMLLIElement>(
        `#swap-mgr div.widerightCol > ul.region-list > li.region`
    );
    const get = document.querySelector('#tree a.list-link:not([href]):first-child .right')?.textContent || '0';
    const [, status] =
        document
            .querySelector('#tree .user-info + div span[class^="swap-status"]')
            ?.className.match(/swap-status(\d+)/) || [];
    console.info(get, status);
    let currentTab = getHashParam(TAB_PARAM) || (get === '0' || status === '1' || status === '2' ? TAB_TAKE : TAB_NEED);
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

const INVALID_PRICE_CLASS = 'price-invalid';

function updatePriceCol(tr: HTMLTableRowElement, newPrice?: string) {
    const tdCond = tr.querySelector('.td-cond');
    if (!tdCond) {
        return;
    }

    const td = tdCond.nextElementSibling as HTMLTableCellElement;
    if (!td) {
        return;
    }

    td.classList.add('td-price');
    let cond = (tdCond.querySelector('span.txt')?.textContent || tdCond.textContent) as Condition;
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
        let percent;
        if (rel >= 2) {
            percent = `<span class='gray-11 price-times' data-price-percent>&times;${rel
                .toFixed(rel >= 10 ? 0 : 1)
                .replace('.0', '')}</span>`;
            myPriceElement.classList.add('price-times');
        } else {
            const prel = (rel - 1) * 100;
            if (prel >= 50) {
                percent = `<span class='gray-11 price-times' data-price-percent>+${prel.toFixed()}%</span>`;
            } else if (prel >= 0) {
                percent = `<span class='gray-11 price-over' data-price-percent>+${prel.toFixed()}%</span>`;
            } else {
                percent = `<span class='gray-11 price-under' data-price-percent>&minus;${Math.abs(
                    prel
                ).toFixed()}%</span>`;
            }
        }
        td.insertAdjacentHTML(
            'beforeend',
            `${percent}<span class='gray-11 price-tooltip' data-price-tooltip>${prefix}${price.toFixed(
                2
            )}${suffix}</span>`
        );
    }
    if (location.href.includes(`?uid=${UID}`)) {
        if (!tr.querySelector<HTMLAnchorElement>(`th a[title*="."]`)) {
            let plus = 0;
            const condTitle = cond === Condition.UNC ? Condition.AU : cond;
            const title = tr.querySelector<HTMLAnchorElement>(`th a[title^="${condTitle}"]`)?.title;
            if (cond === Condition.UNC) {
                if (title?.startsWith('AU')) {
                    cond = Condition.AU;
                }
            } else {
                if (title) {
                    plus = [...title].filter((c) => c === '+').length;
                    if (cond === Condition.XF) {
                        cond = Condition.XF_;
                        plus--;
                    } else if (cond === Condition.VF) {
                        cond = Condition.VF_;
                        plus--;
                    }
                }
            }
            const year = tr.querySelector('td')?.childNodes?.[0]?.textContent;
            const condPrice = getPriceByConditions(price, cond as Condition, year, plus);
            if (myPrice && condPrice && myPrice !== +condPrice) {
                tr.classList.add(INVALID_PRICE_CLASS);
                tr.dataset.condPrice = condPrice;
                td.insertAdjacentHTML(
                    'beforeend',
                    `<span class='gray-11 price-cond' data-price-cond>${prefix}${condPrice}${suffix}</span>`
                );
            }
        }
    }
}

export function showAllPrices(): void {
    const swapRows = document.querySelectorAll<HTMLTableRowElement>('table.swap-coin tr');
    for (const tr of swapRows) {
        updatePriceCol(tr);
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

        for (const r of rows) {
            const data = r.dataset as TooltipDataset;
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

    const countryCheckboxes = document.querySelectorAll<HTMLInputElement>('#swap-list h2 input.swap-country-checkbox');
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

            const a = sold.querySelector<HTMLAnchorElement>('a.act');
            a && (await get(a.href));

            const tree = document.getElementById('tree');
            const soldCountElement = tree?.querySelector('a.region.list-link div.right.blue-13 sup');
            if (soldCountElement) {
                if (--soldCount) {
                    soldCountElement.textContent = `&nbsp;-${soldCount}`;
                } else {
                    soldCountElement.remove();
                }
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
                const myCond = (markedClass && ColorValues[+(markedClass.split('marked-').pop() || 0) as Color]) || 0;
                const condElement = tr.querySelector('td.td-cond');
                const cond = (condElement && ConditionValues[condElement.textContent as Condition]) || 0;
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

export async function addPriceUpdateButton() {
    let continueCheckbox: HTMLInputElement | null;
    const page = document.getElementById('swap-list');
    if (!page) {
        return;
    }

    const link = page.querySelector<HTMLAnchorElement>('a.ico-ref');
    if (!link) {
        return;
    }

    link.href = '#';
    link.classList.remove('ico-ref');
    link.addEventListener('click', (e) => {
        cancel(e);
        updatePrices();
    });
    updateIcon();

    continueCheckbox = link.parentElement!.querySelector('#continue');
    if (continueCheckbox) {
        return;
    }

    const checked = location.hash?.includes('update-prices');
    link.insertAdjacentHTML(
        'afterend',
        `
        <label class='btn-s'>
            <input type='checkbox' id='continue' ${checked ? `checked='checked'` : ''} />
            Continue update on next page
        </label>
        `
    );
    continueCheckbox = link.parentElement!.querySelector('#continue');
    if (checked) {
        await randomDelay(2000, 3000);
        await updatePrices();
    }

    function updateIcon() {
        const icon = link?.querySelector('div.ico-16');
        if (icon) {
            const hasCondPrices = !!page!.querySelectorAll<HTMLTableRowElement>('table.swap-coin tr[data-cond-price]')
                ?.length;
            icon.classList.toggle('ico-16-swap1', hasCondPrices);
            icon.classList.toggle('ico-16-check1', !hasCondPrices);
        }
    }

    async function updatePrices() {
        const rows = page!.querySelectorAll<HTMLTableRowElement>('table.swap-coin tr');
        let first = true;
        for (const row of rows) {
            const condPrice = row.dataset.condPrice;
            if (condPrice) {
                const usid = row.id.substr(4);
                const cond = row.querySelector<HTMLSelectElement>(`#cond-${usid}`)?.value || '';
                const qty = row.querySelector<HTMLInputElement>(`#qty-${usid}`)?.value || '';
                const url = new URL('/swap-list/', location.href);
                url.searchParams.set('single-edit', '1');
                url.searchParams.set('usid', usid);
                url.searchParams.set('cond', cond);
                url.searchParams.set('price', condPrice);
                url.searchParams.set('qty', qty);
                console.debug('UPDATE', url.href);

                scrollIntoView(row);
                if (first) {
                    first = false;
                } else {
                    await randomDelay(2000, 3000);
                }
                try {
                    const response = await fetch(url.href);
                    if (!response.ok) {
                        console.error(`Response was not OK:\n${JSON.stringify(response, null, 4)}`);
                        await randomDelay(2000, 3000);
                        location.reload();
                        return;
                    }
                } catch (e) {
                    console.error(e);
                    await randomDelay(2000, 3000);
                    location.reload();
                    return;
                }

                delete row.dataset.condPrice;
                row.classList.remove(INVALID_PRICE_CLASS);
                updatePriceCol(row, condPrice);
            }
        }
        updateIcon();

        if (!continueCheckbox?.checked) {
            scrollIntoView(link!);
            return;
        }

        const currentPageElement = page!.querySelector<HTMLAnchorElement>('#swap-list div.pages a.current');
        if (currentPageElement) {
            const nextPage = +(currentPageElement.textContent || 0) + 1;
            const nextPageElement = page!.querySelector<HTMLAnchorElement>(
                `#swap-list div.pages a[href$="&page=${nextPage}"]`
            );
            if (nextPageElement) {
                nextPageElement.href = `${nextPageElement.href}#update-prices`;
                await randomDelay(5000, 5000);
                nextPageElement.click();
                return;
            }
            const firstPageElement = page!.querySelector<HTMLAnchorElement>(`#swap-list div.pages a:first-child`);
            if (firstPageElement && !firstPageElement?.classList.contains('current')) {
                await randomDelay(5000, 5000);
                firstPageElement.click();
                return;
            }
        }
    }
}
