import { _ } from './lang';
import {
    a,
    cmpFace,
    cmpKm,
    cmpSubject,
    cmpYear,
    d,
    dropdown,
    getActiveSortOption,
    o,
    s,
    setActiveSortOption,
    sortBy,
    sortField,
    SortOption,
    SortOrder,
} from './sort';
import { cancel } from './utils';

const sortOptions: Record<string, SortOption> = {
    year: { index: 0, label: 'Year', sort: cmpYear },
    face: { index: 1, label: 'Facial value', sort: cmpFace },
    subject: { index: 2, label: 'Subject', sort: cmpSubject },
    km: { index: 3, label: 'Krause', sort: cmpKm },
};

let currentOption = 'year';
let currentOrder: SortOrder = 'd';

export function addSortingOptions(): void {
    const table = document.querySelector<HTMLTableElement>('#table table.table');
    if (!table) {
        return;
    }

    const sections = table.querySelectorAll<HTMLTableSectionElement>('tbody');
    if (!sections) {
        return;
    }

    const filters = table.parentElement?.querySelector<HTMLDivElement>('div.filters');
    if (!filters) {
        return;
    }

    let sortFilter = filters.querySelector<HTMLDivElement>('#sort-filter');
    if (sortFilter) {
        sortFilter.remove();
    }

    let sortDialog = filters.querySelector<HTMLDivElement>('#sort-filter-dialog');
    if (sortDialog) {
        sortDialog.remove();
    }

    filters.insertAdjacentHTML(
        'beforeend',
        `<div class="right filter-container" style="margin-right:0;">${dropdown(
            'sort-filter',
            s(`${_('Sorting')}: ${_(sortOptions[currentOption]?.label)}`, currentOrder),
            Object.entries(sortOptions).map(
                ([field, { label }]) => `
                    <a class="list-link" data-option="${field}" data-order="a">${o(
                        _(label)
                    )}${a()}</a>
                    <a class="list-link" data-option="${field}" data-order="d">${o(
                        _(label)
                    )}${d()}</a>
                `
            )
        )}</div>`
    );

    sortFilter = filters.querySelector<HTMLDivElement>('#sort-filter');
    if (!sortFilter) {
        return;
    }

    sortDialog = filters.querySelector<HTMLDivElement>('#sort-filter-dialog');
    if (!sortDialog) {
        return;
    }

    sortFilter.addEventListener('click', (e) => {
        cancel(e);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        sortDialog!.style.display = 'block';
    });

    sortDialog.addEventListener('click', async (e) => {
        cancel(e);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        sortDialog!.style.display = 'none';

        const item = (e.target as HTMLElement).closest('a');
        if (!item) {
            return;
        }

        const { option, order } = item.dataset;
        if (!option || !order) {
            return;
        }

        currentOption = option;
        currentOrder = order as SortOrder;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        sortFilter!.innerHTML = s(
            `${_('Sorting')}: ${_(sortOptions[currentOption]?.label)}`,
            currentOrder
        );
        await setActiveSortOption(currentOption, currentOrder);
        sortBy(sections, sortOptions[currentOption]?.sort, currentOrder);
    });

    // add sorting index to all rows
    const rows = table.querySelectorAll<HTMLTableRowElement>('tbody tr');
    for (const row of rows) {
        const c = row.children;
        const d = row.dataset;
        for (const [field, { index }] of Object.entries(sortOptions)) {
            const name = sortField(field);
            const t = c[index].textContent;
            if (!t) {
                continue;
            }

            if (field === 'year') {
                const [year, ...mm] = t.split(/(?:\s|&nbsp;)+/);
                d[name] = year;
                d.sortMm = mm.join(' ');
            } else if (field === 'km') {
                const m = t.match(
                    /(?<cat>\w+)#\s*(?<prefix>[a-zA-Z]*)(?<num>\d+)(?<suffix>(?:\.\d+)?[a-zA-Z]*)/i
                );
                if (m && m.groups) {
                    const {
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

    [currentOption, currentOrder] = getActiveSortOption();
    sortBy(sections, sortOptions[currentOption]?.sort, currentOrder);
}
