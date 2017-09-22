// ==UserScript==
// @name         uCoin: Swap-Manager
// @namespace    https://ucoin.net/
// @version      0.1.6
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

        const CN = new Map([
            ['7',  1],
            ['8',  2],
            ['9',  3],
            ['10', 4],
            ['11', 5],
            ['12', 6],
            ['3',  7],
            ['2',  8],
            ['1',  9],
        ]);

        const CM = new Map([
            ['G',   1],
            ['VG',  2],
            ['F',   3],
            ['VF',  4],
            ['XF',  5],
            ['UNC', 6],
            ['PRF', 7],
            ['PRF', 8],
        ]);

        const isSelected = $('#need-swap-list').length;
        const $table = $('table.swap-coin');
        const $list = $('tr', $table);

        addTrackingLinks();
        showAllPrices();
        hiliteConflicting();
        if (!isSelected) {
            handleCheckEvent();
            grayOutUnwanted();
        }

        function showAllPrices() {
            $list.each((i, tr) => {
                const $tr = $(tr);
                const $td = $('.td-cond + *', tr);
                const myPrice = +$('span.blue-13', $td).text();
                const prefix = $('span.gray-11:first-child', $td).text();
                const suffix = $('span.gray-11:last-child', $td).text();
                const tooltipPrice = $tr.data('tooltipPrice');
                if (tooltipPrice) {
                    const price = +tooltipPrice.replace(prefix, '').replace(suffix, '');
                    if (!isNaN(price) && myPrice !== price) {
                        $td.append(`<br/><span class="gray-11">${prefix}${price.toFixed(2)}${suffix}</span>`);
                    }
                } else {
                    $td.append(`<br/><span class="gray-11">— ¿? —</span>`);
                }
            });
        }

        function grayOutUnwanted() {
            $list.each((i, tr) => {
                const $tr = $(tr);
                const marked = $('td span[class^="marked-"]', $tr).attr('class');
                const myQuality = marked && CN.get(marked.split('marked-').pop()) || 0;
                const quality = CM.get($('td.td-cond', $tr).text()) || 0;
                if (myQuality && (!quality || quality <= myQuality)) {
                    $tr.css('opacity', '.5');
                }
            });
        }

        function hiliteConflicting() {
            let $checked = $list;
            if (!isSelected) {
                $checked = $checked.has('input.swap-checkbox:checked');
            }
            $checked.each((i, tr) => {
                const data = $(tr).data();
                const $dup = $checked.filter(`[data-tooltip-name=${JSON.stringify(data.tooltipName)}]` +
                                                `[data-tooltip-subject=${JSON.stringify(data.tooltipSubject)}]` +
                                                `[data-tooltip-variety=${JSON.stringify(data.tooltipVariety)}]` +
                                                `[data-tooltip-km=${JSON.stringify(data.tooltipKm)}]`);
                $dup.css('background', ($dup.length > 1) ? '#ffeeee' : '');
            });
        }

        function handleCheckEvent() {
            $table.on('click', 'input.swap-checkbox', e => {
                const $input = $(e.target);
                if (!$input.is(':checked')) {
                    $input.parents('tr').css('background','');
                }
                hiliteConflicting();
            });
        }

        function addTrackingLinks() {
            $('div.left.lgray-11:contains("Track")+div.right.gray-11', '#swap-mgr').each((i, div) => {
                const $div = $(div);
                const text = $div.text();
                if (text) {
                    $div.html(`<a href="https://www.17track.net/en/track?nums=${text}">${text}</a>`);
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
