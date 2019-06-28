import {get} from './ajax';
import {randomDelay} from './delay';
import {tt} from './utils';

const {location: loc} = document;

export function addTrackingLinks() {
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
                next.innerHTML = `<a href="https://www.17track.net/en/track?nums=${text}" target="_blank">${text}</a>`;
            }
        }
    }
}

function setActiveSwapTab(tab: string) {
    const parts = loc.hash.split(';');
    parts[0] = tab;
    loc.hash = parts.join(';');
}

export function addOpenedTabsHandler(): void {
    const tabs = document.querySelectorAll<HTMLLIElement>('#swap-mgr > div.widerightCol > ul.region-list > li.region');

    const needTab = tabs.item(0);
    needTab.addEventListener('click', () => setActiveSwapTab('need'));

    const takeTab = tabs.item(1);
    takeTab.addEventListener('click', () => setActiveSwapTab('take'));

    if (loc.hash.startsWith('#take')) {
        takeTab.click();
    } else {
        needTab.click();
    }
}

export function duplicatePagination(): void {
    const swapList = <HTMLDivElement> document.getElementById('swap-list');
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

    let heading = <HTMLHeadingElement> table.previousElementSibling;
    if (!heading || !heading.matches('h2')) {
        return;
    }

    const parent = lastPages.parentElement;
    if (!parent) {
        return;
    }

    const clone = <HTMLDivElement> parent.cloneNode(true);
    clone.style.height = '30px';
    heading.insertAdjacentElement('beforebegin', clone);
}

export function addSortingOptions(): void {
    const swapList = <HTMLDivElement> document.getElementById('take-swap-list');
    if (!swapList) {
        return;
    }

    const leftControls = swapList.querySelector<HTMLDivElement>('div.left.action-board');
    if (!leftControls) {
        return;
    }

    type SortOption = 'Year' | 'Facial value' | 'Condition' | 'Value' | 'Krause number';
    type SortOrder = 'a' | 'd';
    type SortField = 'year' | 'mm' | 'face' | 'cond' | 'value' | 'km';

    type SortFunction = (a: DOMStringMap, b: DOMStringMap, o: number) => number;

    function cmp(a: string, b: string): number {
        return -(a < b) || +(a > b);
    }

    function cmpField(a: DOMStringMap, b: DOMStringMap, field: SortField): number {
        const f = `sort${tt(field)}`;
        return cmp(a[f], b[f]);
    }

    function cmpYear(a: DOMStringMap, b: DOMStringMap, o: number = 1): number {
        return o * cmpField(a, b, 'year')
            || cmpField(a, b, 'mm');
    }

    function cmpKm(a: DOMStringMap, b: DOMStringMap, o: number = 1): number {
        return o * cmpField(a, b, 'km')
            || cmpYear(a, b, -1);
    }

    function cmpFace(a: DOMStringMap, b: DOMStringMap, o: number = 1): number {
        return o * cmpField(a, b, 'face')
            || cmpKm(a, b, -1);
    }

    function cmpCond(a: DOMStringMap, b: DOMStringMap, o: number = 1): number {
        return o * cmpField(a, b, 'cond')
            || cmpFace(a, b);
    }

    function cmpValue(a: DOMStringMap, b: DOMStringMap, o: number = 1): number {
        return o * cmpField(a, b, 'value')
            || cmpCond(a, b, -1);
    }

    const sortOptionParams = new Map<SortOption, { index: number, field: SortField, sort: SortFunction }>([
        ['Year', {index: 0, field: 'year', sort: cmpYear}],
        ['Facial value', {index: 1, field: 'face', sort: cmpFace}],
        ['Condition', {index: 3, field: 'cond', sort: cmpCond}],
        ['Value', {index: 4, field: 'value', sort: cmpValue}],
        ['Krause number', {index: 6, field: 'km', sort: cmpKm}],
    ]);


    function a(ord: SortOrder = 'a') {
        const arrClass = ord === 'a' ? 'at' : 'ab';
        return `<div class="right"><span class="arrow ${arrClass}"></span></div>`;
    }

    function d(ord: SortOrder = 'd') {
        return a(ord);
    }

    function o(opt: SortOption) {
        return `<div class="left gray-13">${opt}</div>`;
    }

    function c(html: string) {
        const template = document.createElement('template');
        template.innerHTML = html;

        const opt = template.content.querySelector<HTMLDivElement>('div.left');
        opt.classList.add('wrap');

        return template.innerHTML;
    }

    // add sorting index to all rows
    const rows = document.querySelectorAll<HTMLTableRowElement>('table.swap-coin tbody tr');
    for (const row of rows) {
        const c = row.querySelectorAll('td');
        const d = row.dataset;
        for (const [option, {index, field}] of sortOptionParams) {
            const name = `sort${tt(field)}`;
            const t = c[index].textContent;
            if (option === 'Year') {
                const [year, ...mm] = t.split(/(?:\s|&nbsp;)+/);
                d[name] = year;
                d.sortMm = mm.join(' ');
            } else if (option === 'Condition') {
                d[name] = `${CM.get(t)}`;
            } else {
                d[name] = t;
            }
        }
    }

    function sortBy(option: SortOption, order: SortOrder) {
        const ord = order === 'a' ? 1 : -1;
        const {sort} = sortOptionParams.get(option);
        const sections = document.querySelectorAll<HTMLTableSectionElement>('table.swap-coin tbody');
        for (const section of sections) {
            const rows = [...section.querySelectorAll('tr')];
            if (rows.length > 1) {
                rows.sort(({dataset: a}, {dataset: b}) => sort(a, b, ord));
                section.append(...rows);
            }
        }
    }

    const sortOptions: SortOption[] = ['Year', 'Facial value', 'Condition', 'Value', 'Krause number'];

    let currentOption: SortOption = 'Year';
    let currentOrder: SortOrder = 'd';
    getActiveSortOption();
    sortBy(currentOption, currentOrder);

    function getActiveSortOption() {
        const parts = loc.hash.split(';');
        if (parts[1]) {
            const [field = 'year', order = 'd'] = parts[1].split(':');
            currentOrder = <SortOrder> order;
            for (const [option, {field: f}] of sortOptionParams.entries()) {
                if (f === field) {
                    currentOption = option;
                }
            }
        }
    }

    function setActiveSortOption(option: SortOption, order: SortOrder) {
        const parts = loc.hash.split(';');
        parts[0] = parts[0];
        parts[1] = `${sortOptionParams.get(option).field}:${order}`;
        loc.hash = parts.join(';');
    }

    leftControls.removeAttribute('style');
    leftControls.insertAdjacentHTML('afterend', `
        <div class="right filter-container">
            <div class="filter-box" id="sort-filter">
                ${c(`${o(currentOption)}${a(currentOrder)}`)}
            </div>
            <div class="drop hide filter-dialog" id="sort-filter-dialog">
            ${sortOptions.map(opt => `
                <a class="list-link" data-option="${opt}" data-order="a">${o(opt)}${a()}</a>
                <a class="list-link" data-option="${opt}" data-order="d">${o(opt)}${d()}</a>
            `).join('')}
            </div>
        </div>
    `);

    const sortFilter = swapList.querySelector<HTMLDivElement>('#sort-filter');
    const sortDialog = swapList.querySelector<HTMLDivElement>('#sort-filter-dialog');

    sortFilter.addEventListener('click', e => {
        e.stopPropagation();
        sortDialog.style.display = 'block';
    });

    sortDialog.addEventListener('click', e => {
        e.stopPropagation();
        sortDialog.style.display = 'none';

        const a = (<HTMLElement> e.target).closest('a');
        if (!a) {
            return;
        }

        sortFilter.innerHTML = c(a.innerHTML);

        const {option, order} = a.dataset;
        currentOption = <SortOption> option;
        currentOrder = <SortOrder> order;
        setActiveSortOption(currentOption, currentOrder);
        sortBy(currentOption, currentOrder);
    });
}

export function showAllPrices() {
    const swapRows = document.querySelectorAll<HTMLTableRowElement>('table.swap-coin tr');
    for (const tr of swapRows) {
        const td = tr.querySelector('.td-cond + *');
        const myPrice = +td.querySelector('span.blue-13').textContent;
        const prefix = td.querySelector('span.gray-11:first-child').textContent;
        const suffix = td.querySelector('span.gray-11:last-child').textContent;
        const tooltipPrice = tr.dataset.tooltipPrice;
        if (tooltipPrice) {
            const price = +tooltipPrice.replace(prefix, '').replace(suffix, '');
            if (!isNaN(price) && myPrice !== price) {
                td.insertAdjacentHTML('beforeend', `<br/><span class="gray-11">${prefix}${price.toFixed(2)}${suffix}</span>`);
            }
        }
    }
}

export function addConflictHandling() {
    highlightConflicts();

    const checkboxes = document.querySelectorAll<HTMLInputElement>('#swap-list table.swap-coin input.swap-checkbox');
    for (const checkbox of checkboxes) {
        checkbox.addEventListener('click', function () {
            if (!this.checked) {
                const row = this.closest('tr');
                if (row) {
                    row.classList.remove('conflict');
                }
            }
            highlightConflicts();
        });
    }

    const countryCheckboxes = document.querySelectorAll<HTMLInputElement>('#swap-list h2 input.swap-country-checkbox');
    for (const checkbox of countryCheckboxes) {
        checkbox.addEventListener('click', function () {
            if (!this.checked) {
                const country = this.closest('h2');
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

type TooltipDataset = {
    tooltipImgpath: string;
    tooltipCode: string;
    tooltipName: string;
    tooltipSubject: string;
    tooltipVariety: string;
    tooltipKm: string;
    tooltipPrice: string;
};

function highlightConflicts() {
    const needSwapList = !!document.getElementById('need-swap-list');
    const tables = document.querySelectorAll('#swap-list table.swap-coin');
    for (const table of tables) {
        let rows = [...table.querySelectorAll('tr')];
        const checked = rows.filter((r: HTMLTableRowElement) => {
            if (r.querySelector('input.swap-checkbox:checked')) {
                return true;
            }
            r.classList.remove('conflict');
        });
        const heading = <HTMLHeadingElement> table.previousElementSibling;
        if (heading.tagName.toLowerCase() === 'h2') {
            const all = heading.querySelector<HTMLInputElement>('input.swap-country-checkbox, input.edit-country-checkbox');
            all.checked = checked.length === rows.length;
        }
        if (!needSwapList) {
            rows = checked;
        }

        for (const r of rows) {
            const data = r.dataset;
            const {tooltipName, tooltipSubject, tooltipVariety, tooltipKm} = <TooltipDataset> {...data};
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
                rows = rows.filter(r => !!r.querySelector('input.swap-checkbox:checked'));
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
            actionBoard.insertAdjacentHTML('beforeend', `<a class="btn-s btn-gray ico-del" id="${delAllButtonId}" style="float: right;"><div class="ico-16"></div></a>`);
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

                    const {href} = sold.querySelector<HTMLAnchorElement>('a.act');
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
            const rows = table.querySelectorAll<HTMLTableRowElement>('tr');
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
