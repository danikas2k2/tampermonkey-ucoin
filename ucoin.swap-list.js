// ==UserScript==
// @name         uCoin: Swap-list
// @namespace    https://ucoin.net/
// @version      0.1.3
// @description  Update swap prices
// @author       danikas2k2
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
// @require      https://dev.andriaus.com/ucoin/lib.prices.js?v=0.1.3
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


        function err(msg) {
            $.notify(msg, 'error');
        }

        function ok(msg) {
            $.notify(msg, 'success');
        }

        function sp(str) {
            return `${str || ''}`.replace(/\u{00A0}+/gu, ' ').replace(/\s+/g, ' ').trim();
        }

        function delay(time) {
            return () => {
                const ret = new $.Deferred();
                setTimeout(() => {
                    ret.resolve();
                }, time);
                return ret;
            };
        }

        function randomDelay() {
            return delay(Math.round(1000 + Math.random() * 2000));
        }

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
