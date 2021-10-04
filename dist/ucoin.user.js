/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 702:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --base-font-family: 'Open Sans', sans-serif;\n  --base-font-size: 14px;\n  --color-surface: #fff;\n  --color-surface-warning: #fdd;\n  --color-surface-error: #fed;\n  --color-surface-info: #eee;\n  --color-content-header: #333;\n  --color-content-total: #666;\n  --color-border-total: #060;\n  --color-content-link: #37e;\n  --color-input-sufrace: var(--color-surface);\n  --color-input-content: #222;\n  --color-input-content-disabled: #444;\n  --color-input-border: #aaa;\n  --color-input-border-disabled: #eee;\n  --color-input-shadow: 0 2px 1px #0001 inset;\n  --color-ignore-content: #ccc;\n  --color-ignore-surface: #333a;\n  --color-ignore-content-hover: #fff;\n  --color-ignore-sufrace-hover: #000a;\n  --color-error-surface: #c00;\n  --color-error-border: #0002;\n  --color-error-sufrace-hover: #eee;\n  --color-widget-content: #333;\n  --color-widget-surface: #ccc;\n  --color-separate-country: #000;\n}\nbody {\n  font-family: var(--base-font-family);\n  font-size: var(--base-font-size);\n}\n.widget {\n  font-size: inherit;\n}\n.widget-header {\n  background-color: var(--color-widget-surface);\n  color: var(--color-widget-content);\n  font-weight: 300;\n  font-size: inherit;\n}\n.btn-l {\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n}\n.btn-l.hide {\n  display: none;\n}\n.btn-s {\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n}\n.btn-s.hide {\n  display: none;\n}\n.btn-red {\n  background-color: var(--color-error-surface);\n  border: 1px solid var(--color-error-border);\n}\n.btn-red,\n.btn-red:hover {\n  color: var(--color-error-sufrace-hover);\n}\n#table a.cell {\n  position: relative;\n}\n#table a.cell.samekm {\n  z-index: 1;\n  background-color: var(--color-ignore-surface);\n  color: var(--color-ignore-content);\n  box-shadow: none;\n  -webkit-box-shadow: none;\n}\n#table a.cell.samekm:hover {\n  background-color: var(--color-ignore-sufrace-hover);\n  color: var(--color-ignore-content-hover);\n}\n.btn-set .btn-marker:hover {\n  filter: brightness(1.2);\n}\n#buy_reset {\n  font-size: 16px;\n  font-weight: bold;\n  width: 22px;\n  height: 22px;\n  display: inline-block;\n}\n#buy_reset svg {\n  width: 14px;\n  height: 14px;\n}\n#buy_year_month {\n  color: var(--color-input-content);\n  background-color: var(--color-input-sufrace);\n  border: 1px solid var(--color-input-border);\n  border-radius: 2px;\n  transition: all 150ms ease-in-out 0s;\n  box-shadow: var(--color-input-shadow);\n  display: inline-block;\n  font-family: var(--base-font-family);\n  padding: 2px 8px;\n  height: 28px;\n  box-sizing: border-box;\n  width: 150px;\n}\n#my-func-block .btn-narrow {\n  padding-left: 14px;\n  padding-right: 14px;\n}\n#my-func-block .btn-i {\n  padding: 10px;\n}\n#my-func-block .btn-i svg {\n  width: 15px;\n  height: 15px;\n}\n.estimated-prices-widget {\n  margin: 30px 0;\n}\n.estimated-prices-widget .widget-header {\n  cursor: default;\n}\n#estimated-prices {\n  max-height: 400px;\n  overflow-x: hidden;\n}\n#estimated-prices .list-link {\n  cursor: initial;\n  padding: 6px 0 3px;\n}\n#estimated-prices .list-sep {\n  padding: 0;\n  border-bottom: 2px solid var(--color-surface-info);\n}\n#estimated-prices .dgray-11 {\n  display: inline-block;\n  text-align: center;\n  line-height: 19px;\n  width: 32px;\n  margin: 0 4px;\n}\n#estimated-prices .gray-13 {\n  padding: 1px 4px 1px 8px;\n  max-width: 64px;\n}\n#estimated-prices .right {\n  max-width: 120px;\n}\n.widget .list-link .blue-13,\n#coin-list table .blue-13 {\n  font-size: 11px;\n  line-height: 19px;\n  letter-spacing: -1px;\n  white-space: nowrap;\n}\n#coin h1 {\n  color: var(--color-content-header);\n}\n#coin .pricewj {\n  border: none;\n}\n#coin .pricewj span {\n  font-size: 15px;\n}\n#coin .tbl td,\n#coin .tbl th {\n  border: none;\n}\n#coin .coin-info th {\n  background-color: var(--color-surface-info);\n}\n#coin .coin-info tr + tr td {\n  border-top: 1px solid var(--color-surface-info);\n}\n#coin .coin-info tr + tr th {\n  border-top: 1px solid var(--color-surface);\n}\n#coin .coin-info thead + tbody {\n  border-top: 1px solid var(--color-surface);\n}\n#coin .coin-img td.i {\n  border: none;\n}\n#coin #swap-block .dgray-11,\n#coin #wish-block .dgray-11 {\n  width: 32px !important;\n  margin: 0 4px;\n}\n#coin #swap-form .btn-s,\n#coin #wish-form .btn-s {\n  margin: 0 0 0 5px;\n}\n#coin #swap-form .btn-ctrl {\n  float: right;\n  margin: 14px 3px 0;\n  height: 26px;\n}\n#coin #swap-form .btn-ctrl + .btn-ctrl {\n  margin-right: 0;\n}\n#coin #swap-form #swap-qty {\n  margin-top: 1em;\n}\n#my-swap-block #swap-block a {\n  position: relative;\n}\n#my-swap-block #swap-block a .comments {\n  position: absolute;\n  width: auto;\n  left: 100%;\n  text-align: left;\n}\n#my-swap-block #swap-block a .comments .ico-16 {\n  display: inline-block;\n  vertical-align: middle;\n  background-position: -16px 0;\n}\n#my-swap-block #swap-block a .comments:active,\n#my-swap-block #swap-block a .comments:focus,\n#my-swap-block #swap-block a .comments:hover {\n  max-width: 100%;\n  overflow: visible;\n}\n#my-swap-block #swap-block a:active .comments,\n#my-swap-block #swap-block a:focus .comments,\n#my-swap-block #swap-block a:hover .comments {\n  max-width: 100%;\n  overflow: visible;\n}\n#my-swap-block #swap-block center div.btn-set {\n  display: flex;\n  justify-content: space-around;\n  margin: 0 auto;\n  width: fit-content;\n}\n#my-swap-block #swap-block center div.btn-set div {\n  font-size: 11px;\n  flex: 0 0 20px;\n  height: 20px;\n  line-height: 20px;\n  cursor: pointer;\n  padding: 1px;\n  margin: 0 1px;\n}\n#my-swap-block #swap-block .btn--combine,\n#my-swap-block #swap-block .btn--expand {\n  margin: 8px 2px 0;\n}\n#my-swap-block #swap-block .btn--combine.hide,\n#my-swap-block #swap-block .btn--expand.hide {\n  display: none;\n}\n#my-wish-block #wish-block a {\n  position: relative;\n}\n#my-wish-block #wish-block a .comments {\n  position: absolute;\n  width: auto;\n  left: 100%;\n  text-align: left;\n}\n#my-wish-block #wish-block a .comments .ico-16 {\n  display: inline-block;\n  vertical-align: middle;\n  background-position: -16px 0;\n}\n#my-wish-block #wish-block a .comments:active,\n#my-wish-block #wish-block a .comments:focus,\n#my-wish-block #wish-block a .comments:hover {\n  max-width: 100%;\n  overflow: visible;\n}\n#my-wish-block #wish-block a:active .comments,\n#my-wish-block #wish-block a:focus .comments,\n#my-wish-block #wish-block a:hover .comments {\n  max-width: 100%;\n  overflow: visible;\n}\n#my-wish-block #wish-block center div.btn-set {\n  display: flex;\n  justify-content: space-around;\n  margin: 0 auto;\n  width: fit-content;\n}\n#my-wish-block #wish-block center div.btn-set div {\n  font-size: 11px;\n  flex: 0 0 28px;\n  height: 20px;\n  line-height: 20px;\n  cursor: pointer;\n  padding: 1px;\n  margin: 0 1px;\n}\n#my-wish-block #wish-block .btn--combine,\n#my-wish-block #wish-block .btn--expand {\n  margin: 8px 2px 0;\n}\n#my-wish-block #wish-block .btn--combine.hide,\n#my-wish-block #wish-block .btn--expand.hide {\n  display: none;\n}\n#swap-list .leftCol,\n#swap-mgr .leftCol {\n  display: block;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 10px;\n}\n#swap-list .swap-coin tr,\n#swap-mgr .swap-coin tr {\n  transition: opacity 0.25s, background 0.25s;\n}\n#swap-list .swap-coin tr.conflict,\n#swap-mgr .swap-coin tr.conflict {\n  background: var(--color-surface-warning);\n}\n#swap-list .swap-coin tr.conflict.mark,\n#swap-mgr .swap-coin tr.conflict.mark {\n  background: var(--color-surface-error);\n}\n#swap-list .swap-coin tr.ignore,\n#swap-mgr .swap-coin tr.ignore {\n  opacity: 0.5;\n}\n#swap-list .swap-coin tr.ignore.conflict,\n#swap-mgr .swap-coin tr.ignore.conflict,\n#swap-list .swap-coin tr.ignore.mark,\n#swap-mgr .swap-coin tr.ignore.mark {\n  opacity: 0.75;\n}\n#swap-list .swap-coin tr th.thumbnails,\n#swap-mgr .swap-coin tr th.thumbnails {\n  white-space: nowrap;\n}\n#swap-list .swap-coin tr th.thumbnails img.thumbnail,\n#swap-mgr .swap-coin tr th.thumbnails img.thumbnail {\n  width: 50px;\n}\n#swap-list #take-swap-list h2.separate-country,\n#swap-mgr #take-swap-list h2.separate-country {\n  font-weight: bold;\n  color: var(--color-separate-country);\n}\n#swap-list #take-swap-list .filter-container,\n#swap-mgr #take-swap-list .filter-container {\n  position: -webkit-sticky;\n  position: sticky;\n  z-index: 100;\n  top: 0;\n  background: var(--color-surface);\n  padding: 15px 0;\n  margin: 0 0 5px;\n}\n#swap-list .action-board,\n#swap-mgr .action-board,\n#swap-list .filter-container,\n#swap-mgr .filter-container {\n  margin: 15px 0 20px;\n  height: 30px;\n  width: auto;\n}\n#swap-list .filters .filter + .filter,\n#swap-mgr .filters .filter + .filter {\n  margin-left: 4px;\n}\n#swap-list .filters .filter .close,\n#swap-mgr .filters .filter .close {\n  width: 18px;\n  text-align: center;\n  margin-right: -8px;\n}\n#swap-list .filters .filter .flag,\n#swap-mgr .filters .filter .flag {\n  margin-right: 4px;\n}\n#swap-list .filters .filter-dialog,\n#swap-mgr .filters .filter-dialog {\n  max-height: 300px;\n  overflow: auto;\n}\n#swap-list .filters .filter-box.filter-box-disabled,\n#swap-mgr .filters .filter-box.filter-box-disabled {\n  color: var(--color-input-content-disabled);\n}\n#swap-list .filters .filter-box.filter-box-disabled,\n#swap-mgr .filters .filter-box.filter-box-disabled,\n#swap-list .filters .filter-box.filter-box-disabled:hover,\n#swap-mgr .filters .filter-box.filter-box-disabled:hover {\n  border-color: var(--color-input-border-disabled);\n}\n#swap-list #sort-filter,\n#swap-mgr #sort-filter {\n  border-color: var(--color-content-link);\n  width: 100px !important;\n  padding: 4px 12px 7px;\n  display: flex;\n}\n#swap-list #sort-filter .left,\n#swap-mgr #sort-filter .left {\n  max-width: 140px !important;\n  flex: 1 1 auto;\n}\n#swap-list #sort-filter-dialog,\n#swap-mgr #sort-filter-dialog {\n  width: 174px;\n  display: none;\n}\n#swap-list .pages {\n  padding-right: 0 !important;\n}\n#swap-list .filter-container {\n  margin: 0 !important;\n}\n#swap-mgr table.offer-list tr.str {\n  cursor: default;\n}\n#swap-mgr #smart-filter-container {\n  position: sticky;\n  top: 0;\n  width: 100%;\n  margin: 0;\n  padding: 15px 0 20px;\n  background: var(--color-surface);\n}\n#swap-mgr #smart-filter-container #country-filter {\n  width: 129px;\n}\n#swap-mgr #smart-filter-container #country-filter.selected {\n  border-color: var(--color-content-link);\n}\n#swap-mgr #smart-filter-container .swap-coin-filter input.filter {\n  width: 100%;\n}\n#profile .price {\n  display: inline-block;\n}\n#profile .price .total {\n  float: right;\n  color: var(--color-content-total);\n  font-size: 20px;\n  font-family: var(--base-font-family);\n  font-weight: normal;\n  margin-top: 4px;\n  padding-top: 4px;\n  border-top: 1px solid var(--color-border-total);\n}\n#profile .price .total .cur {\n  font-size: 16px;\n  padding-right: 6px;\n}\n#tree .tree-filter {\n  color: var(--color-input-content);\n  background-color: var(--color-input-sufrace);\n  border: 1px solid var(--color-input-border);\n  border-radius: 2px;\n  transition: all 150ms ease-in-out 0s;\n  box-shadow: var(--color-input-shadow);\n  display: inline-block;\n  font-family: var(--base-font-family);\n  padding: 2px 8px;\n  height: 28px;\n  box-sizing: border-box;\n  width: 100%;\n  margin-bottom: 3px;\n  font-size: 13px;\n}\n#tree #catalog-tree .country .hide,\n#tree #catalog-tree .period .hide {\n  display: none;\n}\n#coin .rnav {\n  position: relative;\n}\n#coin-chooser-dialog {\n  --width: 200px;\n  --height: 36px;\n  --gap: 20px;\n  --columns: 3;\n  --rows: 20;\n  width: max-content;\n  min-width: var(--width);\n  max-width: calc((var(--width) + var(--gap)) * var(--columns) - var(--gap));\n  max-height: calc(var(--height) * var(--rows)) !important;\n  column-width: var(--width);\n  column-gap: var(--gap);\n  right: 0;\n}\n#coin-chooser-dialog .list-link {\n  display: inline-block;\n  width: calc(var(--width) - 24px);\n}\n.filter-dialog .list-link {\n  display: flex;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
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

/***/ }),

/***/ 602:
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 512\"><path fill=\"currentColor\" d=\"M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z\"></path></svg>"

/***/ }),

/***/ 916:
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12m-17.99 504.97l22.63-22.63a24 24 0 0 0 0-33.94L63.6 7.03a24 24 0 0 0-33.94 0L7.03 29.66a24 24 0 0 0 0 33.94L448.4 504.97a24 24 0 0 0 33.94 0z\"></path></svg>"

/***/ }),

/***/ 584:
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z\"></path></svg>"

/***/ }),

/***/ 238:
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><path fill=\"currentColor\" d=\"M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z\"></path></svg>"

/***/ }),

/***/ 759:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.postFragment = exports.getFragment = exports.documentFragment = exports.postText = exports.getText = exports.postJson = exports.getJson = exports.post = exports.get = void 0;
async function get(url, body) {
    return await fetch(url, { method: 'GET', body });
}
exports.get = get;
async function post(url, body) {
    return await fetch(url, { method: 'POST', body });
}
exports.post = post;
async function responseOrError(url, method = 'GET', body, autoRedirect = true) {
    const response = await fetch(url, { method, body });
    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
    if (autoRedirect && response.redirected && location.href !== response.url) {
        history.pushState({}, null, response.url);
    }
    return response;
}
async function getJson(url, body, autoRedirect = true) {
    return await (await responseOrError(url, 'GET', body, autoRedirect)).json();
}
exports.getJson = getJson;
async function postJson(url, body, autoRedirect = true) {
    return await (await responseOrError(url, 'POST', body, autoRedirect)).json();
}
exports.postJson = postJson;
async function getText(url, body, autoRedirect = true) {
    return await (await responseOrError(url, 'GET', body, autoRedirect)).text();
}
exports.getText = getText;
async function postText(url, body, autoRedirect = true) {
    return await (await responseOrError(url, 'POST', body, autoRedirect)).text();
}
exports.postText = postText;
function documentFragment(src) {
    const temp = document.createElement('template');
    temp.innerHTML = src;
    return temp.content;
}
exports.documentFragment = documentFragment;
async function getFragment(url, body, autoRedirect = true) {
    return documentFragment(await getText(url, body, autoRedirect));
}
exports.getFragment = getFragment;
async function postFragment(url, body, autoRedirect = true) {
    return documentFragment(await postText(url, body, autoRedirect));
}
exports.postFragment = postFragment;


/***/ }),

/***/ 659:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoinForm = void 0;
const hide_svg_1 = __importDefault(__webpack_require__(602));
const leave_svg_1 = __importDefault(__webpack_require__(916));
const replace_svg_1 = __importDefault(__webpack_require__(584));
const show_svg_1 = __importDefault(__webpack_require__(238));
const ajax_1 = __webpack_require__(759);
const cond_1 = __webpack_require__(290);
const form_1 = __webpack_require__(213);
const selectors_1 = __webpack_require__(26);
const utils_1 = __webpack_require__(131);
class CoinForm extends form_1.AbstractForm {
    constructor() {
        super(...arguments);
        this.addFormId = 'add-coin-form';
        this.editFormId = 'edit-coin-form';
        this.funcId = 'my-func-block';
        this.viewId = 'ucid-block';
        this.coinChooserId = 'coin-chooser-dialog';
    }
    async handle( /*loc: string*/) {
        this.func = document.getElementById(this.funcId);
        if (!this.func) {
            return;
        }
        this.coinChooser = document.getElementById(this.coinChooserId);
        await this.update();
    }
    async updateFragment(fragment) {
        this.func = (0, utils_1.updateRequiredElement)(fragment, this.func);
        this.coinChooser = (0, utils_1.updateOptionalElement)(fragment, this.coinChooser);
        return await this.update();
    }
    async update() {
        (0, utils_1.show)(this.func);
        this.updateButtons();
        this.addForm = this.func.querySelector(`#${this.addFormId} form`);
        this.editForm = this.func.querySelector(`#${this.editFormId} form`);
        this.form = this.editForm || this.addForm;
        if (this.form) {
            this.view = this.func.querySelector((0, selectors_1.id)(this.viewId));
            if (this.view) {
                this.addPublicityToggle();
                this.addReplacementToggle();
            }
            this.updateBuyDateInput();
            this.addSyncConditionToColorTable();
            await (0, utils_1.handleFormSubmit)(this.form, async () => await this.updateFragment(await (0, ajax_1.postFragment)(location.href, new FormData(this.form))));
            if (this.view) {
                for (const link of this.view.querySelectorAll('a[type=submit]')) {
                    await (0, utils_1.handleLinkSubmit)(link, async () => await this.updateFragment(await (0, ajax_1.getFragment)(link.href)));
                }
            }
        }
    }
    updateBuyDateInput() {
        const { buy_month: buyMonth, buy_year: buyYear } = this.form;
        let { buy_year_month: buyYearMonth } = this.form;
        (0, utils_1.hide)(buyYear, buyMonth);
        if (!buyYearMonth) {
            buyYear.insertAdjacentHTML('afterend', `<input id='buy_year_month' name='buy_year_month' type='month'/>`);
            buyYearMonth = this.form.buy_year_month;
        }
        buyYearMonth.max = (0, utils_1.todayMonth)();
        buyYearMonth.addEventListener('change', (e) => {
            (0, utils_1.cancel)(e);
            const value = buyYearMonth.value || (0, utils_1.todayMonth)();
            [buyYear.value, buyMonth.value] = value.split('-', 2);
            return false;
        });
    }
    addSyncConditionToColorTable() {
        const condition = this.form.condition;
        const tableColor = this.form.color;
        tableColor.nextElementSibling.classList.add('btn-set');
        const setColor = this.form.querySelector((0, selectors_1.id)('edit-set-color'));
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
        if (await (0, ajax_1.postFragment)(location.href, new FormData(this.form))) {
            return true;
        }
        return (0, utils_1.reload)();
    }
    addPublicityToggle() {
        // const form = view.nextElementSibling.querySelector<HTMLFormElement>('form');
        const status = this.view.querySelector('.status-line .left');
        const buttons = this.view.querySelector('.func-button');
        const buttonId = 'coin-form-visibility';
        buttons.insertAdjacentHTML('afterbegin', `<button id='${buttonId}' class='btn-l btn-i btn-narrow'/>`);
        const button = buttons.querySelector((0, selectors_1.id)(buttonId));
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
        buttons.insertAdjacentHTML('afterbegin', `<button id='${buttonId}' class='btn-l btn-i btn-narrow'/>`);
        const button = buttons.querySelector((0, selectors_1.id)(buttonId));
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
                        tbody.insertAdjacentHTML('beforeend', `<tr><td class='lgray-12' colspan='2'><span class='set status2 wrap' style='max-width: 232px;width: 232px;padding: 0;display: block;margin-top: 6px;'>Need to replace</span></td></tr>`);
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
}
exports.CoinForm = CoinForm;


/***/ }),

/***/ 290:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorStyle = exports.WishValue = exports.SwapValue = exports.FormColorValues = exports.FormValueColors = exports.FormValue = exports.ColorValues = exports.ConditionValues = exports.Value = exports.ConditionColors = exports.Color = void 0;
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

/***/ 799:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomDelay = exports.delay = void 0;
async function delay(time) {
    return await new Promise((resolve) => setTimeout(() => resolve(), time));
}
exports.delay = delay;
async function randomDelay(rndDelay = 1000, minDelay = 500) {
    const time = Math.round(minDelay + Math.random() * rndDelay);
    // console.debug(`DELAY FOR ${time} MS`);
    return await delay(time);
}
exports.randomDelay = randomDelay;


/***/ }),

/***/ 526:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderFilters = exports.renderFilter = exports.Filter = void 0;
var Filter;
(function (Filter) {
    Filter["COUNTRY"] = "country";
    Filter["YEAR"] = "year";
    Filter["VALUE"] = "value";
    Filter["KM"] = "km";
})(Filter = exports.Filter || (exports.Filter = {}));
function renderFilter([name, props]) {
    const disabled = props.options.size <= 1;
    return `<div class='${props.direction || 'left'} filter'>\
            <div data-filter='${name}' data-filter-placeholder='${props.placeholder}'${disabled ? ' data-filter-disabled' : ''} class='filter-box${disabled ? ' filter-box-disabled' : props.value ? ' filter-box-active' : ''}' style='width: ${props.width - 24}px;'>\
            <div class='${props.value ? `blue-13 ` : ''}left'>${disabled
        ? props.options.get([...props.options.keys()].filter((k) => k !== '').pop())
        : props.value
            ? props.options.get(props.value) || props.value
            : props.placeholder}</div>${(!disabled &&
        (props.value
            ? `<div class='right close' title='Clear filter' data-filter-clear='${name}'>×</div>`
            : `<div class='right'><span class='arrow ab'></span></div>`)) ||
        ''}</div>\
        <div class='drop hide filter-dialog' data-filter-dialog='${name}' style='width: ${props.width}px;'>\
            ${[['', 'All'], ...props.options.entries()]
        .map(([value, label]) => `<a class='list-link' data-filter-by='${name}' data-filter-value='${value}'>\
                    <span class='left gray-13 wrap' style='max-width:140px;'>${label}</span></a>`)
        .join('')}\
        </div></div>`;
}
exports.renderFilter = renderFilter;
function renderFilters(props) {
    return `<div class='left filter-container filters'>${[...props.entries()].map(renderFilter).join('')}</div>`;
}
exports.renderFilters = renderFilters;


/***/ }),

/***/ 213:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractForm = void 0;
class AbstractForm {
    get mainId() {
        return '';
    }
    get formId() {
        return '';
    }
}
exports.AbstractForm = AbstractForm;


/***/ }),

/***/ 691:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addGalleryVisibilityToggle = void 0;
const ajax_1 = __webpack_require__(759);
const delay_1 = __webpack_require__(799);
const gallery = document.getElementById('gallery');
let privateStatus;
let publicStatus;
function updateStatusElements() {
    privateStatus = gallery.querySelectorAll('.coin .desc-block span.status0');
    publicStatus = gallery.querySelectorAll('.coin .desc-block span.status1');
}
async function postPublicityForm(url, form, checked) {
    form.querySelector('input[name=public]').checked = checked;
    return await (0, ajax_1.post)(url, new FormData(form));
}
function addVisibilityToggleButton(container, text, className, visibility, count, callback) {
    const buttonId = `button-${text.toLowerCase()}`;
    let button = document.getElementById(buttonId);
    if (!button) {
        container.insertAdjacentHTML('beforeend', `<button id="${buttonId}" class="btn-l ${className}" style="padding: 0 14px; height: 26px">${text} <small></small></button>`);
        button = document.getElementById(buttonId);
        button.addEventListener('click', () => confirm(`Are you sure to ${text.toLowerCase()}?`) && callback(container, visibility));
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
        const response = await (0, ajax_1.get)(url);
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
        await (0, delay_1.randomDelay)();
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

/***/ 379:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateOnClickHref = exports.updateLinkHref = void 0;
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

/***/ 136:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListForm = void 0;
const ajax_1 = __webpack_require__(759);
const form_1 = __webpack_require__(213);
const selectors_1 = __webpack_require__(26);
const swap_links_1 = __webpack_require__(52);
const utils_1 = __webpack_require__(131);
class ListForm extends form_1.AbstractForm {
    constructor() {
        super(...arguments);
        this.funcId = 'my-coin-func-block';
    }
    get mainId() {
        return `my-${this.formType}-block`;
    }
    get formId() {
        return `${this.formType}-form`;
    }
    get listId() {
        return `${this.formType}-block`;
    }
    get headerId() {
        return `widget-${this.formType}-header`;
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
    fillForm(uid = '', cond = '', price = '', vid = '') {
        if (this.form[this.formUid]) {
            this.form[this.formUid].value = uid;
        }
        if (this.form.condition) {
            this.form.condition.value = cond;
        }
        if (this.form.price) {
            this.form.price.value = price;
        }
        if (this.form[this.formVariety]) {
            if (vid) {
                this.form[this.formVariety].value = vid;
            }
            else {
                this.form[this.formVariety][0].checked = true;
            }
        }
        this.form.action.value = uid
            ? `edit${this.formType}coin`
            : `add${this.formType}coin`;
    }
    formOnHandler(uid, ...other) {
        this.formClickTimeout = setTimeout(() => {
            (0, utils_1.hide)(this.listBlock);
            (0, utils_1.show)(this.form, this.formClose);
            (0, utils_1.disable)(this.func);
            this.widgetHeader.removeEventListener('click', (e) => this.widgetHeaderRedirectHandler(e));
            this.widgetHeader.addEventListener('click', (e) => this.widgetHeaderCloseHandler(e));
            this.fillForm(uid, ...other);
            (0, utils_1.show)(this.cancelButton);
            (0, utils_1.toggle)(!uid, this.addButton);
            (0, utils_1.toggle)(uid, this.editButton, this.deleteButton);
            this.deleteButton.href = `?action=del${this.formType}coin&${this.formUid}=${uid}`;
            (uid ? this.editButton : this.addButton).focus();
        }, 300);
    }
    formOnHandlerSubmit(uid, ...other) {
        clearTimeout(this.formClickTimeout);
        this.fillForm(uid, ...other);
        this.form.submit();
    }
    formOffHandler() {
        (0, utils_1.hide)(this.form, this.formClose);
        (0, utils_1.show)(this.listBlock);
        (0, utils_1.enable)(this.func);
        this.widgetHeader.removeEventListener('click', (e) => this.widgetHeaderCloseHandler(e));
        this.widgetHeader.addEventListener('click', (e) => this.widgetHeaderRedirectHandler(e));
    }
    widgetHeaderCloseHandler(e) {
        (0, utils_1.cancel)(e);
        this.formOffHandler();
    }
    updateList() {
        this.listBlock = document.getElementById(this.listId);
        if (this.listBlock) {
            (0, swap_links_1.styleListLinks)(this.listBlock);
        }
    }
    removeOneButton() {
        const oneButtonBlock = this.main.previousElementSibling;
        if (oneButtonBlock.matches('center.action-btn')) {
            oneButtonBlock.remove();
        }
    }
    updateFormHandlers() {
        const { unsafeWindow: userScope } = __webpack_require__.g;
        userScope[this.formOnFunctionName] = (...args) => this.formOnHandler(...args);
        userScope[this.formOffFunctionName] = () => this.formOffHandler();
    }
    async update() {
        if (this.main) {
            (0, utils_1.show)(this.main);
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
        const buttonSet = this.main.querySelector((0, selectors_1.id)(this.buttonSetId));
        if (!buttonSet) {
            return;
        }
        const addColorButton = (text, color, value) => {
            const markerId = `${this.formType}-marker-${value}`;
            const markerClass = `btn-marker marked-${color}`;
            buttonSet.insertAdjacentHTML('beforeend', `<div id="${markerId}" class="${markerClass}">${text}</div>`);
            const marker = buttonSet.querySelector((0, selectors_1.id)(markerId));
            marker.addEventListener('click', () => this.formOnHandler('', `${value}`));
            marker.addEventListener('dblclick', () => this.formOnHandlerSubmit('', `${value}`));
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
        this.cancelButton = this.form.querySelector((0, selectors_1.id)(this.cancelButtonId));
        this.addButton = this.form.querySelector((0, selectors_1.id)(this.addButtonId));
        this.editButton = this.form.querySelector((0, selectors_1.id)(this.editButtonId));
        this.deleteButton = this.form.querySelector((0, selectors_1.id)(this.deleteButtonId));
        this.deleteButton.classList.add('btn-red');
    }
    updateWidget() {
        this.widgetHeader = this.main.querySelector((0, selectors_1.id)(this.headerId));
        this.widgetHeaderRedirectHandler = this.widgetHeader.onclick;
        this.widgetHeader.removeAttribute('onclick');
    }
    async updateFragment(fragment) {
        this.main = (0, utils_1.updateRequiredElement)(fragment, this.main);
        return await this.update();
    }
    async updateForm() {
        this.func = this.main.querySelector((0, selectors_1.id)(this.funcId));
        this.form = this.main.querySelector((0, selectors_1.id)(this.formId));
        this.formClose = this.main.querySelector((0, selectors_1.id)(this.formCloseId));
        await (0, utils_1.handleFormSubmit)(this.form, async () => await this.updateFragment(await (0, ajax_1.postFragment)(location.href, new FormData(this.form))));
        for (const link of this.form.querySelectorAll('a[type=submit]')) {
            await (0, utils_1.handleLinkSubmit)(link, async () => await this.updateFragment(await (0, ajax_1.getFragment)(link.href)));
        }
        this.updateFormButtons();
        this.updateCondition();
        this.updateButtonSet();
    }
}
exports.ListForm = ListForm;


/***/ }),

/***/ 48:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.estimateWeightPrice = exports.estimateSwapPrices = void 0;
const cond_1 = __webpack_require__(290);
const swap_list_sort_1 = __webpack_require__(188);
const COIN_ID = 'coin';
const SWAP_ID = 'swap';
const SWAP_BLOCK_ID = 'swap-block';
const ESTIMATED_PRICES_ID = 'estimated-prices';
const RX_GRAMMS = /\([gг]/;
const RX_COUNTRY = /Country|Страна|Valstybė/;
const RX_RUSSIA = /Russia|Россия|Rusija|USSR|СССР|TSRS/;
const RX_COMPOSITION = /Composition|Материал|Sudėtis/;
const RX_SILVER = /Silver|Серебро|Sidabras/;
const RX_GOLD = /Gold|Золото|Auksas/;
const RU_PRICE = 0.005; //       3-8e/kg
const EU_PRICE = 0.012; //     10-15e/kg
const AG_PRICE = 0.77; //   .60-.80e/g
const AU_PRICE = 49.0; // 45.0-55.0e/g
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
                    yAxes: [
                        {
                            type: 'linear',
                            display: true,
                            ticks: { beginAtZero: true },
                        },
                    ],
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
                data: p.map((v, i) => ({ x: (i * maxLength) / length, y: v })),
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line
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
function estimateWeightPrice() {
    const coinBlock = document.getElementById(COIN_ID);
    const aPrice = coinBlock?.querySelector('.right.pricewj');
    const head = coinBlock?.querySelector('h1');
    const trs = coinBlock?.querySelectorAll('.coin-info tr');
    let weight = NaN;
    let isRussia = false;
    let isSilver = false;
    let isGold = false;
    let part = 1;
    for (const tr of trs) {
        const th = tr.querySelector('th');
        const head = (th && th.textContent) || '';
        const td = tr.querySelector('td');
        if (td) {
            const data = `${td.textContent}`;
            if (head.match(RX_GRAMMS)) {
                weight = +data;
            }
            else if (head.match(RX_COUNTRY)) {
                isRussia = !!data.match(RX_RUSSIA);
            }
            else if (head.match(RX_COMPOSITION)) {
                isSilver = !!data.match(RX_SILVER);
                isGold = !!data.match(RX_GOLD);
                if (isSilver || isGold) {
                    part = +data.split(' ').pop();
                }
            }
        }
    }
    let price;
    let priceSource;
    if (isGold) {
        price = weight * (part || 1) * AU_PRICE;
        priceSource = 'au';
    }
    else if (isSilver) {
        price = weight * (part || 1) * AG_PRICE;
        priceSource = 'ag';
    }
    else if (isRussia) {
        price = weight * RU_PRICE;
        priceSource = 'ru';
    }
    else {
        price = weight * EU_PRICE;
        priceSource = '--';
    }
    const weightPrice = `<br/><price class="right" title="${priceSource}: ${price.toFixed(5)}">€ ${price.toFixed(2)}</price>`;
    if (!aPrice) {
        let isAproximate = false;
        const prices = [];
        const all = coinBlock.querySelectorAll('#coin-list td.blue-13');
        for (const td of all) {
            const clone = td.cloneNode(true);
            for (const child of clone.childNodes) {
                child.remove();
            }
            const { textContent } = clone;
            if (textContent) {
                prices.push(+textContent);
            }
            else {
                isAproximate = true;
            }
        }
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const showPrices = [min.toFixed(2)];
        if (max > min) {
            showPrices.push(max.toFixed(2));
        }
        else if (isAproximate) {
            showPrices.unshift('');
        }
        head.insertAdjacentHTML('beforebegin', `<a href="#price" class="gray-12 right pricewj">Value:&nbsp;€ <span>${showPrices.join(isAproximate ? '~' : '-')}</span>${weightPrice}</a>`);
    }
    else {
        aPrice.insertAdjacentHTML('beforeend', weightPrice);
    }
}
exports.estimateWeightPrice = estimateWeightPrice;


/***/ }),

/***/ 26:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.id = void 0;
function id(id) {
    return `#${id}`;
}
exports.id = id;


/***/ }),

/***/ 677:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwapFormList = void 0;
const ajax_1 = __webpack_require__(759);
const delay_1 = __webpack_require__(799);
const selectors_1 = __webpack_require__(26);
const swap_links_1 = __webpack_require__(52);
const uid_1 = __webpack_require__(560);
const utils_1 = __webpack_require__(131);
const { debug } = console;
class SwapFormList {
    constructor(listForm) {
        this.variants = new Map();
        this.expandAvailable = false;
        this.combineAvailable = false;
        this.deleteSwapCoin = async (usid) => {
            if (usid instanceof Set) {
                usid = [...usid].join(',');
            }
            const url = new URL('/swap-list/', location.href);
            const p = url.searchParams;
            p.set('f', 'del');
            p.set('usid', usid);
            p.set('uid', uid_1.UID);
            const fragment = await (0, ajax_1.getFragment)(url.href, null, false);
            if (!fragment) {
                return (0, utils_1.reload)();
            }
            return fragment;
        };
        this.updateLinkQty = (a, qty) => {
            if (a.hasAttribute('onClick')) {
                a.setAttribute('onClick', a
                    .getAttribute('onClick')
                    .replace(swap_links_1.CoinSwapFormOnMatcher, `CoinSwapFormOn('$<usid>', '$<cond>', '$<price>', '$<info>', '$<vid>', '${qty}', '$<replica>'`));
            }
            for (const span of a.querySelectorAll('span.left.dblue-13')) {
                span.remove();
            }
            if (qty > 1) {
                for (const span of a.querySelectorAll('span.left.gray-13.wrap')) {
                    span.insertAdjacentHTML('afterend', `<span class='left dblue-13'><span>&times;</span>${qty}</span>`);
                }
            }
        };
        this.listForm = listForm;
    }
    update(listBlock) {
        if (this.listBlock) {
            this.listBlock.replaceWith(listBlock);
        }
        else {
            this.listBlock = listBlock;
        }
        this.form =
            listBlock.querySelector((0, selectors_1.id)(this.listForm.formId)) || document.querySelector((0, selectors_1.id)(this.listForm.formId));
        this.buttonSet = listBlock.querySelector('center');
        if (this.buttonSet) {
            /*const oldButton = this.buttonSet.querySelector('button.btn-s.btn-gray');
            if (oldButton) {
                oldButton.remove();
            }*/
            this.addButton('expand', 0, '&laquo;*&raquo;', (n) => this.onExpand(n));
            this.addButton('expand', 5, '&laquo;5&raquo;', (n) => this.onExpand(n));
            this.addButton('expand', 10, '&laquo;10&raquo;', (n) => this.onExpand(n));
            this.addButton('combine', 0, '&raquo;&middot;&laquo;', () => this.onCombine());
            this.updateButtons();
        }
    }
    addButton(role, qty, text, clickHandler) {
        const buttonId = `${role}-qty`;
        const expand = this.buttonSet.querySelector((0, selectors_1.id)(buttonId));
        if (expand) {
            (0, utils_1.show)(expand);
        }
        else {
            this.buttonSet.insertAdjacentHTML('beforeend', `<button id='${buttonId}' type='button' class='btn--${role} btn-s btn-blue'>${text}</button>`);
            this.buttonSet.querySelector((0, selectors_1.id)(buttonId)).addEventListener('click', async () => {
                this.hideButtons();
                await clickHandler(qty);
                this.updateButtons();
            });
        }
    }
    updateVariants() {
        this.expandAvailable = false;
        this.combineAvailable = false;
        this.variants.clear();
        for (const { m } of (0, swap_links_1.getSwapLinksWithMatches)()) {
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
        (0, utils_1.show)(...this.buttonSet.querySelectorAll(`button${role ? `.btn--${role}` : ''}`));
    }
    hideButtons(role) {
        (0, utils_1.hide)(...this.buttonSet.querySelectorAll(`button${role ? `.btn--${role}` : ''}`));
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
        if (this.expandAvailable) {
            this.showExpandButtons();
        }
        else {
            this.hideExpandButtons();
        }
        if (this.combineAvailable) {
            this.showCombineButtons();
        }
        else {
            this.hideCombineButtons();
        }
    }
    /**
     * @param expandTo number of links (0 for unlimited)
     */
    async onExpand(expandTo = 0) {
        debug(`EXPANDING...`);
        let isAddFailed = false;
        let isUpdFailed = false;
        let isFirstQuery = true;
        for await (const { a, m } of (0, swap_links_1.getSwapLinksWithMatches)()) {
            const { uniq, usid, cond, price, info, vid, strqty } = m;
            const qty = +strqty;
            const n = expandTo > 0 ? Math.min(qty, expandTo) : qty;
            if (n <= 1) {
                debug(`IGNORING ${uniq} ${usid}`);
                continue; // return?
            }
            for (let i = n, qq = qty, q = Math.floor(qq / i); i > 1; i--, q = Math.floor(qq / i)) {
                qq -= q;
                if (!isFirstQuery) {
                    await (0, delay_1.randomDelay)();
                }
                isFirstQuery = false;
                debug(`ADDING ${uniq} ${n - i + 1} -> ${q}`);
                const addR = await this.addSwapCoin({ cond, qty: q, vid, info, price });
                if (!addR) {
                    isAddFailed = true;
                    break;
                }
                const links = new Set();
                for (const l of (0, swap_links_1.getSwapLinks)()) {
                    if (!l.hasAttribute('onClick')) {
                        continue;
                    }
                    const m = l.getAttribute('onClick').match(swap_links_1.CoinSwapFormOnMatcher);
                    if (m && m.groups) {
                        links.add(m.groups.usid);
                    }
                }
                for (const l of (0, swap_links_1.getSwapLinks)(addR)) {
                    if (!l.hasAttribute('onClick')) {
                        continue;
                    }
                    const m = l.getAttribute('onClick').match(swap_links_1.CoinSwapFormOnMatcher);
                    const usid = m && m.groups && m.groups.usid;
                    if (!usid || links.has(usid)) {
                        continue;
                    }
                    links.add(usid);
                    (0, swap_links_1.styleSwapLink)(l);
                    a.insertAdjacentElement('afterend', l);
                    (0, swap_links_1.addComment)(l);
                }
                if (!isFirstQuery) {
                    await (0, delay_1.randomDelay)();
                }
                isFirstQuery = false;
                debug(`UPDATING ${uniq} ${usid} -> ${qq}`);
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
            debug('ADD FAILED :(');
        }
        else if (isUpdFailed) {
            debug('UPDATE FAILED :(');
        }
        else {
            debug('DONE!');
        }
    }
    async onCombine() {
        debug(`COMBINING...`);
        let isDelFailed = false;
        let isUpdFailed = false;
        for (const variant of [...this.variants.values()]) {
            const { usid, usids, qty, total } = variant;
            debug(`VARIANT usid=${usid} usids=${[...usids].join(',')} qty=${qty} total=${total}`);
            if (total <= qty) {
                continue;
            }
            const remove = new Set(usids);
            remove.delete(usid);
            if (!remove.size) {
                continue;
            }
            debug(`REMOVING ${[...remove].join(', ')}`);
            const deleteContent = await this.deleteSwapCoin(remove);
            if (deleteContent) {
                const newListBlock = deleteContent.getElementById(this.listForm.listId);
                if (newListBlock && this.listBlock) {
                    newListBlock.querySelector('center').replaceWith(this.listBlock.querySelector('center'));
                    (0, swap_links_1.styleListLinks)(newListBlock);
                    this.update(newListBlock);
                }
            }
            else {
                isDelFailed = true;
                break;
            }
            debug(`UPDATING ${usid}`);
            const updateContent = await this.updateSwapCoin(usid, { ...variant, qty: total });
            if (updateContent) {
                const newListBlock = updateContent.getElementById(this.listForm.listId);
                debug(this.listForm.listId, this.listBlock, newListBlock);
                if (newListBlock && this.listBlock) {
                    newListBlock.querySelector('center').replaceWith(this.listBlock.querySelector('center'));
                    (0, swap_links_1.styleListLinks)(newListBlock);
                    this.update(newListBlock);
                }
            }
            else {
                isUpdFailed = true;
                break;
            }
        }
        if (isDelFailed) {
            debug('REMOVE FAILED :(');
        }
        else if (isUpdFailed) {
            debug('UPDATE FAILED :(');
        }
        else {
            debug('DONE!');
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
        const fragment = await (0, ajax_1.postFragment)(location.href, data);
        debug('fragment');
        debug(fragment);
        debug('this.listForm.mainId');
        debug(this.listForm.mainId);
        debug('fragment.getElementById(this.listForm.mainId)');
        debug(fragment.getElementById(this.listForm.mainId));
        if (!fragment.getElementById(this.listForm.mainId)) {
            return (0, utils_1.reload)();
        }
        return fragment;
    }
    async addSwapCoin(data) {
        return await this.updateSwapCoin('', data, 'addswapcoin');
    }
}
exports.SwapFormList = SwapFormList;


/***/ }),

/***/ 385:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwapForm = void 0;
const cond_1 = __webpack_require__(290);
const list_form_1 = __webpack_require__(136);
const selectors_1 = __webpack_require__(26);
const swap_form_list_1 = __webpack_require__(677);
const swap_links_1 = __webpack_require__(52);
const vid_1 = __webpack_require__(377);
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
        // eslint-disable-next-line no-invalid-this
        this.swapListManager = new swap_form_list_1.SwapFormList(this);
    }
    fillForm(uid = '', cond = '', price = '', info = '', vid = '', qty = '', replica = '') {
        super.fillForm(uid, cond || (replica && '100'), price, vid || (0, vid_1.getCurrentVarietyId)());
        this.form.comment.value = info;
        this.form.qty.value = qty || '1';
    }
    updateList() {
        this.listBlock = document.getElementById(this.listId);
        if (this.listBlock) {
            this.swapListManager.update(this.listBlock.cloneNode(true));
            for (const list of document.querySelectorAll((0, selectors_1.id)(this.listId))) {
                (0, swap_links_1.styleListLinks)(list);
            }
            (0, swap_links_1.addLinkComments)();
        }
    }
    /*protected async update(): Promise<void> {
        super.update();

        const DIV_ID = 'some-strange-div';
        console.log(DIV_ID);
        listBlock.insertAdjacentHTML('afterbegin', `<div id="${DIV_ID}" style="max-height:400px;overflow-x:hidden;overflow-y:auto;background:red"/>`);
        const div = listBlock.querySelector(id(DIV_ID));
        for (const {a} of getSwapLinksWithMatches()) {
            div.insertAdjacentElement('beforeend', a);
        }
    }*/
    // eslint-disable-next-line class-methods-use-this
    getConditionOption(o) {
        const { value, textContent } = o;
        return {
            value,
            text: value ? textContent : 'Without condition',
            checked: value === '3' ? 'checked' : '',
            style: o.getAttribute('style') || '',
        };
    }
    async updateForm() {
        await super.updateForm();
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
        addQtyCtrlButton('beforebegin', 'plus10', '+10', (v) => v + 10);
        addQtyCtrlButton('beforebegin', 'plus5', '+5', (v) => v + 5);
        addQtyCtrlButton('beforebegin', 'plus', '+', (v) => v + 1);
        addQtyCtrlButton('beforebegin', 'minus', '&minus;', (v) => v - 1);
    }
}
exports.SwapForm = SwapForm;


/***/ }),

/***/ 52:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addLinkComments = exports.addComment = exports.styleListLinks = exports.styleSwapLink = exports.getSwapLinksWithMatches = exports.getSwapLinks = exports.CoinSwapFormOnMatcher = void 0;
const cond_1 = __webpack_require__(290);
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

/***/ 188:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addFilteringOptions = exports.addSortingOptions = exports.cmp = void 0;
const cond_1 = __webpack_require__(290);
const filters_1 = __webpack_require__(526);
const url_1 = __webpack_require__(422);
const utils_1 = __webpack_require__(131);
function num(s) {
    return +s.replace(/[^.\d]/g, '');
}
function cmp(a, b) {
    return -(a < b) || +(a > b);
}
exports.cmp = cmp;
function cmpNum(a, b, field) {
    const f = `sort${(0, utils_1.tt)(field)}`;
    return cmp(num(a[f]), num(b[f]));
}
function cmpStr(a, b, field) {
    const f = `sort${(0, utils_1.tt)(field)}`;
    return cmp(a[f], b[f]);
}
function cmpYear(a, b, o = 1) {
    return o * cmpNum(a, b, 'year') || o * cmpStr(a, b, 'mm');
}
function cmpKm(a, b, o = 1) {
    return o * cmpStr(a, b, 'kmc') || o * cmpNum(a, b, 'km') || o * cmpStr(a, b, 'kma') || o * cmpYear(a, b);
}
function cmpFace(a, b, o = 1) {
    return o * cmpStr(a, b, 'face') || o * cmpKm(a, b, -1);
}
function cmpCond(a, b, o = 1) {
    return o * cmpNum(a, b, 'cond') || cmpFace(a, b);
}
function cmpValue(a, b, o = 1) {
    return o * cmpNum(a, b, 'value') || cmpCond(a, b, -1);
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
function x(name) {
    return `<div class='right close' title='Clear filter' data-filter-clear='${name}'>×</div>`;
}
function a(ord = 'a') {
    const arrClass = ord === 'a' ? 'at' : 'ab';
    return `<div class='right'><span class='arrow ${arrClass}'></span></div>`;
}
function d(ord = 'd') {
    return a(ord);
}
function o(opt) {
    return `<div class='left gray-13'>${opt}</div>`;
}
function c(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    const opt = template.content.querySelector('div.left');
    opt?.classList.add('wrap');
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
const ORDER_PARAM = 'o';
const ORDER_SEPARATOR = '_';
function getActiveSortOption() {
    const o = (0, url_1.getHashParam)(ORDER_PARAM);
    const [field = 'year', order = 'd'] = o?.split(ORDER_SEPARATOR) || [];
    currentOrder = order;
    for (const [option, { field: f }] of sortOptionParams.entries()) {
        if (f === field) {
            currentOption = option;
        }
    }
}
function setActiveSortOption(option, order) {
    (0, url_1.updateLocationHash)((params) => {
        params.set(ORDER_PARAM, `${sortOptionParams.get(option).field}${ORDER_SEPARATOR}${order}`);
    });
}
function dropdown(id, selected, options) {
    return `
    <div class='right filter-container'>
        <div class='filter-box' id='${id}'>
            ${c(selected)}
        </div>
        <div class='drop hide filter-dialog' id='${id}-dialog'>
            ${options.join('')}
        </div>
    </div>
`;
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
            const name = `sort${(0, utils_1.tt)(field)}`;
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
                    const { 0: full, groups: { cat, num, prefix, suffix }, } = m;
                    d.sortKmc = cat;
                    d[name] = num;
                    d.sortKma = `${prefix}${suffix}`;
                    d.sortKmz = t;
                }
                else {
                    d.sortKmc = '';
                    d[name] = t;
                    d.sortKma = '';
                    d.sortKmz = t;
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
    leftControls.insertAdjacentHTML('afterend', dropdown('sort-filter', `${o(currentOption)}${a(currentOrder)}`, sortOptions.map((opt) => `
            <a class='list-link' data-option='${opt}' data-order='a'>${o(opt)}${a()}</a>
            <a class='list-link' data-option='${opt}' data-order='d'>${o(opt)}${d()}</a>
        `)));
    const sortFilter = swapList.querySelector('#sort-filter');
    const sortDialog = swapList.querySelector('#sort-filter-dialog');
    sortFilter.addEventListener('click', (e) => {
        e.stopPropagation();
        sortDialog.style.display = 'block';
    });
    sortDialog.addEventListener('click', (e) => {
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
function addFilteringOptions() {
    const swapList = document.getElementById('take-swap-list');
    if (!swapList) {
        return;
    }
    const dataList = swapList.lastElementChild;
    if (!dataList) {
        return;
    }
    function sort(data, cmp) {
        return [...data.keys()].sort(cmp).reduce((r, k) => {
            r.set(k, data.get(k));
            return r;
        }, new Map());
    }
    // TODO add number of available results for every filter option
    // TODO disable unavailable/hidden filter options or event whole filter for single option
    // TODO render filters on the fly
    // TODO add more advance filter dialogs for years (columns, ranges), values (columns, ranges), km (columns, masks)
    const filterProps = new Map();
    const countryHeadings = swapList.querySelectorAll('h2');
    filterProps.set(filters_1.Filter.COUNTRY, {
        placeholder: 'Country',
        width: 250,
        options: sort([...countryHeadings].reduce((r, h) => {
            const hc = h.cloneNode(true);
            for (const el of hc.querySelectorAll('input, sup')) {
                el.remove();
            }
            r.set(hc.id, hc.innerHTML);
            return r;
        }, new Map())),
    });
    filterProps.set(filters_1.Filter.YEAR, {
        placeholder: 'Year',
        width: 90,
        options: sort([...swapList.querySelectorAll('tr[data-sort-year]')].reduce((r, o) => {
            const y = o.dataset.sortYear;
            r.set(y, y);
            return r;
        }, new Map()), (a, b) => cmp(num(b), num(a))),
    });
    filterProps.set(filters_1.Filter.VALUE, {
        placeholder: 'Face value',
        width: 110,
        options: sort([...swapList.querySelectorAll('tr[data-sort-face]')].reduce((r, o) => {
            const f = o.dataset.sortFace;
            const [v] = f.split(' ');
            r.set(v, v);
            return r;
        }, new Map()), (a, b) => cmp(num(a), num(b))),
    });
    const kmMatch = /([a-z]*)([0-9]*)((?:\.[0-9]+)?[a-z]*)/i;
    filterProps.set(filters_1.Filter.KM, {
        placeholder: 'KM#',
        width: 110,
        options: sort([...swapList.querySelectorAll('tr[data-sort-km]')].reduce((r, o) => {
            const { sortKmc: c = '', sortKm: k = '', sortKma: a = '' } = o.dataset;
            const v = `${c.toLowerCase()}${k}${a}`;
            if (v) {
                r.set(v, `${c}# ${k}${a}`);
            }
            return r;
        }, new Map()), (a, b) => {
            const [, ac, ak, aa] = a.match(kmMatch);
            const [, bc, bk, ba] = b.match(kmMatch);
            return cmp(ac, bc) || cmp(num(ak), num(bk)) || cmp(aa, ba);
        }),
    });
    const filterNames = Object.values(filters_1.Filter);
    const filterValues = new Map();
    for (const filter of filterNames) {
        const value = (0, url_1.getHashParam)(filter);
        if (value) {
            filterValues.set(filter, value);
            filterProps.get(filter).value = value;
        }
    }
    dataList.insertAdjacentHTML('beforebegin', (0, filters_1.renderFilters)(filterProps));
    function applyFilters() {
        for (const h of countryHeadings) {
            const t = h.nextElementSibling;
            const rows = t.querySelectorAll('tr');
            let hasVisibleRows = false;
            rowLoop: for (const r of rows) {
                const d = r.dataset;
                for (const [filter, value] of filterValues) {
                    switch (filter) {
                        case filters_1.Filter.COUNTRY:
                            if (h.id !== value) {
                                hasVisibleRows = false;
                                break rowLoop;
                            }
                            break;
                        case filters_1.Filter.YEAR:
                            if (d.sortYear !== value) {
                                r.style.display = 'none';
                                continue rowLoop;
                            }
                            break;
                        case filters_1.Filter.VALUE:
                            if (!d.sortFace.startsWith(`${value} `)) {
                                r.style.display = 'none';
                                continue rowLoop;
                            }
                            break;
                        case filters_1.Filter.KM:
                            const [, c, k, a] = value.match(kmMatch);
                            if (d.sortKmc.toLowerCase() !== c || d.sortKm !== k || d.sortKma !== a) {
                                r.style.display = 'none';
                                continue rowLoop;
                            }
                            break;
                    }
                }
                // no filter applied
                r.style.display = '';
                hasVisibleRows = true;
            }
            h.style.display = t.style.display = hasVisibleRows ? '' : 'none';
        }
    }
    applyFilters();
    document.querySelectorAll('[data-filter-by]').forEach((option) => option.addEventListener('click', (e) => {
        const ds = option.dataset;
        const filter = ds.filterBy;
        const value = ds.filterValue;
        (0, url_1.updateLocationHash)((params) => value
            ? params.set(filter, value)
            : params.delete(filter));
        const display = document.querySelector(`[data-filter="${filter}"]`);
        if (value) {
            display.innerHTML = `${c(option.innerHTML)}${x(filter)}`;
            display.classList.add('filter-box-active');
        }
        else {
            display.innerHTML = `${c(display.dataset.filterPlaceholder)}${d()}`;
            display.classList.remove('filter-box-active');
        }
        value ? filterValues.set(filter, value) : filterValues.delete(filter);
        applyFilters();
    }));
    document.querySelectorAll('[data-filter]').forEach((display) => display.addEventListener('click', (e) => {
        (0, utils_1.cancel)(e);
        const ds = display.dataset;
        if (ds.filterDisabled != null) {
            return;
        }
        let clearClicked = false;
        const button = e.target;
        const filter = ds.filter;
        if (button.matches('[data-filter-clear]')) {
            clearClicked = true;
            (0, url_1.updateLocationHash)((params) => params.delete(button.dataset.filterClear));
            display.innerHTML = `${c(ds.filterPlaceholder)}${d()}`;
            display.classList.remove('filter-box-active');
            filterValues.delete(filter);
            applyFilters();
        }
        document.querySelectorAll(`[data-filter-dialog]`).forEach((dialog) => {
            dialog.style.display =
                !clearClicked &&
                    dialog.dataset.filterDialog === filter &&
                    dialog.style.display !== 'block'
                    ? 'block'
                    : 'none';
        });
    }));
    document.querySelectorAll('[data-filter-dialog]').forEach((dialog) => dialog.addEventListener('click', (e) => {
        (0, utils_1.cancel)(e);
        dialog.style.display = 'none';
    }));
    const filters = swapList.querySelectorAll('.filter');
    for (const filter of filters) {
        filter.addEventListener('input', (e) => {
            const target = e.target;
            const id = target.id;
            const value = target.value;
            const name = `sort${(0, utils_1.tt)(id)}`;
            const rows = swapList.querySelectorAll('tbody > tr');
            for (const row of rows) {
                const d = row.dataset;
                row.style.display = !value || d[name].includes(value) ? '' : 'none';
            }
        });
    }
    const sections = swapList.querySelectorAll('table.swap-coin tbody');
    if (!sections || !sections.length) {
        return;
    }
    // add sorting index to all rows
    // const rows = swapList.querySelectorAll<HTMLTableRowElement>('table.swap-coin tbody tr');
    // for (const row of rows) {
    //     const offset = row.querySelectorAll('td.ico-star').length;
    //     const c = row.querySelectorAll('td');
    //     const d = row.dataset;
    //     for (const [option, {index, field}] of sortOptionParams) {
    //         const name = `sort${tt(field)}`;
    //         const t = c[index + offset].textContent;
    //         if (option === 'Year') {
    //             const [year, ...mm] = t.split(/(?:\s|&nbsp;)+/);
    //             d[name] = year;
    //             d.sortMm = mm.join(' ');
    //         } else if (option === 'Condition') {
    //             d[name] = `${ConditionValues.get(t)}`;
    //         } else if (option === 'Krause number') {
    //             const m = t.match(/(?<cat>\w+)#\s*(?<prefix>[a-zA-Z]*)(?<num>\d+)(?<suffix>(?:\.\d+)?(?:[a-zA-Z]*))/i);
    //             if (m && m.groups) {
    //                 const {cat, num, prefix, suffix} = m.groups;
    //                 d.sortKmc = cat;
    //                 d[name] = num;
    //                 d.sortKma = `${prefix}${suffix}`;
    //             } else {
    //                 d.sortKmc = '';
    //                 d[name] = t;
    //                 d.sortKma = '';
    //             }
    //         } else {
    //             d[name] = t;
    //         }
    //     }
    // }
    // getActiveSortOption();
    // sortBy(sections, currentOption, currentOrder);
    // leftControls.removeAttribute('style');
    // leftControls.insertAdjacentHTML('afterend', `
    //     <div class="right filter-container">
    //         <div class="filter-box" id="sort-filter">
    //             ${c(`${o(currentOption)}${a(currentOrder)}`)}
    //         </div>
    //         <div class="drop hide filter-dialog" id="sort-filter-dialog">
    //         ${sortOptions.map(opt => `
    //             <a class="list-link" data-option="${opt}" data-order="a">${o(opt)}${a()}</a>
    //             <a class="list-link" data-option="${opt}" data-order="d">${o(opt)}${d()}</a>
    //         `).join('')}
    //         </div>
    //     </div>
    // `);
    // const sortFilter = swapList.querySelector<HTMLDivElement>('#sort-filter');
    // const sortDialog = swapList.querySelector<HTMLDivElement>('#sort-filter-dialog');
    //
    // sortFilter.addEventListener('click', e => {
    //     e.stopPropagation();
    //     sortDialog.style.display = 'block';
    // });
    //
    // sortDialog.addEventListener('click', e => {
    //     e.stopPropagation();
    //     sortDialog.style.display = 'none';
    //
    //     const a = (<HTMLElement> e.target).closest('a');
    //     if (!a) {
    //         return;
    //     }
    //
    //     sortFilter.innerHTML = c(a.innerHTML);
    //
    //     const {option, order} = a.dataset;
    //     currentOption = <SortOption> option;
    //     currentOrder = <SortOrder> order;
    //     setActiveSortOption(currentOption, currentOrder);
    //     sortBy(sections, currentOption, currentOrder);
    // });
}
exports.addFilteringOptions = addFilteringOptions;


/***/ }),

/***/ 65:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeRowHrefFromSwapList = exports.ignoreUnwanted = exports.checkSold = exports.addConflictHandling = exports.showAllPrices = exports.duplicatePagination = exports.addOpenedTabsHandler = exports.addTrackingLinks = exports.markSeparateCountries = exports.addThumbnails = exports.addSwapTitle = void 0;
const ajax_1 = __webpack_require__(759);
const cond_1 = __webpack_require__(290);
const delay_1 = __webpack_require__(799);
const url_1 = __webpack_require__(422);
function addSwapTitle() {
    const title = [...document.querySelectorAll('#swap-mgr div.leftCol > div.user-info > .wrap')].map(e => e.textContent).join(' / ');
    if (title) {
        document.title = `${title} - ${document.title}`;
    }
}
exports.addSwapTitle = addSwapTitle;
function addThumbnails() {
    for (const row of document.querySelectorAll('table.swap-coin tr')) {
        const { tooltipImgpath, tooltipSample, tooltipCode } = row.dataset;
        row.querySelector('td')?.insertAdjacentHTML(row.querySelector('div.reserve') ? 'beforebegin' : 'afterend', `
            <th style='width: 100px' class='thumbnails'>
                ${tooltipImgpath && tooltipSample && tooltipCode
            ? `
                    <img src='${tooltipImgpath}/${tooltipSample}-1c/${tooltipCode}.jpg' class='thumbnail' loading='lazy' alt='obverse'/>
                    <img src='${tooltipImgpath}/${tooltipSample}-2c/${tooltipCode}.jpg' class='thumbnail' loading='lazy' alt='reverse'/>
                `
            : ''}
            </th>
        `);
    }
}
exports.addThumbnails = addThumbnails;
const separateCountries = [
    'austria',
    'belgium',
    'denmark',
    'estonia',
    'finland',
    'france',
    'germany',
    'german_democratic_republic',
    'third_reich',
    'german_empire',
    'india',
    'italy',
    'latvia',
    'lithuania',
    'netherlands',
    'norway',
    'poland',
    'portugal',
    'spain',
    'russia',
    'ussr',
    'sweden',
    'switzerland',
    'united_kingdom',
    'usa',
];
function markSeparateCountries() {
    for (const h2 of document.querySelectorAll('#take-swap-list h2')) {
        if (separateCountries.includes(h2.id)) {
            h2.classList.add('separate-country');
        }
    }
}
exports.markSeparateCountries = markSeparateCountries;
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
                next.innerHTML = `<a href='https://www.17track.net/en/track?nums=${text}' target='_blank'>${text}</a>`;
            }
        }
    }
}
exports.addTrackingLinks = addTrackingLinks;
const TAB_PARAM = 't';
const TAB_TAKE = 'take';
const TAB_NEED = 'need';
function setActiveSwapTab(tab) {
    (0, url_1.updateLocationHash)((params) => params.set(TAB_PARAM, tab));
}
function addOpenedTabsHandler() {
    const [needTab, takeTab] = document.querySelectorAll(`#swap-mgr div.widerightCol > ul.region-list > li.region`);
    let currentTab = (0, url_1.getHashParam)(TAB_PARAM) || TAB_TAKE;
    if (needTab) {
        needTab.addEventListener('click', () => setActiveSwapTab(TAB_NEED));
        if (currentTab === TAB_NEED) {
            needTab.click();
        }
    }
    if (takeTab) {
        takeTab.addEventListener('click', () => setActiveSwapTab(TAB_TAKE));
        if (currentTab === TAB_TAKE) {
            takeTab.click();
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
    const swapRows = document.querySelectorAll('table.swap-coin tr');
    for (const tr of swapRows) {
        const td = tr.querySelector('.td-cond + *');
        if (td) {
            const myPriceElement = td.querySelector('span.blue-13');
            const myPrice = +myPriceElement?.textContent;
            const prefix = td.querySelector('span.gray-11:first-child')?.textContent;
            const suffix = td.querySelector('span.gray-11:last-child')?.textContent;
            const tooltipPrice = tr.dataset?.tooltipPrice;
            if (tooltipPrice) {
                const price = +tooltipPrice.replace(prefix, '').replace(suffix, '');
                if (!isNaN(price) && myPrice !== price) {
                    const rel = myPrice / price;
                    let percent;
                    if (rel >= 2) {
                        percent = `<span class='gray-11' style='color:darkred;font-weight:bold'>&times;${rel
                            .toFixed(rel >= 10 ? 0 : 1)
                            .replace('.0', '')}</span>`;
                        myPriceElement.style.color = 'darkred';
                        myPriceElement.style.fontWeight = 'bold';
                    }
                    else {
                        const prel = (rel - 1) * 100;
                        if (prel >= 50) {
                            percent = `<span class='gray-11' style='color:darkred;font-weight:bold'>+${prel.toFixed()}%</span>`;
                        }
                        else if (prel >= 0) {
                            percent = `<span class='gray-11' style='color:brown'>+${prel.toFixed()}%</span>`;
                        }
                        else {
                            percent = `<span class='gray-11' style='color:green'>&minus;${Math.abs(prel).toFixed()}%</span>`;
                        }
                    }
                    td.insertAdjacentHTML('beforeend', ` ${percent}<br/><span class='gray-11'>${prefix}${price.toFixed(2)}${suffix}</span>`);
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
            return false;
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
                rows = rows.filter((r) => !!r.querySelector('input.swap-checkbox:checked'));
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
        checkbox.addEventListener('click', (e) => {
            const target = e.target;
            if (!target.checked) {
                const row = target.closest('tr');
                if (row) {
                    row.classList.remove('conflict');
                }
            }
            highlightConflicts();
        });
    }
    const countryCheckboxes = document.querySelectorAll('#swap-list h2 input.swap-country-checkbox');
    for (const checkbox of countryCheckboxes) {
        checkbox.addEventListener('click', (e) => {
            const target = e.target;
            if (!target.checked) {
                const country = target.closest('h2');
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
    actionBoard.insertAdjacentHTML('beforeend', `<a class='btn-s btn-gray ico-del' id='${delAllButtonId}' style='float: right;'><div class='ico-16'></div></a>`);
    const button = document.getElementById(delAllButtonId);
    if (!button) {
        return;
    }
    button.addEventListener('click', async () => {
        // eslint-disable-next-line no-alert
        if (!confirm('Are you sure you want to delete these coins?')) {
            return false;
        }
        let isFirstRequest = true;
        for await (const sold of soldList) {
            if (!isFirstRequest) {
                await (0, delay_1.randomDelay)();
            }
            isFirstRequest = false;
            const { href } = sold.querySelector('a.act');
            await (0, ajax_1.get)(href);
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
                const myCond = (markedClass && cond_1.ColorValues.get(+markedClass.split('marked-').pop())) || 0;
                const condElement = tr.querySelector('td.td-cond');
                const cond = (condElement && cond_1.ConditionValues.get(condElement.textContent)) || 0;
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

/***/ 560:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UID = void 0;
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

/***/ 422:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAllHashParams = exports.getHashParam = exports.hasHashParam = exports.setHashParam = exports.deleteHashParam = exports.updateHashHref = exports.updateLocationHash = exports.hashSearchParams = exports.setHash = exports.loc = void 0;
const { location } = document;
function loc() {
    return new URL(location.href);
}
exports.loc = loc;
function setHash(hash) {
    const newHash = hash.toString();
    if (location.hash || newHash) {
        location.hash = `#${newHash}`;
    }
}
exports.setHash = setHash;
function hashSearchParams(url = loc()) {
    return new URLSearchParams(url.hash.substr(1));
}
exports.hashSearchParams = hashSearchParams;
function getUpdatedHash(hash, url = loc()) {
    if (typeof hash !== 'function') {
        return hash.toString();
    }
    const params = hashSearchParams(url);
    const result = hash(params);
    return (result != null ? result : params).toString();
}
function updateLocationHash(hash, url = loc()) {
    const newHash = getUpdatedHash(hash, url);
    if (location.hash || newHash) {
        location.hash = `#${newHash}`;
    }
}
exports.updateLocationHash = updateLocationHash;
function updateHashHref(hash, url = loc()) {
    const newHash = getUpdatedHash(hash, url);
    if (url.hash || newHash) {
        url.hash = `#${newHash}`;
    }
    return url.href;
}
exports.updateHashHref = updateHashHref;
function deleteHashParam(name) {
    return updateHashHref((params) => {
        params.delete(name);
        return params;
    });
}
exports.deleteHashParam = deleteHashParam;
function setHashParam(name, value) {
    return updateHashHref((params) => {
        params.set(name, value);
        return params;
    });
}
exports.setHashParam = setHashParam;
function hasHashParam(name) {
    return hashSearchParams().has(name);
}
exports.hasHashParam = hasHashParam;
function getHashParam(name) {
    return hashSearchParams().get(name);
}
exports.getHashParam = getHashParam;
function getAllHashParams(name) {
    return hashSearchParams().getAll(name);
}
exports.getAllHashParams = getAllHashParams;


/***/ }),

/***/ 131:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.todayMonth = exports.handleLinkSubmit = exports.handleFormSubmit = exports.updateParts = exports.updateOptionalElement = exports.updateRequiredElement = exports.reload = exports.cancel = exports.disable = exports.enable = exports.toggle = exports.hide = exports.show = exports.tt = exports.sp = void 0;
function sp(str) {
    return `${str || ''}`
        .replace(/\u{00A0}+/gu, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
exports.sp = sp;
function tt(str) {
    str = `${str || ''}`;
    return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
}
exports.tt = tt;
function show(...elements) {
    elements.forEach((element) => element && element.classList.remove('hide'));
}
exports.show = show;
function hide(...elements) {
    elements.forEach((element) => element && element.classList.add('hide'));
}
exports.hide = hide;
function toggle(visible, ...elements) {
    elements.forEach((element) => element && element.classList.toggle('hide', !visible));
}
exports.toggle = toggle;
function enable(...elements) {
    elements.forEach((element) => element && element.classList.remove('disable'));
}
exports.enable = enable;
function disable(...elements) {
    elements.forEach((element) => element && element.classList.add('disable'));
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
        element.querySelectorAll('[data-href]').forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const a = document.createElement('a');
                a.href = el.dataset.href;
                a.dispatchEvent(new MouseEvent(e.type, e));
            });
        });
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
    required = required.map((element) => updateRequiredElement(fragment, element));
    if (optional) {
        optional = optional.map((element) => updateOptionalElement(fragment, element));
    }
    return await callback();
}
exports.updateParts = updateParts;
async function handleFormSubmit(form, callback) {
    form.addEventListener('submit', ((onsubmit) => async (e) => {
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
    link.addEventListener('click', ((onclick) => async (e) => {
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

/***/ 377:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCurrentVarietyId = void 0;
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

/***/ 897:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WishForm = void 0;
const cond_1 = __webpack_require__(290);
const list_form_1 = __webpack_require__(136);
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
    fillForm(uid = '', cond = '', price = '', _tid, vid = '') {
        super.fillForm(uid, cond, price, vid);
        if (this.form.is_type) {
            this.form.is_type.checked = true;
        }
    }
    async updateForm() {
        super.updateForm();
        this.updateVarieties();
    }
    updateVarieties() {
        const varieties = this.form[this.formVariety];
        if (varieties) {
            const firstVariety = varieties[0].parentElement;
            const anyVariety = firstVariety.cloneNode();
            const anyVarietyInput = firstVariety.querySelector('input').cloneNode();
            anyVarietyInput.value = '';
            anyVariety.insertAdjacentElement('beforeend', anyVarietyInput);
            anyVariety.insertAdjacentText('beforeend', 'Any');
            firstVariety.insertAdjacentElement('beforebegin', anyVariety);
        }
    }
    // eslint-disable-next-line class-methods-use-this
    getConditionOption(o) {
        const { value, textContent } = o;
        if (value || textContent.includes('ANY')) {
            return {
                text: textContent,
                value,
                checked: value === '3' ? 'checked' : '',
                style: o.getAttribute('style') || '',
            };
        }
    }
}
exports.WishForm = WishForm;


/***/ }),

/***/ 196:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// ==UserScript==
// @name         collector :: ucoin.net
// @namespace    https://ucoin.net/
// @version      1.8.1
// @author       danikas2k2
// @icon         data:@file/png;base64,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
// @downloadURL  https://raw.githubusercontent.com/danikas2k2/tampermonkey-ucoin/master/dist/ucoin.user.js
// @updateURL    https://raw.githubusercontent.com/danikas2k2/tampermonkey-ucoin/master/dist/ucoin.user.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js
// @match        https://*.ucoin.net/*
// @run-at       document-end
// ==/UserScript==
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ucoin_less_1 = __importDefault(__webpack_require__(702));
const coin_form_1 = __webpack_require__(659);
const gallery_1 = __webpack_require__(691);
const links_1 = __webpack_require__(379);
const prices_1 = __webpack_require__(48);
const swap_form_1 = __webpack_require__(385);
const swap_list_1 = __webpack_require__(65);
const swap_list_sort_1 = __webpack_require__(188);
const uid_1 = __webpack_require__(560);
const utils_1 = __webpack_require__(131);
const wish_form_1 = __webpack_require__(897);
document.head.insertAdjacentHTML('beforeend', `<style>${ucoin_less_1.default}</style>`);
async function handleHomePage() {
    const profile = document.getElementById('profile');
    if (profile) {
        const curPriceElement = profile.querySelector('div.worth-cur-value span');
        if (curPriceElement) {
            const colPrice = +curPriceElement.textContent.replace(/[^\d.]/g, '');
            const swapPriceElement = profile.querySelector(`a[href="/swap-list/?uid=${uid_1.UID}"] span.right`);
            if (swapPriceElement) {
                const swapPrice = +swapPriceElement.textContent.replace(/[^\d.]/g, '');
                const price = colPrice + swapPrice;
                curPriceElement.classList.add('price');
                curPriceElement.insertAdjacentHTML('beforeend', `<br/><small class='total'><abbr class='cur'>€</abbr> ${new Intl.NumberFormat('en').format(price)}</small>`);
            }
        }
    }
}
async function handleProfile() {
    const converter = new showdown.Converter();
    const profile = document.getElementById('profile');
    if (profile) {
        const paragraphs = profile.querySelectorAll('p.dgray-13');
        for (const p of paragraphs) {
            p.innerHTML = converter.makeHtml(p.innerHTML
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/([\w.-]+@[\w.-]+)/gi, '<$1>')
                .replace(/&gt;/gi, '>'));
        }
    }
}
async function handleCoinPage() {
    const tags = document.getElementById('tags');
    if (tags) {
        // fixTagLinks
        const galleryLinks = tags.querySelectorAll('a[href^="/gallery/"]');
        for (const a of galleryLinks) {
            (0, links_1.updateLinkHref)(a);
        }
    }
    await new coin_form_1.CoinForm().handle();
    await new swap_form_1.SwapForm().handle();
    await (0, prices_1.estimateSwapPrices)();
    await (0, prices_1.estimateWeightPrice)();
    await new wish_form_1.WishForm().handle();
}
async function handleGalleryPage() {
    const gallery = document.getElementById('gallery');
    if (gallery) {
        // fix gallery links
        const galleryLinks = gallery.querySelectorAll('a[href^="/gallery/"]');
        for (const a of galleryLinks) {
            (0, links_1.updateLinkHref)(a);
        }
        const queryLinks = gallery.querySelectorAll('a[href^="?"]');
        for (const a of queryLinks) {
            (0, links_1.updateLinkHref)(a);
        }
        const closeButtons = gallery.querySelectorAll('div.close');
        for (const div of closeButtons) {
            (0, links_1.updateOnClickHref)(div);
        }
        const count = gallery.querySelectorAll('.coin').length;
        const pages = +gallery.querySelector('.pages a:last-child')?.textContent;
        const current = +gallery.querySelector('.pages a.current')?.textContent;
        if (count) {
            const isLast = current === pages;
            const total = isLast ? (pages - 1) * 12 + count : (pages - 1) * 12;
            gallery
                .querySelector('h1')
                .insertAdjacentHTML('beforeend', ` <small>(${count}${pages ? ` <small>of ${isLast ? total : `${total + 1}~${total + 12}`}</small>` : ''})</small>`);
        }
    }
    (0, gallery_1.addGalleryVisibilityToggle)();
}
async function handleTablePage() {
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        const sortFilterDialog = document.getElementById('sort-filter-dialog');
        const url = new URL(location.href);
        const sp = url.searchParams;
        sp.set('order', 'ka');
        sortFilterDialog.insertAdjacentHTML('beforeend', `<a class='list-link' href='${url.href}'><div class='left gray-13'>Krause</div><div class='right'><span class='arrow at'></span></div></a>`);
        sp.set('order', 'kd');
        sortFilterDialog.insertAdjacentHTML('beforeend', `<a class='list-link' href='${url.href}'><div class='left gray-13'>Krause</div><div class='right'><span class='arrow ab'></span></div></a>`);
        for (const a of sortFilterDialog.querySelectorAll('a.list-link')) {
            a.addEventListener('click', utils_1.cancel);
        }
    }
}
async function handleMessagePage() {
    const userList = document.getElementById('user-list');
    for (const user of userList?.querySelectorAll('table.user tr[onclick]')) {
        const a = user.querySelector('td.user-container a');
        const m = user.attributes.getNamedItem('onclick')?.value.match(/href\s*=\s*'(.*?)'/);
        if (m) {
            a.href = m[1];
            a.onclick = (e) => e.stopPropagation();
        }
    }
}
async function handleSwapPage() {
    (0, swap_list_1.addSwapTitle)();
    (0, swap_list_1.addTrackingLinks)();
    (0, swap_list_1.addThumbnails)();
    (0, swap_list_1.markSeparateCountries)();
    (0, swap_list_1.addOpenedTabsHandler)();
    (0, swap_list_sort_1.addSortingOptions)();
    (0, swap_list_sort_1.addFilteringOptions)();
    (0, swap_list_1.duplicatePagination)();
    (0, swap_list_1.showAllPrices)();
    (0, swap_list_1.addConflictHandling)();
    (0, swap_list_1.checkSold)();
    (0, swap_list_1.ignoreUnwanted)();
    (0, swap_list_1.removeRowHrefFromSwapList)();
    const tree = document.getElementById('tree');
    if (tree) {
        const filterLinks = tree.querySelectorAll('.filter-container .list-link');
        for (const a of filterLinks) {
            (0, links_1.updateLinkHref)(a);
        }
        const filterBoxes = tree.querySelectorAll('.filter-container .filter-box-active');
        for (const filter of filterBoxes) {
            const name = filter.getAttribute('id').replace(/-filter/, '');
            const div = filter.querySelector('.close');
            if (div) {
                (0, links_1.updateOnClickHref)(div, [name]);
            }
        }
    }
}
(async function () {
    const loc = document.location.href;
    if (loc.includes(`/uid`)) {
        if (loc.includes(`/uid${uid_1.UID}`)) {
            await handleHomePage();
        }
        await handleProfile();
    }
    if (loc.includes('/coin')) {
        await handleCoinPage();
    }
    if (loc.includes('/gallery') && loc.includes(`uid=${uid_1.UID}`)) {
        await handleGalleryPage();
    }
    if (loc.includes('/swap-')) {
        await handleSwapPage();
    }
    if (loc.includes('/table/')) {
        await handleTablePage();
    }
    if (loc.includes('/messages/')) {
        await handleMessagePage();
    }
    const tree = document.getElementById('tree');
    if (tree) {
        const treeSearchId = 'tree-search';
        const treeSearch = document.getElementById(treeSearchId);
        if (treeSearch) {
            treeSearch.closest('div').remove();
        }
        const searchInputId = 'search-input-id';
        tree.insertAdjacentHTML('afterbegin', `<input id='${searchInputId}' class='tree-filter' placeholder='Search'/>`);
        const searchInput = document.getElementById(searchInputId);
        searchInput.addEventListener('input', () => {
            // const pattern = new RegExp([...searchInput.value].join('.*?'), 'i');
            const pattern = new RegExp(searchInput.value.replace(/\W+/g, '.*?'), 'i');
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
            const visibleCountries = tree.querySelectorAll('div.country:not(.hide)');
            if (visibleCountries.length === 1) {
                const country = visibleCountries[0];
                const periodsBlock = country.querySelector('.periods');
                if (periodsBlock) {
                    periodsBlock.style.display = 'block';
                }
                const plusMinus = country.querySelector('img');
                plusMinus.src = '/i/bg/minus.gif';
            }
            for (const reg of tree.querySelectorAll('div.reg')) {
                const { length } = reg.querySelectorAll('div.country:not(.hide)');
                reg.classList.toggle('hide', !length);
                const region = reg.querySelector('.region');
                const countries = reg.querySelector('.countries');
                const visibleRegion = (length > 0 && length <= 5) || region.matches('.open');
                countries.classList.toggle('hide', !visibleRegion);
            }
        });
    }
})();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(196);
/******/ 	
/******/ })()
;