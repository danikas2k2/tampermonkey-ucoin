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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function ajax(url, method = "GET", body) {
    return fetch(url, { method, body });
}
exports.ajax = ajax;
function get(url, body) {
    return ajax(url, "GET", body);
}
exports.get = get;
function post(url, body) {
    return ajax(url, "POST", body);
}
exports.post = post;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function delay(time) {
    return () => new Promise(resolve => setTimeout(() => resolve(), time));
}
exports.delay = delay;
const minDelay = 300; // ms
const rndDelay = 500; // ms
function randomDelay() {
    return delay(Math.round(minDelay + Math.random() * rndDelay));
}
exports.randomDelay = randomDelay;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ==UserScript==
// @name         collector :: ucoin.net
// @namespace    https://ucoin.net/
// @version      1.0
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @match        https://*.ucoin.net/*
// ==/UserScript==
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ucoin_less_1 = __importDefault(__webpack_require__(4));
document.head.insertAdjacentHTML("beforeend", `<style type="text/css">${ucoin_less_1.default}</style>`);
'use strict';
const links_1 = __webpack_require__(6);
const coin_form_1 = __webpack_require__(7);
const swap_form_1 = __webpack_require__(13);
const swap_list_1 = __webpack_require__(15);
const gallery_1 = __webpack_require__(16);
const prices_1 = __webpack_require__(17);
const UID = '28609';
const loc = document.location.href;
if (loc.includes('/coin/')) {
    const tags = document.getElementById('tags');
    if (tags) {
        // fixTagLinks
        tags.querySelectorAll('a[href^="/gallery/"]').forEach(links_1.updateLinkHref);
    }
    if (document.getElementById('user-menu')) {
        coin_form_1.addBuyDateResetButton();
        coin_form_1.addSyncConditionToColorTable();
        if (loc.includes('ucid=')) {
            coin_form_1.addPublicityToggle();
            coin_form_1.addReplacementToggle();
        }
    }
    const mySwap = document.getElementById('my-swap-block');
    if (mySwap && mySwap.querySelector('#swap-block')) {
        swap_form_1.addSwapFormQtyButtons();
        swap_form_1.addSwapColorMarkers();
        swap_form_1.addSwapComments();
        swap_form_1.addSwapButtons();
    }
    swap_form_1.styleSwapLists();
    const theySwap = document.getElementById('swap');
    if (theySwap && theySwap.nextElementSibling.id === 'swap-block') {
        prices_1.estimateSwapPrices();
    }
}
if (loc.includes('/gallery/') && loc.includes(`uid=${UID}`)) {
    const gallery = document.getElementById('gallery');
    if (gallery) {
        // fix gallery links
        gallery.querySelectorAll('a[href^="/gallery/"]').forEach(links_1.updateLinkHref);
        gallery.querySelectorAll('a[href^="?"]').forEach(links_1.updateLinkHref);
        gallery.querySelectorAll('div.close').forEach(links_1.updateOnClickHref);
    }
    gallery_1.addGalleryVisibilityToggle();
}
if (loc.includes('/swap-mgr/') || loc.includes('/swap-list/')) {
    swap_list_1.addTrackingLinks();
    swap_list_1.showAllPrices();
    swap_list_1.addConflictHandling();
    swap_list_1.checkSold();
    swap_list_1.ignoreUnwanted();
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// Module
exports.push([module.i, "#buy_reset {\n  font-size: 16px;\n  font-weight: bold;\n  width: 22px;\n  height: 22px;\n  display: inline-block;\n  text-align: center;\n}\n#ucid-block .btn-narrow {\n  padding-left: 14px;\n  padding-right: 14px;\n}\n.estimated-prices-widget {\n  margin: 30px 0;\n}\n#estimated-prices {\n  overflow-x: hidden;\n  max-height: 400px;\n}\n#estimated-prices .list-link {\n  padding: 6px 0 3px;\n}\n#estimated-prices .list-sep {\n  padding: 0;\n  border-bottom: 2px solid #E9EDF1;\n}\n#estimated-prices .dgray-11 {\n  display: inline-block;\n  text-align: center;\n  line-height: 19px;\n  width: 32px;\n  margin: 0 4px;\n}\n#estimated-prices .gray-13 {\n  padding: 1px 4px 1px 8px;\n  max-width: 64px;\n}\n#coin #swap-block .dgray-11,\n#coin #wish-block .dgray-11 {\n  width: 32px !important;\n  margin: 0 4px;\n}\n#swap-form .btn-ctrl {\n  float: right;\n  margin: 14px 3px 0;\n  height: 26px;\n}\n#swap-form .btn-ctrl + .btn-ctrl {\n  margin-right: 0;\n}\n#swap-form #swap-qty {\n  margin-top: 1em;\n}\n#my-swap-block #swap-block a {\n  position: relative;\n}\n#my-swap-block #swap-block a .comments {\n  position: absolute;\n  width: auto;\n  left: 100%;\n  text-align: left;\n}\n#my-swap-block #swap-block a .comments .ico-16 {\n  display: inline-block;\n  vertical-align: middle;\n  background-position: -16px 0;\n}\n#my-swap-block #swap-block a .comments:active,\n#my-swap-block #swap-block a .comments:focus,\n#my-swap-block #swap-block a .comments:hover {\n  max-width: 100%;\n  overflow: visible;\n}\n#my-swap-block #swap-block a:active .comments,\n#my-swap-block #swap-block a:focus .comments,\n#my-swap-block #swap-block a:hover .comments {\n  max-width: 100%;\n  overflow: visible;\n}\n#my-swap-block #swap-block center div.btn-set {\n  display: flex;\n  justify-content: space-between;\n  margin: 0 1em;\n}\n#my-swap-block #swap-block center div.btn-set div {\n  flex: 0 0 20px;\n  width: 20px;\n  height: 20px;\n  line-height: 20px;\n  cursor: pointer;\n  padding: 1px;\n}\n#my-swap-block #swap-block .btn--combiner,\n#my-swap-block #swap-block .btn--expander {\n  margin: 8px 2px 0;\n}\n#swap-list .swap-coin tr,\n#swap-mgr .swap-coin tr {\n  transition: opacity 0.25s, background 0.25s;\n}\n#swap-list .swap-coin tr.conflict,\n#swap-mgr .swap-coin tr.conflict {\n  background: #fdd;\n}\n#swap-list .swap-coin tr.conflict.mark,\n#swap-mgr .swap-coin tr.conflict.mark {\n  background: #fed;\n}\n#swap-list .swap-coin tr.ignore,\n#swap-mgr .swap-coin tr.ignore {\n  opacity: 0.5;\n}\n#swap-list .swap-coin tr.ignore.conflict,\n#swap-mgr .swap-coin tr.ignore.conflict,\n#swap-list .swap-coin tr.ignore.mark,\n#swap-mgr .swap-coin tr.ignore.mark {\n  opacity: 0.75;\n}\n", ""]);



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const loc = document.location.href;
function updateLinkHref(a) {
    const before = ['page', 'view'];
    const after = [];
    const href = a.href;
    if (a.classList.contains('active')) {
        after.push('view');
    }
    else if (a.classList.contains('switcher')) {
        const view = getHrefParts(href)[1].get('view');
        after.push(view);
    }
    a.href = updateHref(href, before, after);
}
exports.updateLinkHref = updateLinkHref;
function updateOnClickHref(div) {
    const match = div.getAttribute('onclick').match(/location.href='([^']+)';/);
    if (match) {
        const before = ['page'];
        if (document.getElementById('status-filter')) {
            before.push('status');
        }
        else {
            const a = div.querySelector('a.switcher');
            if (a) {
                const view = getHrefParts(a.href)[1].get('view');
                before.push('view');
                before.push(view);
            }
        }
        div.setAttribute('onclick', `location.href='${updateHref(match[1], before)}';`);
    }
}
exports.updateOnClickHref = updateOnClickHref;
function updateHref(href, before, after) {
    const [locPath, locQuery] = getHrefParts(loc);
    if (before) {
        applyQuery(locQuery, before);
    }
    applyQuery(locQuery, getHrefParts(href)[1]);
    if (after) {
        applyQuery(locQuery, after);
    }
    return [locPath, [...locQuery.entries()]
            .map(([k, v]) => `${k}=${v.replace(/\+/g, '%2B')}`).join('&')]
        .join('?');
}
exports.updateHref = updateHref;
function applyQuery(query, apply) {
    if (!apply) {
        return;
    }
    if (!(apply instanceof Map)) {
        // @ts-ignore
        apply = new Map(arrayOf(apply).map(arrayOf));
    }
    for (const [key, value] of apply.entries()) {
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
exports.applyQuery = applyQuery;
function arrayOf(a) {
    return Array.isArray(a) ? a : [a];
}
exports.arrayOf = arrayOf;
function getHrefParts(href) {
    const parts = href.split('?');
    const add = parts.join('%3F').split('&').map(q => q.split('='));
    // @ts-ignore
    return [parts.shift(), new Map(add)];
}
exports.getHrefParts = getHrefParts;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const notify_1 = __webpack_require__(8);
const ajax_1 = __webpack_require__(0);
function addBuyDateResetButton() {
    const buyYear = document.getElementById('buy_year');
    const buyMonth = document.getElementById('buy_month');
    buyMonth.insertAdjacentHTML("beforebegin", `<a id="buy_reset" href="#">&#x21BB;</a>`);
    const buyReset = document.getElementById('buy_reset');
    buyReset.addEventListener("click", () => {
        const d = new Date();
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        buyMonth.value = (m < 10) ? `0${m}` : `${m}`;
        buyYear.value = `${y}`;
        return false;
    });
}
exports.addBuyDateResetButton = addBuyDateResetButton;
function addSyncConditionToColorTable() {
    const cond = document.getElementById('condition');
    const CN = new Map([
        ['6', '7'],
        ['5', '8'],
        ['4', '9'],
        ['3', '10'],
        ['2', '11'],
        ['1', '12'],
        ['7', '3'],
    ]);
    // @ts-ignore
    const CL = new Map([...CN.entries()].map(([k, v]) => [v, k])); // switch conditions and colors
    document.getElementById('edit-coin-form').querySelectorAll('table div[class^="marked-"]').forEach((div) => {
        if (div.id === 'set-color') {
            return;
        }
        div.addEventListener('click', e => {
            const div = e.target;
            let color = null;
            div.classList.forEach((c) => {
                if (c.startsWith('marked-')) {
                    color = c.split('-', 3)[1];
                }
            });
            if (CL.has(color)) {
                cond.value = CL.get(color);
            }
        });
    });
    const tableColor = document.getElementById('table-color');
    const setColor = document.getElementById('set-color');
    cond.addEventListener('change', e => {
        setColor.classList.remove(`marked-${tableColor.value}`);
        const condition = e.target.value;
        if (CN.has(condition)) {
            tableColor.value = CN.get(condition);
        }
        setColor.classList.add(`marked-${tableColor.value}`);
    });
}
exports.addSyncConditionToColorTable = addSyncConditionToColorTable;
function addPublicityToggle() {
    const view = document.getElementById('ucid-block');
    const buttons = view.querySelector('.func-button');
    const edit = buttons.querySelector('button.btn-blue');
    const status = view.querySelector('.status-line .left');
    buttons.querySelectorAll('.btn-l').forEach(button => {
        button.classList.add('btn-narrow');
    });
    const form = document.getElementById('edit-coin-form').querySelector('form');
    const publicCheckbox = form.querySelector('input[name=public]');
    let checked = publicCheckbox && publicCheckbox.checked;
    console.log(publicCheckbox);
    console.log(publicCheckbox.checked);
    const visibilityButton = edit.cloneNode();
    edit.insertAdjacentElement("beforebegin", visibilityButton);
    visibilityButton.removeAttribute('onClick');
    visibilityButton.classList.add('btn-narrow');
    visibilityButton.addEventListener("click", () => {
        postPublicityForm(document.location.href, form, !checked).then(() => {
            checked = !checked;
            updatePublicityStatus();
            checked ? notify_1.ok('Coin public') : notify_1.info('Coin private');
        });
    });
    let prevKeyCode = -1;
    document.body.addEventListener("keydown", e => {
        if (e.keyCode === prevKeyCode) {
            if (e.keyCode === 72 || e.keyCode === 83) {
                visibilityButton.click();
            }
        }
        prevKeyCode = e.keyCode;
    });
    updatePublicityStatus();
    function updatePublicityStatus() {
        visibilityButton.title = checked ? 'Hide' : 'Show';
        visibilityButton.innerText = checked ? 'H' : 'S';
        status.innerText = checked ? 'Public' : 'Private';
        if (checked) {
            visibilityButton.classList.replace('btn-blue', 'btn-gray');
            status.classList.replace('status0', 'status1');
        }
        else {
            visibilityButton.classList.replace('btn-gray', 'btn-blue');
            status.classList.replace('status1', 'status0');
        }
    }
    function postPublicityForm(url, form, checked) {
        const input = form.querySelector('input[name=public]');
        if (input) {
            input.checked = checked;
        }
        return ajax_1.post(url, new FormData(form));
    }
}
exports.addPublicityToggle = addPublicityToggle;
function addReplacementToggle() {
    const view = document.getElementById('ucid-block');
    const buttons = view.querySelector('.func-button');
    const edit = buttons.querySelector('button.btn-blue');
    let replaceStatus;
    view.querySelectorAll('.status-line + table tr').forEach((tr) => {
        if (tr.querySelector('span.status2')) {
            replaceStatus = tr;
        }
    });
    buttons.querySelectorAll('.btn-l').forEach(button => {
        button.classList.add('btn-narrow');
    });
    const form = document.getElementById('edit-coin-form').querySelector('form');
    const replaceCheckbox = form.querySelector('input[name=replace]');
    console.log(replaceCheckbox);
    console.log(replaceCheckbox.checked);
    let replace = replaceCheckbox && replaceCheckbox.checked;
    const replacementButton = edit.cloneNode();
    edit.insertAdjacentElement("beforebegin", replacementButton);
    replacementButton.removeAttribute('onClick');
    replacementButton.classList.add('btn-narrow');
    replacementButton.addEventListener("click", () => {
        postReplacementForm(document.location.href, form, !replace).then(() => {
            replace = !replace;
            updateReplacementStatus();
            replace ? notify_1.err('Should be replaced') : notify_1.info('No replace required');
        });
    });
    let prevKeyCode = -1;
    document.body.addEventListener("keydown", e => {
        if (e.keyCode === prevKeyCode) {
            if (e.keyCode === 82) {
                replacementButton.click();
            }
        }
        prevKeyCode = e.keyCode;
    });
    updateReplacementStatus();
    function updateReplacementStatus() {
        replacementButton.title = replace ? `Don't replace` : `Replace`;
        replacementButton.innerText = 'R';
        if (replace) {
            replacementButton.classList.replace('btn-blue', 'btn-gray');
            if (!replaceStatus) {
                const tbody = view.querySelector('.status-line + table tbody');
                if (tbody) {
                    tbody.insertAdjacentHTML("beforeend", `<tr><td class="lgray-12" colspan="2"><span class="set status2 wrap" style="max-width: 232px;width: 232px;padding: 0;display: block;margin-top: 6px;">Need to replace</span></td></tr>`);
                    replaceStatus = tbody.querySelector('tr:last-child');
                }
            }
        }
        else {
            replacementButton.classList.replace('btn-gray', 'btn-blue');
            if (replaceStatus) {
                replaceStatus.remove();
                replaceStatus = null;
            }
        }
    }
    function postReplacementForm(url, form, replace) {
        const input = form.querySelector('input[name=replace]');
        if (input) {
            input.checked = replace;
        }
        return ajax_1.post(url, new FormData(form));
    }
}
exports.addReplacementToggle = addReplacementToggle;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const success_svg_1 = __importDefault(__webpack_require__(9));
// @ts-ignore
const error_svg_1 = __importDefault(__webpack_require__(10));
// @ts-ignore
const info_svg_1 = __importDefault(__webpack_require__(11));
// @ts-ignore
const minus_svg_1 = __importDefault(__webpack_require__(12));
function notify(title, body, icon) {
    const options = {};
    if (body) {
        options.body = body;
    }
    if (icon) {
        options.icon = `data:image/svg+xml;charset=utf-8,${encodeURI(icon)}`;
    }
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
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                notify(title, body, icon);
            }
        });
    }
}
function info(title, body) {
    request(title, body, info_svg_1.default);
}
exports.info = info;
function err(title, body) {
    request(title, body, error_svg_1.default);
}
exports.err = err;
function warn(title, body) {
    request(title, body, minus_svg_1.default);
}
exports.warn = warn;
function ok(title, body) {
    request(title, body, success_svg_1.default);
}
exports.ok = ok;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\"><circle cx=\"25\" cy=\"25\" r=\"25\" fill=\"#25ae88\"></circle><path fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"M38 15L22 33l-10-8\"></path></svg>"

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\"><circle cx=\"25\" cy=\"25\" r=\"25\" fill=\"#d75a4a\"></circle><path fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M16 34l9-9 9-9m-18 0l9 9 9 9\"></path></svg>"

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\"><circle cx=\"25\" cy=\"25\" r=\"25\" fill=\"#48a0dc\"></circle><path fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M25 37v2m-7-23a7 7 0 0 1 7.1-7 7.1 7.1 0 0 1 6.9 6.9 7 7 0 0 1-3.21 5.99A8.6 8.6 0 0 0 25 29.16V32\"></path></svg>"

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\"><circle cx=\"25\" cy=\"25\" r=\"25\" fill=\"#ed8a19\"></circle><path fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"M38 25H12\"></path></svg>"

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const swap_links_1 = __webpack_require__(14);
const delay_1 = __webpack_require__(1);
const ajax_1 = __webpack_require__(0);
function addSwapComments() {
    swap_links_1.getSwapLinks().forEach(a => {
        addSwapComment(a);
    });
}
exports.addSwapComments = addSwapComments;
function addSwapButtons() {
    const mySwap = document.getElementById('my-swap-block');
    const swapBlock = mySwap.querySelector('#swap-block');
    const buttonSet = swapBlock.querySelector('center');
    const variants = new Map();
    let couldExpand = false, couldCombine = false;
    updateButtons();
    function updateSwapVariants() {
        couldExpand = false;
        couldCombine = false;
        variants.clear();
        swap_links_1.forEachSwapLink((a, m) => {
            const { uniq, usid, cond, price, info, vid, strqty } = m;
            const qty = +strqty;
            if (qty > 1) {
                couldExpand = true;
            }
            let variant;
            if (variants.has(uniq)) {
                variant = variants.get(uniq);
                variant.qty += qty;
                couldCombine = true;
            }
            else {
                variant = { usid, cond, price, info, vid, qty };
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
        buttonSet.querySelectorAll('button.btn--combiner,button.btn--expander').forEach((combiner) => {
            combiner.classList.add('btn-white');
            combiner.classList.remove('btn-blue');
            combiner.disabled = true;
        });
    }
    function enableButtons() {
        buttonSet.querySelectorAll('button.btn--combiner,button.btn--expander').forEach((combiner) => {
            combiner.classList.add('btn-blue');
            combiner.classList.remove('btn-white');
            combiner.disabled = false;
        });
    }
    function updateLinkQty(a, qty) {
        if (a.hasAttribute('onClick')) {
            a.setAttribute('onClick', a.getAttribute('onClick').replace(swap_links_1.CoinSwapFormOnMatcher, `CoinSwapFormOn('$<usid>', '$<cond>', '$<price>', '$<info>', '$<vid>', '${qty}', '$<replica>'`));
        }
        a.querySelectorAll('span.left.dblue-13').forEach(a => a.remove());
        if (qty > 1) {
            a.querySelectorAll('span.left.gray-13.wrap').forEach(a => a.insertAdjacentHTML("afterend", `<span class="left dblue-13"><span>&times;</span>${qty}</span>`));
        }
    }
    // expandTo - number of links (0 for unlimited)
    function expandClicked(expandTo = 0) {
        disableButtons();
        console.log(`EXPANDING...`);
        let queue = Promise.resolve();
        swap_links_1.forEachSwapLink((a, m) => {
            const { uniq, usid, cond, price, info, vid, strqty } = m;
            const qty = +strqty;
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
                        .then(() => addSwapCoin(cond, `${q}`, vid, info, price))
                        .then(r => {
                        const links = new Set();
                        swap_links_1.getSwapLinks().forEach(l => {
                            if (!l.hasAttribute('onClick')) {
                                return;
                            }
                            const m = l.getAttribute('onClick').match(swap_links_1.CoinSwapFormOnMatcher);
                            if (m && m.groups) {
                                links.add(m.groups.usid);
                            }
                        });
                        swap_links_1.getSwapLinks(r).forEach(l => {
                            if (!l.hasAttribute('onClick')) {
                                return;
                            }
                            const m = l.getAttribute('onClick').match(swap_links_1.CoinSwapFormOnMatcher);
                            const usid = m && m.groups && m.groups.usid;
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
                        .then(() => console.log(`UPDATING ${uniq} ${usid} -> 1`))
                        .then(() => updSwapCoin(usid, cond, `${q}`, vid, info, price))
                        .then(() => updateLinkQty(a, q))
                        .then(delay_1.randomDelay());
                }
            }
        });
        queue.then(() => {
            console.log('DONE!');
            enableButtons();
            updateButtons();
        });
    }
    function addExpandButton(id, text, clickHandler) {
        const expand = document.getElementById(id);
        if (expand) {
            expand.style.display = '';
        }
        else {
            buttonSet.insertAdjacentHTML("beforeend", `<button id="${id}" type="button" class="btn--expander btn-s btn-blue">${text}</button>`);
            document.getElementById(id).addEventListener("click", clickHandler);
        }
    }
    function addExpandButtons() {
        addExpandButton('expand', 'Ex/All', () => expandClicked());
        addExpandButton('expand-x5', 'Ex/5', () => expandClicked(5));
        addExpandButton('expand-x10', 'Ex/10', () => expandClicked(10));
    }
    function combineClicked() {
        disableButtons();
        console.log(`COMBINING...`);
        let queue = Promise.resolve();
        swap_links_1.forEachSwapLink((a, m) => {
            const { uniq, usid, cond, price, info, vid, strqty } = m;
            const qty = +strqty;
            if (variants.has(uniq)) {
                if (usid != variants.get(uniq).usid) {
                    queue = queue
                        .then(() => console.log(`REMOVING ${usid}`))
                        .then(() => delSwapCoin(usid))
                        .then(() => a.remove())
                        .then(delay_1.randomDelay());
                }
                else {
                    const vqty = variants.get(uniq).qty;
                    if (qty != vqty) {
                        queue = queue
                            .then(() => console.log(`UPDATING ${usid} -> ${vqty}`))
                            .then(() => updSwapCoin(usid, cond, vqty, vid, info, price))
                            .then(() => updateLinkQty(a, vqty))
                            .then(delay_1.randomDelay());
                    }
                    else {
                        queue = queue
                            .then(() => console.log(`IGNORING ${usid}`));
                    }
                }
            }
            else {
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
        const id = 'combine';
        const combine = document.getElementById(id);
        if (combine) {
            combine.style.display = '';
        }
        else {
            buttonSet.insertAdjacentHTML("beforeend", `<button id="${id}" type="button" class="btn--combiner btn-s btn-blue" style="margin: 8px 2px 0">Combine</button>`);
            document.getElementById(id).addEventListener("click", () => combineClicked());
        }
    }
    function removeExpandButtons() {
        buttonSet.querySelectorAll('button.btn--expander').forEach((b) => {
            b.style.display = 'none';
        });
    }
    function removeCombineButtons() {
        buttonSet.querySelectorAll('button.btn--combiner').forEach((b) => {
            b.style.display = 'none';
        });
    }
    function addSwapCoin(cond, qty, vid, info, price) {
        return updSwapCoin('', cond, qty, vid, info, price, 'addswapcoin');
    }
    function delSwapCoin(usid) {
        return updSwapCoin(usid, '', '', '', '', '', 'delswapcoin');
    }
    function updSwapCoin(usid, cond, qty, vid, info, price, action = 'editswapcoin') {
        const swapForm = document.getElementById('swap-form');
        const data = new FormData(swapForm);
        data.set('usid', usid);
        data.set('condition', cond);
        data.set('qty', qty);
        data.set('swap-variety', vid);
        data.set('comment', info);
        data.set('price', price);
        data.set('action', action);
        return ajax_1.post(document.location.href, data)
            .then(response => response.text())
            .then(text => {
            const temp = document.createElement('template');
            temp.innerHTML = text;
            return temp.content;
        });
    }
}
exports.addSwapButtons = addSwapButtons;
function addSwapComment(a) {
    if (a.hasAttribute('onClick')) {
        const m = a.getAttribute('onClick').match(swap_links_1.CoinSwapFormOnMatcher);
        if (m && m.groups) {
            const { info } = m.groups;
            if (info && !a.querySelector('.comments')) {
                a.insertAdjacentHTML("beforeend", `<span class="right dgray-11 wrap comments" title="${info}"><div class="ico-16"></div> ${info}</span>`);
            }
        }
    }
}
function addSwapFormQtyButtons() {
    const qty = document.getElementById('swap-qty');
    qty.setAttribute('inputmode', 'numeric');
    qty.addEventListener("focus", e => e.target.setSelectionRange(0, e.target.value.length));
    addQtyCtrlButton("afterend", 'minus', '&minus;', v => v - 1);
    addQtyCtrlButton("afterbegin", 'plus10', '+10', v => v + 10);
    addQtyCtrlButton("afterbegin", 'plus5', '+5', v => v + 5);
    addQtyCtrlButton("afterbegin", 'plus', '+', v => v + 1);
    function addQtyCtrlButton(where, id, text, valueChanger) {
        const qtyId = `swap-qty-${id}`;
        qty.insertAdjacentHTML(where, `<button id="${qtyId}" type="button" class="btn-s btn-gray btn-ctrl">${text}</button>`);
        document.getElementById(qtyId).addEventListener('click', () => {
            qty.value = `${valueChanger(+qty.value)}`;
        });
    }
}
exports.addSwapFormQtyButtons = addSwapFormQtyButtons;
function addSwapColorMarkers() {
    const id = 'swap-cond-fieldset';
    const cond = document.getElementById('swap-cond');
    cond.insertAdjacentHTML("afterend", `<fieldset id="${id}"><legend class="gray-12" style="padding:5px;">Condition</legend></fieldset>`);
    const fieldset = document.getElementById(id);
    cond.querySelectorAll('option').forEach((o) => {
        const val = o.value;
        const text = val ? o.text : 'Without condition';
        const checked = (val === '3') ? 'checked' : '';
        const style = o.getAttribute('style') || '';
        fieldset.insertAdjacentHTML("beforeend", `<label class="dgray-12" style="margin-top:0;${style}"><input name="condition" value="${val}" ${checked} type="radio"/>${text}</label>`);
    });
    cond.remove();
    // @ts-ignore
    const _onCoinSwapForm = window.CoinSwapFormOn;
    if (!_onCoinSwapForm) {
        return;
    }
    const CoinSwapFormOn = function (...args) {
        _onCoinSwapForm(...args);
        const swapForm = document.getElementById('swap-form');
        swapForm.querySelector(`input[name="condition"][value="${args[1]}"]`).checked = true;
    };
    const mySwap = document.getElementById('my-swap-block');
    const swapBlock = mySwap.querySelector('#swap-block');
    const addButton = swapBlock.querySelector('center button.btn-s.btn-gray');
    if (!addButton) {
        return;
    }
    const buttonSetId = 'swap-button-set';
    addButton.insertAdjacentHTML("afterend", `<div id="${buttonSetId}" class="btn-set"/>`);
    addButton.remove();
    const buttonSet = document.getElementById(buttonSetId);
    if (!buttonSet) {
        return;
    }
    addSwapMarker('?', 6, 0);
    addSwapMarker('G', 7, 6);
    addSwapMarker('VG', 8, 5);
    addSwapMarker('F', 9, 4);
    addSwapMarker('VF', 10, 3);
    addSwapMarker('XF', 11, 2);
    addSwapMarker('UN', 12, 1);
    addSwapMarker('PR', 3, 7);
    addSwapMarker('CP', 5, 100);
    function addSwapMarker(text, color, value) {
        const markerId = `marked-${value}`;
        const markerClass = `marked-${color}`;
        buttonSet.insertAdjacentHTML("beforeend", `<div id="${markerId}" class="${markerClass}">${text}</div>`);
        document.getElementById(markerId).addEventListener("click", () => CoinSwapFormOn('', `${value}`));
    }
}
exports.addSwapColorMarkers = addSwapColorMarkers;
const ConditionColors = new Map([
    ['G', 7],
    ['VG', 8],
    ['F', 9],
    ['VF', 10],
    ['XF', 11],
    ['UNC', 12],
    ['PRF', 3],
    ['BU', 4],
]);
function styleSwapLists() {
    document.querySelectorAll('#swap-block a.list-link').forEach((a) => {
        const condBlock = a.querySelector(`.left.dgray-11`);
        const cond = condBlock.textContent;
        condBlock.classList.add(`marked-${ConditionColors.get(cond)}`);
        const mintBlock = a.querySelector(`.left.gray-13`);
        const mint = mintBlock.textContent;
        const parts = mint.split(' ');
        const y = parts.shift();
        if (parts.length) {
            mintBlock.textContent = y;
            mintBlock.insertAdjacentHTML("beforeend", ` <span class="lgray-11">${parts.join(' ')}</span>`);
        }
    });
}
exports.styleSwapLists = styleSwapLists;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinSwapFormOnMatcher = /CoinSwapFormOn\('(?<usid>[^']*)', '(?<cond>[^']*)', '(?<price>[^']*)', '(?<info>[^']*)', '(?<vid>[^']*)', '(?<strqty>[^']*)', '(?<replica>[^']*)'/;
function getSwapLinks(d = document) {
    const swapBlock = d.getElementById('swap-block');
    return swapBlock
        ? swapBlock.querySelectorAll('a.list-link')
        : d.querySelectorAll('a.imaginary-list-link'); // should return empty list
}
exports.getSwapLinks = getSwapLinks;
function forEachSwapLink(fn) {
    const swapLinks = getSwapLinks();
    console.log(swapLinks.length);
    swapLinks.forEach(a => {
        if (a.querySelector(`div.ico-16`)) {
            return;
        }
        if (a.hasAttribute('onClick')) {
            const m = a.getAttribute('onClick').match(exports.CoinSwapFormOnMatcher);
            if (m && m.groups) {
                const { cond, info, vid } = m.groups;
                fn(a, Object.assign({}, m.groups, { uniq: `${cond} ${vid} ${info}` }));
            }
        }
    });
}
exports.forEachSwapLink = forEachSwapLink;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ajax_1 = __webpack_require__(0);
const delay_1 = __webpack_require__(1);
function addTrackingLinks() {
    const swapMgr = document.getElementById('swap-mgr');
    swapMgr && swapMgr.querySelectorAll('div.left.lgray-11:contains("Track")+div.right.gray-11').forEach(div => {
        const text = div.textContent;
        if (text) {
            div.innerHTML = `<a href="https://www.17track.net/en/track?nums=${text}">${text}</a>`;
        }
    });
}
exports.addTrackingLinks = addTrackingLinks;
function showAllPrices() {
    document.querySelectorAll('table.swap-coin tr').forEach((tr) => {
        const td = tr.querySelector('.td-cond + *');
        const myPrice = +td.querySelector('span.blue-13').textContent;
        const prefix = td.querySelector('span.gray-11:first-child').textContent;
        const suffix = td.querySelector('span.gray-11:last-child').textContent;
        const tooltipPrice = tr.dataset.tooltipPrice;
        if (tooltipPrice) {
            const price = +tooltipPrice.replace(prefix, '').replace(suffix, '');
            if (!isNaN(price) && myPrice !== price) {
                td.insertAdjacentHTML("beforeend", `<br/><span class="gray-11">${prefix}${price.toFixed(2)}${suffix}</span>`);
            }
        }
    });
}
exports.showAllPrices = showAllPrices;
function addConflictHandling() {
    hiliteConflicts();
    if (!document.getElementById('need-swap-list')) {
        const table = document.querySelector('table.swap-coin');
        table.querySelectorAll('input.swap-checkbox, input.swap-country-checkbox').forEach((input) => {
            input.addEventListener('click', e => {
                const input = e.target;
                if (!input.checked) {
                    let parent = input.parentElement;
                    while (parent && parent.tagName !== 'tr') {
                        parent = parent.parentElement;
                    }
                    if (parent) {
                        parent.classList.remove('conflict');
                    }
                }
                hiliteConflicts();
            });
        });
    }
}
exports.addConflictHandling = addConflictHandling;
function hiliteConflicts() {
    const needSwapList = !!document.getElementById('need-swap-list');
    const table = document.querySelector('table.swap-coin');
    const rows = table.querySelectorAll('tr');
    let checked;
    if (needSwapList) {
        // @ts-ignore
        checked = rows;
    }
    else {
        checked = [];
        rows.forEach((r) => {
            if (r.querySelector('input.swap-checkbox:checked')) {
                checked.push(r);
            }
        });
    }
    checked.forEach((r) => {
        const data = r.dataset;
        const rows = table.querySelectorAll(`tr[data-tooltip-name=${JSON.stringify(data.tooltipName)}]` +
            `[data-tooltip-subject=${JSON.stringify(data.tooltipSubject)}]` +
            `[data-tooltip-variety=${JSON.stringify(data.tooltipVariety)}]` +
            `[data-tooltip-km=${JSON.stringify(data.tooltipKm)}]`);
        let dup;
        if (needSwapList) {
            // @ts-ignore
            dup = rows;
        }
        else {
            dup = [];
            rows.forEach((r) => {
                if (r.querySelector('input.swap-checkbox:checked')) {
                    dup.push(r);
                }
            });
        }
        const hasConflicts = dup.length > 1;
        dup.forEach((r) => {
            r.classList.toggle('conflict', hasConflicts);
        });
    });
}
function checkSold() {
    const needSwapList = document.getElementById('need-swap-list');
    if (needSwapList) {
        const table = document.querySelector('table.swap-coin');
        const soldList = table.querySelectorAll('tr.del');
        let soldCount = soldList.length;
        if (soldCount) {
            const delAllButtonId = 'act-d-all';
            const actionBoard = needSwapList.querySelector('.action-board');
            actionBoard.insertAdjacentHTML("beforeend", `<a class="btn-s btn-gray ico-del" id="${delAllButtonId}" style="float: right;"><div class="ico-16"></div></a>`);
            const button = document.getElementById(delAllButtonId);
            button.addEventListener('click', () => {
                if (!confirm('Are you sure you want to delete these coins?')) {
                    return false;
                }
                let queue = Promise.resolve();
                soldList.forEach(sold => {
                    queue = queue.then(() => {
                        const { href } = sold.querySelector('a.act');
                        return ajax_1.get(href);
                    }).then(() => {
                        const tree = document.getElementById('tree');
                        const soldCountElement = tree.querySelector('a.region.list-link div.right.blue-13 sup');
                        if (--soldCount) {
                            soldCountElement.textContent = `&nbsp;-${soldCount}`;
                        }
                        else {
                            soldCountElement.remove();
                        }
                        sold.remove();
                    }).then(delay_1.randomDelay());
                });
                queue.then(() => {
                    button.remove();
                });
            });
        }
    }
}
exports.checkSold = checkSold;
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
    ['BU', 8],
]);
function ignoreUnwanted() {
    if (!document.getElementById('need-swap-list')) {
        const table = document.querySelector('table.swap-coin');
        table && table.querySelectorAll('tr').forEach((tr) => {
            const markedElement = tr.querySelector('td span[class^="marked-"]');
            const marked = markedElement && markedElement.classList;
            const myCond = marked && CN.get(marked.item(0).split('marked-').pop()) || 0;
            const condElement = tr.querySelector('td.td-cond');
            const cond = condElement && CM.get(condElement.textContent) || 0;
            if (myCond && (!cond || cond <= myCond)) {
                tr.classList.add('ignore');
            }
        });
    }
}
exports.ignoreUnwanted = ignoreUnwanted;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ajax_1 = __webpack_require__(0);
const delay_1 = __webpack_require__(1);
function addGalleryVisibilityToggle() {
    const gallery = document.getElementById('gallery');
    const coins = gallery.querySelector('.coin .desc-block .coin-desc');
    let privateStatus, publicStatus;
    updateStatusElements();
    const buttonContainerId = 'button-container';
    const sortFilter = document.getElementById('sort-filter').parentElement;
    sortFilter.insertAdjacentHTML("afterend", `<div id="${buttonContainerId}" class="left filter-container" style="float:right">`);
    const container = document.getElementById(buttonContainerId);
    const showButton = addVisibilityToggleButton('Show', 'btn-blue', true);
    const showButtonCount = showButton.querySelector('small');
    const hideButton = addVisibilityToggleButton('Hide', 'btn-gray', false);
    const hideButtonCount = hideButton.querySelector('small');
    toggleButtonVisibility();
    function addVisibilityToggleButton(text, className, visibility) {
        const buttonId = `button-${text.toLowerCase()}`;
        container.insertAdjacentHTML("beforeend", `<button id="${buttonId}" class="btn-l ${className}" style="padding: 0 14px; height: 26px">${text} <small></small></button>`);
        const button = document.getElementById(buttonId);
        button.addEventListener("click", () => toggleGroupVisibility(visibility));
        return button;
    }
    function toggleButtonVisibility() {
        showButtonCount.textContent = `(${privateStatus.length})`;
        showButton.style.display = privateStatus.length ? 'block' : 'none';
        hideButtonCount.textContent = `(${publicStatus.length})`;
        hideButton.style.display = publicStatus.length ? 'block' : 'none';
    }
    function toggleGroupVisibility(checked) {
        let addClass = `status${checked ? 1 : 0}`;
        let removeClass = `status${checked ? 0 : 1}`;
        let text = checked ? 'Public' : 'Private';
        let queue = Promise.resolve();
        (checked ? privateStatus : publicStatus).forEach(status => {
            const url = status.querySelector(`~ .coin-desc div a`).href;
            queue = queue
                .then(() => ajax_1.get(url))
                .then(response => response.text())
                .then(text => {
                const fragment = document.createDocumentFragment();
                fragment.textContent = text;
                return fragment;
            })
                .then((fragment) => fragment.getElementById('coin-form').querySelector('form'))
                .then(form => postPublicityForm(url, form, checked))
                .then(() => {
                status.classList.replace(removeClass, addClass);
                status.textContent = text;
                updateStatusElements();
                toggleButtonVisibility();
            })
                .then(delay_1.randomDelay());
        });
        return queue;
    }
    function updateStatusElements() {
        privateStatus = coins.querySelectorAll('span.status0');
        publicStatus = coins.querySelectorAll('span.status1');
    }
    function postPublicityForm(url, form, checked) {
        form.querySelector('input[name=public]').checked = checked;
        return ajax_1.post(url, new FormData(form));
    }
}
exports.addGalleryVisibilityToggle = addGalleryVisibilityToggle;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ConditionValues = new Map([
    ['G', 1],
    ['VG', 2],
    ['F', 3],
    ['VF', 4],
    ['XF', 5],
    ['UNC', 6],
    ['PRF', 7],
    ['BU', 8],
]);
const ConditionColors = new Map([
    ['G', 7],
    ['VG', 8],
    ['F', 9],
    ['VF', 10],
    ['XF', 11],
    ['UNC', 12],
    ['PRF', 3],
    ['BU', 4],
]);
function estimateSwapPrices() {
    const theySwap = document.getElementById('swap');
    const swapBlock = theySwap && theySwap.nextElementSibling;
    if (!swapBlock || swapBlock.id !== 'swap-block') {
        return;
    }
    const byType = new Map();
    const byMint = new Map();
    let pricePrefix, priceSuffix;
    swapBlock.querySelectorAll(`a.list-link`).forEach((a) => {
        const cond = a.querySelector(`.left.dgray-11`).textContent;
        const mint = a.querySelector(`.left.gray-13`).textContent;
        const priceElement = a.querySelector(`.right.blue-13`);
        let priceStr = priceElement.textContent;
        pricePrefix = priceElement.firstChild.textContent;
        if (pricePrefix) {
            priceStr = priceStr.replace(pricePrefix, '');
        }
        priceSuffix = priceElement.lastChild.textContent;
        if (priceSuffix) {
            priceStr = priceStr.replace(priceSuffix, '');
        }
        const price = +priceStr;
        const p = byType.has(cond) ? byType.get(cond) : [];
        p.push(price);
        byType.set(cond, p);
        const pm = byMint.has(mint) ? byMint.get(mint) : new Map();
        const pc = pm.has(cond) ? pm.get(cond) : [];
        pc.push(price);
        pm.set(cond, pc);
        byMint.set(mint, pm);
    });
    swapBlock.parentElement.insertAdjacentHTML("beforebegin", `<div class="widget estimated-prices-widget"><a class="widget-header">Estimated prices</a><div id="estimated-prices"></div></div>`);
    const estimatedPrices = document.getElementById('estimated-prices');
    if (byMint.size > 1) {
        addPricesByType(byType);
        estimatedPrices.insertAdjacentHTML("beforeend", `<div class="list-sep"></div>`);
    }
    byMint.forEach((byType, mint) => {
        addPricesByType(byType, mint);
    });
    function addPricesByType(byType, mint = '') {
        [...byType.keys()].sort(sortByCond).forEach((cond) => {
            const p = byType.get(cond);
            const avg = p.reduce((sum, val) => sum + val, 0) / p.length;
            const min = p.reduce((min, val) => min < val ? min : val, +Infinity);
            const max = p.reduce((max, val) => max > val ? max : val, -Infinity);
            const avgPrice = avg.toFixed(2);
            const minPrice = min < avg ? `${min.toFixed(2)}<small> &middot; </small>` : '';
            const maxPrice = max > avg ? `<small> &middot; </small>${max.toFixed(2)}` : '';
            const parts = mint.split(' ');
            const y = parts.shift();
            const m = parts.length ? ` <span class="lgray-11">${parts.join(' ')}</span>` : '';
            estimatedPrices.insertAdjacentHTML("beforeend", `<a class="list-link"><span class="left dgray-11 marked-${ConditionColors.get(cond)}">${cond}</span><span class="left gray-13 wrap">${y}${m}</span><span class="right blue-13"><span class="lgray-11">${pricePrefix}</span>${minPrice}${avgPrice}${maxPrice}</span></a>`);
        });
    }
    function sortByCond(a, b) {
        return ConditionValues.get(b) - ConditionValues.get(a);
    }
}
exports.estimateSwapPrices = estimateSwapPrices;


/***/ })
/******/ ]);