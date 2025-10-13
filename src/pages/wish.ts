import { addThumbnails, decorateConditionRows } from '../lib/coin-list';

export async function handleWishPage(): Promise<void> {
    const tableSelector = 'table.wish-coin';
    // addSwapTitle();
    addThumbnails(tableSelector);
    // markSeparateCountries();
    // addOpenedTabsHandler();
    // addSortingOptions();
    // addFilteringOptions();
    // duplicatePagination();
    // showAllPrices();
    decorateConditionRows(tableSelector);
    // addConflictHandling();
    // checkSold();
    // ignoreUnwanted();
    // removeRowHrefFromSwapList();
    // await addPriceUpdateButton();
    //
    // const tree = document.getElementById('tree') as HTMLDivElement;
    // if (tree) {
    //     const filterLinks = tree.querySelectorAll<HTMLAnchorElement>('.filter-container .list-link');
    //     for (const a of filterLinks) {
    //         updateLinkHref(a);
    //     }
    //
    //     const filterBoxes = tree.querySelectorAll<HTMLDivElement>('.filter-container .filter-box-active');
    //     for (const filter of filterBoxes) {
    //         const name = filter.getAttribute('id')?.replace(/-filter/, '');
    //         const div = filter.querySelector<HTMLDivElement>('.close');
    //         if (name && div) {
    //             updateOnClickHref(div, [name]);
    //         }
    //     }
    // }
}
