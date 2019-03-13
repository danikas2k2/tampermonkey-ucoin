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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
async function ajax(url, method = "GET", body) {
    return await fetch(url, { method, body });
}
exports.ajax = ajax;
async function get(url, body) {
    return await ajax(url, "GET", body);
}
exports.get = get;
async function post(url, body) {
    return await ajax(url, "POST", body);
}
exports.post = post;


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
async function delay(time) {
    return await new Promise(resolve => setTimeout(() => resolve(), time));
}
exports.delay = delay;
async function randomDelay(rndDelay = 1000, minDelay = 500) {
    const time = Math.round(minDelay + Math.random() * rndDelay);
    console.log(`DELAY FOR ${time} MS`);
    return await delay(time);
}
exports.randomDelay = randomDelay;


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ==UserScript==
// @name         collector :: ucoin.net
// @namespace    https://ucoin.net/
// @version      1.1.2
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @downloadURL  https://bitbucket.org/danikas2k2/collection.userscripts/raw/HEAD/dist/ucoin.js
// @updateURL    https://bitbucket.org/danikas2k2/collection.userscripts/raw/HEAD/dist/ucoin.js
// @match        https://*.ucoin.net/*
// @run-at       document-end
// ==/UserScript==
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ucoin_less_1 = __importDefault(__webpack_require__(6));
const links_1 = __webpack_require__(7);
const coin_form_1 = __webpack_require__(8);
const swap_form_1 = __webpack_require__(14);
const swap_list_1 = __webpack_require__(16);
const gallery_1 = __webpack_require__(17);
const prices_1 = __webpack_require__(18);
const uid_1 = __webpack_require__(19);
document.head.insertAdjacentHTML("beforeend", `<style type="text/css">${ucoin_less_1.default}</style>`);
const loc = document.location.href;
(async function () {
    if (loc.includes('/coin/')) {
        const tags = document.getElementById('tags');
        if (tags) {
            // fixTagLinks
            const galleryLinks = tags.querySelectorAll('a[href^="/gallery/"]');
            for (const a of galleryLinks) {
                links_1.updateLinkHref(a);
            }
        }
        coin_form_1.addBuyDateResetButton();
        coin_form_1.addSyncConditionToColorTable();
        if (loc.includes('ucid=')) {
            coin_form_1.addPublicityToggle();
            coin_form_1.addReplacementToggle();
        }
        const mySwap = document.getElementById('my-swap-block');
        if (mySwap && mySwap.querySelector('#swap-block')) {
            swap_form_1.addSwapFormQtyButtons();
            swap_form_1.addSwapColorMarkers();
            swap_form_1.addSwapComments();
            await swap_form_1.addSwapButtons();
        }
        swap_form_1.styleSwapLists();
        const theySwap = document.getElementById('swap');
        if (theySwap && theySwap.nextElementSibling.id === 'swap-block') {
            prices_1.estimateSwapPrices();
        }
    }
    if (loc.includes('/gallery/') && loc.includes(`uid=${uid_1.UID}`)) {
        const gallery = document.getElementById('gallery');
        if (gallery) {
            // fix gallery links
            const galleryLinks = gallery.querySelectorAll('a[href^="/gallery/"]');
            for (const a of galleryLinks) {
                links_1.updateLinkHref(a);
            }
            const queryLinks = gallery.querySelectorAll('a[href^="?"]');
            for (const a of queryLinks) {
                links_1.updateLinkHref(a);
            }
            const closeButtons = gallery.querySelectorAll('div.close');
            for (const div of closeButtons) {
                links_1.updateOnClickHref(div);
            }
        }
        gallery_1.addGalleryVisibilityToggle();
    }
    if (loc.includes('/swap-mgr/') || loc.includes('/swap-list/')) {
        swap_list_1.addTrackingLinks();
        swap_list_1.duplicatePagination();
        swap_list_1.showAllPrices();
        swap_list_1.addConflictHandling();
        swap_list_1.checkSold();
        swap_list_1.ignoreUnwanted();
    }
})();


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, "#buy_reset {\n  font-size: 16px;\n  font-weight: bold;\n  width: 22px;\n  height: 22px;\n  display: inline-block;\n  text-align: center;\n}\n#ucid-block .btn-narrow {\n  padding-left: 14px;\n  padding-right: 14px;\n}\n.estimated-prices-widget {\n  margin: 30px 0;\n}\n#estimated-prices {\n  overflow-x: hidden;\n  max-height: 400px;\n}\n#estimated-prices .list-link {\n  padding: 6px 0 3px;\n}\n#estimated-prices .list-sep {\n  padding: 0;\n  border-bottom: 2px solid #E9EDF1;\n}\n#estimated-prices .dgray-11 {\n  display: inline-block;\n  text-align: center;\n  line-height: 19px;\n  width: 32px;\n  margin: 0 4px;\n}\n#estimated-prices .gray-13 {\n  padding: 1px 4px 1px 8px;\n  max-width: 64px;\n}\n#estimated-prices .blue-13 {\n  max-width: 120px;\n}\n#coin #swap-block .dgray-11,\n#coin #wish-block .dgray-11 {\n  width: 32px !important;\n  margin: 0 4px;\n}\n#coin #swap-form .btn-ctrl {\n  float: right;\n  margin: 14px 3px 0;\n  height: 26px;\n}\n#coin #swap-form .btn-ctrl + .btn-ctrl {\n  margin-right: 0;\n}\n#coin #swap-form #swap-qty {\n  margin-top: 1em;\n}\n#my-swap-block #swap-block a {\n  position: relative;\n}\n#my-swap-block #swap-block a .comments {\n  position: absolute;\n  width: auto;\n  left: 100%;\n  text-align: left;\n}\n#my-swap-block #swap-block a .comments .ico-16 {\n  display: inline-block;\n  vertical-align: middle;\n  background-position: -16px 0;\n}\n#my-swap-block #swap-block a .comments:active,\n#my-swap-block #swap-block a .comments:focus,\n#my-swap-block #swap-block a .comments:hover {\n  max-width: 100%;\n  overflow: visible;\n}\n#my-swap-block #swap-block a:active .comments,\n#my-swap-block #swap-block a:focus .comments,\n#my-swap-block #swap-block a:hover .comments {\n  max-width: 100%;\n  overflow: visible;\n}\n#my-swap-block #swap-block center div.btn-set {\n  display: flex;\n  justify-content: space-between;\n  margin: 0 1em;\n}\n#my-swap-block #swap-block center div.btn-set div {\n  flex: 0 0 20px;\n  width: 20px;\n  height: 20px;\n  line-height: 20px;\n  cursor: pointer;\n  padding: 1px;\n}\n#my-swap-block #swap-block .btn--combiner,\n#my-swap-block #swap-block .btn--expander {\n  margin: 8px 2px 0;\n}\n#swap-list .swap-coin tr,\n#swap-mgr .swap-coin tr {\n  transition: opacity 0.25s, background 0.25s;\n}\n#swap-list .swap-coin tr.conflict,\n#swap-mgr .swap-coin tr.conflict {\n  background: #fdd;\n}\n#swap-list .swap-coin tr.conflict.mark,\n#swap-mgr .swap-coin tr.conflict.mark {\n  background: #fed;\n}\n#swap-list .swap-coin tr.ignore,\n#swap-mgr .swap-coin tr.ignore {\n  opacity: 0.5;\n}\n#swap-list .swap-coin tr.ignore.conflict,\n#swap-mgr .swap-coin tr.ignore.conflict,\n#swap-list .swap-coin tr.ignore.mark,\n#swap-mgr .swap-coin tr.ignore.mark {\n  opacity: 0.75;\n}\n", ""]);



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const loc = document.location.href;
function updateLinkHref(a) {
    const oldUrl = new URL(a.href, loc);
    const oldParams = oldUrl.searchParams;
    const newUrl = new URL(loc);
    newUrl.pathname = oldUrl.pathname;
    const newParams = newUrl.searchParams;
    newParams.delete('page');
    newParams.delete('view');
    for (const [k, v] of oldParams.entries()) {
        newParams.set(k, v);
    }
    if (a.classList.contains('active')) {
        newParams.delete('view');
    }
    else if (a.classList.contains('switcher')) {
        newParams.delete(oldParams.get('view'));
    }
    a.href = newUrl.href;
}
exports.updateLinkHref = updateLinkHref;
function updateOnClickHref(div) {
    const match = div.getAttribute('onclick').match(/location.href='([^']+)';/);
    if (match) {
        const oldUrl = new URL(match[1], loc);
        const oldParams = oldUrl.searchParams;
        const newUrl = new URL(loc);
        newUrl.pathname = oldUrl.pathname;
        const newParams = newUrl.searchParams;
        newParams.delete('page');
        for (const [k, v] of oldParams.entries()) {
            newParams.set(k, v);
        }
        if (document.getElementById('status-filter')) {
            newParams.delete('status');
        }
        else {
            const a = div.querySelector('a.switcher');
            if (a) {
                newParams.delete('view');
                newParams.delete(new URL(a.href, loc).searchParams.get('view'));
            }
        }
        div.setAttribute('onclick', `location.href='${newUrl.href}';`);
    }
}
exports.updateOnClickHref = updateOnClickHref;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const notify_1 = __webpack_require__(9);
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
    const coinForm = document.getElementById('edit-coin-form') || document.getElementById('add-coin-form');
    const cond = (coinForm.querySelector('#condition'));
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
    if (coinForm) {
        const markedDivs = coinForm.querySelectorAll('table div[class^="marked-"]');
        for (const div of markedDivs) {
            if (div.id === 'set-color') {
                continue;
            }
            div.addEventListener('click', e => {
                const div = e.target;
                let color = null;
                for (const c of div.classList) {
                    if (c.startsWith('marked-')) {
                        color = c.split('-', 3)[1];
                    }
                }
                if (CL.has(color)) {
                    cond.value = CL.get(color);
                }
            });
        }
    }
    const tableColor = document.getElementById('edit-table-color');
    const setColor = document.getElementById('edit-set-color');
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
    for (const button of buttons.querySelectorAll('.btn-l')) {
        button.classList.add('btn-narrow');
    }
    const form = document.getElementById('edit-coin-form').querySelector('form');
    const publicCheckbox = form.querySelector('input[name=public]');
    let checked = publicCheckbox && publicCheckbox.checked;
    const visibilityButton = edit.cloneNode();
    edit.insertAdjacentElement("beforebegin", visibilityButton);
    visibilityButton.removeAttribute('onClick');
    visibilityButton.classList.add('btn-narrow');
    visibilityButton.addEventListener("click", async () => {
        await postPublicityForm(document.location.href, form, !checked);
        checked = !checked;
        updatePublicityStatus();
        checked ? notify_1.ok('Coin public') : notify_1.info('Coin private');
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
    async function postPublicityForm(url, form, checked) {
        const input = form.querySelector('input[name=public]');
        if (input) {
            input.checked = checked;
        }
        return await ajax_1.post(url, new FormData(form));
    }
}
exports.addPublicityToggle = addPublicityToggle;
function addReplacementToggle() {
    const view = document.getElementById('ucid-block');
    const funcButtons = view.querySelector('.func-button');
    const edit = funcButtons.querySelector('button.btn-blue');
    let replaceStatus;
    const statusRows = view.querySelectorAll('.status-line + table tr');
    for (const tr of statusRows) {
        if (tr.querySelector('span.status2')) {
            replaceStatus = tr;
        }
    }
    const buttons = funcButtons.querySelectorAll('.btn-l');
    for (const button of buttons) {
        button.classList.add('btn-narrow');
    }
    const form = document.getElementById('edit-coin-form').querySelector('form');
    const replaceCheckbox = form.querySelector('input[name=replace]');
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const success_svg_1 = __importDefault(__webpack_require__(10));
// @ts-ignore
const error_svg_1 = __importDefault(__webpack_require__(11));
// @ts-ignore
const info_svg_1 = __importDefault(__webpack_require__(12));
// @ts-ignore
const minus_svg_1 = __importDefault(__webpack_require__(13));
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
/* 10 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\"><circle cx=\"25\" cy=\"25\" r=\"25\" fill=\"#25ae88\"></circle><path fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"M38 15L22 33l-10-8\"></path></svg>"

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\"><circle cx=\"25\" cy=\"25\" r=\"25\" fill=\"#d75a4a\"></circle><path fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M16 34l9-9 9-9m-18 0l9 9 9 9\"></path></svg>"

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\"><circle cx=\"25\" cy=\"25\" r=\"25\" fill=\"#48a0dc\"></circle><path fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M25 37v2m-7-23a7 7 0 0 1 7.1-7 7.1 7.1 0 0 1 6.9 6.9 7 7 0 0 1-3.21 5.99A8.6 8.6 0 0 0 25 29.16V32\"></path></svg>"

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\"><circle cx=\"25\" cy=\"25\" r=\"25\" fill=\"#ed8a19\"></circle><path fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"M38 25H12\"></path></svg>"

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const swap_links_1 = __webpack_require__(15);
const delay_1 = __webpack_require__(2);
const ajax_1 = __webpack_require__(0);
const uid_1 = __webpack_require__(19);
function addSwapComments() {
    for (const a of swap_links_1.getSwapLinks()) {
        addSwapComment(a);
    }
}
exports.addSwapComments = addSwapComments;
async function addSwapButtons() {
    const mySwap = document.getElementById('my-swap-block');
    if (!mySwap) {
        return;
    }
    if (mySwap.classList.contains('hide')) {
        mySwap.classList.remove('hide');
        mySwap.style.display = '';
        const showButton = mySwap.previousSibling;
        showButton.classList.add('hide');
        showButton.style.display = 'none';
    }
    const swapBlock = mySwap.querySelector('#swap-block');
    const div = document.createElement('div');
    div.style.maxHeight = '400px';
    div.style.overflowX = 'hidden';
    div.style.overflowY = 'auto';
    swapBlock.insertAdjacentElement("afterbegin", div);
    for (const { a } of swap_links_1.getSwapLinksWithMatches()) {
        div.insertAdjacentElement("beforeend", a);
    }
    const buttonSet = swapBlock.querySelector('center');
    const variants = new Map();
    let couldExpand = false, couldCombine = false;
    updateButtons();
    function updateSwapVariants() {
        couldExpand = false;
        couldCombine = false;
        variants.clear();
        for (const { m } of swap_links_1.getSwapLinksWithMatches()) {
            const { uniq, usid, cond, price, info, vid, strqty } = m;
            const qty = +strqty;
            if (qty > 1) {
                couldExpand = true;
            }
            let variant;
            if (variants.has(uniq)) {
                variant = variants.get(uniq);
                variant.usids.add(usid);
                variant.total += qty;
                couldCombine = true;
            }
            else {
                variant = { usid, usids: new Set([usid]), cond, price, info, vid, qty, total: qty };
            }
            variants.set(uniq, variant);
        }
    }
    function updateButtons() {
        updateSwapVariants();
        couldExpand ? addExpandButtons() : removeExpandButtons();
        couldCombine ? addCombineButtons() : removeCombineButtons();
    }
    function removeButtons() {
        removeExpandButtons();
        removeCombineButtons();
    }
    function updateLinkQty(a, qty) {
        if (a.hasAttribute('onClick')) {
            a.setAttribute('onClick', a.getAttribute('onClick').replace(swap_links_1.CoinSwapFormOnMatcher, `CoinSwapFormOn('$<usid>', '$<cond>', '$<price>', '$<info>', '$<vid>', '${qty}', '$<replica>'`));
        }
        for (const span of a.querySelectorAll('span.left.dblue-13')) {
            span.remove();
        }
        if (qty > 1) {
            for (const span of a.querySelectorAll('span.left.gray-13.wrap')) {
                span.insertAdjacentHTML("afterend", `<span class="left dblue-13"><span>&times;</span>${qty}</span>`);
            }
        }
    }
    // expandTo - number of links (0 for unlimited)
    async function expandClicked(expandTo = 0) {
        var e_1, _a;
        removeButtons();
        console.log(`EXPANDING...`);
        let isAddFailed = false;
        let isUpdFailed = false;
        let isFirstQuery = true;
        try {
            for (var _b = __asyncValues(swap_links_1.getSwapLinksWithMatches()), _c; _c = await _b.next(), !_c.done;) {
                const { a, m } = _c.value;
                const { uniq, usid, cond, price, info, vid, strqty } = m;
                const qty = +strqty;
                const n = expandTo > 0 ? Math.min(qty, expandTo) : qty;
                if (n <= 1) {
                    console.log(`IGNORING ${uniq} ${usid}`);
                    continue; // return?
                }
                for (let i = n, qq = qty, q = Math.floor(qq / i); i > 1; i--, q = Math.floor(qq / i)) {
                    qq -= q;
                    if (!isFirstQuery) {
                        await delay_1.randomDelay();
                    }
                    isFirstQuery = false;
                    console.log(`ADDING ${uniq} ${n - i + 1} -> ${q}`);
                    const addR = await addSwapCoin({ cond, qty: q, vid, info, price });
                    if (!addR) {
                        isAddFailed = true;
                        break;
                    }
                    const links = new Set();
                    for (const l of swap_links_1.getSwapLinks()) {
                        if (!l.hasAttribute('onClick')) {
                            continue;
                        }
                        const m = l.getAttribute('onClick').match(swap_links_1.CoinSwapFormOnMatcher);
                        if (m && m.groups) {
                            links.add(m.groups.usid);
                        }
                    }
                    for (const l of swap_links_1.getSwapLinks(addR)) {
                        if (!l.hasAttribute('onClick')) {
                            continue;
                        }
                        const m = l.getAttribute('onClick').match(swap_links_1.CoinSwapFormOnMatcher);
                        const usid = m && m.groups && m.groups.usid;
                        if (!usid || links.has(usid)) {
                            continue;
                        }
                        links.add(usid);
                        styleSwapLink(l);
                        a.insertAdjacentElement("afterend", l);
                        addSwapComment(l);
                    }
                    if (!isFirstQuery) {
                        await delay_1.randomDelay();
                    }
                    isFirstQuery = false;
                    console.log(`UPDATING ${uniq} ${usid} -> ${qq}`);
                    const updR = await updSwapCoin(usid, { cond, qty: qq, vid, info, price });
                    if (!updR) {
                        isUpdFailed = true;
                        break;
                    }
                    updateLinkQty(a, qq);
                }
                if (isAddFailed || isUpdFailed) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (isAddFailed) {
            console.log('ADD FAILED :(');
        }
        else if (isUpdFailed) {
            console.log('UPDATE FAILED :(');
        }
        else {
            console.log('DONE!');
        }
        updateButtons();
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
        addExpandButton('expand', '&laquo;*&raquo;', () => expandClicked());
        addExpandButton('expand-x5', '&laquo;5&raquo;', () => expandClicked(5));
        addExpandButton('expand-x10', '&laquo;10&raquo;', () => expandClicked(10));
    }
    async function combineClicked() {
        removeButtons();
        console.log(`COMBINING...`);
        let isDelFailed = false;
        let isUpdFailed = false;
        let isFirstQuery = true;
        console.log(variants);
        for (const variant of variants.values()) {
            const { usid, usids, qty, total } = variant;
            if (total <= qty) {
                continue;
            }
            /*if (!isFirstQuery) {
                await randomDelay();
            }
            isFirstQuery = false;*/
            const remove = new Set(usids);
            remove.delete(usid);
            console.log(`REMOVING ${remove}`);
            const delR = await delSwapCoin(remove);
            if (!delR) {
                isDelFailed = true;
                break;
            }
            console.log(`UPDATING ${usid}`);
            const updR = await updSwapCoin(usid, Object.assign({}, variant, { qty: total }));
            if (updR) {
                const rSwapBlock = updR.getElementById('my-swap-block');
                const mySwapBlock = document.getElementById('my-swap-block');
                if (rSwapBlock && mySwapBlock) {
                    mySwapBlock.replaceWith(rSwapBlock);
                    styleSwapLists();
                }
            }
            else {
                isUpdFailed = true;
                break;
            }
        }
        /*for await (const {a, m} of getSwapLinksWithMatches()) {
            const {uniq, usid, cond, price, info, vid, strqty} = m;
            const qty = +strqty;

            if (!variants.has(uniq)) {
                console.log(`IGNORING ${usid}`);
                continue;
            }

            const variant = variants.get(uniq);
            const {usid: vusid} = variant;

            if (usid != vusid) {
                if (!isFirstQuery) {
                    await randomDelay();
                }
                isFirstQuery = false;

                console.log(`REMOVING ${usid}`);
                const delR = await delSwapCoin(usid);
                if (!delR) {
                    isDelFailed = true;
                    break;
                }

                a.remove();

                if (!isFirstQuery) {
                    await randomDelay();
                }
                isFirstQuery = false;

                let {qty: vqty} = variant;
                vqty += qty;
                console.log(`UPDATING ${vusid} -> ${vqty}`);
                const updR = await updSwapCoin(vusid, cond, vqty, vid, info, price);
                if (!updR) {
                    isUpdFailed = true;
                    break;
                }

                const {a: va} = variant;
                updateLinkQty(va, vqty);
                variant.qty = vqty;
            }
        }*/
        if (isDelFailed) {
            console.log('ADD FAILED :(');
        }
        else if (isUpdFailed) {
            console.log('UPDATE FAILED :(');
        }
        else {
            console.log('DONE!');
        }
        updateButtons();
    }
    function addCombineButtons() {
        const id = 'combine';
        const combine = document.getElementById(id);
        if (combine) {
            combine.style.display = '';
        }
        else {
            buttonSet.insertAdjacentHTML("beforeend", `<button id="${id}" type="button" class="btn--combiner btn-s btn-blue" style="margin: 8px 2px 0">&raquo;&middot;&laquo;</button>`);
            document.getElementById(id).addEventListener("click", () => combineClicked());
        }
    }
    function removeExpandButtons() {
        const buttons = buttonSet.querySelectorAll('button.btn--expander');
        for (const b of buttons) {
            b.style.display = 'none';
        }
    }
    function removeCombineButtons() {
        const buttons = buttonSet.querySelectorAll('button.btn--combiner');
        for (const b of buttons) {
            b.style.display = 'none';
        }
    }
    async function addSwapCoin(data) {
        return await updSwapCoin('', data, 'addswapcoin');
    }
    async function delSwapCoin(usid) {
        if (usid instanceof Set) {
            usid = [...usid].join(',');
        }
        const url = new URL('/swap-list/', document.location.href);
        const p = url.searchParams;
        p.set('f', 'del');
        p.set('uid', uid_1.UID);
        p.set('usid', usid);
        const response = await ajax_1.get(url.href);
        console.log(response);
        if (response.status !== 200) {
            return null;
        }
        const text = await response.text();
        const temp = document.createElement('template');
        temp.innerHTML = text;
        const content = temp.content;
        const mySwapBlock = content.getElementById('swap-list');
        if (!mySwapBlock) {
            console.error(text);
            window.location.reload();
            return null;
        }
        console.log(mySwapBlock.innerHTML);
        return content;
    }
    async function updSwapCoin(usid, { cond, qty, vid, info, price }, action = 'editswapcoin') {
        const swapForm = document.getElementById('swap-form');
        const data = new FormData(swapForm);
        data.set('usid', `${usid || ''}`);
        data.set('condition', `${cond || ''}`);
        data.set('qty', `${qty || ''}`);
        data.set('swap-variety', `${vid || ''}`);
        data.set('comment', `${info || ''}`);
        data.set('price', `${price || ''}`);
        data.set('action', `${action || ''}`);
        const response = await ajax_1.post(document.location.href, data);
        console.log(response);
        if (response.status !== 200) {
            return null;
        }
        const text = await response.text();
        const temp = document.createElement('template');
        temp.innerHTML = text;
        const content = temp.content;
        const mySwapBlock = content.getElementById('my-swap-block');
        if (!mySwapBlock) {
            console.error(text);
            window.location.reload();
            return null;
        }
        console.log(mySwapBlock.innerHTML);
        return content;
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
    addQtyCtrlButton("beforebegin", 'plus10', '+10', v => v + 10);
    addQtyCtrlButton("beforebegin", 'plus5', '+5', v => v + 5);
    addQtyCtrlButton("beforebegin", 'plus', '+', v => v + 1);
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
    const options = cond.querySelectorAll('option');
    for (const o of options) {
        const val = o.value;
        const text = val ? o.textContent : 'Without condition';
        const checked = (val === '3') ? 'checked' : '';
        const style = o.getAttribute('style') || '';
        fieldset.insertAdjacentHTML("beforeend", `<label class="dgray-12" style="margin-top:0;${style}"><input name="condition" value="${val}" ${checked} type="radio"/>${text}</label>`);
    }
    cond.remove();
    const _onCoinSwapForm = CoinSwapFormOn;
    if (!_onCoinSwapForm) {
        return;
    }
    CoinSwapFormOn = function (...args) {
        _onCoinSwapForm(...args);
        fieldset.querySelector(`input[name="condition"][value="${args[1]}"]`).checked = true;
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
function styleSwapLink(a) {
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
}
exports.styleSwapLink = styleSwapLink;
function styleSwapLists() {
    const listOfLinks = document.querySelectorAll('#swap-block a.list-link');
    for (const a of listOfLinks) {
        styleSwapLink(a);
    }
}
exports.styleSwapLists = styleSwapLists;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinSwapFormOnMatcher = /CoinSwapFormOn\('(?<usid>[^']*)', '(?<cond>[^']*)', '(?<price>[^']*)', '(?<info>[^']*)', '(?<vid>[^']*)', '(?<strqty>[^']*)', '(?<replica>[^']*)'/;
function* getSwapLinks(d = document) {
    const swapBlock = d.getElementById('swap-block');
    if (swapBlock) {
        const listOfLinks = swapBlock.querySelectorAll('a.list-link');
        for (const a of listOfLinks) {
            yield a;
        }
    }
}
exports.getSwapLinks = getSwapLinks;
function* getSwapLinksWithMatches() {
    for (const a of getSwapLinks()) {
        if (a.querySelector(`div.ico-16`)) {
            continue;
        }
        if (a.hasAttribute('onClick')) {
            const m = a.getAttribute('onClick').match(exports.CoinSwapFormOnMatcher);
            if (m && m.groups) {
                const { cond, info, vid } = m.groups;
                yield { a, m: Object.assign({}, m.groups, { uniq: `${cond} ${vid} ${info}` }) };
            }
        }
    }
}
exports.getSwapLinksWithMatches = getSwapLinksWithMatches;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajax_1 = __webpack_require__(0);
const delay_1 = __webpack_require__(2);
function addTrackingLinks() {
    const swapMgr = document.getElementById('swap-mgr');
    if (swapMgr) {
        const trackingNumbers = swapMgr.querySelectorAll('div.left.lgray-11');
        for (const div of trackingNumbers) {
            if (!div.textContent.includes("Track")) {
                continue;
            }
            const next = div.nextElementSibling;
            const text = next.textContent;
            if (text) {
                next.innerHTML = `<a href="https://www.17track.net/en/track?nums=${text}" target="_blank">${text}</a>`;
            }
        }
    }
}
exports.addTrackingLinks = addTrackingLinks;
function duplicatePagination() {
    const swapList = document.getElementById('swap-list');
    if (!swapList) {
        return;
    }
    const pages = swapList.querySelectorAll('div.pages');
    if (pages.length > 1) {
        return;
    }
    const lastPages = pages.item(pages.length - 1);
    if (!lastPages.children.length) {
        return;
    }
    const table = swapList.querySelector('table.swap-coin');
    if (!table) {
        return;
    }
    let heading = table.previousElementSibling;
    if (!heading || !heading.matches('h2')) {
        return;
    }
    const parent = lastPages.parentElement;
    if (!parent) {
        return;
    }
    const clone = parent.cloneNode(true);
    clone.style.height = '30px';
    heading.insertAdjacentElement("beforebegin", clone);
}
exports.duplicatePagination = duplicatePagination;
function showAllPrices() {
    const swapRows = document.querySelectorAll('table.swap-coin tr');
    for (const tr of swapRows) {
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
    }
}
exports.showAllPrices = showAllPrices;
function addConflictHandling() {
    highlightConflicts();
    if (!document.getElementById('need-swap-list')) {
        const tables = document.querySelectorAll('table.swap-coin');
        for (const table of tables) {
            const checkboxes = table.querySelectorAll('input.swap-checkbox, input.swap-country-checkbox');
            for (const checkbox of checkboxes) {
                checkbox.addEventListener('click', e => {
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
                    highlightConflicts();
                });
            }
        }
    }
}
exports.addConflictHandling = addConflictHandling;
function highlightConflicts() {
    const needSwapList = !!document.getElementById('need-swap-list');
    const tables = document.querySelectorAll('table.swap-coin');
    for (const table of tables) {
        let rows = [...table.querySelectorAll('tr')];
        const checked = rows.filter((r) => {
            if (r.matches('tr input.swap-checkbox:checked')) {
                return true;
            }
            r.classList.remove('conflict');
        });
        const heading = table.previousElementSibling;
        if (heading.tagName.toLowerCase() === 'h2') {
            const all = heading.querySelector('input.swap-country-checkbox, input.edit-country-checkbox');
            all.checked = checked.length === rows.length;
        }
        if (!needSwapList) {
            rows = checked;
        }
        for (const r of rows) {
            const data = r.dataset;
            const selector = `tr[data-tooltip-name=${JSON.stringify(data.tooltipName)}]` +
                `[data-tooltip-subject=${JSON.stringify(data.tooltipSubject)}]` +
                `[data-tooltip-variety=${JSON.stringify(data.tooltipVariety)}]` +
                `[data-tooltip-km=${JSON.stringify(data.tooltipKm)}]`;
            let rows = [...table.querySelectorAll(selector)];
            if (!needSwapList) {
                rows = rows.filter(r => r.matches('tr input.swap-checkbox:checked'));
            }
            const hasConflicts = rows.length > 1;
            for (const r of rows) {
                r.classList.toggle('conflict', hasConflicts);
            }
        }
    }
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
            button.addEventListener('click', async () => {
                var e_1, _a;
                if (!confirm('Are you sure you want to delete these coins?')) {
                    return false;
                }
                let isFirstRequest = true;
                try {
                    for (var soldList_1 = __asyncValues(soldList), soldList_1_1; soldList_1_1 = await soldList_1.next(), !soldList_1_1.done;) {
                        const sold = soldList_1_1.value;
                        if (!isFirstRequest) {
                            await delay_1.randomDelay();
                        }
                        isFirstRequest = false;
                        const { href } = sold.querySelector('a.act');
                        await ajax_1.get(href);
                        const tree = document.getElementById('tree');
                        const soldCountElement = tree.querySelector('a.region.list-link div.right.blue-13 sup');
                        if (--soldCount) {
                            soldCountElement.textContent = `&nbsp;-${soldCount}`;
                        }
                        else {
                            soldCountElement.remove();
                        }
                        sold.remove();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (soldList_1_1 && !soldList_1_1.done && (_a = soldList_1.return)) await _a.call(soldList_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                button.remove();
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
        const tables = document.querySelectorAll('table.swap-coin');
        for (const table of tables) {
            const rows = table.querySelectorAll('tr');
            for (const tr of rows) {
                const markedElement = tr.querySelector('td span[class^="marked-"]');
                const marked = markedElement && markedElement.classList;
                const myCond = marked && CN.get(marked.item(0).split('marked-').pop()) || 0;
                const condElement = tr.querySelector('td.td-cond');
                const cond = condElement && CM.get(condElement.textContent) || 0;
                if (myCond && (!cond || cond <= myCond)) {
                    tr.classList.add('ignore');
                }
            }
        }
    }
}
exports.ignoreUnwanted = ignoreUnwanted;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajax_1 = __webpack_require__(0);
const delay_1 = __webpack_require__(2);
function addGalleryVisibilityToggle() {
    const gallery = document.getElementById('gallery');
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
    async function toggleGroupVisibility(checked) {
        var e_1, _a;
        let addClass = `status${checked ? 1 : 0}`;
        let removeClass = `status${checked ? 0 : 1}`;
        let statusText = checked ? 'Public' : 'Private';
        const statusList = checked ? privateStatus : publicStatus;
        try {
            for (var statusList_1 = __asyncValues(statusList), statusList_1_1; statusList_1_1 = await statusList_1.next(), !statusList_1_1.done;) {
                const status = statusList_1_1.value;
                const url = status.parentElement.querySelector(`.coin-desc div a`).href;
                const response = await ajax_1.get(url);
                const responseText = await response.text();
                const temp = document.createElement('template');
                temp.innerHTML = responseText;
                const fragment = temp.content;
                const coinForm = fragment.getElementById('edit-coin-form') || document.getElementById('add-coin-form');
                const form = coinForm.querySelector('form');
                await postPublicityForm(url, form, checked);
                status.classList.replace(removeClass, addClass);
                status.textContent = statusText;
                updateStatusElements();
                toggleButtonVisibility();
                await delay_1.randomDelay();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (statusList_1_1 && !statusList_1_1.done && (_a = statusList_1.return)) await _a.call(statusList_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    function updateStatusElements() {
        privateStatus = gallery.querySelectorAll('.coin .desc-block span.status0');
        publicStatus = gallery.querySelectorAll('.coin .desc-block span.status1');
    }
    async function postPublicityForm(url, form, checked) {
        form.querySelector('input[name=public]').checked = checked;
        return await ajax_1.post(url, new FormData(form));
    }
}
exports.addGalleryVisibilityToggle = addGalleryVisibilityToggle;


/***/ }),
/* 18 */
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
    const listOfLinks = swapBlock.querySelectorAll(`a.list-link`);
    for (const a of listOfLinks) {
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
    }
    swapBlock.parentElement.insertAdjacentHTML("beforebegin", `<div class="widget estimated-prices-widget"><a class="widget-header">Estimated prices</a><div id="estimated-prices"></div></div>`);
    const estimatedPrices = document.getElementById('estimated-prices');
    if (byMint.size > 1) {
        addPricesByType(byType);
        estimatedPrices.insertAdjacentHTML("beforeend", `<div class="list-sep"></div>`);
    }
    for (const [mint, byType] of byMint) {
        addPricesByType(byType, mint);
    }
    function addPricesByType(byType, mint = '') {
        const keys = [...byType.keys()].sort(sortByCond);
        for (const cond of keys) {
            const p = byType.get(cond).sort();
            const l = p.length - 1, r = l % 2, h = (l + r) / 2;
            // const avg = p.reduce((sum: number, val: number): number => sum + val, 0) / p.length;
            const med = r ? p[h] : (p[h] + p[h + 1]) / 2;
            const min = Math.min(...p);
            const max = Math.max(...p);
            const prices = [];
            prices.push(min.toFixed(2));
            if (med > min) {
                prices.push(med.toFixed(2));
            }
            if (max > med) {
                prices.push(max.toFixed(2));
            }
            if (pricePrefix) {
                prices[0] = `<span class="lgray-11">${pricePrefix}</span>${prices[0]}`;
            }
            if (priceSuffix) {
                const n = prices.length - 1;
                prices[n] = `${prices[n]}<span class="lgray-11">${priceSuffix}</span>`;
            }
            const price = `<nobr>${prices.join(`</nobr><nobr><small> &middot; </small>`)}</nobr>`;
            const parts = mint.split(' ');
            const y = parts.shift();
            const m = parts.length ? ` <span class="lgray-11">${parts.join(' ')}</span>` : '';
            estimatedPrices.insertAdjacentHTML("beforeend", `<a class="list-link"><span class="left dgray-11 marked-${ConditionColors.get(cond)}">${cond}</span><span class="left gray-13">${y}${m}</span><span class="right blue-13">${price}</span></a>`);
        }
    }
    function sortByCond(a, b) {
        return ConditionValues.get(b) - ConditionValues.get(a);
    }
}
exports.estimateSwapPrices = estimateSwapPrices;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UID = '28609';


/***/ })
/******/ ]);