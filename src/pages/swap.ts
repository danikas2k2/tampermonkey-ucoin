import { updateLinkHref, updateOnClickHref } from '../lib/links';
import {
    addConflictHandling,
    addOpenedTabsHandler,
    addPriceUpdateButton,
    addSwapTitle,
    addThumbnails,
    addTrackingLinks, calcTotalPrices,
    checkSold,
    duplicatePagination,
    ignoreUnwanted,
    markSeparateCountries,
    removeRowHrefFromSwapList,
    showAllPrices,
} from '../lib/swap-list';
import { addFilteringOptions, addSortingOptions } from '../lib/swap-list-sort';

export async function handleSwapPage(): Promise<void> {
    addSwapTitle();
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
    await addPriceUpdateButton();

    addTrackingLinks();
    calcTotalPrices();

    const tree = document.getElementById('tree') as HTMLDivElement;
    if (tree) {
        const filterLinks = tree.querySelectorAll<HTMLAnchorElement>('.filter-container .list-link');
        for (const a of filterLinks) {
            updateLinkHref(a);
        }

        const filterBoxes = tree.querySelectorAll<HTMLDivElement>('.filter-container .filter-box-active');
        for (const filter of filterBoxes) {
            const name = filter.getAttribute('id')?.replace(/-filter/, '');
            const div = filter.querySelector<HTMLDivElement>('.close');
            if (name && div) {
                updateOnClickHref(div, [name]);
            }
        }
    }
}
