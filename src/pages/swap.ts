import {
    improveCheckboxSelection,
    improveHeadingCheckboxes,
    syncHeadingCheckbox,
} from '../lib/checkboxes';
import { addThumbnails, decorateConditionRows } from '../lib/coin-list';
import {
    addConflictHandling,
    addOpenedTabsHandler,
    addSwapTitle,
    addTrackingLinks,
    calcTotalPrices,
    checkSold,
    duplicatePagination,
    expandUserInfo,
    fixFilterLinks,
    ignoreUnwanted,
    listenForReserveCountChange,
    markSeparateCountries,
    removeRowHrefFromSwapList,
    showAllPrices,
} from '../lib/swap-list';
import { improveSwapButtons } from '../lib/swap-list-actions';
import { addFilteringOptions } from '../lib/swap-list-filter';
import { addSortingOptions } from '../lib/swap-list-sort';

export async function handleSwapPage(): Promise<void> {
    addSwapTitle();
    expandUserInfo();
    addThumbnails();
    markSeparateCountries();
    addOpenedTabsHandler();
    addSortingOptions();
    addFilteringOptions();
    duplicatePagination();
    showAllPrices();
    decorateConditionRows();
    addConflictHandling();
    checkSold();
    ignoreUnwanted();
    removeRowHrefFromSwapList();
    addTrackingLinks();
    listenForReserveCountChange();
    calcTotalPrices();
    improveCheckboxSelection('.edit-checkbox', syncHeadingCheckbox);
    improveHeadingCheckboxes();
    improveSwapButtons();
    fixFilterLinks();
}
