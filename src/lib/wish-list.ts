import { post, postFragment } from './ajax';
import { FormValue, WishValue } from './cond';
import { randomDelay } from './delay';
import { lang } from './lang';
import { styleListLinks } from './swap-links';
import { getHashParam, updateHashHref, updateLocationHash } from './url';
import { scrollIntoView } from './utils';
import { WishFormAction } from './wish-form';

export const CoinWishFormOnMatcher = /CoinWishFormOn\('(?<uwid>[^']*)', '(?<cond>[^']*)'/;

export async function syncCoinWish(): Promise<void> {
    const coinForm = document.querySelector<HTMLFormElement>('#edit-coin-form form');
    if (!coinForm) {
        return;
    }

    const coinFormData = new FormData(coinForm);
    const value = coinFormData.get('condition');
    if (!value) {
        return;
    }

    const form = document.querySelector<HTMLFormElement>('#wish-form');
    if (!form) {
        return;
    }

    const wishForm = new FormData(form);
    const wishType = form.querySelector<HTMLInputElement>('#wish-type')?.value;
    if (wishType) {
        wishForm.set('is_type', wishType);
    }

    const wishVariety = wishForm.get('wish-variety');
    if (wishVariety) {
        wishForm.set('wish-variety', '');
    }

    const links = document.querySelectorAll<HTMLAnchorElement>('#wish-block a.list-link');

    const condition = +value as FormValue;
    switch (condition) {
        case FormValue.PROOF:
        case FormValue.UNC: {
            if (!links.length) {
                return;
            }
            for (const a of links) {
                const m = a
                    .getAttribute('onClick')
                    ?.match(CoinWishFormOnMatcher) as CoinWishFormOnMatchResult;
                if (m) {
                    wishForm.set('uwid', m.groups.uwid || '');
                    wishForm.set('action', WishFormAction.DELETE);
                    await randomDelay();
                    await post(location.href, wishForm);
                    a.remove();
                }
            }
            return;
        }

        default: {
            let wishCondition: WishValue;
            switch (condition) {
                case FormValue.XF:
                    wishCondition = WishValue.UNC;
                    break;
                case FormValue.VF:
                    wishCondition = WishValue.XF;
                    break;
                default:
                    wishCondition = WishValue.VF;
                    break;
            }

            if (!links.length) {
                wishForm.set('uwid', '');
                wishForm.set('wish-variety', '');
                wishForm.set('condition', `${wishCondition}`);
                wishForm.set('action', WishFormAction.ADD);
                await randomDelay();
                const block = (
                    await postFragment(location.href, wishForm)
                ).querySelector<HTMLElement>('#wish-block');
                if (block) {
                    styleListLinks(block);
                    block.querySelector('center')?.remove();
                    document.querySelector('#wish-block')?.replaceWith(block);
                }
                return;
            }

            let first = true;
            for (const a of links) {
                const m = a
                    .getAttribute('onClick')
                    ?.match(CoinWishFormOnMatcher) as CoinWishFormOnMatchResult;
                if (m?.groups.uwid) {
                    wishForm.set('uwid', m.groups.uwid);
                    wishForm.set('condition', first ? `${wishCondition}` : '');
                    wishForm.set('action', first ? WishFormAction.EDIT : WishFormAction.DELETE);
                    await randomDelay();
                    if (first) {
                        if (+(m?.groups.cond ?? 0) !== wishCondition) {
                            const block = (
                                await postFragment(location.href, wishForm)
                            ).querySelector<HTMLElement>('#wish-block');
                            if (block) {
                                styleListLinks(block);
                                block.querySelector('center')?.remove();
                                document.querySelector('#wish-block')?.replaceWith(block);
                            }
                        }
                    } else {
                        await post(location.href, wishForm);
                        a.remove();
                    }
                }
                if (first) {
                    first = false;
                }
            }
            return;
        }
    }
}

const langSyncWish: Record<string, string> = {
    en: 'Sync wish',
    lt: 'Derinami norai',
    ru: 'Сверяются желания',
};

export async function syncListWish(): Promise<void> {
    const buttons = document.getElementById('button-container') as HTMLDivElement;
    if (!buttons) {
        return;
    }

    const SYNC_ID = 'sync';
    const SYNC_ON = 'y';

    buttons.insertAdjacentHTML(
        'afterbegin',
        `<label class='gray-13' for='${SYNC_ID}'><input type='checkbox' id='${SYNC_ID}'/> ${langSyncWish[lang]}</label>`
    );
    const sync = document.getElementById(SYNC_ID) as HTMLInputElement;

    async function enableSync(): Promise<void> {
        return updateLocationHash((hash) => {
            hash.set(SYNC_ID, SYNC_ON);
        });
    }

    async function disableSync(): Promise<void> {
        sync.checked = false;
        location.href = await updateHashHref((hash) => {
            hash.delete(SYNC_ID);
        });
    }

    sync.addEventListener('change', async () => {
        if (!sync.checked) {
            // don't allow to renew update
            sync.disabled = true;
            return disableSync();
        }

        await enableSync();

        const coins = document.querySelectorAll<HTMLAnchorElement>('.coin-desc > div > a.blue-15');
        if (!coins) {
            return disableSync();
        }

        for (const coin of coins) {
            await randomDelay();

            scrollIntoView(coin);
            const { screenLeft: wl, screenTop: wt, outerWidth: ww, outerHeight: wh } = window;
            const o = window.open(
                coin.href,
                SYNC_ID,
                [
                    `width=${ww / 1.25}`,
                    `height=${wh / 1.5}`,
                    `left=${wl + ww / 10}`,
                    `top=${wt + wh / 10}`,
                ].join(',')
            );
            if (o) {
                await randomDelay(5000, 5000);
                o.close();
            }

            // if something changed while updating
            if (!sync.checked) {
                return;
            }
        }

        const pages = document.querySelector<HTMLDivElement>('.pages');
        if (!pages) {
            return disableSync();
        }

        const currentPage = +(
            pages.querySelector<HTMLAnchorElement>('a.current')?.textContent || 0
        );
        if (!currentPage) {
            return disableSync();
        }

        const nextPageLink = pages.querySelector<HTMLAnchorElement>(
            [
                `a[href$="page=${currentPage + 1}"]`,
                `a[href*="page=${currentPage + 1}&"]`,
                `a[href*="page=${currentPage + 1}#"]`,
            ].join(',')
        );
        if (!nextPageLink) {
            return disableSync();
        }

        await randomDelay(5000, 5000);
        location.href = await updateHashHref((hash) => {
            hash.set(SYNC_ID, SYNC_ON);
        }, nextPageLink.href);
    });

    if (getHashParam(SYNC_ID)) {
        sync.click();
    }
}
