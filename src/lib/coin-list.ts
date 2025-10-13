import { Condition, ConditionColors } from './cond';
import { loc } from './url';

export function getConditionCell(tr: HTMLTableRowElement): HTMLTableCellElement | null {
    return tr.querySelector('td.cond, th.cond, .td-cond');
}

export function decorateConditionCell(tr: HTMLTableRowElement): void {
    const td = getConditionCell(tr);
    const child = td?.firstElementChild ?? td;
    if (!child) {
        return;
    }

    const cond = child.textContent;
    const color = ConditionColors[cond as Condition];
    if (color) {
        child.innerHTML = `<span class="cond marked-${color}">${cond}</span>`;
    }
}

export function decorateConditionRows(tableSelector = 'table.swap-coin'): void {
    const swapRows = document.querySelectorAll<HTMLTableRowElement>(`${tableSelector} tr`);
    for (const tr of swapRows) {
        decorateConditionCell(tr);
    }
}
// TODO fix hover on thumbnails
export function addThumbnails(tableSelector = 'table.swap-coin'): void {
    // add thumbnails only if auto-update is not in progress
    const updating = loc().hash?.includes('update-prices');
    if (updating) {
        return;
    }

    for (const row of document.querySelectorAll<HTMLTableRowElement>(`${tableSelector} tr`)) {
        const { tooltipImgpath, tooltipSample, tooltipCode } = row.dataset;
        const cell = row.querySelector('td');
        cell?.insertAdjacentHTML(
            row.querySelector('.reserve') || document.body.id.endsWith('-list')
                ? 'beforebegin'
                : 'afterend',
            `
        <th style="width: 100px" class="thumbnails">
            ${
                tooltipImgpath && tooltipSample && tooltipCode
                    ? `
                <img src="${tooltipImgpath}/${tooltipSample}-1s/${tooltipCode}.jpg" class="thumbnail" loading="lazy" alt="obverse"/>
                <img src="${tooltipImgpath}/${tooltipSample}-2s/${tooltipCode}.jpg" class="thumbnail" loading="lazy" alt="reverse"/>`
                    : ''
            }
        </th>
    `
        );
    }
}
