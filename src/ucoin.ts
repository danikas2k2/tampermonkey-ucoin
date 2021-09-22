// ==UserScript==
// @name         collector :: ucoin.net
// @namespace    https://ucoin.net/
// @version      {{project.version}}
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @downloadURL  https://raw.githubusercontent.com/danikas2k2/tampermonkey-ucoin/master/dist/ucoin.user.js
// @updateURL    https://raw.githubusercontent.com/danikas2k2/tampermonkey-ucoin/master/dist/ucoin.user.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js
// @match        https://*.ucoin.net/*
// @run-at       document-end
// ==/UserScript==

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import style from '../styles/ucoin.less';

import { CoinForm } from './lib/coin-form';
import { addGalleryVisibilityToggle } from './lib/gallery';
import { updateLinkHref, updateOnClickHref } from './lib/links';
import { estimateSwapPrices, estimateWeightPrice } from './lib/prices';
import { SwapForm } from './lib/swap-form';
import {
    addConflictHandling,
    addOpenedTabsHandler,
    addThumbnails,
    addTrackingLinks,
    checkSold,
    duplicatePagination,
    ignoreUnwanted,
    removeRowHrefFromSwapList,
    showAllPrices,
} from './lib/swap-list';
import { addFilteringOptions, addSortingOptions } from './lib/swap-list-sort';
import { UID } from './lib/uid';
import { cancel } from './lib/utils';
import { WishForm } from './lib/wish-form';

document.head.insertAdjacentHTML('beforeend', `<style>${style}</style>`);

async function handleHomePage(): Promise<void> {
    const profile = document.getElementById('profile');
    if (profile) {
        const curPriceElement = profile.querySelector<HTMLDivElement>('div.worth-cur-value span');
        if (curPriceElement) {
            const colPrice = +curPriceElement.textContent.replace(/[^\d.]/g, '');
            const swapPriceElement = profile.querySelector(`a[href="/swap-list/?uid=${UID}"] span.right`);
            if (swapPriceElement) {
                const swapPrice = +swapPriceElement.textContent.replace(/[^\d.]/g, '');
                const price = colPrice + swapPrice;
                curPriceElement.classList.add('price');
                curPriceElement.insertAdjacentHTML(
                    'beforeend',
                    `<br/><small class='total'><abbr class='cur'>€</abbr> ${new Intl.NumberFormat('en').format(
                        price
                    )}</small>`
                );
            }
        }
    }
}

async function handleProfile(): Promise<void> {
    const converter = new showdown.Converter();
    const profile = document.getElementById('profile');
    if (profile) {
        const paragraphs = profile.querySelectorAll<HTMLParagraphElement>('p.dgray-13');
        for (const p of paragraphs) {
            p.innerHTML = converter.makeHtml(
                p.innerHTML
                    .replace(/<br\s*\/?>/gi, '\n')
                    .replace(/([\w.-]+@[\w.-]+)/gi, '<$1>')
                    .replace(/&gt;/gi, '>')
            );
        }
    }
}

async function handleCoinPage(): Promise<void> {
    const tags = document.getElementById('tags');
    if (tags) {
        // fixTagLinks
        const galleryLinks = <NodeListOf<HTMLAnchorElement>>tags.querySelectorAll('a[href^="/gallery/"]');
        for (const a of galleryLinks) {
            updateLinkHref(a);
        }
    }

    await new CoinForm().handle();
    await new SwapForm().handle();
    await estimateSwapPrices();
    await estimateWeightPrice();
    await new WishForm().handle();
}

async function handleGalleryPage(): Promise<void> {
    const gallery = document.getElementById('gallery');
    if (gallery) {
        // fix gallery links
        const galleryLinks = <NodeListOf<HTMLAnchorElement>>gallery.querySelectorAll('a[href^="/gallery/"]');
        for (const a of galleryLinks) {
            updateLinkHref(a);
        }
        const queryLinks = <NodeListOf<HTMLAnchorElement>>gallery.querySelectorAll('a[href^="?"]');
        for (const a of queryLinks) {
            updateLinkHref(a);
        }
        const closeButtons = <NodeListOf<HTMLDivElement>>gallery.querySelectorAll('div.close');
        for (const div of closeButtons) {
            updateOnClickHref(div);
        }

        const count = gallery.querySelectorAll('.coin').length;
        const pages = +gallery.querySelector('.pages a:last-child')?.textContent;
        const current = +gallery.querySelector('.pages a.current')?.textContent;
        if (count) {
            const isLast = current === pages;
            const total = isLast ? (pages - 1) * 12 + count : (pages - 1) * 12;
            gallery
                .querySelector('h1')
                .insertAdjacentHTML(
                    'beforeend',
                    ` <small>(${count}${
                        pages ? ` <small>of ${isLast ? total : `${total + 1}~${total + 12}`}</small>` : ''
                    })</small>`
                );
        }
    }

    addGalleryVisibilityToggle();
}

async function handleTablePage(): Promise<void> {
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        const sortFilterDialog = document.getElementById('sort-filter-dialog');
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

        for (const a of <NodeListOf<HTMLAnchorElement>>sortFilterDialog.querySelectorAll('a.list-link')) {
            a.addEventListener('click', cancel);
        }
    }
}

async function handleMessagePage(): Promise<void> {
    const userList = document.getElementById('user-list');
    for (const user of userList?.querySelectorAll<HTMLTableRowElement>('table.user tr[onclick]')) {
        const a = user.querySelector<HTMLAnchorElement>('td.user-container a');
        const m = user.attributes.getNamedItem('onclick')?.value.match(/href\s*=\s*'(.*?)'/);
        if (m) {
            a.href = m[1];
            a.onclick = (e) => e.stopPropagation();
        }
    }
}

async function handleSwapPage(): Promise<void> {
    addTrackingLinks();
    addThumbnails();
    addOpenedTabsHandler();
    addSortingOptions();
    addFilteringOptions();
    duplicatePagination();
    showAllPrices();
    addConflictHandling();
    checkSold();
    ignoreUnwanted();
    removeRowHrefFromSwapList();

    const tree = <HTMLDivElement>document.getElementById('tree');
    if (tree) {
        const filterLinks = tree.querySelectorAll<HTMLAnchorElement>('.filter-container .list-link');
        for (const a of filterLinks) {
            updateLinkHref(a);
        }

        const filterBoxes = tree.querySelectorAll<HTMLDivElement>('.filter-container .filter-box-active');
        for (const filter of filterBoxes) {
            const name = filter.getAttribute('id').replace(/-filter/, '');
            const div = filter.querySelector<HTMLDivElement>('.close');
            if (div) {
                updateOnClickHref(div, [name]);
            }
        }
    }
}

(async function () {
    const loc = document.location.href;

    if (loc.includes(`/uid`)) {
        if (loc.includes(`/uid${UID}`)) {
            await handleHomePage();
        }
        await handleProfile();
    }

    if (loc.includes('/coin')) {
        await handleCoinPage();
    }

    if (loc.includes('/gallery') && loc.includes(`uid=${UID}`)) {
        await handleGalleryPage();
    }

    if (loc.includes('/swap-')) {
        await handleSwapPage();
    }

    if (loc.includes('/table/')) {
        await handleTablePage();
    }

    if (loc.includes('/messages/')) {
        await handleMessagePage();
    }

    const tree = document.getElementById('tree');
    if (tree) {
        const treeSearchId = 'tree-search';
        const treeSearch = document.getElementById(treeSearchId);
        if (treeSearch) {
            treeSearch.closest('div').remove();
        }

        const searchInputId = 'search-input-id';
        tree.insertAdjacentHTML(
            'afterbegin',
            `<input id='${searchInputId}' class='tree-filter' placeholder='Search'/>`
        );
        const searchInput = <HTMLInputElement>document.getElementById(searchInputId);
        searchInput.addEventListener('input', () => {
            // const pattern = new RegExp([...searchInput.value].join('.*?'), 'i');
            const pattern = new RegExp(searchInput.value.replace(/\W+/g, '.*?'), 'i');
            for (const a of tree.querySelectorAll('a.country-name')) {
                const country = a.closest('div.country');
                const countryVisible: boolean = pattern.test(a.textContent);
                let visiblePeriods = 0;
                const periods = country.querySelectorAll('a.period');
                for (const p of periods) {
                    if (!countryVisible) {
                        const periodVisible: boolean = pattern.test(p.textContent);
                        p.classList.toggle('hide', !periodVisible);
                        if (periodVisible) {
                            visiblePeriods += 1;
                        }
                    } else {
                        p.classList.remove('hide');
                    }
                }
                country.classList.toggle('hide', !countryVisible && !visiblePeriods);
                const showPeriods: boolean = visiblePeriods > 0 && visiblePeriods < 6;
                const periodsBlock = country.querySelector<HTMLDivElement>('.periods');
                if (periodsBlock) {
                    periodsBlock.style.display = showPeriods ? 'block' : 'none';
                }
                const plusMinus = country.querySelector<HTMLImageElement>('img');
                plusMinus.src = showPeriods ? '/i/bg/minus.gif' : '/i/bg/plus.gif';
            }

            const visibleCountries = tree.querySelectorAll('div.country:not(.hide)');
            if (visibleCountries.length === 1) {
                const country = visibleCountries[0];
                const periodsBlock = country.querySelector<HTMLDivElement>('.periods');
                if (periodsBlock) {
                    periodsBlock.style.display = 'block';
                }
                const plusMinus = country.querySelector<HTMLImageElement>('img');
                plusMinus.src = '/i/bg/minus.gif';
            }

            for (const reg of tree.querySelectorAll('div.reg')) {
                const { length } = reg.querySelectorAll('div.country:not(.hide)');
                reg.classList.toggle('hide', !length);

                const region = reg.querySelector('.region');
                const countries = reg.querySelector('.countries');
                const visibleRegion: boolean = (length > 0 && length <= 5) || region.matches('.open');
                countries.classList.toggle('hide', !visibleRegion);
            }
        });
    }
})();
