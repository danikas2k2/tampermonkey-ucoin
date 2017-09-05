// ==UserScript==
// @name         uCoin: Swap-Manager
// @namespace    https://ucoin.net/
// @version      0.1.2
// @description  Show all prices
// @author       danikas2k2
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://*.ucoin.net/swap-mgr/*
// @match        https://*.ucoin.net/swap-list/*
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

        showAllPrices();

        function showAllPrices() {
            $('table.swap-coin tr').each((i, tr) => {
                const $tr = $(tr);
                const $td = $('td.td-cond + td', tr);
                const myPrice = +$('span.blue-13', $td).text();
                const prefix = $('span.gray-11:first-child', $td).text();
                const suffix = $('span.gray-11:last-child', $td).text();
                const price = +$tr.data('tooltipPrice').replace(prefix, '').replace(suffix, '');
                if (!isNaN(price) && myPrice !== price) {
                    $td.append(`<br/><span class="gray-11">${prefix}${price.toFixed(2)}${suffix}</span>`);
                }
            });
        }

    })(jQuery);

// @formatter:off

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
