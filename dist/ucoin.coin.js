/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function delay(time) {
    return function () { return new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, time); }); };
}
exports.delay = delay;
var minDelay = 300; // ms
var rndDelay = 500; // ms
function randomDelay() {
    return delay(Math.round(minDelay + Math.random() * rndDelay));
}
exports.randomDelay = randomDelay;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = 'get';
exports.POST = 'post';
function ajax(url, method, body) {
    if (method === void 0) { method = exports.GET; }
    return fetch(url, { method: method, body: body });
}
exports.ajax = ajax;
function get(url, body) {
    return ajax(url, exports.GET, body);
}
exports.get = get;
function post(url, body) {
    return ajax(url, exports.POST, body);
}
exports.post = post;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var loc = document.location.href;
function updateLinkHref(a) {
    var before = ['page', 'view'];
    var after = [];
    var href = a.href;
    if (a.classList.contains('active')) {
        after.push('view');
    }
    else if (a.classList.contains('switcher')) {
        var view = getHrefParts(href)[1].get('view');
        after.push(view);
    }
    a.href = updateHref(href, before, after);
}
exports.updateLinkHref = updateLinkHref;
function updateOnClickHref(div) {
    var match = div.getAttribute('onclick').match(/location.href='([^']+)';/);
    if (match) {
        var before = ['page'];
        if (document.getElementById('status-filter')) {
            before.push('status');
        }
        else {
            var a = div.querySelector('a.switcher');
            if (a) {
                var view = getHrefParts(a.href)[1].get('view');
                before.push('view');
                before.push(view);
            }
        }
        div.setAttribute('onclick', "location.href='" + updateHref(match[1], before) + "';");
    }
}
exports.updateOnClickHref = updateOnClickHref;
function updateHref(href, before, after) {
    var _a = __read(getHrefParts(loc), 2), locPath = _a[0], locQuery = _a[1];
    if (before) {
        applyQuery(locQuery, before);
    }
    applyQuery(locQuery, getHrefParts(href)[1]);
    if (after) {
        applyQuery(locQuery, after);
    }
    return [locPath, __spread(locQuery.entries()).map(function (_a) {
            var _b = __read(_a, 2), k = _b[0], v = _b[1];
            return k + "=" + v.replace(/\+/g, '%2B');
        }).join('&')]
        .join('?');
}
exports.updateHref = updateHref;
function applyQuery(query, apply) {
    var e_1, _a;
    if (!apply) {
        return;
    }
    if (!(apply instanceof Map)) {
        // @ts-ignore
        apply = new Map(arrayOf(apply).map(arrayOf));
    }
    try {
        for (var _b = __values(apply.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            if (!value || !value.length) {
                // @ts-ignore
                query.delete(key);
            }
            else {
                // @ts-ignore
                query.set(key, value);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.applyQuery = applyQuery;
function arrayOf(a) {
    return Array.isArray(a) ? a : [a];
}
exports.arrayOf = arrayOf;
function getHrefParts(href) {
    var parts = href.split('?');
    var add = parts.join('%3F').split('&').map(function (q) { return q.split('='); });
    // @ts-ignore
    return [parts.shift(), new Map(add)];
}
exports.getHrefParts = getHrefParts;


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ==UserScript==
// @name         uCoin: Coin
// @namespace    https://ucoin.net/
// @version      0.2.0
// @description  Fix tag links, add publicity toggler, expand/combine swap coins, and update swap prices
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @match        https://*.ucoin.net/coin/*
// ==/UserScript==

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var delay_1 = __webpack_require__(0);
var links_1 = __webpack_require__(2);
var notify_1 = __webpack_require__(5);
var ajax_1 = __webpack_require__(1);
// import {getPrice, getPriceConfig} from './lib/prices';
// import {sp} from './lib/utils';
(function () {
    var loc = document.location.href;
    var coin = document.getElementById('coin');
    if (!coin) {
        notify_1.err('No coin wrapper found!');
        return;
    }
    var coinFormWrapper = document.getElementById('coin-form');
    if (!coinFormWrapper) {
        notify_1.err('No coin form wrapper found!');
        return;
    }
    var coinForm = coinFormWrapper.querySelector('form');
    if (!coinForm) {
        notify_1.err('No coin form found!');
        return;
    }
    var swapForm = document.getElementById('swap-form');
    if (!swapForm) {
        notify_1.err('No swap form found!');
        return;
    }
    var swapBlock = document.getElementById('swap-block');
    if (!swapBlock) {
        notify_1.err('No swap block found!');
        return;
    }
    fixTagLinks();
    if (document.getElementById('user-menu')) {
        initFormImprovements();
        if (loc.includes('ucid=')) {
            initPublicityToggler();
        }
    }
    if (swapBlock) {
        // initSwapPriceUpdater();
        initSwapFormImprovements();
        addSwapComments();
        addSwapButtons();
    }
    function getSwapLinks(d) {
        if (d === void 0) { d = document; }
        var swapBlock = d.getElementById('swap-block');
        if (!swapBlock) {
            return new NodeList();
        }
        return swapBlock.querySelectorAll('a.list-link');
    }
    function addSwapComments() {
        document.head.insertAdjacentHTML("beforeend", "\n            <style type=\"text/css\">\n                #coin #swap-block a {\n                    position: relative;\n                }\n                #coin #swap-block a .comments {\n                    position: absolute;\n                    width: auto;\n                    left: 100%;\n                    text-align: left;\n                }\n                #coin #swap-block a:active .comments,\n                #coin #swap-block a:focus .comments,\n                #coin #swap-block a:hover .comments,\n                #coin #swap-block a .comments:active,\n                #coin #swap-block a .comments:focus,\n                #coin #swap-block a .comments:hover {\n                    max-width: 100%;\n                    overflow: visible;\n                }\n                #coin #swap-block a .comments .ico-16 {\n                    display: inline-block;\n                    vertical-align: middle;\n                    background-position: -16px 0;\n                }\n            </style>");
        getSwapLinks().forEach(function (a) {
            addSwapComment(a);
        });
    }
    //                             CoinSwapFormOn(  usid,      cond,      price,     info,      vid,       qty,       replica)
    var CoinSwapFormOnMatcher = /CoinSwapFormOn\('([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)', '([^']*)'/;
    var onClick = 'onclick';
    function addSwapComment(a) {
        if (a.hasAttribute(onClick)) {
            var m = a.getAttribute(onClick).match(CoinSwapFormOnMatcher);
            if (m && m[4]) {
                if (!a.querySelector('.comments')) {
                    a.insertAdjacentHTML("beforeend", "<span class=\"right dgray-11 wrap comments\" title=\"" + m[4] + "\"><div class=\"ico-16\"></div> " + m[4] + "</span>");
                }
            }
        }
    }
    function forEachSwapLink(fn) {
        getSwapLinks().forEach(function (a) {
            if (a.querySelector('> div.ico-16')) {
                return;
            }
            if (a.hasAttribute(onClick)) {
                var m = a.getAttribute(onClick).match(CoinSwapFormOnMatcher);
                if (m) {
                    var _a = __read(m, 6), cond = _a[2], info_1 = _a[4], vid = _a[5];
                    m[0] = cond + " " + vid + " " + info_1;
                    fn(a, m);
                }
            }
        });
    }
    function addSwapButtons() {
        document.head.insertAdjacentHTML("beforeend", "\n            <style type=\"text/css\">\n                #coin #swap-block .btn--combiner,\n                #coin #swap-block .btn--expander {\n                    margin: 8px 2px 0;\n                }\n            </style>");
        var buttonSet = swapBlock.querySelector('center');
        var variants = new Map();
        var couldExpand = false, couldCombine = false;
        function updateSwapVariants() {
            couldExpand = false;
            couldCombine = false;
            variants.clear();
            forEachSwapLink(function (a, m) {
                var _a = __read(m, 7), uniq = _a[0], usid = _a[1], cond = _a[2], price = _a[3], info = _a[4], vid = _a[5], qty = _a[6];
                if (+qty > 1) {
                    couldExpand = true;
                }
                var variant;
                if (variants.has(uniq)) {
                    variant = variants.get(uniq);
                    variant.qty += +qty;
                    couldCombine = true;
                }
                else {
                    variant = { usid: usid, cond: cond, price: price, info: info, vid: vid, qty: +qty };
                }
                variants.set(uniq, variant);
            });
        }
        function updateButtons() {
            updateSwapVariants();
            couldExpand ? addExpandButtons() : removeExpandButtons();
            couldCombine ? addCombineButtons() : removeCombineButtons();
        }
        function disableButtons() {
            buttonSet.querySelectorAll('button.btn--combiner,button.btn--expander').forEach(function (combiner) {
                combiner.classList.add('btn-white');
                combiner.classList.remove('btn-blue');
                combiner.disabled = true;
            });
        }
        function enableButtons() {
            buttonSet.querySelectorAll('button.btn--combiner,button.btn--expander').forEach(function (combiner) {
                combiner.classList.add('btn-blue');
                combiner.classList.remove('btn-white');
                combiner.disabled = false;
            });
        }
        function updateLinkQty(a, qty) {
            if (a.hasAttribute(onClick)) {
                a.setAttribute(onClick, a.getAttribute(onClick).replace(CoinSwapFormOnMatcher, "CoinSwapFormOn('$1', '$2', '$3', '$4', '$5', '" + qty + "'"));
            }
            a.querySelectorAll('span.left.dblue-13').forEach(function (a) { return a.remove(); });
            if (qty > 1) {
                a.querySelectorAll('span.left.gray-13.wrap').forEach(function (a) {
                    return a.insertAdjacentHTML("afterend", "<span class=\"left dblue-13\"><span>&times;</span>" + qty + "</span>");
                });
            }
        }
        // expandTo - number of links (0 for unlimited)
        function expandClicked(expandTo) {
            if (expandTo === void 0) { expandTo = 0; }
            disableButtons();
            console.log("EXPANDING...");
            var queue = Promise.resolve();
            forEachSwapLink(function (a, m) {
                var _a = __read(m, 7), uniq = _a[0], usid = _a[1], cond = _a[2], price = _a[3], info = _a[4], vid = _a[5], sqty = _a[6];
                var qty = +sqty;
                var n = expandTo > 0 ? Math.min(qty, expandTo) : qty;
                if (n <= 1) {
                    queue = queue
                        .then(function () { return console.log("IGNORING " + uniq + " " + usid); });
                    return;
                }
                var _loop_1 = function (i, qq, q) {
                    if (i > 1) {
                        queue = queue
                            .then(function () { return console.log("ADDING " + uniq + " " + (n - i + 1) + " -> " + q); })
                            .then(function () { return addSwapCoin(cond, "" + q, vid, info, price); })
                            .then(function (r) {
                            var links = new Set();
                            getSwapLinks().forEach(function (l) {
                                if (!l.hasAttribute(onClick)) {
                                    return;
                                }
                                var m = l.getAttribute(onClick).match(CoinSwapFormOnMatcher);
                                if (m && m[1]) {
                                    links.add(m[1]);
                                }
                            });
                            getSwapLinks(r).forEach(function (l) {
                                if (!l.hasAttribute(onClick)) {
                                    return;
                                }
                                var m = l.getAttribute(onClick).match(CoinSwapFormOnMatcher);
                                var usid = m && m[1];
                                if (!usid || links.has(usid)) {
                                    return;
                                }
                                links.add(usid);
                                a.insertAdjacentElement("afterend", l);
                                addSwapComment(l);
                            });
                        })
                            .then(delay_1.randomDelay());
                    }
                    else {
                        queue = queue
                            .then(function () { return console.log("UPDATING " + uniq + " " + usid + " -> 1"); })
                            .then(function () { return updSwapCoin(usid, cond, "" + q, vid, info, price); })
                            .then(function () { return updateLinkQty(a, q); })
                            .then(delay_1.randomDelay());
                    }
                };
                for (var i = n, qq = qty, q = Math.floor(qq / i); i > 0; i--, qq -= q, q = Math.floor(qq / i)) {
                    _loop_1(i, qq, q);
                }
            });
            queue.then(function () {
                console.log('DONE!');
                enableButtons();
                updateButtons();
            });
        }
        function addExpandButton(id, text, clickHandler) {
            var expand = document.getElementById(id);
            if (expand) {
                expand.style.display = 'block';
            }
            else {
                buttonSet.insertAdjacentHTML("beforeend", "<button id=\"" + id + "\" type=\"button\" class=\"btn--expander btn-s btn-blue\">" + text + "</button>");
                document.getElementById(id).addEventListener("click", clickHandler);
            }
        }
        function addExpandButtons() {
            addExpandButton('expand', 'Ex/All', function () { return expandClicked(); });
            addExpandButton('expand-x5', 'Ex/5', function () { return expandClicked(5); });
            addExpandButton('expand-x10', 'Ex/10', function () { return expandClicked(10); });
        }
        function combineClicked() {
            disableButtons();
            console.log("COMBINING...");
            var queue = Promise.resolve();
            forEachSwapLink(function (a, m) {
                var _a = __read(m, 7), uniq = _a[0], usid = _a[1], cond = _a[2], price = _a[3], info = _a[4], vid = _a[5], qty = _a[6];
                var variant;
                if (variants.has(uniq)) {
                    if (usid != variants.get(uniq).usid) {
                        queue = queue
                            .then(function () { return console.log("REMOVING " + usid); })
                            .then(function () { return delSwapCoin(usid); })
                            .then(function () { return a.remove(); })
                            .then(delay_1.randomDelay());
                    }
                    else {
                        var vqty_1 = variants.get(uniq).qty;
                        if (qty != vqty_1) {
                            queue = queue
                                .then(function () { return console.log("UPDATING " + usid + " -> " + vqty_1); })
                                .then(function () { return updSwapCoin(usid, cond, vqty_1, vid, info, price); })
                                .then(function () { return updateLinkQty(a, vqty_1); })
                                .then(delay_1.randomDelay());
                        }
                        else {
                            queue = queue
                                .then(function () { return console.log("IGNORING " + usid); });
                        }
                    }
                }
                else {
                    queue = queue
                        .then(function () { return console.log("IGNORING " + usid); });
                }
            });
            queue.then(function () {
                console.log('DONE!');
                enableButtons();
                updateButtons();
            });
        }
        function addCombineButtons() {
            var id = 'combine';
            var combine = document.getElementById(id);
            if (combine) {
                combine.style.display = 'block';
            }
            else {
                buttonSet.insertAdjacentHTML("beforeend", "<button id=\"" + id + "\" type=\"button\" class=\"btn--combiner btn-s btn-blue\" style=\"margin: 8px 2px 0\">Combine</button>");
                document.getElementById(id).addEventListener("click", function () { return combineClicked(); });
            }
        }
        function removeExpandButtons() {
            buttonSet.querySelectorAll('button.btn--expander').forEach(function (b) {
                b.style.display = 'none';
            });
        }
        function removeCombineButtons() {
            buttonSet.querySelectorAll('button.btn--combiner').forEach(function (b) {
                b.style.display = 'none';
            });
        }
        updateButtons();
    }
    function fixTagLinks() {
        var tags = document.getElementById('tags');
        if (tags) {
            tags.querySelectorAll('a[href^="/gallery/"]').forEach(links_1.updateLinkHref);
        }
    }
    function initPublicityToggler() {
        var viewId = 'my-func-block';
        var narrowButton = 'narrowButton';
        document.head.insertAdjacentHTML("beforeend", "\n            <style type=\"text/css\">\n                #" + viewId + " ." + narrowButton + " {\n                    padding-left: 14px;\n                    padding-right: 14px;\n                }\n            </style>");
        var view = document.getElementById(viewId);
        var edit = view.querySelector('button.btn-blue');
        var status = view.querySelector('.status-line .left');
        var replaceStatus = view.querySelector('.status-line + table tr:has(span.status2)');
        edit.classList.add(narrowButton);
        edit.querySelectorAll('+ a.btn-gray').forEach(function (gray) {
            gray.classList.add(narrowButton);
        });
        var form = coinForm.querySelector('form');
        var replace = form.querySelector('input[name=replace]').checked;
        var checked = form.querySelector('input[name=public]').checked;
        var visibilityButton = edit.cloneNode();
        edit.insertAdjacentElement("afterend", visibilityButton);
        visibilityButton.removeAttribute(onClick);
        visibilityButton.classList.add(narrowButton);
        visibilityButton.addEventListener("click", function () {
            postPublicityForm(loc, form, !checked).then(function () {
                checked = !checked;
                updatePublicityStatus();
                checked ? notify_1.ok('Coin public') : notify_1.info('Coin private');
            });
        });
        var replacementButton = edit.cloneNode();
        visibilityButton.insertAdjacentElement("beforebegin", replacementButton);
        replacementButton.removeAttribute(onClick);
        replacementButton.classList.add(narrowButton);
        replacementButton.addEventListener("click", function () {
            postReplacementForm(loc, form, !replace).then(function () {
                replace = !replace;
                updateReplacementStatus();
                replace ? notify_1.err('Should be replaced') : notify_1.info('No replace required');
            });
        });
        var prevKeyCode = -1;
        document.body.addEventListener("keydown", function (e) {
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
            visibilityButton.innerText = checked ? 'H' : 'S';
            status.innerText = checked ? 'Public' : 'Private';
            if (checked) {
                visibilityButton.classList.add('btn-gray');
                visibilityButton.classList.remove('btn-blue');
                status.classList.add('status1');
                status.classList.remove('status0');
            }
            else {
                visibilityButton.classList.add('btn-blue');
                visibilityButton.classList.remove('btn-gray');
                status.classList.add('status0');
                status.classList.remove('status1');
            }
        }
        function updateReplacementStatus() {
            replacementButton.innerText = 'R';
            if (replace) {
                replacementButton.classList.add('btn-gray');
                replacementButton.classList.remove('btn-blue');
                if (!replaceStatus) {
                    var table = view.querySelector('.status-line + table');
                    if (table) {
                        table.insertAdjacentHTML("beforeend", "<tr><td class=\"lgray-12\" colspan=\"2\"><span class=\"set status2 wrap\" style=\"max-width: 232px;width: 232px;padding: 0;display: block;margin-top: 6px;\">Need to replace</span></td></tr>");
                        replaceStatus = table.querySelector('tr:last-child');
                    }
                }
                else if (replaceStatus) {
                    replaceStatus.remove();
                    replaceStatus = null;
                }
            }
            else {
                replacementButton.classList.add('btn-blue');
                replacementButton.classList.remove('btn-gray');
            }
        }
    }
    function initFormImprovements() {
        var buyResetId = 'date-reset-link';
        document.head.insertAdjacentHTML("beforeend", "\n            <style type=\"text/css\">\n                #" + buyResetId + " {\n                    font-size: 16px;\n                    font-weight: bold;\n                    width: 22px;\n                    height: 22px;\n                    display: inline-block;\n                    text-align: center;\n                }     \n            </style>");
        var form = coinForm.querySelector('form');
        var cond = document.getElementById('condition');
        var buyYear = document.getElementById('buy_year');
        var buyMonth = document.getElementById('buy_month');
        buyMonth.insertAdjacentHTML("beforebegin", "<a id=\"" + buyResetId + "\" href=\"#\">&#x21BB;</a>");
        var buyReset = document.getElementById(buyResetId);
        buyReset.addEventListener("click", function () {
            var d = new Date();
            var y = d.getFullYear();
            var m = d.getMonth() + 1;
            buyMonth.value = (m < 10) ? "0" + m : "" + m;
            buyYear.value = "" + y;
            return false;
        });
        var CN = new Map([
            ['6', '7'],
            ['5', '8'],
            ['4', '9'],
            ['3', '10'],
            ['2', '11'],
            ['1', '12'],
            ['7', '3'],
        ]);
        // @ts-ignore
        var CL = new Map(__spread(CN.entries()).map(function (_a) {
            var _b = __read(_a, 2), k = _b[0], v = _b[1];
            return [v, k];
        })); // switch conditions and colors
        form.querySelectorAll('table div[class^="marked-"]').forEach(function (div) {
            if (div.id === 'set-color') {
                return;
            }
            div.addEventListener('click', function (e) {
                var div = e.target;
                var color = null;
                div.classList.forEach(function (c) {
                    if (c.startsWith('marked-')) {
                        color = c.split('-', 3)[1];
                    }
                });
                if (CL.has(color)) {
                    cond.value = CL.get(color);
                }
            });
        });
        var tableColor = document.getElementById('table-color');
        var setColor = document.getElementById('set-color');
        cond.addEventListener('change', function (e) {
            setColor.classList.remove("marked-" + tableColor.value);
            var condition = e.target.value;
            if (CN.has(condition)) {
                tableColor.value = CN.get(condition);
            }
            setColor.classList.add("marked-" + tableColor.value);
        });
    }
    function postPublicityForm(url, form, checked) {
        var input = form.querySelector('input[name=public]');
        if (input) {
            input.checked = checked;
        }
        return ajax_1.post(url, new FormData(form));
    }
    function postReplacementForm(url, form, replace) {
        var input = form.querySelector('input[name=replace]');
        if (input) {
            input.checked = replace;
        }
        return ajax_1.post(url, new FormData(form));
    }
    function updSwapCoin(usid, cond, qty, vid, info, price, action) {
        if (action === void 0) { action = 'editswapcoin'; }
        var data = new FormData(swapForm);
        data.set('usid', usid);
        data.set('condition', cond);
        data.set('qty', qty);
        data.set('swap-variety', vid);
        data.set('comment', info);
        data.set('price', price);
        data.set('action', action);
        return ajax_1.post(loc, data)
            .then(function (response) { return response.text(); })
            .then(function (text) {
            var fragment = document.createDocumentFragment();
            fragment.textContent = text;
            return fragment;
        });
    }
    function addSwapCoin(cond, qty, vid, info, price) {
        return updSwapCoin('', cond, qty, vid, info, price, 'addswapcoin');
    }
    function delSwapCoin(usid) {
        return updSwapCoin(usid, '', '', '', '', '', 'delswapcoin');
    }
    /*function initSwapPriceUpdater() {
        getPriceConfig().then(config => {
            const country = sp($('th:contains("Country") + td', coin).text());
            const name = sp($('th:contains("Denomination") + td', coin).text());
            const subject = sp($('th:contains("Subject") + td', coin).text());
            const price = sp($('a[href="#price"] span', coin).text());
            const varieties = $(`+h3 +table td`, $('#variety', coin));

            let queue = $.when();

            forEachSwapLink((i, a, m) => {
                const $a = $(a);
                const onClick = $a.attr('onclick');
                const [uniq, usid, cond, pp, info, vid, qty] = m;

                const varietyPrice = vid && sp($(`a[href*="vid=${vid}#"]`, varieties).text()).replace(/[^0-9.]/g, '') || price;

                const year = sp($('span.left.gray-13', $a).text());
                const q = sp($('span.left.dgray-11', $a).text());

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
                            "color": (p === price) ? "" : ((p > price) ? "brown" : "green")
                        });
                }).then(randomDelay());
            });
        });
    }*/
    function initSwapFormImprovements() {
        if (swapForm) {
            document.head.insertAdjacentHTML("beforeend", "\n                <style type=\"text/css\">\n                    #coin #swap-form .btn-ctrl {\n                        float: right;\n                        margin: 14px 3px 0;\n                        height: 26px;\n                    }\n                    #coin #swap-form .btn-ctrl + .btn-ctrl {\n                        margin-right: 0;\n                    }\n                    #coin #swap-form #swap-qty {\n                        margin-top: 1em;\n                    }\n                    #coin #swap-block center div.btn-set {\n                        display: flex;\n                        justify-content: space-between;\n                        margin: 0 1em;\n                    }\n                    #coin #swap-block center div.btn-set div {\n                        flex: 0 0 20px;\n                        width: 20px;\n                        height: 20px;\n                        line-height: 20px;\n                        cursor: pointer;\n                        padding: 1px;\n                    }\n                </style>");
            var qty_1 = document.getElementById('swap-qty');
            qty_1.setAttribute('inputmode', 'numeric');
            qty_1.addEventListener("focus", function (e) { return e.target.setSelectionRange(0, e.target.value.length); });
            var addQtyCtrlButton = function (where, id, text, valueChanger) {
                var qtyId = "swap-qty-" + id;
                qty_1.insertAdjacentHTML(where, "<button id=\"" + qtyId + "\" type=\"button\" class=\"btn-s btn-gray btn-ctrl\">" + text + "</button>");
                document.getElementById(qtyId).addEventListener('click', function () {
                    qty_1.value = "" + valueChanger(+qty_1.value);
                });
            };
            addQtyCtrlButton("afterend", 'minus', '&minus;', function (v) { return v - 1; });
            addQtyCtrlButton("afterbegin", 'plus10', '+10', function (v) { return v + 10; });
            addQtyCtrlButton("afterbegin", 'plus5', '+5', function (v) { return v + 5; });
            addQtyCtrlButton("afterbegin", 'plus', '+', function (v) { return v + 1; });
            var id = 'swap-cond-fieldset';
            var cond = document.getElementById('swap-cond');
            cond.insertAdjacentHTML("afterend", "<fieldset id=\"" + id + "\"><legend class=\"gray-12\" style=\"padding:5px;\">Condition</legend></fieldset>");
            var fieldset_1 = document.getElementById(id);
            cond.querySelectorAll('option').forEach(function (o) {
                var val = o.value;
                var text = val ? o.text : 'Without condition';
                var checked = (val === '3') ? 'checked' : '';
                var style = o.getAttribute('style') || '';
                fieldset_1.insertAdjacentHTML("beforeend", "<label class=\"dgray-12\" style=\"margin-top:0px;" + style + "\"><input name=\"condition\" value=\"" + val + "\" " + checked + " type=\"radio\"/>" + text + "</label>");
            });
            cond.remove();
            // @ts-ignore
            var _onCoinSwapForm_1 = CoinSwapFormOn_1;
            if (!_onCoinSwapForm_1) {
                return;
            }
            var CoinSwapFormOn_1 = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _onCoinSwapForm_1.apply(void 0, __spread(args));
                swapForm.querySelector("input[name=\"condition\"][value=\"" + args[1] + "\"]").checked = true;
            };
            var addButton = swapBlock.querySelector('center button.btn-s.btn-gray');
            if (!addButton) {
                return;
            }
            var buttonSetId = 'swap-button-set';
            addButton.insertAdjacentHTML("afterend", "<div id=\"" + buttonSetId + "\" class=\"btn-set\"/>");
            addButton.remove();
            var buttonSet_1 = document.getElementById(buttonSetId);
            if (!buttonSet_1) {
                return;
            }
            var addSwapMarker = function (text, color, value) {
                var markerId = "marked-" + value;
                var markerClass = "marked-" + color;
                buttonSet_1.insertAdjacentHTML("beforeend", "<div id=\"" + markerId + "\" class=\"" + markerClass + "\">" + text + "</div>");
                document.getElementById(markerId).addEventListener("click", function () { return CoinSwapFormOn_1('', "" + value); });
            };
            addSwapMarker('?', 6, 0);
            addSwapMarker('G', 7, 6);
            addSwapMarker('VG', 8, 5);
            addSwapMarker('F', 9, 4);
            addSwapMarker('VF', 10, 3);
            addSwapMarker('XF', 11, 2);
            addSwapMarker('UN', 12, 1);
            addSwapMarker('PR', 3, 7);
            addSwapMarker('CP', 5, 100);
        }
    }
})();


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OK = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="#25ae88"/><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M38 15L22 33l-10-8"/></svg>';
var ERROR = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="#d75a4a"/><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M16 34l9-9 9-9m-18 0l9 9 9 9"/></svg>';
var INFO = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="#48a0dc"/><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M25 37v2m-7-23a7 7 0 0 1 7.1-7 7.1 7.1 0 0 1 6.9 6.9 7 7 0 0 1-3.21 5.99A8.6 8.6 0 0 0 25 29.16V32"/></svg>';
var WARNING = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="#ed8a19"/><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M38 25H12"/></svg>';
var FLOWER = 'data:image/svg+xml;charset=utf-8<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.01 58.01"><path d="M17.57 29a8.9 8.9 0 0 1-3.4-2.11L8.5 21.23a8.87 8.87 0 0 1-.92-1.1A9.02 9.02 0 0 0 0 29.01c0 4.95 4.05 9 9 9h8a9.03 9.03 0 0 0 8.9-10.28c-.75.56-1.56.98-2.42 1.28-1.9-.66-4-.66-5.9 0z" fill="#bf4d90"/><path d="M37.89 7.58C37.19 3.3 33.48.01 29 .01s-8.18 3.3-8.87 7.57c.38.28.75.58 1.1.92l5.65 5.66a9.08 9.08 0 0 1 .84 11.75 8.93 8.93 0 0 0 2.57 0A9.08 9.08 0 0 0 38 17V9c0-.49-.05-.96-.12-1.43z" fill="#ed8a19"/><path d="M36.8 49.51l-5.67-5.65a9.08 9.08 0 0 1-.84-11.75 8.93 8.93 0 0 0-2.56 0 9.08 9.08 0 0 0-7.71 8.9v8a9.03 9.03 0 0 0 9 9c4.46 0 8.18-3.3 8.87-7.58a9.05 9.05 0 0 1-1.1-.92z" fill="#7fabda"/><path d="M50.44 20.13a8.8 8.8 0 0 1-.92 1.1l-5.66 5.66a9.08 9.08 0 0 1-11.75.84 8.93 8.93 0 0 0 0 2.56 9.08 9.08 0 0 0 8.9 7.72h8a9.03 9.03 0 0 0 9-9c0-4.47-3.3-8.19-7.57-8.88z" fill="#a4e869"/><path d="M49.52 8.5a9.03 9.03 0 0 0-11.63-.92c.07.47.12.94.12 1.43v8a9.08 9.08 0 0 1-7.71 8.9 8.97 8.97 0 0 0 1.82 1.81 9.08 9.08 0 0 0 11.75-.84l5.65-5.65a9.03 9.03 0 0 0 0-12.73z" fill="#efce4a"/><path d="M50.44 37.88c-.47.08-.94.13-1.43.13h-8a9.08 9.08 0 0 1-8.9-7.71 8.97 8.97 0 0 0-1.81 1.81 9.08 9.08 0 0 0 .84 11.75l5.65 5.65a9.03 9.03 0 0 0 12.73 0 9.03 9.03 0 0 0 .92-11.63z" fill="#61b872"/><path d="M29.01 17.57a8.9 8.9 0 0 0-2.12-3.41L21.23 8.5a9.03 9.03 0 0 0-12.73 0 9.02 9.02 0 0 0-.91 11.63c.46-.07.93-.12 1.41-.12h8a9.03 9.03 0 0 1 8.9 7.72h.01a8.97 8.97 0 0 0 1.82-1.83 9.08 9.08 0 0 0 1.29-8.33z" fill="#ed7161"/><path d="M17 20H9a8.91 8.91 0 0 0-1.41.13c.27.39.57.76.92 1.1l5.65 5.66a9 9 0 0 0 3.42 2.12c1.9-.66 4-.66 5.9 0a8.9 8.9 0 0 0 2.42-1.28A9.03 9.03 0 0 0 17 20z" fill="#bf4d90"/><path d="M26.9 31.13A8.97 8.97 0 0 0 23.47 29a9.08 9.08 0 0 0-9.32 2.12L8.5 36.78a9.03 9.03 0 0 0 0 12.73 9.03 9.03 0 0 0 11.63.91A8.95 8.95 0 0 1 20 49v-8a9.08 9.08 0 0 1 7.71-8.9 8.97 8.97 0 0 0-.83-.98z" fill="#9777a8"/></svg>';
function notify(title, body, icon) {
    var options = { body: body, icon: icon };
    new Notification(title, options);
}
function request(title, body, icon) {
    if (!("Notification" in window)) {
        alert(title);
    }
    else if (Notification.permission === 'granted') {
        notify(title, body, icon);
    }
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                notify(title, body, icon);
            }
        });
    }
}
function info(title) {
    request(title, null, INFO);
}
exports.info = info;
function err(title) {
    request(title, null, ERROR);
}
exports.err = err;
function warn(title) {
    request(title, null, WARNING);
}
exports.warn = warn;
function ok(title) {
    request(title, null, OK);
}
exports.ok = ok;


/***/ })
/******/ ]);