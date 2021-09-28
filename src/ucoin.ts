// ==UserScript==
// @name         collector :: ucoin.net
// @namespace    https://ucoin.net/
// @version      {{project.version}}
// @author       danikas2k2
// @icon         data:@file/png;base64,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
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
    addSwapTitle,
    addThumbnails,
    addTrackingLinks,
    checkSold,
    duplicatePagination,
    ignoreUnwanted,
    markSeparateCountries,
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
                        price,
                    )}</small>`,
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
                    .replace(/&gt;/gi, '>'),
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
                    })</small>`,
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
            `<a class='list-link' href='${url.href}'><div class='left gray-13'>Krause</div><div class='right'><span class='arrow at'></span></div></a>`,
        );
        sp.set('order', 'kd');
        sortFilterDialog.insertAdjacentHTML(
            'beforeend',
            `<a class='list-link' href='${url.href}'><div class='left gray-13'>Krause</div><div class='right'><span class='arrow ab'></span></div></a>`,
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
    addSwapTitle();
    addTrackingLinks();
    addThumbnails();
    markSeparateCountries();
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

(async function() {
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
            `<input id='${searchInputId}' class='tree-filter' placeholder='Search'/>`,
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
