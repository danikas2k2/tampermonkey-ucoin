import { _ } from './lang';

export function getDetails(title: string): string | undefined {
    const rows = document.querySelectorAll('#coin table.coin-info tr');
    if (!rows?.length) {
        return undefined;
    }
    const localTitle = _(title);
    for (const row of rows) {
        if (row.querySelector('th')?.textContent?.includes(localTitle)) {
            return row?.querySelector('td:first-of-type')?.textContent ?? undefined;
        }
    }
    return undefined;
}
