// ==UserScript==
// @name         uCoin: Gallery
// @namespace    https://ucoin.net/
// @version      0.2.0
// @description  Fix gallery links and add publicity toggler
// @author       danikas2k2
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @match        https://*.ucoin.net/gallery/?*uid=28609*
// ==/UserScript==

'use strict';

import {randomDelay} from './lib/delay';
import {updateLinkHref, updateOnClickHref} from './lib/links';
import {get, post} from './lib/ajax';

(() => {

    fixGalleryLinks();

    addPublicityToggler();

    const gallery = document.getElementById('gallery');

    function fixGalleryLinks() {
        gallery.querySelectorAll('a[href^="/gallery/"]').forEach(updateLinkHref);
        gallery.querySelectorAll('a[href^="?"]').forEach(updateLinkHref);
        gallery.querySelectorAll('div.close').forEach(updateOnClickHref);
    }

    function addPublicityToggler() {
        const coins = gallery.querySelector('.coin .desc-block .coin-desc');

        let privateStatus: NodeListOf<HTMLDivElement>,
            publicStatus: NodeListOf<HTMLDivElement>;
        updateStatusElements();

        const buttonContainerId = 'button-container';
        const sortFilter = document.getElementById('sort-filter').parentElement;
        sortFilter.insertAdjacentHTML("afterend", `<div id="${buttonContainerId}" class="left filter-container" style="float:right">`);
        const container = document.getElementById(buttonContainerId);

        const showButton = addVisibilityToggler('Show', 'btn-blue', true);
        const showButtonCount = showButton.querySelector('small');
        const hideButton = addVisibilityToggler('Hide', 'btn-gray', false);
        const hideButtonCount = hideButton.querySelector('small');

        toggleButtonVisibility();

        function addVisibilityToggler(text: string, className: string, visibility: boolean): HTMLButtonElement {
            const buttonId = `button-${text.toLowerCase()}`;
            container.insertAdjacentHTML("beforeend", `<button id="${buttonId}" class="btn-l ${className}" style="padding: 0 14px; height: 26px">${text} <small></small></button>`);
            const button = <HTMLButtonElement>document.getElementById(buttonId);
            button.addEventListener("click", () => toggleGroupVisibility(visibility));
            return button;
        }

        function toggleButtonVisibility() {
            showButtonCount.textContent = `(${privateStatus.length})`;
            showButton.style.display = privateStatus.length ? 'block' : 'none';
            hideButtonCount.textContent = `(${publicStatus.length})`;
            hideButton.style.display = publicStatus.length ? 'block' : 'none';
        }

        function toggleGroupVisibility(checked: boolean) {
            let addClass = `status${checked ? 1 : 0}`;
            let removeClass = `status${checked ? 0 : 1}`;
            let text = checked ? 'Public' : 'Private';

            let queue = Promise.resolve();

            (checked ? privateStatus : publicStatus).forEach(status => {
                const url = (<HTMLAnchorElement>status.querySelector(`~ .coin-desc div a`)).href;

                queue = queue
                    .then(() => get(url))
                    .then(response => response.text())
                    .then(text => {
                        const fragment = document.createDocumentFragment();
                        fragment.textContent = text;
                        return fragment;
                    })
                    .then((fragment: DocumentFragment) => fragment.getElementById('coin-form').querySelector('form'))
                    .then(form => postPublicityForm(url, form, checked))
                    .then(() => {
                        status.classList.replace(removeClass, addClass);
                        status.textContent = text;

                        updateStatusElements();
                        toggleButtonVisibility();
                    })
                    .then(randomDelay());
            });

            return queue;
        }

        function updateStatusElements() {
            privateStatus = coins.querySelectorAll('span.status0');
            publicStatus = coins.querySelectorAll('span.status1');
        }
    }

    function postPublicityForm(url: RequestInfo, form: HTMLFormElement, checked: boolean) {
        (<HTMLInputElement>form.querySelector('input[name=public]')).checked = checked;
        return post(url, new FormData(form));
    }

})();
