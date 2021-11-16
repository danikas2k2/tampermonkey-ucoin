import { cancel } from '../lib/utils';

export async function handleTablePage(): Promise<void> {
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        const sortFilterDialog = document.getElementById('sort-filter-dialog');
        if (sortFilterDialog) {
            const url = new URL(location.href);
            const sp = url.searchParams;
            sp.set('order', 'ka');
            sortFilterDialog.insertAdjacentHTML(
                'beforeend',
                `<a class='list-link' href='${url.href}'><div class='left gray-13'>Krause</div><div class='right'><span class='arrow at'></span></div></a>`
            );
            sp.set('order', 'kd');
            sortFilterDialog.insertAdjacentHTML(
                'beforeend',
                `<a class='list-link' href='${url.href}'><div class='left gray-13'>Krause</div><div class='right'><span class='arrow ab'></span></div></a>`
            );
            const links = sortFilterDialog.querySelectorAll<HTMLAnchorElement>('a.list-link');
            for (const a of links) {
                a.addEventListener('click', cancel);
            }
        }
    }
}
