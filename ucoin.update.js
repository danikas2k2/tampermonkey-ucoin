// ==UserScript==
// @name         uCoin
// @namespace    http://ucoin.net/
// @version      0.1.2
// @description  special actions
// @author       dan
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
// @match        http://*.ucoin.net/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */



const uid = 'uid=28609';
const loc = document.location.href;

if (loc.includes(uid)) {

    if (loc.includes('/swap-list/')) {
        if (localStorage.ucoinSwapPrices && (Date.now() - localStorage.ucoinSwapPricesUpdated < 86400000)) {
            try {
                updatePrices(JSON.parse(localStorage.ucoinSwapPrices));
            } catch (e) {
                loadThenUpdatePrices();
            }
        } else {
            loadThenUpdatePrices();
        }
    }

    if (loc.includes('/gallery/')) {



    }


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

function showUpdatedPrices(num, msg) {
    if (num) $.notify(msg || '' + num + ' items updated', num < 0 ? 'error' : 'success');
}

function updatePrices(config) {
    if (!config) {
        err('config not found');
        return;
    }

    if (!config.prices) {
        err('prices not found');
        return;
    }

    const map = new Map(Object.entries(config.prices));
    for (const [name, prices] of map.entries()) {
        map.set(name, new Map(Object.entries(prices)));
    }

    const cc = new Set(config.cheap || []);

    const ccc = new Set(config.veryCheap || config['very-cheap'] || []);

    showUpdatedPrices($('tr.my').map((i, tr) => {
        const $tr = $(tr);
        if ($tr.hasClass('mark')) {
            return false;
        }

        const trData = $tr.data();
        const name = $('td:nth-child(3) > a', $tr).text();
        const tt = trData.tooltipName;
        const C = tt.substr(0, tt.indexOf(name) - 1);
        const y = $('th + td', $tr).text();
        const p = +trData.tooltipPrice.substr(2);

        const d = $('td > a.dgray-12', $tr).text();
        let n = d ? `${name} *` : name;
        if (!map.has(n)) {
            return false;
        }

        const nt = $('th > a > div.ico-16[title]', $tr).attr('title');
        const qq = (nt === 'aUNC') ? 'AU' : $('th.td-cond > span.txt', tr).text();
        let q = qq;
        if (q === 'PRF') {
            q = 'BU';
        }
        if (d) {
            if (cc.has(C) || ccc.has(C)) {
                switch (q) {
                    case 'BU':
                        q = 'UNC';
                        break;
                    case 'UNC':
                        q = 'AU';
                        break;
                    case 'XF':
                        q = 'XF2';
                        break;
                    case 'VF':
                        q = 'XF1';
                        break;
                }
                n = `${n}*`; // **
            } else {
                switch (q) {
                    case 'VF':
                        q = 'XF2';
                        break;
                    case 'XF':
                        q = 'AU';
                        break;
                }
            }
        } else {
            if (cc.has(C)) {
                switch (q) {
                    case 'BU':
                        q = 'UNC';
                        break;
                    case 'UNC':
                        q = 'AU';
                        break;
                    case 'AU':
                        q = 'XF2';
                        break;
                    case 'XF2':
                        q = 'XF1';
                        break;
                    case 'XF1':
                        q = 'XF';
                        break;
                    case 'XF':
                        q = 'VF';
                        break;
                }
            }
            if (ccc.has(C)) {
                switch (q) {
                    case 'BU':
                        q = 'AU';
                        break;
                    case 'UNC':
                        q = 'XF2';
                        break;
                    case 'AU':
                        q = 'XF1';
                        break;
                    case 'XF2':
                        q = 'XF';
                        break;
                    case 'XF1':
                        q = 'VF';
                        break;
                    case 'XF':
                        q = 'VF';
                        break;
                }
            }
        }

        const pn = map.get(n);
        if (!pn.has(q)) {
            return false;
        }

        let pp = pn.get(q);
        if (pp < p) {
            pp = p;
        }

        const pin = $('span.edt > input[type=text][id^=price-]', tr);
        //console.log(`${C} ${n} ${y} ${q}(${qq}) ${pp}(${p})`);
        if (pin.val() == pp) {
            return false;
        }

        $('div.act > div.ico-edit', tr).click();
        pin.val(pp);
        $('div.act > div.ico-save', tr).click();
        return true;
    }).filter((i, tr) => !!tr).length);

}

function loadThenUpdatePrices() {
    $.getJSON('http://dev.andriaus.com/ucoin-swap-prices.json', data => {
        localStorage.ucoinSwapPrices = JSON.stringify(data);
        localStorage.ucoinSwapPricesUpdated = Date.now();
        updatePrices(data);
    });
}




/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
