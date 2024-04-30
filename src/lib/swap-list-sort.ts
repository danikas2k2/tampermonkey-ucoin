import { Condition, ConditionValues } from './cond';
import { _ } from './lang';
import {
    a,
    cmpCond,
    cmpFace,
    cmpKm,
    cmpValue,
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
    cond: { index: 3, label: 'Condition', sort: cmpCond },
    value: { index: 4, label: 'Value', sort: cmpValue },
    km: { index: 6, label: 'Krause', sort: cmpKm },
};

let currentOption = 'year';
let currentOrder: SortOrder = 'd';

export function addSortingOptions(): void {
    const swapList = document.getElementById('take-swap-list') as HTMLDivElement;
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

    leftControls.removeAttribute('style');
    leftControls.insertAdjacentHTML(
        'afterend',
        dropdown(
            'sort-filter',
            s(_(sortOptions[currentOption]?.label), currentOrder),
            Object.entries(sortOptions).map(
                ([field, { label }]) => `
                    <a class='list-link' data-option='${field}' data-order='a'>${o(
                        _(label)
                    )}${a()}</a>
                    <a class='list-link' data-option='${field}' data-order='d'>${o(
                        _(label)
                    )}${d()}</a>
                `
            )
        )
    );

    const sortFilter = swapList.querySelector<HTMLDivElement>('#sort-filter');
    if (!sortFilter) {
        return;
    }

    const sortDialog = swapList.querySelector<HTMLDivElement>('#sort-filter-dialog');
    if (!sortDialog) {
        return;
    }

    sortFilter.addEventListener('click', (e) => {
        cancel(e);
        sortDialog.style.display = 'block';
    });

    sortDialog.addEventListener('click', async (e) => {
        cancel(e);
        sortDialog.style.display = 'none';

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
        sortFilter.innerHTML = s(_(sortOptions[currentOption]?.label), currentOrder);
        await setActiveSortOption(currentOption, currentOrder);
        sortBy(sections, sortOptions[currentOption]?.sort, currentOrder);
    });

    // add sorting index to all rows
    const rows = swapList.querySelectorAll<HTMLTableRowElement>('table.swap-coin tbody tr');
    for (const row of rows) {
        const offset = row.querySelectorAll('td.ico-star').length;
        const c = row.querySelectorAll('td');
        const d = row.dataset;
        for (const [field, { index }] of Object.entries(sortOptions)) {
            const name = sortField(field);
            const t = c[index + offset].textContent as Condition;
            if (!t) {
                continue;
            }

            if (field === 'year') {
                const [year, ...mm] = t.split(/(?:\s|&nbsp;)+/);
                d[name] = year;
                d.sortMm = mm.join(' ');
            } else if (field === 'cond') {
                d[name] = `${ConditionValues[t]}`;
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
