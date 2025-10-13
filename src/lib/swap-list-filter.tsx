import React from 'react';
import { renderToString } from 'react-dom/server';
import { FilterName, FilterOptions, FilterProps, Filters } from './filters';
import { c, cmp, d, num, sortField, x } from './sort';
import { getReserveCountElement } from './swap-utils';
import { getHashParam, updateLocationHash } from './url';
import { cancel } from './utils';

const enum ReserveColors {
    DEFAULT = `#DDD`,
    RESERVED = `#E4A500`,
}
const getReserveIcon = (color = ReserveColors.DEFAULT) =>
    `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 96 960 960" width="20px" style="fill:${color}"><path d="M425 711h110V611h100V501H535V401H425v100H325v110h100v100Zm55 255q-135.091-34.197-223.045-155.842Q169 688.514 169 540V303l311-117 311 117v237q0 148.514-87.955 270.158Q615.091 931.803 480 966Zm0-78.5q102.5-33 169.25-130.603Q716 659.293 716 540V354.387L480 266l-236 88.387V540q0 119.293 66.75 216.897Q377.5 854.5 480 887.5Zm0-311Z"></path></svg>`;

export function addFilteringOptions(): void {
    const swapList = document.getElementById('take-swap-list') as HTMLDivElement;
    if (!swapList) {
        return;
    }

    const dataList = swapList.lastElementChild as HTMLDivElement;
    if (!dataList) {
        return;
    }

    function sort(data: FilterOptions, cmp?: (a: string, b: string) => number): FilterOptions {
        return [...data.keys()].sort(cmp).reduce((r: FilterOptions, k) => {
            const value = data.get(k);
            if (value) {
                r.set(k, value);
            }
            return r;
        }, new Map());
    }

    // TODO add number of available results for every filter option
    // TODO disable unavailable/hidden filter options or event whole filter for single option
    // TODO render filters on the fly
    // TODO add more advance filter dialogs for years (columns, ranges), values (columns, ranges), km (columns, masks)

    const filterProps = new Map<FilterName, FilterProps>();
    const filterNames: FilterName[] = [
        FilterName.RESERVED,
        FilterName.COUNTRY,
        FilterName.YEAR,
        FilterName.VALUE,
        FilterName.KM,
    ];
    const filterValues = new Map<FilterName, string>();

    const isVisible = (el: HTMLElement): boolean => el.style.display !== 'none';

    const reservedCount = [...swapList.querySelectorAll('th[data-reserve="on"]')].filter(
        isVisible
    ).length;
    const missingCount = [...swapList.querySelectorAll('th[data-reserve=""]')].filter(
        isVisible
    ).length;
    filterProps.set(FilterName.RESERVED, {
        placeholder: 'Reserved',
        width: 100,
        options: new Map(
            reservedCount && missingCount
                ? [
                      [
                          'on',
                          {
                              name: `<span class="left filter-label">${getReserveIcon(ReserveColors.RESERVED)}</span>`,
                              count: reservedCount,
                          },
                      ],
                      [
                          'off',
                          {
                              name: `<span class="left filter-label">${getReserveIcon(ReserveColors.DEFAULT)}</span>`,
                              count: missingCount,
                          },
                      ],
                  ]
                : []
        ),
    });

    const countryHeadings = swapList.querySelectorAll('h2');
    filterProps.set(FilterName.COUNTRY, {
        placeholder: 'Country',
        width: 250,
        options: sort(
            [...countryHeadings].reduce((r: FilterOptions, h) => {
                const hc = h.cloneNode(true) as HTMLHeadingElement;
                for (const el of hc.querySelectorAll('input, sup')) {
                    el.remove();
                }

                const rows = h.nextElementSibling?.querySelectorAll('tr') || [];
                console.debug(rows.length, rows);
                const filtered = [...rows].filter(isVisible);
                console.debug(filtered.length, filtered);
                const mapped = filtered.map((el) => el.style.display);
                console.debug(mapped);

                r.set(hc.id, {
                    name: hc.innerHTML,
                    count: [...(h.nextElementSibling?.querySelectorAll('tr') || [])].filter(
                        isVisible
                    ).length,
                });
                return r;
            }, new Map())
        ),
    });

    filterProps.set(FilterName.YEAR, {
        placeholder: 'Year',
        width: 90,
        options: sort(
            [...swapList.querySelectorAll<HTMLTableRowElement>('tr[data-sort-year]')].reduce(
                (r: FilterOptions, o) => {
                    const y = o.dataset.sortYear;
                    if (y) {
                        r.set(y, {
                            name: y,
                            count: [
                                ...swapList.querySelectorAll(`tr[data-sort-year="${y}"]`),
                            ].filter(isVisible).length,
                        });
                    }
                    return r;
                },
                new Map()
            ),
            (a, b) => cmp(num(b), num(a))
        ),
    });

    filterProps.set(FilterName.VALUE, {
        placeholder: 'Face value',
        width: 110,
        options: sort(
            [...swapList.querySelectorAll<HTMLTableRowElement>('tr[data-sort-face]')].reduce(
                (r: FilterOptions, o) => {
                    const f = o.dataset.sortFace;
                    if (f) {
                        const [v] = f.split(' ');
                        r.set(v, {
                            name: v,
                            count: [
                                ...swapList.querySelectorAll(`tr[data-sort-face="${v}"]`),
                                ...swapList.querySelectorAll(`tr[data-sort-face^="${v} "]`),
                            ].filter(isVisible).length,
                        });
                    }
                    return r;
                },
                new Map()
            ),
            (a, b) => cmp(num(a), num(b))
        ),
    });

    const kmMatch = /([a-z]*)([0-9]*)((?:\.[0-9]+)?[a-z]*)/i;
    filterProps.set(FilterName.KM, {
        placeholder: 'KM#',
        width: 110,
        options: sort(
            [...swapList.querySelectorAll<HTMLTableRowElement>('tr[data-sort-km]')].reduce(
                (r: FilterOptions, o) => {
                    const { sortKmc: c = '', sortKm: k = '', sortKma: a = '' } = o.dataset;
                    const v = `${c.toLowerCase()}${k}${a}`;
                    if (v) {
                        r.set(v, {
                            name: `${c}# ${k}${a}`,
                            count: [
                                ...swapList.querySelectorAll(
                                    `tr[data-sort-kmc="${c}"][data-sort-km="${k}"][data-sort-kma="${a}"]`
                                ),
                            ].filter(isVisible).length,
                        });
                    }
                    return r;
                },
                new Map()
            ),
            (a, b) => {
                const [, ac, ak, aa] = a.match(kmMatch) || [];
                const [, bc, bk, ba] = b.match(kmMatch) || [];
                return cmp(ac, bc) || cmp(num(ak), num(bk)) || cmp(aa, ba);
            }
        ),
    });

    for (const filter of filterNames) {
        const value = getHashParam(filter);
        if (value) {
            filterValues.set(filter, value);
            const props = filterProps.get(filter);
            if (props) {
                props.value = value;
            }
        }
    }

    dataList.insertAdjacentHTML('beforebegin', renderToString(<Filters filters={filterProps} />));

    function applyFilters(): void {
        for (const h of countryHeadings) {
            const t = h.nextElementSibling as HTMLTableElement;
            const rows = t.querySelectorAll('tr');

            let hasVisibleRows = false;

            rowLoop: for (const r of rows) {
                const d = r.dataset;
                for (const [filter, value] of filterValues) {
                    switch (filter) {
                        case FilterName.RESERVED:
                            const reserve = value === 'on' ? 'on' : '';
                            if (value && !r.querySelector(`[data-reserve="${reserve}"]`)) {
                                r.style.display = 'none';
                                continue rowLoop;
                            }
                            break;

                        case FilterName.COUNTRY:
                            if (h.id !== value) {
                                hasVisibleRows = false;
                                break rowLoop;
                            }
                            break;

                        case FilterName.YEAR:
                            if (d.sortYear !== value) {
                                r.style.display = 'none';
                                continue rowLoop;
                            }
                            break;

                        case FilterName.VALUE:
                            if (!d.sortFace?.startsWith(`${value} `)) {
                                r.style.display = 'none';
                                continue rowLoop;
                            }
                            break;

                        case FilterName.KM: {
                            const [, c, k, a] = value.match(kmMatch) || [];
                            if (
                                d.sortKmc?.toLowerCase() !== c ||
                                d.sortKm !== k ||
                                d.sortKma !== a
                            ) {
                                r.style.display = 'none';
                                continue rowLoop;
                            }
                            break;
                        }
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

    for (const option of document.querySelectorAll<HTMLElement>('[data-filter-by]')) {
        option.addEventListener('click', async () => {
            const ds = option.dataset;
            const filter = ds.filterBy as FilterName;
            const value = ds.filterValue;
            await updateLocationHash((params) =>
                value ? params.set(filter, value) : params.delete(filter)
            );

            const display = document.querySelector<HTMLElement>(`[data-filter="${filter}"]`);
            if (display) {
                if (value) {
                    display.innerHTML = `${c(option.querySelector('.left')?.outerHTML)}${x(filter)}`;
                    display.classList.add('filter-box-active');
                } else {
                    display.innerHTML = `${c(display.dataset?.filterPlaceholder)}${d()}`;
                    display.classList.remove('filter-box-active');
                }
            }

            if (value) {
                filterValues.set(filter as FilterName, value);
            } else {
                filterValues.delete(filter as FilterName);
            }
            applyFilters();
        });
    }

    for (const display of document.querySelectorAll<HTMLElement>('[data-filter]')) {
        display.addEventListener('click', async (e) => {
            cancel(e);
            const ds = display.dataset;
            if (ds.filterDisabled === 'true') {
                return;
            }

            let clearClicked = false;
            const button = e.target as HTMLElement;
            const filter = ds.filter as FilterName;
            if (button.matches('[data-filter-clear]')) {
                clearClicked = true;
                const { filterClear } = button.dataset;
                if (filterClear) {
                    await updateLocationHash((params) => params.delete(filterClear));
                }
                display.innerHTML = `${c(ds.filterPlaceholder)}${d()}`;
                display.classList.remove('filter-box-active');
                filterValues.delete(filter);
                applyFilters();
            }

            for (const dialog of document.querySelectorAll<HTMLElement>(`[data-filter-dialog]`)) {
                dialog.style.display =
                    !clearClicked &&
                    dialog.dataset.filterDialog === filter &&
                    dialog.style.display !== 'block'
                        ? 'block'
                        : 'none';
            }
        });
    }

    for (const dialog of document.querySelectorAll<HTMLElement>('[data-filter-dialog]')) {
        dialog.addEventListener('click', (e) => {
            cancel(e);
            dialog.style.display = 'none';
        });
    }

    const filters = swapList.querySelectorAll<HTMLInputElement>('.filter');
    for (const filter of filters) {
        filter.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            const id = target.id;
            const value = target.value;
            const name = sortField(id);
            const rows = swapList.querySelectorAll<HTMLTableRowElement>('tbody > tr');
            for (const row of rows) {
                const d = row.dataset;
                row.style.display = !value || d[name]?.includes(value) ? '' : 'none';
            }
        });
    }

    const sections = swapList.querySelectorAll<HTMLTableSectionElement>('table.swap-coin tbody');
    if (!sections || !sections.length) {
        return;
    }
}
