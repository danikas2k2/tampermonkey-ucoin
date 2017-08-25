// ==UserScript==
// @name         uCoin: Coin
// @namespace    https://ucoin.net/
// @version      0.1.8
// @description  Fix tag links, add publicity toggler, and update swap prices
// @author       danikas2k2
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
// @require      https://dev.andriaus.com/ucoin/lib.prices.js?v=0.1.3
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

        function updateLinkHref() {
            const a    = $(this);
            const href = a.attr('href');
            a.attr('href', updateHref(href));
        }

        function updateHref(href) {
            const [locPath, locQuery] = getHrefParts(href);
            return [locPath, [...locQuery.entries()].map(([k, v]) => `${k}=${v.replace(/\+/g, '%2B')}`).join('&')].join('?');
        }

        function getHrefParts(href) {
            const parts = href.split('?');
            parts[1]    = new Map(parts[1].split('&').map(q => q.split('=')));
            return parts;
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

        function info(msg) {
            $.notify(msg, 'info');
        }

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
