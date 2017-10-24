// ==UserScript==
// @name         uCoin: Coin
// @namespace    https://ucoin.net/
// @version      0.1.12.1
// @description  Fix tag links, add publicity toggler, and update swap prices
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
// @require      https://dev.andriaus.com/ucoin/lib.delay.js?v=0.1.0
// @require      https://dev.andriaus.com/ucoin/lib.links.js?v=0.1.0
// @require      https://dev.andriaus.com/ucoin/lib.notify.js?v=0.1.0
// @require      https://dev.andriaus.com/ucoin/lib.prices.js?v=0.1.6
// @require      https://dev.andriaus.com/ucoin/lib.utils.js?v=0.1.0
// @match        https://*.ucoin.net/coin/*
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

        const loc = document.location.href;


        fixTagLinks();

        if ($('#user-menu').length) {
            initFormImprovements();

            if (loc.includes('ucid=')) {
                initPublicityToggler();
            }
        }

        if ($('#swap-block').length) {
            initSwapPriceUpdater();
        }


        function fixTagLinks() {
            const tags = $('#tags');
            $('a[href^="/gallery/"]', tags).each(updateLinkHref);
        }

        function initPublicityToggler() {
            const view   = $('#my-func-block');
            const status = $('.status-line .left', view);
            const edit   = $('button.btn-blue', view);

            const form  = $('form', '#coin-form');
            let checked = $('input[name=public]', form).prop('checked');

            const button = edit.clone()
                .removeAttr('onclick')
                .css('padding', '4px 14px')
                .insertBefore(edit)
                .click(() => {
                    $.when(postPublicityForm(loc, form, !checked)).then(() => {
                        checked = !checked;
                        updatePublicityStatus();
                        if (checked) ok('Coin public');
                        else info('Coin private');
                    });
                });

            let prevKeyCode;
            $('body').keydown(e => {
                if (e.keyCode === prevKeyCode && e.keyCode === (checked ? 72 : 83)) {
                    button.click();
                }
                prevKeyCode = e.keyCode;
            });

            updatePublicityStatus();

            function updatePublicityStatus() {
                button
                    .text(checked ? 'Hide' : 'Show')
                    .toggleClass('btn-blue', !checked)
                    .toggleClass('btn-gray', checked);

                status
                    .text(checked ? 'Public' : 'Private')
                    .toggleClass('status0', !checked)
                    .toggleClass('status1', checked);
            }
        }

        function initFormImprovements() {
            const form = $('form', '#coin-form');
            const cond = $('#condition', form);

            $('<a href="#">&#x21BB;</a>')
                .css({
                    fontSize:   '16px',
                    fontWeight: 'bold',
                    width:      '22px',
                    height:     '22px',
                    display:    'inline-block',
                    textAlign:  'center'
                })
                .click(() => {
                    const d = new Date();
                    let m   = d.getMonth() + 1;
                    if (m < 10) {
                        m = `0${m}`;
                    }
                    const y = d.getFullYear();
                    $('#buy_month', form).val(m);
                    $('#buy_year', form).val(y);
                    return false;
                })
                .insertBefore($('#buy_month', form));

            const CN = new Map([
                ['6', '7'],  // G
                ['5', '8'],  // VG
                ['4', '9'],  // F
                ['3', '10'], // VF
                ['2', '11'], // XF
                ['1', '12'], // UNC
                ['7', '3'],  // PRf
            ]);

            const CL = new Map([...CN.entries()].map(([k, v]) => [v, k])); // switch conditions and colors

            $('table div[class^="marked-"]', form).not('#set-color')
                .click(e => {
                    const div   = $(e.target);
                    const color = div.attr('class').split(' ')
                        .map(c => c.startsWith('marked-') ? c.split('-', 3)[1] : null)
                        .filter(c => !!c).pop(); // get last marked color
                    if (CL.has(color)) {
                        cond.val(CL.get(color));
                    }
                });

            cond.change(e => {
                const value = $('#table-color', form);
                const color = $('#set-color', form);
                color.removeClass(`marked-${value.val()}`);

                const condition = $(e.target).val();
                if (CN.has(condition)) {
                    value.val(CN.get(condition));
                }

                color.addClass(`marked-${value.val()}`);
            });
        }

        function postPublicityForm(url, form, checked) {
            $('input[name=public]', form).prop('checked', checked);
            return $.post(url, $(form).serialize());
        }

        function initSwapPriceUpdater() {
            getPriceConfig().then(config => {
                const coin      = $('#coin');
                const swapForm  = $('#swap-form', coin);
                const swapBlock = $('+ #swap-block', swapForm);

                const country = sp($('th:contains("Country") + td', coin).text());
                const name    = sp($('th:contains("Denomination") + td', coin).text());
                const subject = sp($('th:contains("Subject") + td', coin).text());
                const price   = sp($('a[href="#price"] span', coin).text());

                let queue = $.when();

                $('a', swapBlock).each((i, a) => {
                    const $a      = $(a);
                    const onclick = $a.attr('onclick');
                    const match   = onclick.match(/CoinSwapFormOn\('([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)'/);
                    if (match) {
                        const [, usid, cond, pp, info, vid, qty] = match;

                        const year = sp($('span.left.gray-13', $a).text());
                        const q    = sp($('span.left.dgray-11', $a).text());

                        const p = getPrice(config, country, name, subject, year, q, info, price);
                        if (p === false || p === pp) {
                            return;
                        }

                        queue = queue.then(() => {
                            const map = new Map(swapForm.serializeArray().map(({name, value}) => [name, value]));
                            map.set('usid', usid);
                            map.set('condition', cond);
                            map.set('qty', qty);
                            map.set('swap-variety', vid);
                            map.set('comment', info);
                            map.set('price', p);
                            map.set('action', 'editswapcoin');
                            return $.post(loc, [...map.entries()].map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&'));
                        }).then(() => {
                            $a.css("transition", "background-color .5s").css("background-color", "#C4F9AC")
                                .find('span.right')
                                .html(`<span class="lgray-11">€ </span>${p}<span class="lgray-11"></span>`)
                                .css({
                                    "font-weight": "bold",
                                    "color":       (p === price) ? "" : ((p > price) ? "brown" : "green")
                                });
                        }).then(randomDelay());
                    }
                });
            });
        }

    })(jQuery);

// @formatter:off

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
