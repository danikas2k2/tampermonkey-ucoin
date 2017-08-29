// ==UserScript==
// @name         uCoin: Swap-Manager
// @namespace    https://ucoin.net/
// @version      0.1.0
// @description  Show all prices
// @author       danikas2k2
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://*.ucoin.net/swap-mgr/*
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
                const myPrice = $td.text();
                const theyPrice = $tr.data('tooltipPrice');
                if (myPrice !== theyPrice) {
                    $td.append(`<span class="gray-11">(${theyPrice})</span>`);
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
