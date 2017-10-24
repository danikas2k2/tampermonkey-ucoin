// ==UserScript==
// @name         uCoin: Swap-list
// @namespace    https://ucoin.net/
// @version      0.1.7
// @description  Update swap prices
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
// @require      https://dev.andriaus.com/ucoin/lib.delay.js?v=0.1.0
// @require      https://dev.andriaus.com/ucoin/lib.prices.js?v=0.1.5
// @require      https://dev.andriaus.com/ucoin/lib.notify.js?v=0.1.0
// @require      https://dev.andriaus.com/ucoin/lib.utils.js?v=0.1.0
// @match        https://*.ucoin.net/swap-list/?*uid=28609*
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

        updateSwapPrices();

        function updatePrices(config) {
            let queue   = $.when();
            let updated = 0;

            $('tr.my').each((i, tr) => {
                const $tr = $(tr);
                if ($tr.hasClass('mark')) {
                    return;
                }

                const trData  = $tr.data();
                const name    = sp($('td:nth-child(3) > a', $tr).text());
                const tooltip = sp(trData.tooltipName);
                const country = tooltip.substr(0, tooltip.indexOf(name) - 1);
                const subject = sp($('td > a.dgray-12', $tr).text());
                const year    = sp($('th + td', $tr).text());
                const q       = sp($('th.td-cond > span.txt', $tr).text());
                const comment = sp($('th > a > div.ico-16[title]', $tr).attr('title'));
                const price   = (+trData.tooltipPrice.substr(2)).toFixed(2);

                const p = getPrice(config, country, name, subject, year, q, comment, price);
                if (p === false) {
                    return;
                }

                const pin = $('span.edt > input[type=text][id^=price-]', tr);
                const pp  = `${pin.val()}`;
                if (pp === p) {
                    return;
                }

                queue = queue.then(() => {
                    $('div.act > div.ico-edit', tr).click();
                    pin.val(p);
                    $('div.act > div.ico-save', tr).click();
                    updated++;

                    $tr.css("transition", "background-color .5s").css("background-color", "#C4F9AC")
                        .find('th span[id^="s-price"]')
                        .html(`<span class="lgray-11">€ </span><span class="blue-13">${p}</span><span class="lgray-11"></span>`)
                        .css({
                            "font-weight": "bold",
                            "color":       (p === price) ? "" : ((p > price) ? "brown" : "green")
                        });
                }).then(randomDelay());
            });

            queue.done(() => {
                if (updated) {
                    ok(`${updated} coins updated`);
                }
            });
        }

        function updateSwapPrices() {
            return getPriceConfig().then(config => config && updatePrices(config));
        }

    })(jQuery);

// @formatter:off

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
