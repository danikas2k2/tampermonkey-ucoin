import { addGalleryVisibilityToggle } from '../lib/gallery';
import { updateLinkHref, updateOnClickHref } from '../lib/links';
import { syncListWish } from '../lib/wish-list';

export async function handleGalleryPage(): Promise<void> {
    const gallery = document.getElementById('gallery');

    // fix gallery links
    const galleryLinks = gallery?.querySelectorAll<HTMLAnchorElement>('a[href^="/gallery/"]');
    for (const a of galleryLinks || []) {
        updateLinkHref(a);
    }
    const queryLinks = gallery?.querySelectorAll<HTMLAnchorElement>('a[href^="?"]');
    for (const a of queryLinks || []) {
        updateLinkHref(a);
    }
    const switcherLinks = gallery?.querySelectorAll<HTMLAnchorElement>('a.switcher');
    for (const a of switcherLinks || []) {
        const view = new URL(a.href).searchParams.get('view');
        const div = a.parentElement?.querySelector<HTMLDivElement>('div.close');
        if (view && div) {
            updateOnClickHref(div, [view]);
        }
    }

    const count = gallery?.querySelectorAll('.coin').length ?? 0;
    const pages = +(gallery?.querySelector('.pages a:last-child')?.textContent ?? 0);
    const current = +(gallery?.querySelector('.pages a.current')?.textContent ?? 0);
    if (count) {
        const isLast = current === pages;
        const total = isLast ? (pages - 1) * 12 + count : (pages - 1) * 12;
        gallery
            ?.querySelector('h1')
            ?.insertAdjacentHTML(
                'beforeend',
                ` <small>(${count}${
                    pages
                        ? ` <small>of ${isLast ? total : `${total + 1}~${total + 12}`}</small>`
                        : ''
                })</small>`
            );
    }

    addGalleryVisibilityToggle();
    await syncListWish();
}
