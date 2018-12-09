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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ==UserScript==
// @name         uCoin: Gallery
// @namespace    https://ucoin.net/
// @version      0.2.0
// @description  Fix gallery links and add publicity toggler
// @author       danikas2k2
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @match        https://*.ucoin.net/gallery/?*uid=28609*
// ==/UserScript==

Object.defineProperty(exports, "__esModule", { value: true });
var delay_1 = __webpack_require__(0);
var links_1 = __webpack_require__(2);
var ajax_1 = __webpack_require__(1);
(function () {
    fixGalleryLinks();
    addPublicityToggler();
    var gallery = document.getElementById('gallery');
    function fixGalleryLinks() {
        gallery.querySelectorAll('a[href^="/gallery/"]').forEach(links_1.updateLinkHref);
        gallery.querySelectorAll('a[href^="?"]').forEach(links_1.updateLinkHref);
        gallery.querySelectorAll('div.close').forEach(links_1.updateOnClickHref);
    }
    function addPublicityToggler() {
        var coins = gallery.querySelector('.coin .desc-block .coin-desc');
        var privateStatus, publicStatus;
        updateStatusElements();
        var buttonContainerId = 'button-container';
        var sortFilter = document.getElementById('sort-filter').parentElement;
        sortFilter.insertAdjacentHTML("afterend", "<div id=\"" + buttonContainerId + "\" class=\"left filter-container\" style=\"float:right\">");
        var container = document.getElementById(buttonContainerId);
        var showButton = addVisibilityToggler('Show', 'btn-blue', true);
        var showButtonCount = showButton.querySelector('small');
        var hideButton = addVisibilityToggler('Hide', 'btn-gray', false);
        var hideButtonCount = hideButton.querySelector('small');
        toggleButtonVisibility();
        function addVisibilityToggler(text, className, visibility) {
            var buttonId = "button-" + text.toLowerCase();
            container.insertAdjacentHTML("beforeend", "<button id=\"" + buttonId + "\" class=\"btn-l " + className + "\" style=\"padding: 0 14px; height: 26px\">" + text + " <small></small></button>");
            var button = document.getElementById(buttonId);
            button.addEventListener("click", function () { return toggleGroupVisibility(visibility); });
            return button;
        }
        function toggleButtonVisibility() {
            showButtonCount.textContent = "(" + privateStatus.length + ")";
            showButton.style.display = privateStatus.length ? 'block' : 'none';
            hideButtonCount.textContent = "(" + publicStatus.length + ")";
            hideButton.style.display = publicStatus.length ? 'block' : 'none';
        }
        function toggleGroupVisibility(checked) {
            var addClass = "status" + (checked ? 1 : 0);
            var removeClass = "status" + (checked ? 0 : 1);
            var text = checked ? 'Public' : 'Private';
            var queue = Promise.resolve();
            (checked ? privateStatus : publicStatus).forEach(function (status) {
                var url = status.querySelector("~ .coin-desc div a").href;
                queue = queue
                    .then(function () { return ajax_1.get(url); })
                    .then(function (response) { return response.text(); })
                    .then(function (text) {
                    var fragment = document.createDocumentFragment();
                    fragment.textContent = text;
                    return fragment;
                })
                    .then(function (fragment) { return fragment.getElementById('coin-form').querySelector('form'); })
                    .then(function (form) { return postPublicityForm(url, form, checked); })
                    .then(function () {
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
    }
    function postPublicityForm(url, form, checked) {
        form.querySelector('input[name=public]').checked = checked;
        return ajax_1.post(url, new FormData(form));
    }
})();


/***/ })
/******/ ]);