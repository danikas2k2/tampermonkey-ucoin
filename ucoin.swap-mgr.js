// ==UserScript==
// @name         uCoin: Swap-Manager
// @namespace    https://ucoin.net/
// @version      0.1.9.1
// @description  Show all prices
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://dev.andriaus.com/ucoin/lib.delay.js?v=0.1.1
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

        $(`<style type='text/css'>
#swap-list .swap-coin tr,
#swap-mgr .swap-coin tr { transition: opacity .25s, background .25s; }

#swap-list .swap-coin tr[ignore],
#swap-mgr .swap-coin tr[ignore] { opacity: .5; }

#swap-list .swap-coin tr.mark[ignore],
#swap-mgr .swap-coin tr.mark[ignore],
#swap-list .swap-coin tr[ignore][conflict],
#swap-mgr .swap-coin tr[ignore][conflict] { opacity: .75; }

#swap-iist .swap-coin tr[conflict],
#swap-mgr .swap-coin tr[conflict] { background: #fdd; }

#swap-list .swap-coin tr.mark[conflict],
#swap-mgr .swap-coin tr.mark[conflict] { background: #fed; }
</style>`).appendTo("head");

        const CN = new Map([
            ['7', 1],
            ['8', 2],
            ['9', 3],
            ['10', 4],
            ['11', 5],
            ['12', 6],
            ['3', 7],
            ['2', 8],
            ['1', 9],
        ]);

        const CM = new Map([
            ['G', 1],
            ['VG', 2],
            ['F', 3],
            ['VF', 4],
            ['XF', 5],
            ['UNC', 6],
            ['PRF', 7],
            ['PRF', 8],
        ]);

        const needSwapList = $('#need-swap-list');
        const actionBoard = $('.action-board', needSwapList);
        const isSelected = needSwapList.length;

        const $table     = $('table.swap-coin');
        const $list      = $('tr', $table);

        addTrackingLinks();
        showAllPrices();
        hiliteConflicting();
        if (!isSelected) {
            handleCheckEvent();
            grayOutUnwanted();
        } else {
            checkSold();
        }

        function checkSold() {
            const soldList = $list.filter('.del');
            let soldCount = soldList.length;
            if (soldCount) {
                const button = $('<a class="btn-s btn-gray ico-del" id="act-d-all" style="float: right;"><div class="ico-16"></div></a>');
                button.on('click', () => {
                    if (! confirm('Are you sure you want to delete these coins?')) return false;
                    let queue   = $.when();
                    soldList.each((i, sold) => {
                        queue = queue.then(() => {
                            const href = $('a.act', sold).attr('href');
                            return $.get(href);
                        }).then(() => {
                            const $soldCount = $('a.region.list-link div.right.blue-13 sup', '#tree');
                            if (--soldCount) {
                                $soldCount.html(`&nbsp;-${soldCount}`);
                            } else {
                                $soldCount.remove();
                            }
                            $(sold).remove();
                        }).then(randomDelay());
                    });
                    queue.done(() => {
                        button.remove();
                    });
                });
                actionBoard.append(button);
            }
        }

        function showAllPrices() {
            $list.each((i, tr) => {
                const $tr          = $(tr);
                const $td          = $('.td-cond + *', tr);
                const myPrice      = +$('span.blue-13', $td).text();
                const prefix       = $('span.gray-11:first-child', $td).text();
                const suffix       = $('span.gray-11:last-child', $td).text();
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
                const $tr       = $(tr);
                const marked    = $('td span[class^="marked-"]', $tr).attr('class');
                const myQuality = marked && CN.get(marked.split('marked-').pop()) || 0;
                const quality   = CM.get($('td.td-cond', $tr).text()) || 0;
                if (myQuality && (!quality || quality <= myQuality)) {
                    $tr.attr('ignore', true);
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
                if ($dup.length > 1) {
                    $dup.attr('conflict', true);
                } else {
                    $dup.removeAttr('conflict');
                }
            });
        }

        function handleCheckEvent() {
            $table.on('click', 'input.swap-checkbox, input.swap-country-checkbox', e => {
                const $input = $(e.target);
                if (!$input.is(':checked')) {
                    $input.parents('tr').removeAttr('conflict');
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
