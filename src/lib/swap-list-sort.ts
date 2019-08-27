import {ConditionValues} from './cond';
import {tt} from './utils';

const {location: loc} = document;

type SortOption = 'Year' | 'Facial value' | 'Condition' | 'Value' | 'Krause number';
type SortOrder = 'a' | 'd';
type SortField = 'year' | 'mm' | 'face' | 'cond' | 'value' | 'km' | 'kma' | 'kmc';
type SortFunction = (a: DOMStringMap, b: DOMStringMap, o: number) => number;

interface SortOptionParam {
    index: number;
    field: SortField;
    sort: SortFunction;
}

function num(s: string): number {
    return +(s.replace(/[^.\d]/g, ''));
}

function cmp<T = string | number>(a: T, b: T): number {
    return -(a < b) || +(a > b);
}

function cmpNum(a: DOMStringMap, b: DOMStringMap, field: SortField): number {
    const f = `sort${tt(field)}`;
    return cmp(num(a[f]), num(b[f]));
}

function cmpStr(a: DOMStringMap, b: DOMStringMap, field: SortField): number {
    const f = `sort${tt(field)}`;
    return cmp(a[f], b[f]);
}

function cmpYear(a: DOMStringMap, b: DOMStringMap, o: number = 1): number {
    return o * cmpNum(a, b, 'year')
        || cmpStr(a, b, 'mm');
}

function cmpKm(a: DOMStringMap, b: DOMStringMap, o: number = 1): number {
    return o * cmpStr(a, b, 'kmc')
        || o * cmpNum(a, b, 'km')
        || o * cmpStr(a, b, 'kma')
        || cmpYear(a, b, -1);
}

function cmpFace(a: DOMStringMap, b: DOMStringMap, o: number = 1): number {
    return o * cmpStr(a, b, 'face')
        || cmpKm(a, b, -1);
}

function cmpCond(a: DOMStringMap, b: DOMStringMap, o: number = 1): number {
    return o * cmpNum(a, b, 'cond')
        || cmpFace(a, b);
}

function cmpValue(a: DOMStringMap, b: DOMStringMap, o: number = 1): number {
    return o * cmpNum(a, b, 'value')
        || cmpCond(a, b, -1);
}

const sortOptionParams = new Map<SortOption, SortOptionParam>([
    ['Year', {index: 0, field: 'year', sort: cmpYear}],
    ['Facial value', {index: 1, field: 'face', sort: cmpFace}],
    ['Condition', {index: 3, field: 'cond', sort: cmpCond}],
    ['Value', {index: 4, field: 'value', sort: cmpValue}],
    ['Krause number', {index: 6, field: 'km', sort: cmpKm}],
]);

const sortOptions: SortOption[] = ['Year', 'Facial value', 'Condition', 'Value', 'Krause number'];

let currentOption: SortOption = 'Year';
let currentOrder: SortOrder = 'd';

function a(ord: SortOrder = 'a'): string {
    const arrClass = ord === 'a' ? 'at' : 'ab';
    return `<div class="right"><span class="arrow ${arrClass}"></span></div>`;
}

function d(ord: SortOrder = 'd'): string {
    return a(ord);
}

function o(opt: SortOption): string {
    return `<div class="left gray-13">${opt}</div>`;
}

function c(html: string): string {
    const template = document.createElement('template');
    template.innerHTML = html;

    const opt = template.content.querySelector<HTMLDivElement>('div.left');
    opt.classList.add('wrap');

    return template.innerHTML;
}

function sortBy(sections: NodeListOf<HTMLTableSectionElement>, option: SortOption, order: SortOrder): void {
    const ord = order === 'a' ? 1 : -1;
    const {sort} = sortOptionParams.get(option);
    for (const section of sections) {
        const rows = [...section.querySelectorAll('tr')];
        if (rows.length > 1) {
            rows.sort(({dataset: a}, {dataset: b}) => sort(a, b, ord));
            section.append(...rows);
        }
    }
}

function getActiveSortOption(): void {
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

function setActiveSortOption(option: SortOption, order: SortOrder): void {
    const parts = loc.hash.split(';');
    parts[1] = `${sortOptionParams.get(option).field}:${order}`;
    loc.hash = parts.join(';');
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

    const sections = swapList.querySelectorAll<HTMLTableSectionElement>('table.swap-coin tbody');
    if (!sections || !sections.length) {
        return;
    }

    // add sorting index to all rows
    const rows = swapList.querySelectorAll<HTMLTableRowElement>('table.swap-coin tbody tr');
    for (const row of rows) {
        const offset = row.querySelectorAll('td.ico-star').length;
        const c = row.querySelectorAll('td');
        const d = row.dataset;
        for (const [option, {index, field}] of sortOptionParams) {
            const name = `sort${tt(field)}`;
            const t = c[index + offset].textContent;
            if (option === 'Year') {
                const [year, ...mm] = t.split(/(?:\s|&nbsp;)+/);
                d[name] = year;
                d.sortMm = mm.join(' ');
            } else if (option === 'Condition') {
                d[name] = `${ConditionValues.get(t)}`;
            } else if (option === 'Krause number') {
                const m = t.match(/(?<cat>\w+)#\s*(?<prefix>[a-zA-Z]*)(?<num>\d+)(?<suffix>(?:\.\d+)?(?:[a-zA-Z]*))/i);
                if (m && m.groups) {
                    const {cat, num, prefix, suffix} = m.groups;
                    d.sortKmc = cat;
                    d[name] = num;
                    d.sortKma = `${prefix}${suffix}`;
                } else {
                    d.sortKmc = '';
                    d[name] = t;
                    d.sortKma = '';
                }
            } else {
                d[name] = t;
            }
        }
    }

    getActiveSortOption();
    sortBy(sections, currentOption, currentOrder);

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
        sortBy(sections, currentOption, currentOrder);
    });
}
