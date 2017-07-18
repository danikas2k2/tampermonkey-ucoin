// ==UserScript==
// @name         uCoin
// @namespace    http://ucoin.net/
// @version      0.1.5
// @description  special actions
// @author       danikas2k2
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
// @match        http://*.ucoin.net/*
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


            const uid  = 'uid=28609';
            const ucid = 'ucid=';
            const loc  = document.location.href;

            if (loc.includes(uid)) {

                if (loc.includes('/swap-list/')) {
                    updateSwapPrices();
                }

                else if (loc.includes('/gallery/')) {
                    fixGalleryLinks();
                    addVisibilityToggler();
                }

            }

            else if (loc.includes(ucid) && $('#user-menu').length) {

                if (loc.includes('/coin/')) {
                    initPublicityToggler();
                    initSwapPriceUpdater();
                }

            }


            function fixGalleryLinks() {
                const gallery = $('#gallery');
                $('a[href^="/gallery/"]', gallery).each(updateLinkHref);
                $('div.close', gallery).each(updateOnClickHref);
            }

            function updateLinkHref() {
                const a    = $(this);
                const d    = [];
                const href = a.attr('href');
                if (a.hasClass('active')) {
                    d.push('view');
                }
                a.attr('href', updateHref(href, 'view', d));
            }

            function updateOnClickHref() {
                const div   = $(this);
                const match = div.attr('onclick').match(/location.href='([^']+)';/);
                if (match) {
                    const d = [];
                    if (div.parent('#status-filter').length) {
                        d.push('status');
                    } else {
                        const a = div.prevAll('a.switcher');
                        if (a.length) {
                            const view = getHrefParts(a.attr('href'))[1].get('view');
                            d.push('view');
                            d.push(view);
                        }
                    }
                    div.attr('onclick', `location.href='${updateHref(match[1], d)}';`);
                }
            }

            function updateHref(href, before = null, after = null) {
                const [locPath, locQuery] = getHrefParts(loc);

                if (before) {
                    applyQuery(locQuery, before);
                }

                applyQuery(locQuery, getHrefParts(href)[1]);

                if (after) {
                    applyQuery(locQuery, after);
                }

                return [locPath, [...locQuery.entries()].map(([k, v]) => `${k}=${v.replace(/\+/g, '%2B')}`).join('&')].join('?');
            }

            function applyQuery(query, apply) {
                if (apply) {
                    if (!(apply instanceof Map)) {
                        apply = new Map(arrayOf(apply).map(arrayOf));
                    }
                    for (const [key, value] of apply.entries()) {
                        if (!value || !value.length) {
                            query.delete(key);
                        } else {
                            query.set(key, value);
                        }
                    }
                }
            }

            function arrayOf(a) {
                return Array.isArray(a) ? a : [a];
            }

            function getHrefParts(href) {
                const parts = href.split('?');
                parts[1]    = new Map(parts[1].split('&').map(q => q.split('=')));
                return parts;
            }


            function addVisibilityToggler() {
                const coins       = $('.coin .desc-block .coin-desc', '#gallery');
                let privateStatus = coins.nextAll('span.status0');
                let publicStatus  = coins.nextAll('span.status1');

                const container  = $('<div class="left filter-container" style="float:right">').insertAfter($('#sort-filter').parent());
                const button     = $('<button class="btn-l" style="padding: 0 14px; height: 26px">');
                const showButton = button.clone().addClass('btn-blue').text('Show').click(() => toggleGroupVisibility(true)).appendTo(container);
                const hideButton = button.clone().addClass('btn-gray').text('Hide').click(() => toggleGroupVisibility(false)).appendTo(container);

                toggleButtonVisibility();

                function toggleButtonVisibility() {
                    showButton.toggle(!!privateStatus.length);
                    hideButton.toggle(!!publicStatus.length);
                }

                function toggleGroupVisibility(checked) {
                    let updateStatus   = (checked ? privateStatus : publicStatus);
                    let oppositeStatus = (checked ? publicStatus : privateStatus);
                    let addClass       = `status${checked * 1}`;
                    let removeClass    = `status${(!checked) * 1}`;
                    let text           = checked ? 'Public' : 'Private';

                    let queue = $.when();

                    updateStatus.each((i, status) => {
                        status    = $(status);
                        const url = status.prevAll('.coin-desc').children('div').first().find('a').attr('href');

                        queue = queue
                            .then($.get(url))
                            .then(html => $('form', $(html).find('#coin-form')))
                            .then(randomDelay())

                            .then(form => postPublicityForm(url, form, checked))
                            .then(() => {
                                status.removeClass(removeClass).addClass(addClass).text(text);

                                updateStatus   = updateStatus.not(status);
                                oppositeStatus = oppositeStatus.add(status);

                                toggleButtonVisibility();
                            })
                            .then(randomDelay());
                    });

                    return queue;
                }

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

            function warn(msg) {
                $.notify(msg, 'warn');
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

            function updatePrices(config) {
                let queue   = $.when();
                let updated = 0;

                $('tr.my').each((i, tr) => {
                    const $tr = $(tr);
                    if ($tr.hasClass('mark')) {
                        return false;
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

                const pn = prices.get(name);
                if (!pn.has(q)) {
                    return false;
                }

                let pp = pn.get(q);
                if (pp < price) {
                    pp = price;
                }

                return pp;
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

            function updateSwapPrices() {
                return getPriceConfig().then(config => config && updatePrices(config));
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
