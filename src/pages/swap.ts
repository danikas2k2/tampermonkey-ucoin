import {
    improveCheckboxSelection,
    improveHeadingCheckboxes,
    syncHeadingCheckbox,
} from '../lib/checkboxes';
import { updateLinkHref, updateOnClickHref } from '../lib/links';
import {
    addConflictHandling,
    addOpenedTabsHandler,
    addSwapTitle,
    addThumbnails,
    addTrackingLinks,
    calcTotalPrices,
    checkSold,
    duplicatePagination,
    ignoreUnwanted,
    markSeparateCountries,
    removeRowHrefFromSwapList,
    showAllPrices,
} from '../lib/swap-list';
import { improveSwapButtons } from '../lib/swap-list-actions';
import { addFilteringOptions } from '../lib/swap-list-filter';
import { addSortingOptions } from '../lib/swap-list-sort';

function fixCurrencyStyle() {}

export async function handleSwapPage(): Promise<void> {
    addSwapTitle();
    addThumbnails();
    markSeparateCountries();
    addOpenedTabsHandler();
    addSortingOptions();
    addFilteringOptions();
    fixCurrencyStyle();
    duplicatePagination();
    showAllPrices();
    addConflictHandling();
    checkSold();
    ignoreUnwanted();
    removeRowHrefFromSwapList();
    addTrackingLinks();
    calcTotalPrices();

    improveCheckboxSelection('.edit-checkbox', syncHeadingCheckbox);
    improveHeadingCheckboxes();
    improveSwapButtons();
    // TODO add async load on filters and sorting
    // TODO add a11y kbd navigation to filters

    const tree = document.querySelector<HTMLDivElement>('#tree');
    if (!tree) {
        return;
    }

    const filterLinks = tree.querySelectorAll<HTMLAnchorElement>('.filter-container .list-link');
    for (const a of filterLinks) {
        updateLinkHref(a);
    }

    const filterBoxes = tree.querySelectorAll<HTMLDivElement>(
        '.filter-container .filter-box-active'
    );
    for (const filter of filterBoxes) {
        const name = filter.getAttribute('id')?.replace(/-filter/, '');
        const div = filter.querySelector<HTMLDivElement>('.close');
        if (name && div) {
            updateOnClickHref(div, [name]);
        }
    }
}
