import { get } from './ajax';
import { cancel, reload } from './utils';

export function improveSwapButtons(): void {
    improveDeleteButton();
}

function improveDeleteButton(): void {
    const deleteButton = document.querySelector<HTMLButtonElement>(
        '#swap-list div.action-board a.ico-del'
    );
    if (!deleteButton) {
        return;
    }

    // eslint-disable-next-line no-new-func
    const onClick = new Function(deleteButton.getAttribute('onclick') ?? 'return;');

    deleteButton.removeAttribute('onclick');
    deleteButton.addEventListener('click', async (e) => {
        cancel(e);
        if (onClick() === false) {
            return false;
        }

        const { href } = e.currentTarget as HTMLAnchorElement;
        const response = await get(href);
        if (!response.ok) {
            // eslint-disable-next-line no-console
            console.error(response);
            return reload();
        }

        const url = new URL(href);
        const ids = url.searchParams.get('usid') ?? url.searchParams.get('amp;usid');
        for (const id of ids?.split(',') ?? []) {
            const row = document.querySelector(`tr#usid${id}`);
            const table = row?.closest('table');
            row?.remove();
            if (table && !table.querySelectorAll('tr')?.length) {
                if (table.previousElementSibling?.matches('h2')) {
                    table.previousElementSibling.remove();
                }
                table.remove();
            }
        }
    });
}
