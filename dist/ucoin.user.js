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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color;
(function (Color) {
    Color[Color["ANY"] = 1] = "ANY";
    Color[Color["__BLUE"] = 2] = "__BLUE";
    Color[Color["PROOF"] = 3] = "PROOF";
    Color[Color["BU"] = 4] = "BU";
    Color[Color["COPY"] = 5] = "COPY";
    Color[Color["UNKNOWN"] = 6] = "UNKNOWN";
    Color[Color["G"] = 7] = "G";
    Color[Color["VG"] = 8] = "VG";
    Color[Color["F"] = 9] = "F";
    Color[Color["VF"] = 10] = "VF";
    Color[Color["XF"] = 11] = "XF";
    Color[Color["UNC"] = 12] = "UNC";
    Color[Color["__YELLOW"] = 13] = "__YELLOW";
    Color[Color["__MAGENTA"] = 14] = "__MAGENTA";
})(Color = exports.Color || (exports.Color = {}));
exports.ConditionColors = new Map([
    ['G', Color.G],
    ['VG', Color.VG],
    ['F', Color.F],
    ['VF', Color.VF],
    ['VF+', Color.VF],
    ['XF', Color.XF],
    ['XF+', Color.XF],
    ['UNC', Color.UNC],
    ['PRF', Color.PROOF],
    ['BU', Color.BU],
]);
var Value;
(function (Value) {
    Value[Value["UNKNOWN"] = 0] = "UNKNOWN";
    Value[Value["G"] = 1] = "G";
    Value[Value["VG"] = 2] = "VG";
    Value[Value["F"] = 3] = "F";
    Value[Value["VF"] = 4] = "VF";
    Value[Value["XF"] = 5] = "XF";
    Value[Value["UNC"] = 6] = "UNC";
    Value[Value["PROOF"] = 7] = "PROOF";
    Value[Value["BU"] = 8] = "BU";
    Value[Value["ANY"] = 9] = "ANY";
})(Value = exports.Value || (exports.Value = {}));
exports.ConditionValues = new Map([
    ['G', Value.G],
    ['VG', Value.VG],
    ['F', Value.F],
    ['VF', Value.VF],
    ['XF', Value.XF],
    ['UNC', Value.UNC],
    ['PRF', Value.PROOF],
    ['BU', Value.BU],
]);
exports.ColorValues = new Map([
    [Color.G, Value.G],
    [Color.VG, Value.VG],
    [Color.F, Value.F],
    [Color.VF, Value.VF],
    [Color.XF, Value.XF],
    [Color.UNC, Value.UNC],
    [Color.PROOF, Value.PROOF],
    [Color.BU, Value.BU],
    [Color.ANY, Value.ANY],
]);
var FormValue;
(function (FormValue) {
    FormValue[FormValue["UNKNOWN"] = 0] = "UNKNOWN";
    FormValue[FormValue["UNC"] = 1] = "UNC";
    FormValue[FormValue["XF"] = 2] = "XF";
    FormValue[FormValue["VF"] = 3] = "VF";
    FormValue[FormValue["F"] = 4] = "F";
    FormValue[FormValue["VG"] = 5] = "VG";
    FormValue[FormValue["G"] = 6] = "G";
    FormValue[FormValue["PROOF"] = 7] = "PROOF";
})(FormValue = exports.FormValue || (exports.FormValue = {}));
exports.FormValueColors = new Map([
    [FormValue.G, Color.G],
    [FormValue.VG, Color.VG],
    [FormValue.F, Color.F],
    [FormValue.VF, Color.VF],
    [FormValue.XF, Color.XF],
    [FormValue.UNC, Color.UNC],
    [FormValue.PROOF, Color.PROOF],
]);
exports.FormColorValues = new Map([
    [Color.G, FormValue.G],
    [Color.VG, FormValue.VG],
    [Color.F, FormValue.F],
    [Color.VF, FormValue.VF],
    [Color.XF, FormValue.XF],
    [Color.UNC, FormValue.UNC],
    [Color.PROOF, FormValue.PROOF],
]);
var SwapValue;
(function (SwapValue) {
    SwapValue[SwapValue["UNKNOWN"] = 0] = "UNKNOWN";
    SwapValue[SwapValue["UNC"] = 1] = "UNC";
    SwapValue[SwapValue["XF"] = 2] = "XF";
    SwapValue[SwapValue["VF"] = 3] = "VF";
    SwapValue[SwapValue["F"] = 4] = "F";
    SwapValue[SwapValue["VG"] = 5] = "VG";
    SwapValue[SwapValue["G"] = 6] = "G";
    SwapValue[SwapValue["PROOF"] = 7] = "PROOF";
    SwapValue[SwapValue["COPY"] = 100] = "COPY";
})(SwapValue = exports.SwapValue || (exports.SwapValue = {}));
var WishValue;
(function (WishValue) {
    WishValue[WishValue["ANY"] = 0] = "ANY";
    WishValue[WishValue["UNC"] = 1] = "UNC";
    WishValue[WishValue["XF"] = 2] = "XF";
    WishValue[WishValue["VF"] = 3] = "VF";
})(WishValue = exports.WishValue || (exports.WishValue = {}));
exports.ColorStyle = new Map([
    [Color.G, '#EC7000'],
    [Color.VG, '#B36D00'],
    [Color.F, '#AB8B00'],
    [Color.VF, '#636330'],
    [Color.XF, '#64992C'],
    [Color.UNC, '#006633'],
    [Color.PROOF, '#0000CC'],
    [Color.BU, '#5229A3'],
    [Color.ANY, '#5A6986'],
    [Color.COPY, '#854F61'],
    [Color.UNKNOWN, '#CC0000'],
]);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
async function ajax(url, method = 'GET', body) {
    return await fetch(url, { method, body });
}
exports.ajax = ajax;
async function get(url, body) {
    return await ajax(url, 'GET', body);
}
exports.get = get;
async function post(url, body) {
    return await ajax(url, 'POST', body);
}
exports.post = post;
async function responseOrError(url, method = 'GET', body) {
    const response = await ajax(url, method, body);
    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
    if (response.redirected && location.href !== response.url) {
        history.pushState({}, null, response.url);
    }
    return response;
}
async function getJson(url, body) {
    return await (await responseOrError(url, 'GET', body)).json();
}
exports.getJson = getJson;
async function postJson(url, body) {
    return await (await responseOrError(url, 'POST', body)).json();
}
exports.postJson = postJson;
async function getText(url, body) {
    return await (await responseOrError(url, 'GET', body)).text();
}
exports.getText = getText;
async function postText(url, body) {
    return await (await responseOrError(url, 'POST', body)).text();
}
exports.postText = postText;
function documentFragment(src) {
    const temp = document.createElement('template');
    temp.innerHTML = src;
    return temp.content;
}
exports.documentFragment = documentFragment;
async function getFragment(url, body) {
    return documentFragment(await getText(url, body));
}
exports.getFragment = getFragment;
async function postFragment(url, body) {
    return documentFragment(await postText(url, body));
}
exports.postFragment = postFragment;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function id(id) {
    return `#${id}`;
}
exports.id = id;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function sp(str) {
    return `${str || ''}`.replace(/\u{00A0}+/gu, ' ').replace(/\s+/g, ' ').trim();
}
exports.sp = sp;
function tt(str) {
    str = `${str || ''}`;
    return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
}
exports.tt = tt;
function show(...elements) {
    elements.forEach(element => element && element.classList.remove('hide'));
}
exports.show = show;
function hide(...elements) {
    elements.forEach(element => element && element.classList.add('hide'));
}
exports.hide = hide;
function toggle(visible, ...elements) {
    elements.forEach(element => element && element.classList.toggle('hide', !visible));
}
exports.toggle = toggle;
function enable(...elements) {
    elements.forEach(element => element && element.classList.remove('disable'));
}
exports.enable = enable;
function disable(...elements) {
    elements.forEach(element => element && element.classList.add('disable'));
}
exports.disable = disable;
function cancel(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
}
exports.cancel = cancel;
// export function immediateCancel(e: Event) {
//     if (e) {
//         e.preventDefault();
//         e.stopPropagation();
//     }
// }
//
// export function preventDefault(e: Event) {
//     e && e.preventDefault();
// }
//
// export function stopPropagation(e: Event) {
//     e && e.stopPropagation();
// }
//
// export function stopImmediatePropagation(e: Event) {
//     e && e.stopImmediatePropagation();
// }
function reload() {
    location.reload();
    return null;
}
exports.reload = reload;
function updateRequiredElement(fragment, element) {
    if (element) {
        const newElement = fragment.getElementById(element.id);
        if (!newElement) {
            return reload();
        }
        element.replaceWith(newElement);
        element = newElement;
    }
    return element;
}
exports.updateRequiredElement = updateRequiredElement;
function updateOptionalElement(fragment, element) {
    if (element) {
        const newElement = fragment.getElementById(element.id);
        if (newElement) {
            element.replaceWith(newElement);
            element = newElement;
        }
        else {
            element.remove();
            element = null;
        }
    }
    return element;
}
exports.updateOptionalElement = updateOptionalElement;
async function updateParts(fragment, callback, required, optional) {
    required = required.map(element => updateRequiredElement(fragment, element));
    if (optional) {
        optional = optional.map(element => updateOptionalElement(fragment, element));
    }
    return await callback();
}
exports.updateParts = updateParts;
async function handleFormSubmit(form, callback) {
    form.addEventListener('submit', (onsubmit => async (e) => {
        cancel(e);
        const form = e.target;
        if (onsubmit && onsubmit.call(form, e) === false) {
            return;
        }
        await callback();
    })(form.onsubmit));
    form.removeAttribute('onsubmit');
}
exports.handleFormSubmit = handleFormSubmit;
async function handleLinkSubmit(link, callback) {
    link.addEventListener('click', (onclick => async (e) => {
        cancel(e);
        const link = e.target;
        if (onclick && onclick.call(link, e) === false) {
            return;
        }
        await callback();
    })(link.onclick));
    link.removeAttribute('onclick');
}
exports.handleLinkSubmit = handleLinkSubmit;
function todayMonth() {
    return new Date().toISOString().split('-', 2).join('-');
}
exports.todayMonth = todayMonth;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
async function delay(time) {
    return await new Promise(resolve => setTimeout(() => resolve(), time));
}
exports.delay = delay;
async function randomDelay(rndDelay = 1000, minDelay = 500) {
    const time = Math.round(minDelay + Math.random() * rndDelay);
    console.debug(`DELAY FOR ${time} MS`);
    return await delay(time);
}
exports.randomDelay = randomDelay;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cond_1 = __webpack_require__(0);
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
                yield { a, m: { ...m.groups, uniq: `${cond} ${vid} ${info}` } };
            }
        }
    }
}
exports.getSwapLinksWithMatches = getSwapLinksWithMatches;
function styleSwapLink(a) {
    const condBlock = a.querySelector(`.left.dgray-11`);
    const cond = condBlock.textContent.trim();
    condBlock.classList.add(`marked-${cond_1.ConditionColors.get(cond)}`);
    const mintBlock = a.querySelector(`.left.gray-13`);
    const mint = mintBlock.textContent;
    const parts = mint.split(' ');
    const y = parts.shift();
    if (parts.length) {
        mintBlock.textContent = y;
        mintBlock.insertAdjacentHTML('beforeend', ` <span class="lgray-11">${parts.join(' ')}</span>`);
    }
}
exports.styleSwapLink = styleSwapLink;
function styleListLinks(list) {
    const listOfLinks = list.querySelectorAll('a.list-link');
    for (const a of listOfLinks) {
        styleSwapLink(a);
    }
}
exports.styleListLinks = styleListLinks;
function addComment(a) {
    if (a.hasAttribute('onClick')) {
        const m = a.getAttribute('onClick').match(exports.CoinSwapFormOnMatcher);
        if (m && m.groups) {
            const { info } = m.groups;
            if (info && !a.querySelector('.comments')) {
                a.insertAdjacentHTML('beforeend', `<span class="right dgray-11 wrap comments" title="${info}"><div class="ico-16"></div> ${info}</span>`);
            }
        }
    }
}
exports.addComment = addComment;
function addLinkComments() {
    for (const a of getSwapLinks()) {
        addComment(a);
    }
}
exports.addLinkComments = addLinkComments;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AbstractForm {
}
exports.AbstractForm = AbstractForm;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cond_1 = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
const { location: loc } = document;
function num(s) {
    return +(s.replace(/[^.\d]/g, ''));
}
function cmp(a, b) {
    return -(a < b) || +(a > b);
}
exports.cmp = cmp;
function cmpNum(a, b, field) {
    const f = `sort${utils_1.tt(field)}`;
    return cmp(num(a[f]), num(b[f]));
}
function cmpStr(a, b, field) {
    const f = `sort${utils_1.tt(field)}`;
    return cmp(a[f], b[f]);
}
function cmpYear(a, b, o = 1) {
    return o * cmpNum(a, b, 'year')
        || cmpStr(a, b, 'mm');
}
function cmpKm(a, b, o = 1) {
    return o * cmpStr(a, b, 'kmc')
        || o * cmpNum(a, b, 'km')
        || o * cmpStr(a, b, 'kma')
        || cmpYear(a, b, -1);
}
function cmpFace(a, b, o = 1) {
    return o * cmpStr(a, b, 'face')
        || cmpKm(a, b, -1);
}
function cmpCond(a, b, o = 1) {
    return o * cmpNum(a, b, 'cond')
        || cmpFace(a, b);
}
function cmpValue(a, b, o = 1) {
    return o * cmpNum(a, b, 'value')
        || cmpCond(a, b, -1);
}
const sortOptionParams = new Map([
    ['Year', { index: 0, field: 'year', sort: cmpYear }],
    ['Facial value', { index: 1, field: 'face', sort: cmpFace }],
    ['Condition', { index: 3, field: 'cond', sort: cmpCond }],
    ['Value', { index: 4, field: 'value', sort: cmpValue }],
    ['Krause number', { index: 6, field: 'km', sort: cmpKm }],
]);
const sortOptions = ['Year', 'Facial value', 'Condition', 'Value', 'Krause number'];
let currentOption = 'Year';
let currentOrder = 'd';
function a(ord = 'a') {
    const arrClass = ord === 'a' ? 'at' : 'ab';
    return `<div class="right"><span class="arrow ${arrClass}"></span></div>`;
}
function d(ord = 'd') {
    return a(ord);
}
function o(opt) {
    return `<div class="left gray-13">${opt}</div>`;
}
function c(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    const opt = template.content.querySelector('div.left');
    opt.classList.add('wrap');
    return template.innerHTML;
}
function sortBy(sections, option, order) {
    const ord = order === 'a' ? 1 : -1;
    const { sort } = sortOptionParams.get(option);
    for (const section of sections) {
        const rows = [...section.querySelectorAll('tr')];
        if (rows.length > 1) {
            rows.sort(({ dataset: a }, { dataset: b }) => sort(a, b, ord));
            section.append(...rows);
        }
    }
}
function getActiveSortOption() {
    const parts = loc.hash.split(';');
    if (parts[1]) {
        const [field = 'year', order = 'd'] = parts[1].split(':');
        currentOrder = order;
        for (const [option, { field: f }] of sortOptionParams.entries()) {
            if (f === field) {
                currentOption = option;
            }
        }
    }
}
function setActiveSortOption(option, order) {
    const parts = loc.hash.split(';');
    parts[1] = `${sortOptionParams.get(option).field}:${order}`;
    loc.hash = parts.join(';');
}
function addSortingOptions() {
    const swapList = document.getElementById('take-swap-list');
    if (!swapList) {
        return;
    }
    const leftControls = swapList.querySelector('div.left.action-board');
    if (!leftControls) {
        return;
    }
    const sections = swapList.querySelectorAll('table.swap-coin tbody');
    if (!sections || !sections.length) {
        return;
    }
    // add sorting index to all rows
    const rows = swapList.querySelectorAll('table.swap-coin tbody tr');
    for (const row of rows) {
        const offset = row.querySelectorAll('td.ico-star').length;
        const c = row.querySelectorAll('td');
        const d = row.dataset;
        for (const [option, { index, field }] of sortOptionParams) {
            const name = `sort${utils_1.tt(field)}`;
            const t = c[index + offset].textContent;
            if (option === 'Year') {
                const [year, ...mm] = t.split(/(?:\s|&nbsp;)+/);
                d[name] = year;
                d.sortMm = mm.join(' ');
            }
            else if (option === 'Condition') {
                d[name] = `${cond_1.ConditionValues.get(t)}`;
            }
            else if (option === 'Krause number') {
                const m = t.match(/(?<cat>\w+)#\s*(?<prefix>[a-zA-Z]*)(?<num>\d+)(?<suffix>(?:\.\d+)?(?:[a-zA-Z]*))/i);
                if (m && m.groups) {
                    const { cat, num, prefix, suffix } = m.groups;
                    d.sortKmc = cat;
                    d[name] = num;
                    d.sortKma = `${prefix}${suffix}`;
                }
                else {
                    d.sortKmc = '';
                    d[name] = t;
                    d.sortKma = '';
                }
            }
            else {
                d[name] = t;
            }
        }
    }
    getActiveSortOption();
    sortBy(sections, currentOption, currentOrder);
    leftControls.removeAttribute('style');
    leftControls.insertAdjacentHTML('afterend', `
        <div class="right filter-container">
            <div class="filter-box" id="sort-filter">
                ${c(`${o(currentOption)}${a(currentOrder)}`)}
            </div>
            <div class="drop hide filter-dialog" id="sort-filter-dialog">
            ${sortOptions.map(opt => `
                <a class="list-link" data-option="${opt}" data-order="a">${o(opt)}${a()}</a>
                <a class="list-link" data-option="${opt}" data-order="d">${o(opt)}${d()}</a>
            `).join('')}
            </div>
        </div>
    `);
    const sortFilter = swapList.querySelector('#sort-filter');
    const sortDialog = swapList.querySelector('#sort-filter-dialog');
    sortFilter.addEventListener('click', e => {
        e.stopPropagation();
        sortDialog.style.display = 'block';
    });
    sortDialog.addEventListener('click', e => {
        e.stopPropagation();
        sortDialog.style.display = 'none';
        const a = e.target.closest('a');
        if (!a) {
            return;
        }
        sortFilter.innerHTML = c(a.innerHTML);
        const { option, order } = a.dataset;
        currentOption = option;
        currentOrder = order;
        setActiveSortOption(currentOption, currentOrder);
        sortBy(sections, currentOption, currentOrder);
    });
}
exports.addSortingOptions = addSortingOptions;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
const ajax_1 = __webpack_require__(1);
const form_1 = __webpack_require__(6);
const selectors_1 = __webpack_require__(2);
const swap_links_1 = __webpack_require__(5);
const utils_1 = __webpack_require__(3);
const vid_1 = __webpack_require__(23);
class ListForm extends form_1.AbstractForm {
    constructor() {
        super(...arguments);
        this.funcId = 'my-coin-func-block';
        this.formOnHandler = (uid, ...other) => {
            utils_1.hide(this.listBlock);
            utils_1.show(this.form, this.formClose);
            utils_1.disable(this.func);
            this.widgetHeader.removeEventListener('click', this.widgetHeaderRedirectHandler);
            this.widgetHeader.addEventListener('click', this.widgetHeaderCloseHandler);
            this.fillForm(uid, ...other);
            utils_1.show(this.cancelButton);
            utils_1.toggle(!uid, this.addButton);
            utils_1.toggle(uid, this.editButton, this.deleteButton);
            this.deleteButton.href = `?action=del${this.formType}coin&${this.formUid}=${uid}`;
            this.form.action.value = uid ? `edit${this.formType}coin` : `add${this.formType}coin`;
        };
        this.formOffHandler = () => {
            utils_1.hide(this.form, this.formClose);
            utils_1.show(this.listBlock);
            utils_1.enable(this.func);
            this.widgetHeader.removeEventListener('click', this.widgetHeaderCloseHandler);
            this.widgetHeader.addEventListener('click', this.widgetHeaderRedirectHandler);
        };
        this.widgetHeaderCloseHandler = (e) => {
            utils_1.cancel(e);
            this.formOffHandler();
        };
    }
    get headerId() {
        return `widget-${this.formType}-header`;
    }
    get mainId() {
        return `my-${this.formType}-block`;
    }
    get formId() {
        return `${this.formType}-form`;
    }
    get formCloseId() {
        return `${this.formType}-form-close`;
    }
    get formUid() {
        return `u${this.formUidPrefix}id`;
    }
    get formVariety() {
        return `${this.formType}-variety`;
    }
    get listId() {
        return `${this.formType}-block`;
    }
    get buttonSetId() {
        return `${this.formType}-button-set`;
    }
    get cancelButtonId() {
        return `btn-${this.formTypePrefix}cancel`;
    }
    get addButtonId() {
        return `btn-${this.formTypePrefix}add`;
    }
    get editButtonId() {
        return `btn-${this.formTypePrefix}edit`;
    }
    get deleteButtonId() {
        return `btn-${this.formTypePrefix}del`;
    }
    get formOnFunctionName() {
        return `Coin${this.formTypeMethod}FormOn`;
    }
    get formOffFunctionName() {
        return `Coin${this.formTypeMethod}FormOff`;
    }
    fillForm(uid = '', cond = '', price = '', vid = '') {
        this.form[this.formUid].value = uid;
        this.form.condition.value = cond;
        this.form.price.value = price;
        if (this.form[this.formVariety]) {
            this.form[this.formVariety].value = vid || vid_1.getCurrentVarietyId();
        }
    }
    updateList() {
        this.listBlock = document.getElementById(this.listId);
        if (this.listBlock) {
            swap_links_1.styleListLinks(this.listBlock);
        }
    }
    removeOneButton() {
        const oneButtonBlock = this.main.previousElementSibling;
        if (oneButtonBlock.matches('center.action-btn')) {
            oneButtonBlock.remove();
        }
    }
    updateFormHandlers() {
        // @ts-ignore
        global[this.formOnFunctionName] = this.formOnHandler;
        // @ts-ignore
        global[this.formOffFunctionName] = this.formOffHandler;
    }
    async update() {
        if (this.main) {
            utils_1.show(this.main);
            this.removeOneButton();
            this.updateWidget();
            this.updateForm();
        }
        this.updateList();
    }
    updateButtonSet() {
        const oneButton = this.listBlock.querySelector('center button.btn-s.btn-gray');
        if (!oneButton) {
            return;
        }
        oneButton.insertAdjacentHTML('afterend', `<div id="${this.buttonSetId}" class="btn-set"/>`);
        oneButton.remove();
        const buttonSet = this.main.querySelector(selectors_1.id(this.buttonSetId));
        if (!buttonSet) {
            return;
        }
        const addColorButton = (text, color, value) => {
            const markerId = `${this.formType}-marker-${value}`;
            const markerClass = `btn-marker marked-${color}`;
            buttonSet.insertAdjacentHTML('beforeend', `<div id="${markerId}" class="${markerClass}">${text}</div>`);
            buttonSet.querySelector(selectors_1.id(markerId)).addEventListener('click', () => this.formOnHandler('', `${value}`));
        };
        for (const [text, [color, value]] of this.buttonSetButtons) {
            addColorButton(text, color, value);
        }
    }
    updateCondition() {
        const condition = this.form.condition;
        condition.insertAdjacentHTML('afterend', `<fieldset name="conditionFieldset"><legend class="gray-12" style="padding:5px;">Condition</legend></fieldset>`);
        const fieldset = this.form.conditionFieldset;
        for (const o of condition.options) {
            const c = this.getConditionOption(o);
            if (c) {
                const { text, value, checked, style } = c;
                fieldset.insertAdjacentHTML('beforeend', `<label class="dgray-12" style="margin-top:0;${style}"><input name="condition" value="${value}" ${checked} type="radio"/>${text}</label>`);
            }
        }
        condition.remove();
    }
    updateFormButtons() {
        this.cancelButton = this.form.querySelector(selectors_1.id(this.cancelButtonId));
        this.addButton = this.form.querySelector(selectors_1.id(this.addButtonId));
        this.editButton = this.form.querySelector(selectors_1.id(this.editButtonId));
        this.deleteButton = this.form.querySelector(selectors_1.id(this.deleteButtonId));
        this.deleteButton.classList.add('btn-red');
    }
    updateWidget() {
        this.widgetHeader = this.main.querySelector(selectors_1.id(this.headerId));
        this.widgetHeaderRedirectHandler = this.widgetHeader.onclick;
        this.widgetHeader.removeAttribute('onclick');
    }
    async updateFragment(fragment) {
        this.main = utils_1.updateRequiredElement(fragment, this.main);
        return await this.update();
    }
    async updateForm() {
        this.func = this.main.querySelector(selectors_1.id(this.funcId));
        this.form = this.main.querySelector(selectors_1.id(this.formId));
        this.formClose = this.main.querySelector(selectors_1.id(this.formCloseId));
        await utils_1.handleFormSubmit(this.form, async () => {
            return await this.updateFragment(await ajax_1.postFragment(location.href, new FormData(this.form)));
        });
        for (const link of this.form.querySelectorAll('a[type=submit]')) {
            await utils_1.handleLinkSubmit(link, async () => {
                return await this.updateFragment(await ajax_1.getFragment(link.href));
            });
        }
        this.updateFormButtons();
        this.updateCondition();
        this.updateButtonSet();
    }
    async handle() {
        this.main = document.getElementById(this.mainId);
        // if (!this.main) {
        //     return;
        // }
        // this.listBlock = document.getElementById(this.listId);
        // if (!this.listBlock) {
        //     return;
        // }
        this.updateFormHandlers();
        await this.update();
    }
}
exports.ListForm = ListForm;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(22)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UID = (() => {
    const a = document.querySelector('.header .partition .menu-l a[href^="/uid"');
    if (a) {
        const m = a.href.match(/\/uid(\d+)/);
        if (m) {
            return m[1];
        }
    }
    return null;
})();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ==UserScript==
// @name         collector :: ucoin.net
// @namespace    https://ucoin.net/
// @version      1.5.1
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABuUlEQVQokS2Qv4pfZQBEz8x3d8kWVtEuwVSSIo1d+gTLgM8QSYiQEK0Ci90mvSD2guRNFN/AhMRCMIHdRcE/u79i7zdjcfcBZs7M0RdPn9KhGpeUVHt7ySoJDGGNFmYsTUseNVCxak5HC3NeSALWZG1Y3NZIddslIqDMvULapmOZ1EWXVWnCUIu9LGtZpI+ufnj0zTOgcPj8xcmff4nc+uTmk4cPhikcHr04OT1N4kVuK1dCrWEgzxagw5AKAGlEXlRkzwZSSWLNlGSNpABWEqYcS1lC06KtBUB2xZqJVUgz7IoKrMUBY4laoi0YsDGoDEzBqkJxh9rZiMulFQHAc85NE2Jjga1ie/NDECzdlE9JtEBKmShSHZSw2+1KN8j+wZXpqB4YqYnobndue1aua/vs7Oz1m9+2wOf37plZ5c5ndxGyX719c36+m0GS7n/1tSKVGx9fe/zoyw8O9knR5aW2/+3Wb7//7vc/3m0Ox6e3b1tQ/f3Pv7++foV1/fo1SaRFP/38yw8/vnx/fMxYaFQ2QoeW2YhIgs6m8kBtpdHOVmOMzlgpkCSieIbGeM81GWa0qmU788Lq/6iyH9ZvXMLcAAAAAElFTkSuQmCC
// @downloadURL  https://raw.githubusercontent.com/danikas2k2/tampermonkey-ucoin/master/dist/ucoin.user.js
// @updateURL    https://raw.githubusercontent.com/danikas2k2/tampermonkey-ucoin/master/dist/ucoin.user.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js
// @match        https://*.ucoin.net/*
// @run-at       document-end
// ==/UserScript==
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const ucoin_less_1 = __importDefault(__webpack_require__(11));
const coin_form_1 = __webpack_require__(13);
const gallery_1 = __webpack_require__(18);
const links_1 = __webpack_require__(19);
const prices_1 = __webpack_require__(20);
const swap_form_1 = __webpack_require__(21);
const swap_list_1 = __webpack_require__(25);
const swap_list_sort_1 = __webpack_require__(7);
const uid_1 = __webpack_require__(9);
const wish_form_1 = __webpack_require__(26);
document.head.insertAdjacentHTML('beforeend', `<style type="text/css">${ucoin_less_1.default}</style>`);
async function handleHomePage(loc) {
    const profile = document.getElementById('profile');
    const curPrice = profile.querySelector('div.worth-cur-value span');
    const colPrice = +curPrice.textContent.replace(/[^\d.]/g, '');
    const swapPrice = +profile.querySelector(`a[href="/swap-list/?uid=${uid_1.UID}"] span.right`).textContent.replace(/[^\d.]/g, '');
    const price = colPrice + swapPrice;
    curPrice.classList.add('price');
    curPrice.insertAdjacentHTML('beforeend', `<br/><small class="total"><abbr class="cur">€</abbr> ${new Intl.NumberFormat('en').format(price)}</small>`);
}
async function handleCoinPage(loc) {
    const tags = document.getElementById('tags');
    if (tags) {
        // fixTagLinks
        const galleryLinks = tags.querySelectorAll('a[href^="/gallery/"]');
        for (const a of galleryLinks) {
            links_1.updateLinkHref(a);
        }
    }
    await new coin_form_1.CoinForm().handle();
    await new swap_form_1.SwapForm().handle();
    await prices_1.estimateSwapPrices();
    await new wish_form_1.WishForm().handle();
}
async function handleGalleryPage() {
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
async function handleSwapPage() {
    swap_list_1.addTrackingLinks();
    swap_list_1.addOpenedTabsHandler();
    swap_list_sort_1.addSortingOptions();
    swap_list_1.duplicatePagination();
    swap_list_1.showAllPrices();
    swap_list_1.addConflictHandling();
    swap_list_1.checkSold();
    swap_list_1.ignoreUnwanted();
    swap_list_1.removeRowHrefFromSwapList();
    const tree = document.getElementById('tree');
    if (tree) {
        const filterLinks = tree.querySelectorAll('.filter-container .list-link');
        for (const a of filterLinks) {
            links_1.updateLinkHref(a);
        }
        const filterBoxes = tree.querySelectorAll('.filter-container .filter-box-active');
        for (const filter of filterBoxes) {
            const name = filter.getAttribute('id').replace(/-filter/, '');
            const div = filter.querySelector('.close');
            if (div) {
                links_1.updateOnClickHref(div, [name]);
            }
        }
    }
}
(async function () {
    const loc = document.location.href;
    if (loc.includes(`/uid${uid_1.UID}`)) {
        await handleHomePage(loc);
    }
    if (loc.includes('/coin')) {
        await handleCoinPage(loc);
    }
    if (loc.includes('/gallery') && loc.includes(`uid=${uid_1.UID}`)) {
        await handleGalleryPage();
    }
    if (loc.includes('/swap-')) {
        await handleSwapPage();
    }
    const tree = document.getElementById('tree');
    if (tree) {
        const treeSearchId = 'tree-search';
        const treeSearch = document.getElementById(treeSearchId);
        if (treeSearch) {
            treeSearch.closest('div').remove();
        }
        const searchInputId = 'search-input-id';
        tree.insertAdjacentHTML('afterbegin', `<input id="${searchInputId}" class="tree-filter" placeholder="Search"/>`);
        const searchInput = document.getElementById(searchInputId);
        searchInput.addEventListener('input', (e) => {
            const pattern = new RegExp([...searchInput.value].join('.*?'), 'i');
            for (const a of tree.querySelectorAll('a.country-name')) {
                const country = a.closest('div.country');
                const countryVisible = pattern.test(a.textContent);
                let visiblePeriods = 0;
                const periods = country.querySelectorAll('a.period');
                for (const p of periods) {
                    if (!countryVisible) {
                        const periodVisible = pattern.test(p.textContent);
                        p.classList.toggle('hide', !periodVisible);
                        if (periodVisible) {
                            visiblePeriods += 1;
                        }
                    }
                    else {
                        p.classList.remove('hide');
                    }
                }
                country.classList.toggle('hide', !countryVisible && !visiblePeriods);
                const showPeriods = visiblePeriods > 0 && visiblePeriods < 6;
                const periodsBlock = country.querySelector('.periods');
                if (periodsBlock) {
                    periodsBlock.style.display = showPeriods ? 'block' : 'none';
                }
                const plusMinus = country.querySelector('img');
                plusMinus.src = showPeriods ? '/i/bg/minus.gif' : '/i/bg/plus.gif';
            }
            for (const reg of tree.querySelectorAll('div.reg')) {
                const { length } = reg.querySelectorAll('div.country:not(.hide)');
                reg.classList.toggle('hide', !length);
                const region = reg.querySelector('.region');
                const countries = reg.querySelector('.countries');
                const visibleRegion = length > 0 && length <= 5 || region.matches('.open');
                countries.classList.toggle('hide', !visibleRegion);
            }
        });
    }
})();


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(12);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);"]);
exports.push([module.i, "@import url(https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css);"]);
// Module
exports.push([module.i, "body {\n  font-family: 'Open Sans', sans-serif;\n  font-size: 14px;\n}\n.widget {\n  font-size: inherit;\n}\n.widget-header {\n  background-color: #CCCCCC;\n  color: #333333;\n  font-weight: 300;\n  font-size: inherit;\n}\n.btn-l {\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n}\n.btn-l.hide {\n  display: none;\n}\n.btn-s {\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n}\n.btn-s.hide {\n  display: none;\n}\n.btn-red {\n  background-color: #CC0000;\n  border: 1px solid #00000022;\n}\n.btn-red,\n.btn-red:hover {\n  color: #F5F5F5;\n}\n#table a.cell {\n  position: relative;\n}\n#table a.cell.samekm {\n  z-index: 1;\n  background-color: #333333AA;\n  color: #CCCCCC;\n  box-shadow: none;\n  -webkit-box-shadow: none;\n}\n#table a.cell.samekm:hover {\n  background-color: #000000AA;\n  color: #FFFFFF;\n}\n.btn-set .btn-marker:hover {\n  filter: brightness(1.2);\n}\n#buy_reset {\n  font-size: 16px;\n  font-weight: bold;\n  width: 22px;\n  height: 22px;\n  display: inline-block;\n}\n#buy_reset svg {\n  width: 14px;\n  height: 14px;\n}\n#buy_year_month {\n  background-color: #FFFFFF;\n  border: 1px solid #ACACAC;\n  border-radius: 2px;\n  transition: all 150ms ease-in-out 0s;\n  box-shadow: 0 2px 1px #0000000D inset;\n  color: #222222;\n  display: inline-block;\n  font-family: 'Open Sans', sans-serif;\n  padding: 2px 8px;\n  height: 28px;\n  box-sizing: border-box;\n  width: 150px;\n}\n#my-func-block .btn-narrow {\n  padding-left: 14px;\n  padding-right: 14px;\n}\n#my-func-block .btn-i {\n  padding: 10px;\n}\n#my-func-block .btn-i svg {\n  width: 15px;\n  height: 15px;\n}\n.estimated-prices-widget {\n  margin: 30px 0;\n}\n.estimated-prices-widget .widget-header {\n  cursor: default;\n}\n#estimated-prices {\n  max-height: 400px;\n  overflow-x: hidden;\n}\n#estimated-prices .list-link {\n  cursor: initial;\n  padding: 6px 0 3px;\n}\n#estimated-prices .list-sep {\n  padding: 0;\n  border-bottom: 2px solid #e9edf1;\n}\n#estimated-prices .dgray-11 {\n  display: inline-block;\n  text-align: center;\n  line-height: 19px;\n  width: 32px;\n  margin: 0 4px;\n}\n#estimated-prices .gray-13 {\n  padding: 1px 4px 1px 8px;\n  max-width: 64px;\n}\n#estimated-prices .right {\n  max-width: 120px;\n}\n.widget .list-link .blue-13,\n#coin-list table .blue-13 {\n  font-size: 11px;\n  line-height: 19px;\n  letter-spacing: -1px;\n  white-space: nowrap;\n}\n#coin h1 {\n  color: #3B3B3B;\n}\n#coin .pricewj {\n  border: none;\n}\n#coin .pricewj span {\n  font-size: 15px;\n}\n#coin .tbl td,\n#coin .tbl th {\n  border: none;\n}\n#coin .coin-info th {\n  background-color: #EDF1F3;\n}\n#coin .coin-info tr + tr td {\n  border-top: 1px solid #EDF1F3;\n}\n#coin .coin-info tr + tr th {\n  border-top: 1px solid #FFF;\n}\n#coin .coin-info thead + tbody {\n  border-top: 1px solid #FFF;\n}\n#coin .coin-img td.i {\n  border: none;\n}\n#coin #swap-block .dgray-11,\n#coin #wish-block .dgray-11 {\n  width: 32px !important;\n  margin: 0 4px;\n}\n#coin #swap-form .btn-s,\n#coin #wish-form .btn-s {\n  margin: 0 0 0 5px;\n}\n#coin #swap-form .btn-ctrl {\n  float: right;\n  margin: 14px 3px 0;\n  height: 26px;\n}\n#coin #swap-form .btn-ctrl + .btn-ctrl {\n  margin-right: 0;\n}\n#coin #swap-form #swap-qty {\n  margin-top: 1em;\n}\n#my-swap-block #swap-block a {\n  position: relative;\n}\n#my-swap-block #swap-block a .comments {\n  position: absolute;\n  width: auto;\n  left: 100%;\n  text-align: left;\n}\n#my-swap-block #swap-block a .comments .ico-16 {\n  display: inline-block;\n  vertical-align: middle;\n  background-position: -16px 0;\n}\n#my-swap-block #swap-block a .comments:active,\n#my-swap-block #swap-block a .comments:focus,\n#my-swap-block #swap-block a .comments:hover {\n  max-width: 100%;\n  overflow: visible;\n}\n#my-swap-block #swap-block a:active .comments,\n#my-swap-block #swap-block a:focus .comments,\n#my-swap-block #swap-block a:hover .comments {\n  max-width: 100%;\n  overflow: visible;\n}\n#my-swap-block #swap-block center div.btn-set {\n  display: flex;\n  justify-content: space-around;\n  margin: 0 auto;\n  width: fit-content;\n}\n#my-swap-block #swap-block center div.btn-set div {\n  font-size: 11px;\n  flex: 0 0 20px;\n  height: 20px;\n  line-height: 20px;\n  cursor: pointer;\n  padding: 1px;\n  margin: 0 1px;\n}\n#my-swap-block #swap-block .btn--combine,\n#my-swap-block #swap-block .btn--expand {\n  margin: 8px 2px 0;\n}\n#my-swap-block #swap-block .btn--combine.hide,\n#my-swap-block #swap-block .btn--expand.hide {\n  display: none;\n}\n#my-wish-block #wish-block a {\n  position: relative;\n}\n#my-wish-block #wish-block a .comments {\n  position: absolute;\n  width: auto;\n  left: 100%;\n  text-align: left;\n}\n#my-wish-block #wish-block a .comments .ico-16 {\n  display: inline-block;\n  vertical-align: middle;\n  background-position: -16px 0;\n}\n#my-wish-block #wish-block a .comments:active,\n#my-wish-block #wish-block a .comments:focus,\n#my-wish-block #wish-block a .comments:hover {\n  max-width: 100%;\n  overflow: visible;\n}\n#my-wish-block #wish-block a:active .comments,\n#my-wish-block #wish-block a:focus .comments,\n#my-wish-block #wish-block a:hover .comments {\n  max-width: 100%;\n  overflow: visible;\n}\n#my-wish-block #wish-block center div.btn-set {\n  display: flex;\n  justify-content: space-around;\n  margin: 0 auto;\n  width: fit-content;\n}\n#my-wish-block #wish-block center div.btn-set div {\n  font-size: 11px;\n  flex: 0 0 28px;\n  height: 20px;\n  line-height: 20px;\n  cursor: pointer;\n  padding: 1px;\n  margin: 0 1px;\n}\n#my-wish-block #wish-block .btn--combine,\n#my-wish-block #wish-block .btn--expand {\n  margin: 8px 2px 0;\n}\n#my-wish-block #wish-block .btn--combine.hide,\n#my-wish-block #wish-block .btn--expand.hide {\n  display: none;\n}\n#swap-list .swap-coin tr,\n#swap-mgr .swap-coin tr {\n  transition: opacity 0.25s, background 0.25s;\n}\n#swap-list .swap-coin tr.conflict,\n#swap-mgr .swap-coin tr.conflict {\n  background: #FDD;\n}\n#swap-list .swap-coin tr.conflict.mark,\n#swap-mgr .swap-coin tr.conflict.mark {\n  background: #FED;\n}\n#swap-list .swap-coin tr.ignore,\n#swap-mgr .swap-coin tr.ignore {\n  opacity: 0.5;\n}\n#swap-list .swap-coin tr.ignore.conflict,\n#swap-mgr .swap-coin tr.ignore.conflict,\n#swap-list .swap-coin tr.ignore.mark,\n#swap-mgr .swap-coin tr.ignore.mark {\n  opacity: 0.75;\n}\n#swap-list .action-board,\n#swap-mgr .action-board,\n#swap-list .filter-container,\n#swap-mgr .filter-container {\n  margin: 15px 0 20px;\n  height: 30px;\n  width: auto;\n}\n#swap-list #sort-filter,\n#swap-mgr #sort-filter {\n  border-color: #3B7BEA;\n  width: 150px !important;\n  padding: 4px 12px 7px;\n}\n#swap-list #sort-filter .left,\n#swap-mgr #sort-filter .left {\n  max-width: 140px !important;\n}\n#swap-list #sort-filter-dialog,\n#swap-mgr #sort-filter-dialog {\n  width: 174px;\n  display: none;\n}\n#swap-mgr table.offer-list tr.str {\n  cursor: default;\n}\n#swap-list .pages {\n  padding-right: 0 !important;\n}\n#swap-list .filter-container {\n  margin: 0 !important;\n}\n#profile .price {\n  display: inline-block;\n}\n#profile .price .total {\n  float: right;\n  color: #666666;\n  font-size: 20px;\n  font-family: Arial, Helvetica, sans-serif;\n  font-weight: normal;\n  margin-top: 4px;\n  padding-top: 4px;\n  border-top: 1px solid #006600;\n}\n#profile .price .total .cur {\n  font-size: 16px;\n  padding-right: 6px;\n}\n#tree .tree-filter {\n  background-color: #FFFFFF;\n  border: 1px solid #ACACAC;\n  border-radius: 2px;\n  transition: all 150ms ease-in-out 0s;\n  box-shadow: 0 2px 1px #0000000D inset;\n  color: #222222;\n  display: inline-block;\n  font-family: 'Open Sans', sans-serif;\n  padding: 2px 8px;\n  height: 28px;\n  box-sizing: border-box;\n  width: 100%;\n  margin-bottom: 3px;\n  font-size: 13px;\n}\n#tree #catalog-tree .country .hide,\n#tree #catalog-tree .period .hide {\n  display: none;\n}\n#coin .rnav {\n  position: relative;\n}\n#coin-chooser-dialog {\n  width: max-content;\n  min-width: 200px;\n  max-width: 640px;\n  max-height: 720px !important;\n  column-width: 200px;\n  column-gap: 20px;\n  right: 0;\n}\n#coin-chooser-dialog .list-link {\n  display: inline-block;\n  width: 176px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const hide_svg_1 = __importDefault(__webpack_require__(14));
// @ts-ignore
const leave_svg_1 = __importDefault(__webpack_require__(15));
// @ts-ignore
const replace_svg_1 = __importDefault(__webpack_require__(16));
// @ts-ignore
const show_svg_1 = __importDefault(__webpack_require__(17));
const ajax_1 = __webpack_require__(1);
const cond_1 = __webpack_require__(0);
const form_1 = __webpack_require__(6);
const selectors_1 = __webpack_require__(2);
const utils_1 = __webpack_require__(3);
class CoinForm extends form_1.AbstractForm {
    constructor() {
        super(...arguments);
        this.addFormId = 'add-coin-form';
        this.editFormId = 'edit-coin-form';
        this.funcId = 'my-func-block';
        this.viewId = 'ucid-block';
        this.coinChooserId = 'coin-chooser-dialog';
    }
    async updateFragment(fragment) {
        this.func = utils_1.updateRequiredElement(fragment, this.func);
        this.coinChooser = utils_1.updateOptionalElement(fragment, this.coinChooser);
        return await this.update();
    }
    async update() {
        utils_1.show(this.func);
        this.updateButtons();
        this.addForm = this.func.querySelector(`#${this.addFormId} form`);
        this.editForm = this.func.querySelector(`#${this.editFormId} form`);
        this.form = this.editForm || this.addForm;
        if (this.form) {
            this.view = this.func.querySelector(selectors_1.id(this.viewId));
            if (this.view) {
                this.addPublicityToggle();
                this.addReplacementToggle();
            }
            this.updateBuyDateInput();
            this.addSyncConditionToColorTable();
            await utils_1.handleFormSubmit(this.form, async () => {
                return await this.updateFragment(await ajax_1.postFragment(location.href, new FormData(this.form)));
            });
            if (this.view) {
                for (const link of this.view.querySelectorAll('a[type=submit]')) {
                    await utils_1.handleLinkSubmit(link, async () => {
                        return await this.updateFragment(await ajax_1.getFragment(link.href));
                    });
                }
            }
        }
    }
    updateBuyDateInput() {
        const { buy_month: buyMonth, buy_year: buyYear } = this.form;
        let { buy_year_month: buyYearMonth } = this.form;
        utils_1.hide(buyYear, buyMonth);
        if (!buyYearMonth) {
            buyYear.insertAdjacentHTML('afterend', `<input id="buy_year_month" name="buy_year_month" type="month"/>`);
            buyYearMonth = this.form.buy_year_month;
        }
        buyYearMonth.max = utils_1.todayMonth();
        buyYearMonth.addEventListener('change', (e) => {
            utils_1.cancel(e);
            const value = buyYearMonth.value || utils_1.todayMonth();
            [buyYear.value, buyMonth.value] = value.split('-', 2);
            return false;
        });
    }
    addSyncConditionToColorTable() {
        const condition = this.form.condition;
        const tableColor = this.form.color;
        tableColor.nextElementSibling.classList.add('btn-set');
        const setColor = this.form.querySelector(selectors_1.id('edit-set-color'));
        const markedDivs = this.form.querySelectorAll('table div[class^="marked-"]');
        for (const div of markedDivs) {
            if (div.matches('#set-color')) {
                continue;
            }
            div.classList.add('btn-marker');
            div.addEventListener('click', (e) => {
                const target = e.target;
                let color = null;
                for (const c of target.classList) {
                    if (c.startsWith('marked-')) {
                        color = +c.split('-', 3)[1];
                    }
                }
                if (cond_1.FormColorValues.has(color)) {
                    condition.value = `${cond_1.FormColorValues.get(color)}`;
                }
            });
        }
        condition.addEventListener('change', (e) => {
            const target = e.target;
            setColor.classList.remove(`marked-${tableColor.value}`);
            const value = +target.value;
            if (cond_1.FormValueColors.has(value)) {
                tableColor.value = `${cond_1.FormValueColors.get(value)}`;
            }
            setColor.classList.add(`marked-${tableColor.value}`);
        });
    }
    async postForm() {
        if (await ajax_1.postFragment(location.href, new FormData(this.form))) {
            return true;
        }
        return utils_1.reload();
    }
    addPublicityToggle() {
        // const form = view.nextElementSibling.querySelector<HTMLFormElement>('form');
        const status = this.view.querySelector('.status-line .left');
        const buttons = this.view.querySelector('.func-button');
        const buttonId = 'coin-form-visibility';
        buttons.insertAdjacentHTML('afterbegin', `<button id="${buttonId}" class="btn-l btn-i btn-narrow"/>`);
        const button = buttons.querySelector(selectors_1.id(buttonId));
        const updateStatus = () => {
            const { checked } = this.form.public;
            button.title = checked ? 'Hide' : 'Show';
            button.innerHTML = checked ? hide_svg_1.default : show_svg_1.default;
            button.classList.toggle('btn-blue', !checked);
            button.classList.toggle('btn-gray', checked);
            status.innerText = checked ? 'Public' : 'Private';
            status.classList.toggle('status0', !checked);
            status.classList.toggle('status1', checked);
        };
        button.addEventListener('click', async () => {
            this.form.public.checked = !this.form.public.checked;
            if (await this.postForm()) {
                updateStatus();
            }
        });
        /*document.body.addEventListener('keypress', e => {
            const key = e.key.toUpperCase();
            if (e.ctrlKey && (key === 'S' || key === 'H' || key === 'P')) {
                visibilityButton.click();
            }
        });*/
        updateStatus();
    }
    addReplacementToggle() {
        // const form = view.nextElementSibling.querySelector<HTMLFormElement>('form');
        let status;
        for (const tr of this.view.querySelectorAll('.status-line + table tr')) {
            if (tr.querySelector('span.status2')) {
                status = tr;
            }
        }
        const buttons = this.view.querySelector('.func-button');
        const buttonId = 'coin-form-replacement';
        buttons.insertAdjacentHTML('afterbegin', `<button id="${buttonId}" class="btn-l btn-i btn-narrow"/>`);
        const button = buttons.querySelector(selectors_1.id(buttonId));
        const updateStatus = () => {
            const { checked } = this.form.replace;
            button.title = checked ? `Don't replace` : `Replace`;
            button.innerHTML = checked ? leave_svg_1.default : replace_svg_1.default;
            button.classList.toggle('btn-blue', !checked);
            button.classList.toggle('btn-gray', checked);
            if (checked) {
                if (!status) {
                    const tbody = this.view.querySelector('.status-line + table tbody');
                    if (tbody) {
                        tbody.insertAdjacentHTML('beforeend', `<tr><td class="lgray-12" colspan="2"><span class="set status2 wrap" style="max-width: 232px;width: 232px;padding: 0;display: block;margin-top: 6px;">Need to replace</span></td></tr>`);
                        status = tbody.querySelector('tr:last-child');
                    }
                }
            }
            else if (status) {
                status.remove();
                status = null;
            }
        };
        button.addEventListener('click', async () => {
            this.form.replace.checked = !this.form.replace.checked;
            if (await this.postForm()) {
                updateStatus();
            }
        });
        /*document.body.addEventListener('keypress', e => {
            if (e.ctrlKey && e.key.toUpperCase() === 'R') {
                replacementButton.click();
            }
        });*/
        updateStatus();
    }
    updateButtons() {
        // if (isPersonal) {
        for (const button of this.func.querySelectorAll('.func-button .btn-l')) {
            button.classList.add('btn-narrow');
            if (button.matches('a')) {
                button.classList.replace('btn-gray', 'btn-red');
                button.setAttribute('type', 'submit');
            }
        }
        // }
    }
    async handle( /*loc: string*/) {
        this.func = document.getElementById(this.funcId);
        if (!this.func) {
            return;
        }
        this.coinChooser = document.getElementById(this.coinChooserId);
        await this.update();
    }
}
exports.CoinForm = CoinForm;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 512\"><path fill=\"currentColor\" d=\"M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z\"></path></svg>"

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12m-17.99 504.97l22.63-22.63a24 24 0 0 0 0-33.94L63.6 7.03a24 24 0 0 0-33.94 0L7.03 29.66a24 24 0 0 0 0 33.94L448.4 504.97a24 24 0 0 0 33.94 0z\"></path></svg>"

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z\"></path></svg>"

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><path fill=\"currentColor\" d=\"M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z\"></path></svg>"

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ajax_1 = __webpack_require__(1);
const delay_1 = __webpack_require__(4);
const gallery = document.getElementById('gallery');
let privateStatus;
let publicStatus;
function updateStatusElements() {
    privateStatus = gallery.querySelectorAll('.coin .desc-block span.status0');
    publicStatus = gallery.querySelectorAll('.coin .desc-block span.status1');
}
async function postPublicityForm(url, form, checked) {
    form.querySelector('input[name=public]').checked = checked;
    return await ajax_1.post(url, new FormData(form));
}
function addVisibilityToggleButton(container, text, className, visibility, count, callback) {
    const buttonId = `button-${text.toLowerCase()}`;
    let button = document.getElementById(buttonId);
    if (!button) {
        container.insertAdjacentHTML('beforeend', `<button id="${buttonId}" class="btn-l ${className}" style="padding: 0 14px; height: 26px">${text} <small></small></button>`);
        button = document.getElementById(buttonId);
        button.addEventListener('click', () => confirm(`Are you sure to ${text.toLowerCase()}?`) &&
            callback(container, visibility));
    }
    const small = button.querySelector('small');
    small.textContent = `(${count})`;
    button.style.display = count ? 'block' : 'none';
    return button;
}
function toggleButtonVisibility(container, callback) {
    addVisibilityToggleButton(container, 'Show', 'btn-blue', true, privateStatus.length, callback);
    addVisibilityToggleButton(container, 'Hide', 'btn-gray', false, publicStatus.length, callback);
}
async function toggleGroupVisibility(container, checked) {
    const addClass = `status${checked ? 1 : 0}`;
    const removeClass = `status${checked ? 0 : 1}`;
    const statusText = checked ? 'Public' : 'Private';
    const statusList = checked ? privateStatus : publicStatus;
    for await (const status of statusList) {
        const url = status.parentElement.querySelector(`.coin-desc div a`).href;
        const response = await ajax_1.get(url);
        const responseText = await response.text();
        const temp = document.createElement('template');
        temp.innerHTML = responseText;
        const fragment = temp.content;
        const coinForm = fragment.getElementById('edit-coin-form') || document.getElementById('add-coin-form');
        if (!coinForm) {
            continue;
        }
        const form = coinForm.querySelector('form');
        if (!form) {
            continue;
        }
        await postPublicityForm(url, form, checked);
        status.classList.replace(removeClass, addClass);
        status.textContent = statusText;
        updateStatusElements();
        toggleButtonVisibility(container, toggleGroupVisibility);
        await delay_1.randomDelay();
    }
}
function addGalleryVisibilityToggle() {
    updateStatusElements();
    const buttonContainerId = 'button-container';
    const sortFilter = document.getElementById('sort-filter').parentElement;
    sortFilter.insertAdjacentHTML('afterend', `<div id="${buttonContainerId}" class="left filter-container" style="float:right">`);
    const container = document.getElementById(buttonContainerId);
    toggleButtonVisibility(container, toggleGroupVisibility);
}
exports.addGalleryVisibilityToggle = addGalleryVisibilityToggle;


/***/ }),
/* 19 */
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
function updateOnClickHref(div, remove) {
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
        if (remove && remove.length) {
            for (const name of remove) {
                newParams.delete(name);
            }
        }
        div.setAttribute('onclick', `location.href='${newUrl.href}';`);
    }
}
exports.updateOnClickHref = updateOnClickHref;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cond_1 = __webpack_require__(0);
const swap_list_sort_1 = __webpack_require__(7);
const SWAP_ID = 'swap';
const SWAP_BLOCK_ID = 'swap-block';
const ESTIMATED_PRICES_ID = 'estimated-prices';
function sortByCondition(a, b) {
    return cond_1.ConditionValues.get(b) - cond_1.ConditionValues.get(a);
}
function estimateSwapPrices() {
    const theySwap = document.getElementById(SWAP_ID);
    if (!theySwap) {
        return;
    }
    const swapBlock = theySwap.nextElementSibling;
    if (!swapBlock || !swapBlock.matches(`#${SWAP_BLOCK_ID}`)) {
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
    swapBlock.parentElement.insertAdjacentHTML('beforebegin', `<div class="widget estimated-prices-widget"><a class="widget-header">Estimated prices</a><div id="${ESTIMATED_PRICES_ID}"></div></div>`);
    const estimatedPrices = document.getElementById(ESTIMATED_PRICES_ID);
    function addPricesByType(byType, mint = '') {
        const keys = [...byType.keys()].sort(sortByCondition);
        // @ts-ignore
        const options = {
            type: 'line',
            data: { datasets: [] },
            options: {
                title: { display: true, text: mint },
                responsive: true,
                hover: { mode: 'nearest', intersect: true },
                scales: {
                    xAxes: [],
                    yAxes: [{
                            type: 'linear',
                            display: true,
                            ticks: { beginAtZero: true },
                        }],
                },
                legend: { display: false },
                elements: { point: { radius: 1 } },
            },
        };
        const maxLength = 100;
        for (const cond of keys) {
            const p = byType.get(cond).sort(swap_list_sort_1.cmp);
            let { length } = p;
            if (length === 1) {
                p.push(p[0]);
            }
            else {
                length -= 1;
            }
            const color = cond_1.ColorStyle.get(cond_1.ConditionColors.get(cond));
            const xAxisID = `x-axis-${cond}`;
            options.data.datasets.push({
                xAxisID,
                label: cond,
                data: p.map((v, i) => ({ x: i * maxLength / length, y: v })),
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                fill: false,
            });
            options.options.scales.xAxes.push({
                id: xAxisID,
                type: 'linear',
                display: false,
            });
        }
        const id = `${ESTIMATED_PRICES_ID}-${mint.trim()}`;
        estimatedPrices.insertAdjacentHTML('beforeend', `<canvas id="${id}" width="239" height="119"/>`);
        const ctx = document.getElementById(id).getContext('2d');
        // @ts-ignore
        new Chart(ctx, options);
    }
    if (byMint.size > 1) {
        addPricesByType(byType);
    }
    else {
        for (const [mint, byType] of byMint) {
            if (byMint.size > 1) {
                estimatedPrices.insertAdjacentHTML('beforeend', `<div class="list-sep"></div>`);
            }
            addPricesByType(byType, mint);
        }
    }
}
exports.estimateSwapPrices = estimateSwapPrices;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cond_1 = __webpack_require__(0);
const list_form_1 = __webpack_require__(8);
const selectors_1 = __webpack_require__(2);
const swap_links_1 = __webpack_require__(5);
const swap_form_list_1 = __webpack_require__(24);
// declare let CoinSwapFormOn: (usid: string, cond: string, price: string, info: string, vid: string, qty: string, replica: string, ...other: string[]) => void;
// declare let CoinSwapFormOff: (...other: string[]) => void;
class SwapForm extends list_form_1.ListForm {
    constructor() {
        super(...arguments);
        this.formType = 'swap';
        this.formTypeMethod = 'Swap';
        this.formTypePrefix = '';
        this.formUidPrefix = 's';
        this.buttonSetButtons = new Map([
            ['?', [cond_1.Color.UNKNOWN, cond_1.SwapValue.UNKNOWN]],
            ['G', [cond_1.Color.G, cond_1.SwapValue.G]],
            ['VG', [cond_1.Color.VG, cond_1.SwapValue.VG]],
            ['F', [cond_1.Color.F, cond_1.SwapValue.F]],
            ['VF', [cond_1.Color.VF, cond_1.SwapValue.VF]],
            ['XF', [cond_1.Color.XF, cond_1.SwapValue.XF]],
            ['UN', [cond_1.Color.UNC, cond_1.SwapValue.UNC]],
            ['PR', [cond_1.Color.PROOF, cond_1.SwapValue.PROOF]],
            ['CP', [cond_1.Color.COPY, cond_1.SwapValue.COPY]],
        ]);
        this.swapListManager = new swap_form_list_1.SwapFormList(this);
    }
    fillForm(uid = '', cond = '', price = '', info = '', vid = '', qty = '', replica = '') {
        super.fillForm(uid, cond || replica && '100', price, vid);
        this.form.comment.value = info;
        this.form.qty.value = qty || '1';
        this.form.comment.value = info;
    }
    updateList() {
        this.listBlock = document.getElementById(this.listId);
        if (this.listBlock) {
            this.swapListManager.update(this.listBlock);
            for (const list of document.querySelectorAll(selectors_1.id(this.listId))) {
                swap_links_1.styleListLinks(list);
            }
            swap_links_1.addLinkComments();
        }
    }
    async update() {
        super.update();
        /// WHAT THIS PART DOES?! {{{
        /*const DIV_ID = 'some-strange-div';
        console.log(DIV_ID);
        listBlock.insertAdjacentHTML('afterbegin', `<div id="${DIV_ID}" style="max-height:400px;overflow-x:hidden;overflow-y:auto;background:red"/>`);
        const div = listBlock.querySelector(id(DIV_ID));
        for (const {a} of getSwapLinksWithMatches()) {
            div.insertAdjacentElement('beforeend', a);
        }*/
        /// }}}
    }
    getConditionOption(o) {
        const { value, textContent } = o;
        return {
            value,
            text: value ? textContent : 'Without condition',
            checked: (value === '3') ? 'checked' : '',
            style: o.getAttribute('style') || '',
        };
    }
    async updateForm() {
        super.updateForm();
        this.updateQty();
    }
    updateQty() {
        const { form } = this;
        const { qty } = form;
        qty.inputmode = 'numeric';
        qty.addEventListener('focus', () => {
            qty.setSelectionRange(0, qty.value.length);
        });
        const addQtyCtrlButton = (where, name, text, valueChanger) => {
            qty.insertAdjacentHTML(where, `<button name="${name}" type="button" class="btn-s btn-gray btn-ctrl">${text}</button>`);
            form[name].addEventListener('click', () => {
                qty.value = `${valueChanger(+qty.value)}`;
            });
        };
        addQtyCtrlButton('afterend', 'minus', '&minus;', v => v - 1);
        addQtyCtrlButton('beforebegin', 'plus10', '+10', v => v + 10);
        addQtyCtrlButton('beforebegin', 'plus5', '+5', v => v + 5);
        addQtyCtrlButton('beforebegin', 'plus', '+', v => v + 1);
    }
}
exports.SwapForm = SwapForm;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getCurrentVarietyId() {
    const vid = new URL(document.location.href).searchParams.get('vid');
    if (vid) {
        return vid;
    }
    const form = document.querySelector('#edit-coin-form form');
    if (form) {
        const variety = new FormData(form).get('variety');
        if (variety) {
            return variety.toString();
        }
    }
    return null;
}
exports.getCurrentVarietyId = getCurrentVarietyId;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
const ajax_1 = __webpack_require__(1);
const delay_1 = __webpack_require__(4);
const selectors_1 = __webpack_require__(2);
const swap_links_1 = __webpack_require__(5);
const uid_1 = __webpack_require__(9);
const utils_1 = __webpack_require__(3);
class SwapFormList {
    constructor(listForm) {
        this.variants = new Map();
        this.expandAvailable = false;
        this.combineAvailable = false;
        this.listForm = listForm;
    }
    update(listBlock) {
        this.listBlock = listBlock;
        this.form = listBlock.querySelector(selectors_1.id(this.listForm.formId));
        if (this.form) {
            this.buttonSet = listBlock.querySelector('center');
            this.addButton('expand', 0, '&laquo;*&raquo;', this.onExpand);
            this.addButton('expand', 5, '&laquo;5&raquo;', this.onExpand);
            this.addButton('expand', 10, '&laquo;10&raquo;', this.onExpand);
            this.addButton('combine', 0, '&raquo;&middot;&laquo;', this.onCombine);
            this.updateButtons();
        }
    }
    addButton(role, qty, text, clickHandler) {
        const buttonId = `${role}-qty`;
        const expand = this.buttonSet.querySelector(selectors_1.id(buttonId));
        if (expand) {
            utils_1.show(expand);
        }
        else {
            this.buttonSet.insertAdjacentHTML('beforeend', `<button id="${buttonId}" type="button" class="btn--${role} btn-s btn-blue">${text}</button>`);
            this.buttonSet.querySelector(selectors_1.id(buttonId)).addEventListener('click', () => {
                this.hideButtons();
                clickHandler(qty);
                this.updateButtons();
            });
        }
    }
    updateVariants() {
        this.expandAvailable = false;
        this.combineAvailable = false;
        this.variants.clear();
        for (const { m } of swap_links_1.getSwapLinksWithMatches()) {
            const { uniq, usid, cond, price, info, vid, strqty } = m;
            const qty = +strqty;
            if (qty > 1) {
                this.expandAvailable = true;
            }
            let variant;
            if (this.variants.has(uniq)) {
                variant = this.variants.get(uniq);
                variant.usids.add(usid);
                variant.total += qty;
                this.combineAvailable = true;
            }
            else {
                variant = { usid, usids: new Set([usid]), cond, price, info, vid, qty, total: qty };
            }
            this.variants.set(uniq, variant);
        }
    }
    showButtons(role) {
        utils_1.show(...this.buttonSet.querySelectorAll(`button${role ? `.btn--${role}` : ''}`));
    }
    hideButtons(role) {
        utils_1.hide(...this.buttonSet.querySelectorAll(`button${role ? `.btn--${role}` : ''}`));
    }
    showExpandButtons() {
        this.showButtons('expand');
    }
    showCombineButtons() {
        this.showButtons('combine');
    }
    hideExpandButtons() {
        this.hideButtons('expand');
    }
    hideCombineButtons() {
        this.hideButtons('combine');
    }
    updateButtons() {
        this.updateVariants();
        this.expandAvailable ? this.showExpandButtons() : this.hideExpandButtons();
        this.combineAvailable ? this.showCombineButtons() : this.hideCombineButtons();
    }
    /**
     * @param expandTo number of links (0 for unlimited)
     */
    async onExpand(expandTo = 0) {
        console.debug(`EXPANDING...`);
        let isAddFailed = false;
        let isUpdFailed = false;
        let isFirstQuery = true;
        for await (const { a, m } of swap_links_1.getSwapLinksWithMatches()) {
            const { uniq, usid, cond, price, info, vid, strqty } = m;
            const qty = +strqty;
            const n = expandTo > 0 ? Math.min(qty, expandTo) : qty;
            if (n <= 1) {
                console.debug(`IGNORING ${uniq} ${usid}`);
                continue; // return?
            }
            for (let i = n, qq = qty, q = Math.floor(qq / i); i > 1; i--, q = Math.floor(qq / i)) {
                qq -= q;
                if (!isFirstQuery) {
                    await delay_1.randomDelay();
                }
                isFirstQuery = false;
                console.debug(`ADDING ${uniq} ${n - i + 1} -> ${q}`);
                const addR = await this.addSwapCoin({ cond, qty: q, vid, info, price });
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
                    swap_links_1.styleSwapLink(l);
                    a.insertAdjacentElement('afterend', l);
                    swap_links_1.addComment(l);
                }
                if (!isFirstQuery) {
                    await delay_1.randomDelay();
                }
                isFirstQuery = false;
                console.debug(`UPDATING ${uniq} ${usid} -> ${qq}`);
                const updR = await this.updateSwapCoin(usid, { cond, qty: qq, vid, info, price });
                if (!updR) {
                    isUpdFailed = true;
                    break;
                }
                this.updateLinkQty(a, qq);
            }
            if (isAddFailed || isUpdFailed) {
                break;
            }
        }
        if (isAddFailed) {
            console.debug('ADD FAILED :(');
        }
        else if (isUpdFailed) {
            console.debug('UPDATE FAILED :(');
        }
        else {
            console.debug('DONE!');
        }
    }
    async onCombine() {
        console.debug(`COMBINING...`);
        let isDelFailed = false;
        let isUpdFailed = false;
        for (const variant of this.variants.values()) {
            const { usid, usids, qty, total } = variant;
            if (total <= qty) {
                continue;
            }
            const remove = new Set(usids);
            remove.delete(usid);
            console.debug(`REMOVING ${remove}`);
            if (!await this.deleteSwapCoin(remove)) {
                isDelFailed = true;
                break;
            }
            console.debug(`UPDATING ${usid}`);
            const content = await this.updateSwapCoin(usid, { ...variant, qty: total });
            if (content) {
                const newListBlock = content.getElementById(this.listForm.mainId);
                if (newListBlock && this.listBlock) {
                    this.listBlock.replaceWith(newListBlock);
                    swap_links_1.styleListLinks(this.listBlock);
                    this.listBlock = newListBlock;
                }
            }
            else {
                isUpdFailed = true;
                break;
            }
        }
        if (isDelFailed) {
            console.debug('ADD FAILED :(');
        }
        else if (isUpdFailed) {
            console.debug('UPDATE FAILED :(');
        }
        else {
            console.debug('DONE!');
        }
    }
    async updateSwapCoin(usid, { cond, qty, vid, info, price }, action = 'editswapcoin') {
        const data = new FormData(this.form);
        data.set('usid', `${usid || ''}`);
        data.set('condition', `${cond || ''}`);
        data.set('qty', `${qty || ''}`);
        data.set('swap-variety', `${vid || ''}`);
        data.set('comment', `${info || ''}`);
        data.set('price', `${price || ''}`);
        data.set('action', `${action || ''}`);
        const fragment = await ajax_1.postFragment(location.href, data);
        if (!fragment.getElementById(this.listForm.mainId)) {
            return utils_1.reload();
        }
        return fragment;
    }
    async addSwapCoin(data) {
        return await this.updateSwapCoin('', data, 'addswapcoin');
    }
    async deleteSwapCoin(usid) {
        if (usid instanceof Set) {
            usid = [...usid].join(',');
        }
        const url = new URL('/swap-list/', location.href);
        const p = url.searchParams;
        p.set('f', 'del');
        p.set('uid', uid_1.UID);
        p.set('usid', usid);
        const fragment = await ajax_1.getFragment(url.href);
        if (!fragment.getElementById(this.listForm.listId)) {
            return utils_1.reload();
        }
        return fragment;
    }
    updateLinkQty(a, qty) {
        if (a.hasAttribute('onClick')) {
            a.setAttribute('onClick', a.getAttribute('onClick').replace(swap_links_1.CoinSwapFormOnMatcher, `CoinSwapFormOn('$<usid>', '$<cond>', '$<price>', '$<info>', '$<vid>', '${qty}', '$<replica>'`));
        }
        for (const span of a.querySelectorAll('span.left.dblue-13')) {
            span.remove();
        }
        if (qty > 1) {
            for (const span of a.querySelectorAll('span.left.gray-13.wrap')) {
                span.insertAdjacentHTML('afterend', `<span class="left dblue-13"><span>&times;</span>${qty}</span>`);
            }
        }
    }
}
exports.SwapFormList = SwapFormList;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ajax_1 = __webpack_require__(1);
const cond_1 = __webpack_require__(0);
const delay_1 = __webpack_require__(4);
const { location: loc } = document;
function addTrackingLinks() {
    const swapMgr = document.getElementById('swap-mgr');
    if (swapMgr) {
        const trackingNumbers = swapMgr.querySelectorAll('div.left.lgray-11');
        for (const div of trackingNumbers) {
            if (!div.textContent.includes('Track')) {
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
function setActiveSwapTab(tab) {
    const parts = loc.hash.split(';');
    parts[0] = tab;
    loc.hash = parts.join(';');
}
function addOpenedTabsHandler() {
    const tabs = document.querySelectorAll(`#swap-mgr > div.widerightCol > ul.region-list > li.region`);
    if (tabs.length) {
        const needTab = tabs.item(0);
        if (needTab) {
            needTab.addEventListener('click', () => setActiveSwapTab('need'));
            if (loc.hash.startsWith('#need')) {
                needTab.click();
            }
        }
        const takeTab = tabs.item(1);
        if (takeTab) {
            takeTab.addEventListener('click', () => setActiveSwapTab('take'));
            if (loc.hash.startsWith('#take')) {
                takeTab.click();
            }
        }
    }
}
exports.addOpenedTabsHandler = addOpenedTabsHandler;
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
    const heading = table.previousElementSibling;
    if (!heading || !heading.matches('h2')) {
        return;
    }
    const parent = lastPages.parentElement;
    if (!parent) {
        return;
    }
    const clone = parent.cloneNode(true);
    clone.style.height = '30px';
    heading.insertAdjacentElement('beforebegin', clone);
}
exports.duplicatePagination = duplicatePagination;
function showAllPrices() {
    var _a, _b, _c, _d;
    const swapRows = document.querySelectorAll('table.swap-coin tr');
    for (const tr of swapRows) {
        const td = tr.querySelector('.td-cond + *');
        if (td) {
            const myPrice = +((_a = td.querySelector('span.blue-13')) === null || _a === void 0 ? void 0 : _a.textContent);
            const prefix = (_b = td.querySelector('span.gray-11:first-child')) === null || _b === void 0 ? void 0 : _b.textContent;
            const suffix = (_c = td.querySelector('span.gray-11:last-child')) === null || _c === void 0 ? void 0 : _c.textContent;
            const tooltipPrice = (_d = tr.dataset) === null || _d === void 0 ? void 0 : _d.tooltipPrice;
            if (tooltipPrice) {
                const price = +tooltipPrice.replace(prefix, '').replace(suffix, '');
                if (!isNaN(price) && myPrice !== price) {
                    td.insertAdjacentHTML('beforeend', `<br/><span class="gray-11">${prefix}${price.toFixed(2)}${suffix}</span>`);
                }
            }
        }
    }
}
exports.showAllPrices = showAllPrices;
function highlightConflicts() {
    const needSwapList = !!document.getElementById('need-swap-list');
    const tables = document.querySelectorAll('#swap-list table.swap-coin');
    for (const table of tables) {
        let rows = [...table.querySelectorAll('tr')];
        const checked = rows.filter((r) => {
            if (r.querySelector('input.swap-checkbox:checked')) {
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
            const { tooltipName, tooltipSubject, tooltipVariety, tooltipKm } = { ...data };
            // const selector = `tr[data-tooltip-name=${JSON.stringify(tooltipName)}]` +
            //     `[data-tooltip-subject=${JSON.stringify(tooltipSubject)}]` +
            //     `[data-tooltip-variety=${JSON.stringify(tooltipVariety)}]` +
            //     `[data-tooltip-km=${JSON.stringify(tooltipKm)}]`;
            let selector = ``;
            if (tooltipKm) {
                selector = `${selector}[data-tooltip-km=${JSON.stringify(tooltipKm)}]`;
            }
            else {
                selector = `${selector}tr[data-tooltip-name=${JSON.stringify(tooltipName)}]`;
                if (tooltipSubject) {
                    selector = `${selector}[data-tooltip-subject=${JSON.stringify(tooltipSubject)}]`;
                }
            }
            if (tooltipVariety) {
                selector = `${selector}[data-tooltip-variety=${JSON.stringify(tooltipVariety)}]`;
            }
            let rows = [...table.querySelectorAll(selector)];
            if (!needSwapList) {
                rows = rows.filter(r => !!r.querySelector('input.swap-checkbox:checked'));
            }
            const hasConflicts = rows.length > 1;
            for (const r of rows) {
                r.classList.toggle('conflict', hasConflicts);
            }
        }
    }
}
function addConflictHandling() {
    highlightConflicts();
    const checkboxes = document.querySelectorAll('#swap-list table.swap-coin input.swap-checkbox');
    for (const checkbox of checkboxes) {
        checkbox.addEventListener('click', function () {
            if (!this.checked) {
                const row = this.closest('tr');
                if (row) {
                    row.classList.remove('conflict');
                }
            }
            highlightConflicts();
        });
    }
    const countryCheckboxes = document.querySelectorAll('#swap-list h2 input.swap-country-checkbox');
    for (const checkbox of countryCheckboxes) {
        checkbox.addEventListener('click', function () {
            if (!this.checked) {
                const country = this.closest('h2');
                if (country) {
                    const rows = country.nextElementSibling.querySelectorAll('tr');
                    for (const row of rows) {
                        row.classList.remove('conflict');
                    }
                }
            }
            highlightConflicts();
        });
    }
}
exports.addConflictHandling = addConflictHandling;
function checkSold() {
    const needSwapList = document.getElementById('need-swap-list');
    if (!needSwapList) {
        return;
    }
    const soldList = needSwapList.querySelectorAll('table.swap-coin tr.del');
    let soldCount = soldList.length;
    if (!soldCount) {
        return;
    }
    const delAllButtonId = 'act-d-all';
    const actionBoard = needSwapList.querySelector('.action-board');
    if (!actionBoard) {
        return;
    }
    actionBoard.insertAdjacentHTML('beforeend', `<a class="btn-s btn-gray ico-del" id="${delAllButtonId}" style="float: right;"><div class="ico-16"></div></a>`);
    const button = document.getElementById(delAllButtonId);
    if (!button) {
        return;
    }
    button.addEventListener('click', async () => {
        if (!confirm('Are you sure you want to delete these coins?')) {
            return false;
        }
        let isFirstRequest = true;
        for await (const sold of soldList) {
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
        button.remove();
    });
}
exports.checkSold = checkSold;
function ignoreUnwanted() {
    if (!document.getElementById('need-swap-list')) {
        const tables = document.querySelectorAll('table.swap-coin');
        for (const table of tables) {
            const rows = table.querySelectorAll('tr');
            for (const tr of rows) {
                const markedElement = tr.querySelector('td span[class^="marked-"]');
                const markedClass = markedElement && markedElement.classList.item(0);
                const myCond = markedClass && cond_1.ColorValues.get(+markedClass.split('marked-').pop()) || 0;
                const condElement = tr.querySelector('td.td-cond');
                const cond = condElement && cond_1.ConditionValues.get(condElement.textContent) || 0;
                if (myCond && (!cond || cond <= myCond)) {
                    tr.classList.add('ignore');
                }
            }
        }
    }
}
exports.ignoreUnwanted = ignoreUnwanted;
function removeRowHrefFromSwapList() {
    const swapMgr = document.getElementById('swap-mgr');
    if (!swapMgr) {
        return;
    }
    const rows = swapMgr.querySelectorAll('table.offer-list tr[data-href]');
    for (const row of rows) {
        row.removeAttribute('data-href');
    }
}
exports.removeRowHrefFromSwapList = removeRowHrefFromSwapList;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cond_1 = __webpack_require__(0);
const list_form_1 = __webpack_require__(8);
// declare let CoinWishFormOn: (uwid: string, cond: string, price: string, tid: string, vid: string, ...other: string[]) => void;
// declare let CoinWishFormOff: (...other: string[]) => void;
class WishForm extends list_form_1.ListForm {
    constructor() {
        super(...arguments);
        this.formType = 'wish';
        this.formTypeMethod = 'Wish';
        this.formTypePrefix = 'w';
        this.formUidPrefix = 'w';
        this.buttonSetButtons = new Map([
            ['*', [cond_1.Color.ANY, cond_1.WishValue.ANY]],
            ['VF+', [cond_1.Color.VF, cond_1.WishValue.VF]],
            ['XF+', [cond_1.Color.XF, cond_1.WishValue.XF]],
            ['UN', [cond_1.Color.UNC, cond_1.WishValue.UNC]],
        ]);
    }
    fillForm(uid = '', cond = '', price = '', tid = '', vid = '') {
        super.fillForm(uid, cond, price, vid);
        if (this.form.is_type) {
            this.form.is_type.checked = true;
        }
    }
    getConditionOption(o) {
        const { value, textContent } = o;
        if (value || textContent.includes('ANY')) {
            return {
                text: textContent,
                value,
                checked: (value === '3') ? 'checked' : '',
                style: o.getAttribute('style') || '',
            };
        }
    }
}
exports.WishForm = WishForm;


/***/ })
/******/ ]);