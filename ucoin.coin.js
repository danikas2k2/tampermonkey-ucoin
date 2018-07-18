// ==UserScript==
// @name         uCoin: Coin
// @namespace    https://ucoin.net/
// @version      0.1.27
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
// @require      https://dev.andriaus.com/ucoin/lib.prices.js?v=0.1.9
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
            initSwapFormImprovements();
            addSwapComments();
            addSwapButtons();
        }

        function getSwapLinks(d = coin) {
            return $('#swap-form + #swap-block a.list-link', d);
        }

        function addSwapComments() {
            $('head').append(`<style type="text/css">
                #coin #swap-block a {
                    position: relative;
                }
                #coin #swap-block a .comments {
                    position: absolute;
                    width: auto;
                    left: 100%;
                    text-align: left;
                }
                #coin #swap-block a:active .comments,
                #coin #swap-block a:focus .comments,
                #coin #swap-block a:hover .comments,
                #coin #swap-block a .comments:active,
                #coin #swap-block a .comments:focus,
                #coin #swap-block a .comments:hover {
                    max-width: 100%;
                    overflow: visible;
                }
                #coin #swap-block a .comments .ico-16 {
                    display: inline-block;
                    vertical-align: middle;
                    background-position: -16px 0px;
                }
            </style>`);

            getSwapLinks().each((i, a) => addSwapComment(a));
        }

        function addSwapComment(a) {
            a = $(a);
            const m = (a.attr('onclick') || '').match(/CoinSwapFormOn\((?:'[^']*', ){3}'([^']+)'/);
            if (m && m[1]) {
                if (!$('.comments', a).length) {
                    a.append(`<span class="right dgray-11 wrap comments" title="${m[1]}"><div class="ico-16"></div> ${m[1]}</span>`);
                }
            }
        }

        function forEachSwapLink(fn) {
            getSwapLinks().each((i, a) => {
                a = $(a);
                if ($('> div.ico-16', a).length) {
                    return;
                }

                //                                         CoinSwapFormOn(  usid,      cond,      price,     info,      vid,       qty,       replica)
                const m = (a.attr('onclick') || '').match(/CoinSwapFormOn\('([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)'/);
                if (m) {
                    const [, , cond, , info, vid] = m;
                    m[0] = `${cond} ${vid} ${info}`;
                    fn(i, a, m);
                }
            });
        }

        function addSwapButtons() {
            $('head').append(`<style type="text/css">
                #coin #swap-block .btn--combiners {
                    margin: 8px 2px 0;
                }
            </style>`);

            const buttons = $('center', swapBlock);
            const variants = new Map();
            let couldExpand = false, couldCombine = false;

            function updateSwapVariants() {
                couldExpand = false; couldCombine = false;
                variants.clear();
                forEachSwapLink((i, a, m) => {
                    const [uniq, usid, cond, price, info, vid, qty] = m;
                    console.log({uniq, usid, qty});
                    if (qty > 1) {
                        couldExpand = true;
                    }
                    let variant;
                    console.log({variants});
                    if (variants.has(uniq)) {
                        variant = variants.get(uniq);
                        variant.qty += +qty;
                        couldCombine = true;
                    } else {
                        variant = {usid, cond, price, info, vid, qty: +qty};
                    }
                    console.log({variant});
                    variants.set(uniq, variant);
                });
            }

            function updateButtons() {
                updateSwapVariants();
                couldExpand ? addExpandButtons() : removeExpandButtons();
                couldCombine ? addCombineButtons() : removeCombineButtons();
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

            function updateLinkQty(a, qty) {
                a = $(a);
                a.attr('onclick', a.attr('onclick').replace(
                    /CoinSwapFormOn\('([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)'/,
                    `CoinSwapFormOn('$1', '$2', '$3', '$4', '$5', '${qty}'`));

                $('span.left.dblue-13', a).remove();
                if (qty > 1) {
                    $('span.left.gray-13.wrap', a).after(`<span class="left dblue-13"><span>&times;</span>${qty}</span>`);
                }
            }

            // expandTo - number of links (0 for unlimited)
            function expandClicked(expandTo = 0) {
                disableButtons();

                console.log(`EXPANDING...`);

                let queue = $.when();

                forEachSwapLink((i, a, m) => {
                    const [uniq, usid, cond, price, info, vid, qty] = m;

                    const n = expandTo > 0 ? Math.min(qty, expandTo) : qty;
                    if (n <= 1) {
                        queue = queue
                            .then(() => console.log(`IGNORING ${uniq} ${usid}`));
                        return;
                    }

                    for (let i = n, qq = qty, q = Math.floor(qq / i); i > 0; i--, qq -= q, q = Math.floor(qq / i)) {
                        if (i > 1) {
                            queue = queue
                                .then(() => console.log(`ADDING ${uniq} ${n - i + 1} -> ${q}`))
                                .then(() => addSwapCoin(cond, q, vid, info, price))
                                .then(r => {
                                    const links = getSwapLinks().map((i, l) => {
                                        l       = $(l);
                                        const m = (l.attr('onclick') || '').match(/CoinSwapFormOn\('([^']*)'/);
                                        return m && m[1];
                                    }).toArray();
                                    getSwapLinks(r).each((i, l) => {
                                        l          = $(l);
                                        const m    = (l.attr('onclick') || '').match(/CoinSwapFormOn\('([^']*)'/);
                                        const usid = m && m[1];
                                        if (usid && links.includes(usid)) {
                                            return;
                                        }
                                        links.push(usid);
                                        a.after(l);
                                        addSwapComment(l);
                                    });
                                })
                                .then(randomDelay());
                        } else {
                            queue = queue
                                .then(() => console.log(`UPDATING ${uniq} ${usid} -> 1`))
                                .then(() => updSwapCoin(usid, cond, q, vid, info, price))
                                .then(() => updateLinkQty(a, q))
                                .then(randomDelay());
                        }
                    }
                });

                queue.then(() => {
                    console.log('DONE!');
                    enableButtons();
                    updateButtons();
                });
            }

            function addExpandButtons() {
                let expand = $('#expand', buttons);
                if (expand.length) {
                    expand.show();
                } else {
                    expand = $('<button id="expand" type="button" class="btn--combiners btn-s btn-blue">Ex/All</button>');
                    buttons.append(expand);
                    expand.click(() => expandClicked());
                }

                expand = $('#expand-x5', buttons);
                if (expand.length) {
                    expand.show();
                } else {
                    expand = $('<button id="expand-x5" type="button" class="btn--combiners btn-s btn-blue">Ex/5</button>');
                    buttons.append(expand);
                    expand.click(() => expandClicked(5));
                }

                expand = $('#expand-x10', buttons);
                if (expand.length) {
                    expand.show();
                } else {
                    expand = $('<button id="expand-x10" type="button" class="btn--combiners btn-s btn-blue">Ex/10</button>');
                    buttons.append(expand);
                    expand.click(() => expandClicked(10));
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
                                    .then(() => updateLinkQty(a, vqty))
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

            function addCombineButtons() {
                let combine = $('#combine', buttons);
                if (combine.length) {
                    combine.show();
                } else {
                    combine = $('<button id="combine" type="button" class="btn--combiners btn-s btn-blue" style="margin: 8px 2px 0">Combine</button>');
                    buttons.append(combine);

                    combine.click(() => combineClicked());
                }
            }

            function removeExpandButtons() {
                $('button#expand', buttons).hide();
                $('button#expand-x5', buttons).hide();
                $('button#expand-x10', buttons).hide();
            }

            function removeCombineButtons() {
                $('button#combine', buttons).hide();
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
                const varieties = $(`+h3 +table td`, $('#variety', coin));

                let queue = $.when();

                forEachSwapLink((i, a, m) => {
                    const $a      = $(a);
                    const onclick = $a.attr('onclick');
                    const [uniq, usid, cond, pp, info, vid, qty] = m;

                    const varietyPrice = vid && sp($(`a[href*="vid=${vid}#"]`, varieties).text()).replace(/[^0-9.]/g, '') || price;

                    const year = sp($('span.left.gray-13', $a).text());
                    const q    = sp($('span.left.dgray-11', $a).text());

                    const p = getPrice(config, country, name, subject, year, q, info, varietyPrice);
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
                });
            });
        }

        function initSwapFormImprovements() {
            if (swapForm.length) {
                $('head').append(`<style type="text/css">
                    #coin #swap-form .btn-ctrl {
                        float: right;
                        margin: 14px 3px 0;
                        height: 26px;
                    }
                    #coin #swap-form .btn-ctrl + .btn-ctrl {
                        margin-right: 0;
                    }
                    #coin #swap-form #swap-qty {
                        margin-top: 1em;
                    }
                    #coin #swap-block center div.btn-set {
                        display: flex;
                        justify-content: space-between;
                        margin: 0 1em;
                    }
                    #coin #swap-block center div.btn-set div {
                        flex: 0 0 20px;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        cursor: pointer;
                        padding: 1px;
                    }
                </style>`);

                const qty = $('#swap-qty', swapForm);
                qty.attr('inputmode', 'numeric').focus(e => e.target.setSelectionRange(0, e.target.value.length));
                $('<button type="button">&minus;</button>').addClass('btn-s btn-gray btn-ctrl').click(() => qty.val(+qty.val()-1)).insertAfter(qty);
                $('<button type="button">+10</button>').addClass('btn-s btn-gray btn-ctrl').click(() => qty.val(+qty.val()+10)).insertBefore(qty);
                $('<button type="button">+5</button>').addClass('btn-s btn-gray btn-ctrl').click(() => qty.val(+qty.val()+5)).insertBefore(qty);
                $('<button type="button">+</button>').addClass('btn-s btn-gray btn-ctrl').click(() => qty.val(+qty.val()+1)).insertBefore(qty);

                const cond = $('#swap-cond', swapForm);
                const fieldset = $(`<fieldset><legend class="gray-12" style="padding:5px;">Condition</legend></fieldset>`);
                const options = $('option', cond).each((i, o) => {
                    o = $(o);
                    const val = o.val();
                    const text = val ? o.text() : 'Without condition';
                    const checked = (val === '3') ? 'checked' : '';
                    const style = o.attr('style') || '';
                    $(`<label class="dgray-12" style="margin-top:0px;${style}"><input name="condition" value="${val}" ${checked} type="radio"/>${text}</label>`).appendTo(fieldset);
                });
                cond.replaceWith(fieldset);

                const _onCoinSwapForm = CoinSwapFormOn;
                CoinSwapFormOn = function (...args) {
                    _onCoinSwapForm(...args);
                    $(`input[name="condition"][value="${args[1]}"]`, swapForm).prop('checked', true);
                };

                const addButton = $('#swap-block center button.btn-s.btn-gray');
                const addButtonSet = $('<div class="btn-set"/>');
                $('<div class="marked-6">?</div>').click(() => CoinSwapFormOn('','0')).appendTo(addButtonSet);
                $('<div class="marked-7">G</div>').click(() => CoinSwapFormOn('','6')).appendTo(addButtonSet);
                $('<div class="marked-8">VG</div>').click(() => CoinSwapFormOn('','5')).appendTo(addButtonSet);
                $('<div class="marked-9">F</div>').click(() => CoinSwapFormOn('','4')).appendTo(addButtonSet);
                $('<div class="marked-10">VF</div>').click(() => CoinSwapFormOn('','3')).appendTo(addButtonSet);
                $('<div class="marked-11">XF</div>').click(() => CoinSwapFormOn('','2')).appendTo(addButtonSet);
                $('<div class="marked-12">UN</div>').click(() => CoinSwapFormOn('','1')).appendTo(addButtonSet);
                $('<div class="marked-3">PR</div>').click(() => CoinSwapFormOn('','7')).appendTo(addButtonSet);
                $('<div class="marked-5">CP</div>').click(() => CoinSwapFormOn('','100')).appendTo(addButtonSet);
                addButton.replaceWith(addButtonSet);
            }
        }

    })(jQuery);

// @formatter:off

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
