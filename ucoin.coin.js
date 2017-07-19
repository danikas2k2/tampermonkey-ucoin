// ==UserScript==
// @name         uCoin: Coin
// @namespace    https://ucoin.net/
// @version      0.1.1
// @description  Fix tag links, add publicity toggler, and update swap prices
// @author       danikas2k2
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
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

            if (loc.includes('ucid=') && $('#user-menu').length) {
                initPublicityToggler();
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
                            else       info('Coin private');
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

            function getPrice(config, country, name, subject, year, q, comment, price) {
                const {prices, cheap, veryCheap} = config;

                if (subject) {
                    name = `${name} *`;
                }

                if (comment.includes('aUNC')) {
                    q = 'AU';
                } else if (comment.includes('XF++')) {
                    q = 'XF2';
                } else if (comment.includes('XF+')) {
                    q = 'XF1';
                }
                if (q === 'PRF') {
                    q = 'BU';
                }

                if (subject) {
                    if (cheap.has(country) || veryCheap.has(country)) {
                        const cheapCommemorative = new Map([['BU', 'UNC'], ['UNC', 'AU'], ['XF', 'XF2'], ['VF', 'XF1'], ['F', 'XF'], ['VG', 'VF'], ['G', 'VF']]);
                        if (cheapCommemorative.has(q)) {
                            q = cheapCommemorative.get(q);
                        }
                        name = `${name}*`; // **
                    } else {
                        const commemorative = new Map([['XF', 'AU'], ['VF', 'XF2'], ['F', 'XF1'], ['VG', 'XF'], ['G', 'VF']]);
                        if (commemorative.has(q)) {
                            q = commemorative.get(q);
                        }
                    }
                } else {
                    if (cheap.has(country)) {
                        const cheapRegular = new Map([['BU', 'UNC'], ['UNC', 'AU'], ['AU', 'XF2'], ['XF2', 'XF1'], ['XF1', 'XF'], ['XF', 'VF'], ['F', 'VF'], ['VG', 'VF'], ['G', 'VF']]);
                        if (cheapRegular.has(q)) {
                            q = cheapRegular.get(q);
                        }
                    } else if (veryCheap.has(country)) {
                        const veryCheapRegular = new Map([['BU', 'AU'], ['UNC', 'XF2'], ['AU', 'XF1'], ['XF2', 'XF'], ['XF1', 'VF'], ['XF', 'VF'], ['F', 'VF'], ['VG', 'VF'], ['G', 'VF']]);
                        if (veryCheapRegular.has(q)) {
                            q = veryCheapRegular.get(q);
                        }
                    } else {
                        const regular = new Map([['F', 'VF'], ['VG', 'VF'], ['G', 'VF']]);
                        if (regular.has(q)) {
                            q = regular.get(q);
                        }
                    }
                }

                const nameVariants = [`${name} ${year}`, name];
                if (subject) {
                    nameVariants.unshift(`${name} ${subject} ${year}`, `${name} ${subject}`);
                }

                for (let nameVariant of nameVariants) {
                    const pp = getQPrice(nameVariant);
                    if (pp !== false) {
                        return pp;
                    }
                }

                return false;

                function getQPrice(name) {
                    if (!prices.has(name)) {
                        return false;
                    }

                    const pn = prices.get(name);
                    if (!pn.has(q)) {
                        return false;
                    }

                    const pp = pn.get(q);
                    return (pp < price) ? price : pp;
                }
            }

            function getPriceConfig() {
                return getOrLoadPriceConfig().then(config => {
                    if (!config) {
                        err('config not found');
                        return null;
                    }

                    if (!config.prices) {
                        err('prices not found');
                        return null;
                    }

                    const map = new Map(Object.entries(config.prices));
                    for (const [name, prices] of map.entries()) {
                        map.set(name, new Map(Object.entries(prices)));
                    }

                    return {
                        prices:    map,
                        cheap:     new Set(config.cheap || []),
                        veryCheap: new Set(config.veryCheap || config['very-cheap'] || []),
                    };
                });
            }

            function getOrLoadPriceConfig() {
                if (localStorage.ucoinSwapPrices && (Date.now() - localStorage.ucoinSwapPricesUpdated < 86400000)) {
                    try {
                        return $.when(JSON.parse(localStorage.ucoinSwapPrices));
                    } catch (e) {
                        return loadPriceConfig();
                    }
                } else {
                    return loadPriceConfig();
                }
            }

            function loadPriceConfig() {
                return $.when($.getJSON('http://dev.andriaus.com/ucoin/ucoin-swap-prices.json')).then(data => {
                    localStorage.ucoinSwapPrices        = JSON.stringify(data);
                    localStorage.ucoinSwapPricesUpdated = Date.now();
                    return data;
                });
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
