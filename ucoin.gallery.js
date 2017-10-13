// ==UserScript==
// @name         uCoin: Gallery
// @namespace    https://ucoin.net/
// @version      0.1.9
// @description  Fix gallery links and add publicity toggler
// @author       danikas2k2
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
// @require      https://dev.andriaus.com/ucoin/lib.delay.js?v=0.1.0
// @require      https://dev.andriaus.com/ucoin/lib.links.js?v=0.1.0
// @match        https://*.ucoin.net/gallery/?*uid=28609*
// ==/UserScript==

// @formatter:off

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

// @formatter:on

    (function ($) {
        "use strict";

        fixGalleryLinks();

        addPublicityToggler();


        function fixGalleryLinks() {
            const gallery = $('#gallery');
            $('a[href^="/gallery/"]', gallery).each(updateLinkHref);
            $('a[href^="?"]', gallery).each(updateLinkHref);
            $('div.close', gallery).each(updateOnClickHref);
        }

        function addPublicityToggler() {
            const coins       = $('.coin .desc-block .coin-desc', '#gallery');
            let privateStatus = coins.nextAll('span.status0');
            let publicStatus  = coins.nextAll('span.status1');

            const container  = $('<div class="left filter-container" style="float:right">').insertAfter($('#sort-filter').parent());
            const button     = $('<button class="btn-l" style="padding: 0 14px; height: 26px">');
            const showButton = button.clone().addClass('btn-blue').click(() => toggleGroupVisibility(true)).appendTo(container);
            const hideButton = button.clone().addClass('btn-gray').click(() => toggleGroupVisibility(false)).appendTo(container);

            toggleButtonVisibility();

            function toggleButtonVisibility() {
                showButton.html(`Show <small>(${privateStatus.length})</small>`).toggle(!!privateStatus.length);
                hideButton.html(`Hide <small>(${publicStatus.length})</small>`).toggle(!!publicStatus.length);
            }

            function toggleGroupVisibility(checked) {
                let addClass    = `status${checked * 1}`;
                let removeClass = `status${(!checked) * 1}`;
                let text        = checked ? 'Public' : 'Private';

                let queue = $.when();

                (checked ? privateStatus : publicStatus).each((i, status) => {
                    const $status = $(status);
                    const url     = $status.prevAll('.coin-desc').children('div').first().find('a').attr('href');

                    queue = queue
                        .then(() => $.get(url))
                        .then(html => $('form', $(html).find('#coin-form')))
                        .then(form => postPublicityForm(url, form, checked))
                        .then(() => {
                            $status.removeClass(removeClass).addClass(addClass).text(text);

                            privateStatus = privateStatus[checked ? 'not' : 'add']($status);
                            publicStatus  = publicStatus[checked ? 'add' : 'not']($status);

                            toggleButtonVisibility();
                        })
                        .then(randomDelay());
                });

                return queue;
            }
        }

        function postPublicityForm(url, form, checked) {
            $('input[name=public]', form).prop('checked', checked);
            return $.post(url, $(form).serialize());
        }

    })(jQuery);

// @formatter:off

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
