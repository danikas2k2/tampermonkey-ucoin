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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
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

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ==UserScript==
// @name         uCoin: Swap-Manager
// @namespace    https://ucoin.net/
// @version      0.2.0
// @description  Show all prices
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @match        https://*.ucoin.net/swap-mgr/*
// @match        https://*.ucoin.net/swap-list/*
// ==/UserScript==
Object.defineProperty(exports, "__esModule", { value: true });
var delay_1 = __webpack_require__(0);
var ajax_1 = __webpack_require__(1);
(function () {
    document.head.insertAdjacentHTML("beforeend", "\n        <style type='text/css'>\n            #swap-list .swap-coin tr,\n            #swap-mgr .swap-coin tr { transition: opacity .25s, background .25s; }\n            \n            #swap-list .swap-coin tr[ignore],\n            #swap-mgr .swap-coin tr[ignore] { opacity: .5; }\n            \n            #swap-list .swap-coin tr.mark[ignore],\n            #swap-mgr .swap-coin tr.mark[ignore],\n            #swap-list .swap-coin tr[ignore][conflict],\n            #swap-mgr .swap-coin tr[ignore][conflict] { opacity: .75; }\n            \n            #swap-iist .swap-coin tr[conflict],\n            #swap-mgr .swap-coin tr[conflict] { background: #fdd; }\n            \n            #swap-list .swap-coin tr.mark[conflict],\n            #swap-mgr .swap-coin tr.mark[conflict] { background: #fed; }\n        </style>");
    var CN = new Map([
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
    var CM = new Map([
        ['G', 1],
        ['VG', 2],
        ['F', 3],
        ['VF', 4],
        ['XF', 5],
        ['UNC', 6],
        ['PRF', 7],
        ['PRF', 8],
    ]);
    var needSwapList = document.getElementById('need-swap-list');
    var isSelected = !!needSwapList;
    var actionBoard = needSwapList && needSwapList.querySelector('.action-board');
    var tree = document.getElementById('tree');
    var table = document.querySelector('table.swap-coin');
    var list = table.querySelectorAll('tr');
    addTrackingLinks();
    showAllPrices();
    hiliteConflicting();
    if (!isSelected) {
        handleCheckEvent();
        grayOutUnwanted();
    }
    else {
        checkSold();
    }
    function checkSold() {
        var soldList = table.querySelectorAll('tr.del');
        var soldCount = soldList.length;
        if (soldCount) {
            var delAllButtonId = 'act-d-all';
            actionBoard.insertAdjacentHTML("beforeend", "<a class=\"btn-s btn-gray ico-del\" id=\"" + delAllButtonId + "\" style=\"float: right;\"><div class=\"ico-16\"></div></a>");
            var button_1 = document.getElementById(delAllButtonId);
            button_1.addEventListener('click', function () {
                if (!confirm('Are you sure you want to delete these coins?')) {
                    return false;
                }
                var queue = Promise.resolve();
                soldList.forEach(function (sold) {
                    queue = queue.then(function () {
                        var href = sold.querySelector('a.act').href;
                        return ajax_1.get(href);
                    }).then(function () {
                        var soldCountElement = tree.querySelector('a.region.list-link div.right.blue-13 sup');
                        if (--soldCount) {
                            soldCountElement.textContent = "&nbsp;-" + soldCount;
                        }
                        else {
                            soldCountElement.remove();
                        }
                        sold.remove();
                    }).then(delay_1.randomDelay());
                });
                queue.then(function () {
                    button_1.remove();
                });
            });
        }
    }
    function showAllPrices() {
        list.forEach(function (tr) {
            var td = tr.querySelector('.td-cond + *');
            var myPrice = +td.querySelector('span.blue-13').textContent;
            var prefix = td.querySelector('span.gray-11:first-child').textContent;
            var suffix = td.querySelector('span.gray-11:last-child').textContent;
            var tooltipPrice = tr.dataset.tooltipPrice;
            if (tooltipPrice) {
                var price = +tooltipPrice.replace(prefix, '').replace(suffix, '');
                if (!isNaN(price) && myPrice !== price) {
                    td.insertAdjacentHTML("beforeend", "<br/><span class=\"gray-11\">" + prefix + price.toFixed(2) + suffix + "</span>");
                }
            }
        });
    }
    function grayOutUnwanted() {
        list.forEach(function (tr) {
            var marked = tr.querySelector('td span[class^="marked-"]').classList;
            var myQuality = marked && CN.get(marked.item(0).split('marked-').pop()) || 0;
            var quality = CM.get(tr.querySelector('td.td-cond').textContent) || 0;
            if (myQuality && (!quality || quality <= myQuality)) {
                tr.classList.add('ignore');
            }
        });
    }
    function hiliteConflicting() {
        var query = isSelected ? 'tr' : 'tr:has(input.swap-checkbox:checked)';
        var checked = table.querySelectorAll(query);
        checked.forEach(function (tr) {
            var data = tr.dataset;
            var dup = table.querySelectorAll(query + "[data-tooltip-name=" + JSON.stringify(data.tooltipName) + "]" +
                ("[data-tooltip-subject=" + JSON.stringify(data.tooltipSubject) + "]") +
                ("[data-tooltip-variety=" + JSON.stringify(data.tooltipVariety) + "]") +
                ("[data-tooltip-km=" + JSON.stringify(data.tooltipKm) + "]"));
            var hasConflicts = dup.length > 1;
            dup.forEach(function (tr) {
                tr.classList.toggle('conflict', hasConflicts);
            });
        });
    }
    function handleCheckEvent() {
        table.querySelectorAll('input.swap-checkbox, input.swap-country-checkbox').forEach(function (input) {
            input.addEventListener('click', function (e) {
                var input = e.target;
                if (!input.checked) {
                    var parent_1 = input.parentElement;
                    while (parent_1 && parent_1.tagName !== 'tr') {
                        parent_1 = parent_1.parentElement;
                    }
                    if (parent_1) {
                        parent_1.classList.remove('conflict');
                    }
                }
                hiliteConflicting();
            });
        });
    }
    function addTrackingLinks() {
        var swapMgr = document.getElementById('swap-mgr');
        swapMgr.querySelectorAll('div.left.lgray-11:contains("Track")+div.right.gray-11').forEach(function (div) {
            var text = div.textContent;
            if (text) {
                div.innerHTML = "<a href=\"https://www.17track.net/en/track?nums=" + text + "\">" + text + "</a>";
            }
        });
    }
})();


/***/ })

/******/ });