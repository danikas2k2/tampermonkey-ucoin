import { ConditionValues } from './cond';
import { Filter, FilterOptions, FilterProps, renderFilter, renderFilters } from './filters';
import { getHashParam, updateLocationHash } from './url';
import { cancel, tt } from './utils';

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
    return +s.replace(/[^.\d]/g, '');
}

export function cmp<T = string | number>(a: T, b: T): number {
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

function cmpYear(a: DOMStringMap, b: DOMStringMap, o = 1): number {
    return o * cmpNum(a, b, 'year') || o * cmpStr(a, b, 'mm');
}

function cmpKm(a: DOMStringMap, b: DOMStringMap, o = 1): number {
    return o * cmpStr(a, b, 'kmc') || o * cmpNum(a, b, 'km') || o * cmpStr(a, b, 'kma') || o * cmpYear(a, b);
}

function cmpFace(a: DOMStringMap, b: DOMStringMap, o = 1): number {
    return o * cmpStr(a, b, 'face') || o * cmpKm(a, b, -1);
}

function cmpCond(a: DOMStringMap, b: DOMStringMap, o = 1): number {
    return o * cmpNum(a, b, 'cond') || cmpFace(a, b);
}

function cmpValue(a: DOMStringMap, b: DOMStringMap, o = 1): number {
    return o * cmpNum(a, b, 'value') || cmpCond(a, b, -1);
}

const sortOptionParams = new Map<SortOption, SortOptionParam>([
    ['Year', { index: 0, field: 'year', sort: cmpYear }],
    ['Facial value', { index: 1, field: 'face', sort: cmpFace }],
    ['Condition', { index: 3, field: 'cond', sort: cmpCond }],
    ['Value', { index: 4, field: 'value', sort: cmpValue }],
    ['Krause number', { index: 6, field: 'km', sort: cmpKm }],
]);

const sortOptions: SortOption[] = ['Year', 'Facial value', 'Condition', 'Value', 'Krause number'];

let currentOption: SortOption = 'Year';
let currentOrder: SortOrder = 'd';

function x(name: string): string {
    return `<div class='right close' title='Clear filter' data-filter-clear='${name}'>×</div>`;
}

function a(ord = 'a'): string {
    const arrClass = ord === 'a' ? 'at' : 'ab';
    return `<div class='right'><span class='arrow ${arrClass}'></span></div>`;
}

function d(ord = 'd'): string {
    return a(ord);
}

function o(opt: string): string {
    return `<div class='left gray-13'>${opt}</div>`;
}

function c(html: string): string {
    const template = document.createElement('template');
    template.innerHTML = html;

    const opt = template.content.querySelector<HTMLDivElement>('div.left');
    opt?.classList.add('wrap');

    return template.innerHTML;
}

function sortBy(sections: NodeListOf<HTMLTableSectionElement>, option: SortOption, order: SortOrder): void {
    const ord = order === 'a' ? 1 : -1;
    const { sort } = sortOptionParams.get(option);
    for (const section of sections) {
        const rows = [...section.querySelectorAll('tr')];
        if (rows.length > 1) {
            rows.sort(({ dataset: a }, { dataset: b }) => sort(a, b, ord));
            section.append(...rows);
        }
    }
}

const ORDER_PARAM = 'o';
const ORDER_SEPARATOR = '_';

function getActiveSortOption(): void {
    const o = getHashParam(ORDER_PARAM);
    const [field = 'year', order = 'd'] = o?.split(ORDER_SEPARATOR) || [];
    currentOrder = <SortOrder>order;
    for (const [option, { field: f }] of sortOptionParams.entries()) {
        if (f === field) {
            currentOption = option;
        }
    }
}

function setActiveSortOption(option: SortOption, order: SortOrder): void {
    updateLocationHash((params) => {
        params.set(ORDER_PARAM, `${sortOptionParams.get(option).field}${ORDER_SEPARATOR}${order}`);
    });
}

function dropdown(id: string, selected: string, options: string[]) {
    return `
    <div class='right filter-container'>
        <div class='filter-box' id='${id}'>
            ${c(selected)}
        </div>
        <div class='drop hide filter-dialog' id='${id}-dialog'>
            ${options.join('')}
        </div>
    </div>
`;
}

export function addSortingOptions(): void {
    const swapList = <HTMLDivElement>document.getElementById('take-swap-list');
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
        for (const [option, { index, field }] of sortOptionParams) {
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
                    const {
                        0: full,
                        groups: { cat, num, prefix, suffix },
                    } = m;
                    d.sortKmc = cat;
                    d[name] = num;
                    d.sortKma = `${prefix}${suffix}`;
                    d.sortKmz = t;
                } else {
                    d.sortKmc = '';
                    d[name] = t;
                    d.sortKma = '';
                    d.sortKmz = t;
                }
            } else {
                d[name] = t;
            }
        }
    }

    getActiveSortOption();
    sortBy(sections, currentOption, currentOrder);

    leftControls.removeAttribute('style');
    leftControls.insertAdjacentHTML(
        'afterend',
        dropdown(
            'sort-filter',
            `${o(currentOption)}${a(currentOrder)}`,
            sortOptions.map(
                (opt) => `
            <a class='list-link' data-option='${opt}' data-order='a'>${o(opt)}${a()}</a>
            <a class='list-link' data-option='${opt}' data-order='d'>${o(opt)}${d()}</a>
        `
            )
        )
    );

    const sortFilter = swapList.querySelector<HTMLDivElement>('#sort-filter');
    const sortDialog = swapList.querySelector<HTMLDivElement>('#sort-filter-dialog');

    sortFilter.addEventListener('click', (e) => {
        e.stopPropagation();
        sortDialog.style.display = 'block';
    });

    sortDialog.addEventListener('click', (e) => {
        e.stopPropagation();
        sortDialog.style.display = 'none';

        const a = (<HTMLElement>e.target).closest('a');
        if (!a) {
            return;
        }

        sortFilter.innerHTML = c(a.innerHTML);

        const { option, order } = a.dataset;
        currentOption = <SortOption>option;
        currentOrder = <SortOrder>order;
        setActiveSortOption(currentOption, currentOrder);
        sortBy(sections, currentOption, currentOrder);
    });
}

export function addFilteringOptions(): void {
    const swapList = <HTMLDivElement>document.getElementById('take-swap-list');
    if (!swapList) {
        return;
    }

    const dataList = <HTMLDivElement>swapList.lastElementChild;
    if (!dataList) {
        return;
    }

    function sort(data: FilterOptions, cmp?: (a: string, b: string) => number): FilterOptions {
        return [...data.keys()].sort(cmp).reduce((r: FilterOptions, k) => {
            r.set(k, data.get(k));
            return r;
        }, new Map());
    }

    // TODO add number of available results for every filter option
    // TODO disable unavailable/hidden filter options or event whole filter for single option
    // TODO render filters on the fly
    // TODO add more advance filter dialogs for years (columns, ranges), values (columns, ranges), km (columns, masks)

    const filterProps = new Map<Filter, FilterProps>();

    const countryHeadings = swapList.querySelectorAll('h2');
    filterProps.set(Filter.COUNTRY, {
        placeholder: 'Country',
        width: 250,
        options: sort(
            [...countryHeadings].reduce((r: FilterOptions, h) => {
                const hc = h.cloneNode(true) as HTMLHeadingElement;
                for (const el of hc.querySelectorAll('input, sup')) {
                    el.remove();
                }
                r.set(hc.id, hc.innerHTML);
                return r;
            }, new Map())
        ),
    });

    filterProps.set(Filter.YEAR, {
        placeholder: 'Year',
        width: 90,
        options: sort(
            [...swapList.querySelectorAll<HTMLTableRowElement>('tr[data-sort-year]')].reduce((r: FilterOptions, o) => {
                const y = o.dataset.sortYear;
                r.set(y, y);
                return r;
            }, new Map()),
            (a, b) => cmp(num(b), num(a))
        ),
    });

    filterProps.set(Filter.VALUE, {
        placeholder: 'Face value',
        width: 110,
        options: sort(
            [...swapList.querySelectorAll<HTMLTableRowElement>('tr[data-sort-face]')].reduce((r: FilterOptions, o) => {
                const f = o.dataset.sortFace;
                const [v] = f.split(' ');
                r.set(v, v);
                return r;
            }, new Map()),
            (a, b) => cmp(num(a), num(b))
        ),
    });

    const kmMatch = /([a-z]*)([0-9]*)((?:\.[0-9]+)?[a-z]*)/i;

    filterProps.set(Filter.KM, {
        placeholder: 'KM#',
        width: 110,
        options: sort(
            [...swapList.querySelectorAll<HTMLTableRowElement>('tr[data-sort-km]')].reduce((r: FilterOptions, o) => {
                const { sortKmc: c = '', sortKm: k = '', sortKma: a = '' } = o.dataset;
                const v = `${c.toLowerCase()}${k}${a}`;
                if (v) {
                    r.set(v, `${c}# ${k}${a}`);
                }
                return r;
            }, new Map()),
            (a, b) => {
                const [, ac, ak, aa] = a.match(kmMatch);
                const [, bc, bk, ba] = b.match(kmMatch);
                return cmp(ac, bc) || cmp(num(ak), num(bk)) || cmp(aa, ba);
            }
        ),
    });

    const filterNames = Object.values(Filter);
    const filterValues = new Map<Filter, string>();
    for (const filter of filterNames) {
        const value = getHashParam(filter);
        if (value) {
            filterValues.set(filter, value);
            filterProps.get(filter).value = value;
        }
    }

    dataList.insertAdjacentHTML('beforebegin', renderFilters(filterProps));

    function applyFilters() {
        for (const h of countryHeadings) {
            const t = h.nextElementSibling as HTMLTableElement;
            const rows = t.querySelectorAll('tr');

            let hasVisibleRows = false;

            rowLoop:
            for (const r of rows) {
                const d = r.dataset;
                for (const [filter, value] of filterValues) {
                    switch (filter) {
                        case Filter.COUNTRY:
                            if (h.id !== value) {
                                hasVisibleRows = false;
                                break rowLoop;
                            }
                            break;

                        case Filter.YEAR:
                            if (d.sortYear !== value) {
                                r.style.display = 'none';
                                continue rowLoop;
                            }
                            break;

                        case Filter.VALUE:
                            if (!d.sortFace.startsWith(`${value} `)) {
                                r.style.display = 'none';
                                continue rowLoop;
                            }
                            break;

                        case Filter.KM:
                            const [, c, k, a] = value.match(kmMatch);
                            if (d.sortKmc.toLowerCase() !== c || d.sortKm !== k || d.sortKma !== a) {
                                r.style.display = 'none';
                                continue rowLoop;
                            }
                            break;
                    }
                }

                // no filter applied
                r.style.display = '';
                hasVisibleRows = true;
            }

            h.style.display = t.style.display = hasVisibleRows ? '' : 'none';
        }
    }
    applyFilters();

    document.querySelectorAll<HTMLElement>('[data-filter-by]').forEach((option) =>
        option.addEventListener('click', (e) => {
            const ds = option.dataset;
            const filter = ds.filterBy as Filter;
            const value = ds.filterValue;
            updateLocationHash((params) =>
                value
                    ? params.set(filter, value)
                    : params.delete(filter)
            );

            const display = document.querySelector<HTMLElement>(`[data-filter="${filter}"]`);
            if (value) {
                display.innerHTML = `${c(option.innerHTML)}${x(filter)}`;
                display.classList.add('filter-box-active');
            } else {
                display.innerHTML = `${c(display.dataset.filterPlaceholder)}${d()}`;
                display.classList.remove('filter-box-active');
            }

            value ? filterValues.set(filter as Filter, value) : filterValues.delete(filter as Filter);
            applyFilters();
        })
    );

    document.querySelectorAll<HTMLElement>('[data-filter]').forEach((display) =>
        display.addEventListener('click', (e) => {
            cancel(e);
            const ds = display.dataset;
            if (ds.filterDisabled != null) {
                return;
            }

            let clearClicked = false;
            const button = e.target as HTMLElement;
            const filter = ds.filter as Filter;
            if (button.matches('[data-filter-clear]')) {
                clearClicked = true;
                updateLocationHash((params) => params.delete(button.dataset.filterClear));
                display.innerHTML = `${c(ds.filterPlaceholder)}${d()}`;
                display.classList.remove('filter-box-active');
                filterValues.delete(filter);
                applyFilters();
            }

            document.querySelectorAll<HTMLElement>(`[data-filter-dialog]`).forEach((dialog) => {
                dialog.style.display =
                    !clearClicked &&
                    dialog.dataset.filterDialog === filter &&
                    dialog.style.display !== 'block'
                        ? 'block'
                        : 'none';
            });
        })
    );

    document.querySelectorAll<HTMLElement>('[data-filter-dialog]').forEach((dialog) =>
        dialog.addEventListener('click', (e) => {
            cancel(e);
            dialog.style.display = 'none';
        })
    );

    const filters = swapList.querySelectorAll<HTMLInputElement>('.filter');
    for (const filter of filters) {
        filter.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            const id = target.id;
            const value = target.value;
            const name = `sort${tt(id)}`;
            const rows = swapList.querySelectorAll<HTMLTableRowElement>('tbody > tr');
            for (const row of rows) {
                const d = row.dataset;
                row.style.display = !value || d[name].includes(value) ? '' : 'none';
            }
        });
    }

    const sections = swapList.querySelectorAll<HTMLTableSectionElement>('table.swap-coin tbody');
    if (!sections || !sections.length) {
        return;
    }

    // add sorting index to all rows
    // const rows = swapList.querySelectorAll<HTMLTableRowElement>('table.swap-coin tbody tr');
    // for (const row of rows) {
    //     const offset = row.querySelectorAll('td.ico-star').length;
    //     const c = row.querySelectorAll('td');
    //     const d = row.dataset;
    //     for (const [option, {index, field}] of sortOptionParams) {
    //         const name = `sort${tt(field)}`;
    //         const t = c[index + offset].textContent;
    //         if (option === 'Year') {
    //             const [year, ...mm] = t.split(/(?:\s|&nbsp;)+/);
    //             d[name] = year;
    //             d.sortMm = mm.join(' ');
    //         } else if (option === 'Condition') {
    //             d[name] = `${ConditionValues.get(t)}`;
    //         } else if (option === 'Krause number') {
    //             const m = t.match(/(?<cat>\w+)#\s*(?<prefix>[a-zA-Z]*)(?<num>\d+)(?<suffix>(?:\.\d+)?(?:[a-zA-Z]*))/i);
    //             if (m && m.groups) {
    //                 const {cat, num, prefix, suffix} = m.groups;
    //                 d.sortKmc = cat;
    //                 d[name] = num;
    //                 d.sortKma = `${prefix}${suffix}`;
    //             } else {
    //                 d.sortKmc = '';
    //                 d[name] = t;
    //                 d.sortKma = '';
    //             }
    //         } else {
    //             d[name] = t;
    //         }
    //     }
    // }
    // getActiveSortOption();
    // sortBy(sections, currentOption, currentOrder);
    // leftControls.removeAttribute('style');
    // leftControls.insertAdjacentHTML('afterend', `
    //     <div class="right filter-container">
    //         <div class="filter-box" id="sort-filter">
    //             ${c(`${o(currentOption)}${a(currentOrder)}`)}
    //         </div>
    //         <div class="drop hide filter-dialog" id="sort-filter-dialog">
    //         ${sortOptions.map(opt => `
    //             <a class="list-link" data-option="${opt}" data-order="a">${o(opt)}${a()}</a>
    //             <a class="list-link" data-option="${opt}" data-order="d">${o(opt)}${d()}</a>
    //         `).join('')}
    //         </div>
    //     </div>
    // `);
    // const sortFilter = swapList.querySelector<HTMLDivElement>('#sort-filter');
    // const sortDialog = swapList.querySelector<HTMLDivElement>('#sort-filter-dialog');
    //
    // sortFilter.addEventListener('click', e => {
    //     e.stopPropagation();
    //     sortDialog.style.display = 'block';
    // });
    //
    // sortDialog.addEventListener('click', e => {
    //     e.stopPropagation();
    //     sortDialog.style.display = 'none';
    //
    //     const a = (<HTMLElement> e.target).closest('a');
    //     if (!a) {
    //         return;
    //     }
    //
    //     sortFilter.innerHTML = c(a.innerHTML);
    //
    //     const {option, order} = a.dataset;
    //     currentOption = <SortOption> option;
    //     currentOrder = <SortOrder> order;
    //     setActiveSortOption(currentOption, currentOrder);
    //     sortBy(sections, currentOption, currentOrder);
    // });
}
