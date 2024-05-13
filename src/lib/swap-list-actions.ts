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
        const responsePromise = get(href);

        const url = new URL(href);
        const ids = url.searchParams.get('usid') ?? url.searchParams.get('amp;usid');
        for (const id of ids?.split(',') ?? []) {
            const row = document.querySelector(`tr#usid${id}`);
            const table = row?.closest('table');
            row?.querySelector<HTMLInputElement>('input[type="checkbox"]:checked')?.click();
            row?.remove();

            if (table && !table.querySelectorAll('tr')?.length) {
                const heading = table.previousElementSibling;
                if (heading?.matches('h2')) {
                    heading
                        ?.querySelector<HTMLInputElement>('input[type="checkbox"]:checked')
                        ?.click();
                    heading.remove();
                }
                table.remove();
            }
        }

        const response = await responsePromise;
        if (!response.ok) {
            // eslint-disable-next-line no-console
            console.error(response);
            return reload();
        }
    });
}
