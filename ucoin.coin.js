// ==UserScript==
// @name         uCoin: Coin
// @namespace    https://ucoin.net/
// @version      0.1.15
// @description  Fix tag links, add publicity toggler, expand/combine swap coins, and update swap prices
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
// @require      https://dev.andriaus.com/ucoin/lib.delay.js?v=0.1.1
// @require      https://dev.andriaus.com/ucoin/lib.links.js?v=0.1.1
// @require      https://dev.andriaus.com/ucoin/lib.notify.js?v=0.1.0
// @require      https://dev.andriaus.com/ucoin/lib.prices.js?v=0.1.8
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

        const coin      = $('#coin');
        const swapForm  = $('#swap-form', coin);
        const swapBlock = $('+ #swap-block', swapForm);


        fixTagLinks();

        if ($('#user-menu').length) {
            initFormImprovements();

            if (loc.includes('ucid=')) {
                initPublicityToggler();
            }
        }

        if (swapBlock.length) {
            initSwapPriceUpdater();
            addSwapComments();
            addSwapButtons();
        }

        function addSwapComments() {
            const links = $('a.list-link', swapBlock);
            links.each((i, a) => {
                a = $(a);
                const m = (a.attr('onclick') || '').match(/CoinSwapFormOn\((?:'[^']*', ){3}'([^']+)'/);
                if (m && m[1]) {
                    a.append(`<span class="right dgray-11 wrap" style="width:auto" title="${m[1]}"><div class="ico-16" style="display: inline-block;vertical-align: middle; background-position: -16px 0px;"></div> ${m[1]}</span>`);
                }
            });
        }

        function addSwapButtons() {
            const buttons = $('center', swapBlock);
            const variants = new Map();
            let couldExpand = false, couldCombine = false;

            function getSwapLinks() {
                return $('a.list-link', swapBlock);
            }

            function forEachSwapLink(fn) {
                getSwapLinks().each((i, a) => {
                    a = $(a);
                    if ($('> div.ico-16', a).length) {
                        return;
                    }

                    const m = (a.attr('onclick') || '').match(/CoinSwapFormOn\('([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)'\)/);
                    if (m) {
                        m[0] = `${cond} ${vid} ${info}`;
                        fn(i, a, m);
                    }
                });
            }

            function updateSwapVariants() {
                forEachSwapLink((i, a, m) => {
                    const [uniq, usid, cond, price, info, vid, qty] = m;
                    if (qty > 1) {
                        couldExpand = true;
                    }
                    let variant;
                    if (variants.has(uniq)) {
                        variant = variants.get(uniq);
                        variant.qty += +qty;
                        couldCombine = true;
                    } else {
                        variant = {usid, cond, price, info, vid, qty: +qty};
                    }
                    variants.set(uniq, variant);
                });
            }

            function updateButtons() {
                updateSwapVariants();
                couldExpand ? addExpandButton() : removeExpandButton();
                couldCombine ? addCombineButton() : removeCombineButton();
            }

            function disableButtons() {
                $('button.btn--combiners', buttons)
                    .addClass('btn-white')
                    .removeClass('btn-blue')
                    .prop('disabled', true);
            }

            function enableButtons() {
                $('button.btn--combiners', buttons)
                    .addClass('btn-blue')
                    .removeClass('btn-white')
                    .prop('disabled', false);
            }

            function expandClicked() {
                disableButtons();

                console.log(`EXPANDING...`);

                let queue = $.when();

                forEachSwapLink((i, a, m) => {
                    const [uniq, usid, cond, price, info, vid, qty] = m;

                    if (qty <= 1) {
                        queue = queue
                            .then(() => console.log(`IGNORING ${usid}`));
                        return;
                    }

                    for (let i = 1; i < qty; i++) {
                        queue = queue
                            .then(() => console.log(`ADDING ${uniq} ${i} -> 1`))
                            .then(() => addSwapCoin(cond, 1, vid, info, price))
                            .then(() => {
                                const A = a.clone();
                                $('span.left.dblue-13', A).remove();
                                a.after(A);
                            })
                            .then(randomDelay());
                    }
                    queue = queue
                        .then(() => console.log(`UPDATING ${usid} -> 1`))
                        .then(() => updSwapCoin(usid, cond, 1, vid, info, price))
                        .then(() => $('span.left.dblue-13', a).remove())
                        .then(randomDelay());
                });

                queue.then(() => {
                    console.log('DONE!');
                    enableButtons();
                    updateButtons();
                });
            }

            function addExpandButton() {
                let expand = $('#expand', buttons);
                if (expand.length) {
                    expand.show();
                } else {
                    expand = $('<button id="expand" type="button" class="btn--combiners btn-s btn-blue" style="margin: 8px 2px 0">Expand</button>');
                    buttons.append(expand);

                    expand.click(() => expandClicked());
                }
            }

            function combineClicked() {
                disableButtons();

                console.log(`COMBINING...`);

                let queue = $.when();

                forEachSwapLink((i, a, m) => {
                    const [uniq, usid, cond, price, info, vid, qty] = m;

                    let variant;
                    if (variants.has(uniq)) {
                        if (usid != variants.get(uniq).usid) {
                            queue = queue
                                .then(() => console.log(`REMOVING ${usid}`))
                                .then(() => delSwapCoin(usid))
                                .then(() => a.remove())
                                .then(randomDelay());
                        } else {
                            const vqty = variants.get(uniq).qty;
                            if (qty != vqty) {
                                queue = queue
                                    .then(() => console.log(`UPDATING ${usid} -> ${vqty}`))
                                    .then(() => updSwapCoin(usid, cond, vqty, vid, info, price))
                                    .then(() => $('span.left.gray-13.wrap', a).after(`<span class="left dblue-13"><span>&times;</span>${vqty}</span>`))
                                    .then(randomDelay());
                            } else {
                                queue = queue
                                    .then(() => console.log(`IGNORING ${usid}`));
                            }
                        }
                    } else {
                        queue = queue
                            .then(() => console.log(`IGNORING ${usid}`));
                    }
                });

                queue.then(() => {
                    console.log('DONE!');
                    enableButtons();
                    updateButtons();
                });
            }

            function addCombineButton() {
                let combine = $('#combine', buttons);
                if (combine.length) {
                    combine.show();
                } else {
                    combine = $('<button id="combine" type="button" class="btn--combiners btn-s btn-blue" style="margin: 8px 2px 0">Combine</button>');
                    buttons.append(combine);

                    combine.click(() => combineClicked());
                }
            }

            function removeExpandButton() {
                $('button#expand', buttons).remove();
            }

            function removeCollapseButton() {
                $('button#expand', buttons).remove();
            }

            updateButtons();
        }


        function fixTagLinks() {
            const tags = $('#tags');
            $('a[href^="/gallery/"]', tags).each(updateLinkHref);
        }

        function initPublicityToggler() {
            const buttonPadding = {paddingLeft:'14px',paddingRight:'14px'};
            const view   = $('#my-func-block');
            const edit   = $('button.btn-blue', view);
            const status = $('.status-line .left', view);
            let replaceStatus = $('.status-line + table tr:has(span.status2)', view);

            edit.css(buttonPadding);
            $('+ a.btn-gray', edit).css(buttonPadding);

            const form  = $('form', '#coin-form');
            let replace = $('input[name=replace]', form).prop('checked');
            let checked = $('input[name=public]', form).prop('checked');

            const visibilityButton = edit.clone()
                .removeAttr('onclick')
                .css(buttonPadding)
                .insertBefore(edit)
                .click(() => {
                    $.when(postPublicityForm(loc, form, !checked)).then(() => {
                        checked = !checked;
                        updatePublicityStatus();
                        if (checked) ok('Coin public');
                        else info('Coin private');
                    });
                });

            const replacementButton = edit.clone()
                .removeAttr('onclick')
                .css(buttonPadding)
                .insertBefore(visibilityButton)
                .click(() => {
                    $.when(postReplacementForm(loc, form, !replace)).then(() => {
                        replace = !replace;
                        updateReplacementStatus();
                        if (replace) err('Should be replaced');
                        else info('No replace required');
                    });
                });

            let prevKeyCode;
            let requiredKeyCode;
            $('body').keydown(e => {
                if (e.keyCode === prevKeyCode) {
                    if (e.keyCode === 72 || e.keyCode === 83) {
                        visibilityButton.click();
                    }
                    if (e.keyCode === 82) {
                        replacementButton.click();
                    }
                }
                prevKeyCode = e.keyCode;
            });

            updatePublicityStatus();
            updateReplacementStatus();

            function updatePublicityStatus() {
                visibilityButton
                    .text(checked ? 'H' : 'S')
                    .toggleClass('btn-blue', !checked)
                    .toggleClass('btn-gray', checked);

                status
                    .text(checked ? 'Public' : 'Private')
                    .toggleClass('status0', !checked)
                    .toggleClass('status1', checked);
            }

            function updateReplacementStatus() {
                replacementButton
                    .text('R')
                    .toggleClass('btn-blue', !replace)
                    .toggleClass('btn-gray', replace);

                if (replace) {
                    if (!replaceStatus || !replaceStatus.length) {
                        replaceStatus = $('<tr><td class="lgray-12" colspan="2"><span class="set status2 wrap" style="max-width: 232px;width: 232px;padding: 0px;display: block;margin-top: 6px;">Need to replace</span></td></tr>');
                        $('.status-line + table', view).append(replaceStatus);
                    }
                } else if (replaceStatus) {
                    replaceStatus.remove();
                    replaceStatus = null;
                }
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

        function postReplacementForm(url, form, replace) {
            $('input[name=replace]', form).prop('checked', replace);
            return $.post(url, $(form).serialize());
        }



        function addSwapCoin(cond, qty, vid, info, price) {
            return updSwapCoin('', cond, qty, vid, info, price, 'addswapcoin');
        }

        function delSwapCoin(usid) {
            return updSwapCoin(usid, '', '', '', '', '', 'delswapcoin');
        }

        function updSwapCoin(usid, cond, qty, vid, info, price, action = 'editswapcoin') {
            const map = new Map(swapForm.serializeArray().map(({name, value}) => [name, value]));
            map.set('usid', usid);
            map.set('condition', cond);
            map.set('qty', qty);
            map.set('swap-variety', vid);
            map.set('comment', info);
            map.set('price', price);
            map.set('action', action);
            return $.post(loc, [...map.entries()].map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&'));
        }



        function initSwapPriceUpdater() {
            getPriceConfig().then(config => {
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
                        if (p === false || p === pp || p === `${pp}.00`) {
                            return;
                        }

                        queue = queue.then(() => updSwapCoin(usid, cond, qty, vid, info, p)).then(() => {
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
