// ==UserScript==
// @name         collector :: ucoin.net
// @namespace    https://ucoin.net/
// @version      [AIV]{version}[/AIV]
// @date         [AIV]{date}[/AIV]
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @downloadURL  https://bitbucket.org/danikas2k2/collection.userscripts/raw/HEAD/dist/ucoin.js
// @updateURL    https://bitbucket.org/danikas2k2/collection.userscripts/raw/HEAD/dist/ucoin.js
// @match        https://*.ucoin.net/*
// @run-at       document-end
// ==/UserScript==


import style from '../styles/ucoin.less';
document.head.insertAdjacentHTML("beforeend", `<style type="text/css">${style}</style>`);


'use strict';

import {updateLinkHref, updateOnClickHref} from './lib/links';
import {addBuyDateResetButton, addPublicityToggle, addReplacementToggle, addSyncConditionToColorTable} from './lib/coin-form';
import {addSwapButtons, addSwapColorMarkers, addSwapComments, addSwapFormQtyButtons, styleSwapLists} from './lib/swap-form';
import {addConflictHandling, addTrackingLinks, checkSold, ignoreUnwanted, showAllPrices} from './lib/swap-list';
import {addGalleryVisibilityToggle} from './lib/gallery';
import {estimateSwapPrices} from './lib/prices';

const UID = '28609';

const loc = document.location.href;

if (loc.includes('/coin/')) {


    const tags = document.getElementById('tags');
    if (tags) {
        // fixTagLinks
        tags.querySelectorAll('a[href^="/gallery/"]').forEach(updateLinkHref);
    }

    addBuyDateResetButton();
    addSyncConditionToColorTable();

    if (loc.includes('ucid=')) {
        addPublicityToggle();
        addReplacementToggle();
    }

    const mySwap = document.getElementById('my-swap-block');
    if (mySwap && mySwap.querySelector('#swap-block')) {
        addSwapFormQtyButtons();
        addSwapColorMarkers();
        addSwapComments();
        addSwapButtons();
    }

    styleSwapLists();
    const theySwap = document.getElementById('swap');
    if (theySwap && theySwap.nextElementSibling.id === 'swap-block') {
        estimateSwapPrices();
    }


}


if (loc.includes('/gallery/') && loc.includes(`uid=${UID}`)) {


    const gallery = document.getElementById('gallery');
    if (gallery) {
        // fix gallery links
        gallery.querySelectorAll('a[href^="/gallery/"]').forEach(updateLinkHref);
        gallery.querySelectorAll('a[href^="?"]').forEach(updateLinkHref);
        gallery.querySelectorAll('div.close').forEach(updateOnClickHref);
    }

    addGalleryVisibilityToggle();


}


if (loc.includes('/swap-mgr/') || loc.includes('/swap-list/')) {


    addTrackingLinks();
    showAllPrices();
    addConflictHandling();

    checkSold();
    ignoreUnwanted();


}
