// [AIV_SHORT]  Build version: 1.0.2 - Friday, December 14th, 2018, 1:41:51 PM  
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
/* 0 */,
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
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ==UserScript==
// @name         collector :: colnect.com
// @namespace    https://colnect.com/
// @version      1.0.2
// @date         Friday, December 14th, 2018, 1:41:51 PM
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6UlEQVQ4jdWSTUhUcRTFf/c/b8ZyMUW5qhZF1MaNZF8qge2siGxR29o48wZ1EW1bqGCt2hTWvCGKaNenEFgEIwXiWKK7FhEtMoQKtbSEGN/8T4sUxI82rbqrC+eewzmHC//92NJSn4lqkk7dDk56eD6SDzMAxzqvVX2Lqy46dE5il8Fnj574RKXnTV/HdADQlM3v96anQFow64w0QO2Z+6nvCzMvQJtkPAK9kiw27EKiEpSOdN5uChoz0W5vKoJNWmLh8HBf+0RzV3cCIL11OgO23bBbeI2Wolzxj18NNoaF/jguX3FyugykMcsN93V8BNPLrq54MWGrsHsmzZWisLgsubzZdROnHNACaMfU5qE1Oqp28BPTw1VIRT8E1cFikTZRM1UHjAEcbCvstSDegGdIpuOlfO7qqvadb0U2ZA1h/jFwGmPexLDENoxamZ1PBsmBeKE8DtZf9lwaK2Rn6zNRMmkKzeiVt2ZnKAQ9Q2wUqsPxzokTIzezdxX/ihED4PelnL40hPkPKacZM9pwrmWkkB23ldaW/UV1KqFBRF3sKnsC77xgp2RfX0fh+6W7YG26LOWiO4hDGD2jN9o/LQKTKy/dWvTGMH8U44BhY3NTW3rXc7mugHBNJhUrsWt9++Bs+W8C/zy/AT3Myy3qczVrAAAAAElFTkSuQmCC
// @downloadURL  https://bitbucket.org/danikas2k2/collection.userscripts/raw/HEAD/dist/colnect.js
// @updateURL    https://bitbucket.org/danikas2k2/collection.userscripts/raw/HEAD/dist/colnect.js
// @match        https://*.colnect.com/*/coins/*
// @match        https://*.colnect.com/*/banknotes/*
// @match        https://*.colnect.com/*/stamps/*
// @match        https://*.colnect.com/*/medals/*
// @match        https://*.colnect.com/*/tokens/*
// @run-at       document-end
// ==/UserScript==
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colnect_less_1 = __importDefault(__webpack_require__(4));
document.head.insertAdjacentHTML("beforeend", `<style type="text/css">${colnect_less_1.default}</style>`);
const loc = document.location.href;
const type = (loc => {
    if (loc.includes('/coins/')) {
        return 'coins';
    }
    if (loc.includes('/banknotes/')) {
        return 'banknotes';
    }
    if (loc.includes('/stamps/')) {
        return 'stamps';
    }
    if (loc.includes('/medals/')) {
        return 'medals';
    }
    if (loc.includes('/tokens/')) {
        return 'tokens';
    }
    return 'other';
})(loc);
document.body.classList.add(type);
const itemFullDetails = document.getElementById('item_full_details');
const itemCondition = itemFullDetails.querySelector('>.ibox >.ibox_list[data-lt="2"] .pop.condition');
const _updateQC = Inventory.updateQC;
const _spanCBup = Inventory.spanCBup;
if (type === 'coins' && loc.includes('/coin/')) {
    const itemYearVariants = itemFullDetails.querySelectorAll('>.year_variants >ul >li[data-id]');
    // clicking on year row
    itemYearVariants.forEach(itemYearVariant => {
        itemYearVariant.addEventListener("click", e => {
            const li = e.currentTarget;
            li.querySelector('.ibox_list[data-lt="2"] >.pop.condition')
                .dispatchEvent(new MouseEvent('mouseover'));
        });
    });
    const _q = { P: 1, FA: 2, G: 3, VG: 4, FI: 5, VF: 6, XF: 7, UNC: 8, BU: 9, FDC: 10 };
    function q(s) {
        return (s && s in _q) ? _q[s] : 0;
    }
    //
    function updateOverallCondition(e, current, container) {
        const variants = [];
        itemYearVariants.forEach((n) => {
            variants.push(n.classList.contains('open')
                ? current
                : q(n.querySelector('ul.oth_inv').textContent.split(':', 2).pop().trim()));
        });
        const best = Math.max(...variants);
        if (best && best !== q(itemCondition.textContent)) {
            itemCondition.dispatchEvent(new MouseEvent('mouseover'));
            _updateQC(e, itemCondition.querySelector(`#quality_list a[data-value="${best}"]`));
            if (container) {
                container.dispatchEvent(new MouseEvent('mouseover'));
            }
            else {
                itemCondition.dispatchEvent(new MouseEvent('mouseout'));
            }
        }
    }
    Inventory.updateQC = (e, n) => {
        const _r = _updateQC(e, n);
        updateOverallCondition(e, +n.dataset.value, n.querySelector('.pop.condition'));
        return _r;
    };
    Inventory.spanCBup = (n) => {
        const _r = _spanCBup(n);
        if (n.classList.contains('cb_checked')) {
            updateOverallCondition(event, 0, null);
        }
        else {
            itemCondition.dispatchEvent(new MouseEvent('mouseover'));
        }
        return _r;
    };
}
else {
    Inventory.spanCBup = (n) => {
        const _r = _spanCBup(n);
        if (!n.classList.contains('cb_checked')) {
            itemCondition.dispatchEvent(new MouseEvent('mouseover'));
        }
        return _r;
    };
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, "#quality_list {\n  display: flex;\n  visibility: visible;\n  opacity: 1;\n  width: auto;\n  padding: 0 1px;\n}\n#quality_list li {\n  width: 32px;\n  flex: 0 0 32px;\n  overflow: hidden;\n}\n#quality_list li + li {\n  margin-left: 1px;\n}\n#quality_list li:first-child a::before {\n  content: \"- \";\n}\n#quality_list li a {\n  margin: 0;\n  padding: 0 8px;\n  width: 16px;\n  height: 32px;\n  white-space: normal;\n  text-align: center;\n  line-height: 32px;\n  /* reserved */\n  /* reserved */\n  /* - */\n}\n#quality_list li a.pop_selected,\n#quality_list li a:hover {\n  font-size: 14px;\n  padding: 0 6px;\n  width: 20px;\n  border-top: 1px solid #fff;\n  border-bottom: 1px solid #fff;\n}\n#quality_list li a[data-value=\"-1\"] {\n  background: #5A6986;\n  color: #dee5f2;\n}\n#quality_list li a[data-value=\"-2\"] {\n  background: #854F61;\n  color: #FDE9F4;\n}\n#quality_list li a[data-value=\"0\"] {\n  background: #EEEEEE;\n  color: #242633;\n}\n/* coins, tokens */\n.coins #quality_list li,\n.tokens #quality_list li {\n  /* FDC */\n}\n.coins #quality_list li a,\n.tokens #quality_list li a {\n  /* P */\n  /* FA */\n  /* G */\n  /* VG */\n  /* FI */\n  /* VF */\n  /* XF */\n  /* UNC */\n  /* BU */\n  /* FDC */\n}\n.coins #quality_list li a[data-value=\"1\"],\n.tokens #quality_list li a[data-value=\"1\"] {\n  background: #CC0000;\n  color: #FFE3E3;\n}\n.coins #quality_list li a[data-value=\"2\"],\n.tokens #quality_list li a[data-value=\"2\"] {\n  background: #EC7000;\n  color: #FFF0E1;\n}\n.coins #quality_list li a[data-value=\"3\"],\n.tokens #quality_list li a[data-value=\"3\"] {\n  background: #B36D00;\n  color: #FADCB3;\n}\n.coins #quality_list li a[data-value=\"4\"],\n.tokens #quality_list li a[data-value=\"4\"] {\n  background: #AB8B00;\n  color: #F3E7B3;\n}\n.coins #quality_list li a[data-value=\"5\"],\n.tokens #quality_list li a[data-value=\"5\"] {\n  background: #636330;\n  color: #FFFFD4;\n}\n.coins #quality_list li a[data-value=\"6\"],\n.tokens #quality_list li a[data-value=\"6\"] {\n  background: #64992C;\n  color: #F9FFEF;\n}\n.coins #quality_list li a[data-value=\"7\"],\n.tokens #quality_list li a[data-value=\"7\"] {\n  background: #006633;\n  color: #F1F5EC;\n}\n.coins #quality_list li a[data-value=\"8\"],\n.tokens #quality_list li a[data-value=\"8\"] {\n  background: #206CFF;\n  color: #E0ECFF;\n}\n.coins #quality_list li a[data-value=\"9\"],\n.tokens #quality_list li a[data-value=\"9\"] {\n  background: #0000CC;\n  color: #DFE2FF;\n}\n.coins #quality_list li a[data-value=\"10\"],\n.tokens #quality_list li a[data-value=\"10\"] {\n  background: #5229A3;\n  color: #E0D5F9;\n}\n.coins #quality_list li:nth-last-child(1) a,\n.tokens #quality_list li:nth-last-child(1) a,\n.coins #quality_list li:nth-last-child(3) a,\n.tokens #quality_list li:nth-last-child(3) a,\n.coins #quality_list li:nth-last-child(1) a.pop_selected,\n.tokens #quality_list li:nth-last-child(1) a.pop_selected,\n.coins #quality_list li:nth-last-child(3) a.pop_selected,\n.tokens #quality_list li:nth-last-child(3) a.pop_selected,\n.coins #quality_list li:nth-last-child(1) a:hover,\n.tokens #quality_list li:nth-last-child(1) a:hover,\n.coins #quality_list li:nth-last-child(3) a:hover,\n.tokens #quality_list li:nth-last-child(3) a:hover {\n  padding: 0;\n  width: 32px;\n}\n/* medals */\n.medals #quality_list li a {\n  /* P */\n  /* G */\n  /* VG */\n  /* E */\n  /* M */\n}\n.medals #quality_list li a[data-value=\"1\"] {\n  background: #CC0000;\n  color: #FFE3E3;\n}\n.medals #quality_list li a[data-value=\"2\"] {\n  background: #AB8B00;\n  color: #F3E7B3;\n}\n.medals #quality_list li a[data-value=\"3\"] {\n  background: #64992C;\n  color: #F9FFEF;\n}\n.medals #quality_list li a[data-value=\"4\"] {\n  background: #006633;\n  color: #F1F5EC;\n}\n.medals #quality_list li a[data-value=\"5\"] {\n  background: #0000CC;\n  color: #DFE2FF;\n}\n/* banknotes */\n.banknotes #quality_list li {\n  /* UNC */\n  /* AUNC */\n}\n.banknotes #quality_list li a {\n  /* P */\n  /* FA */\n  /* G */\n  /* VG */\n  /* FI */\n  /* VF */\n  /* XF */\n  /* AUNC */\n  /* UNC */\n}\n.banknotes #quality_list li a[data-value=\"1\"] {\n  background: #CC0000;\n  color: #FFE3E3;\n}\n.banknotes #quality_list li a[data-value=\"2\"] {\n  background: #EC7000;\n  color: #FFF0E1;\n}\n.banknotes #quality_list li a[data-value=\"3\"] {\n  background: #B36D00;\n  color: #FADCB3;\n}\n.banknotes #quality_list li a[data-value=\"4\"] {\n  background: #AB8B00;\n  color: #F3E7B3;\n}\n.banknotes #quality_list li a[data-value=\"5\"] {\n  background: #636330;\n  color: #FFFFD4;\n}\n.banknotes #quality_list li a[data-value=\"6\"] {\n  background: #64992C;\n  color: #F9FFEF;\n}\n.banknotes #quality_list li a[data-value=\"7\"] {\n  background: #006633;\n  color: #F1F5EC;\n}\n.banknotes #quality_list li a[data-value=\"8\"] {\n  background: #206CFF;\n  color: #E0ECFF;\n}\n.banknotes #quality_list li a[data-value=\"9\"] {\n  background: #0000CC;\n  color: #DFE2FF;\n}\n.banknotes #quality_list li:nth-last-child(1) a,\n.banknotes #quality_list li:nth-last-child(1) a.pop_selected,\n.banknotes #quality_list li:nth-last-child(1) a:hover {\n  padding: 0;\n  width: 32px;\n}\n.banknotes #quality_list li:nth-last-child(2) a::before {\n  content: \"AU \";\n}\n/* stamps */\n.stamps #quality_list li {\n  /* MNH */\n  /* MH */\n}\n.stamps #quality_list li a {\n  /* MNH */\n  /* MH */\n  /* U */\n  /* CTO */\n}\n.stamps #quality_list li a[data-value=\"1\"] {\n  background: #006633;\n  color: #F1F5EC;\n}\n.stamps #quality_list li a[data-value=\"2\"] {\n  background: #64992C;\n  color: #F9FFEF;\n}\n.stamps #quality_list li a[data-value=\"3\"] {\n  background: #636330;\n  color: #FFFFD4;\n}\n.stamps #quality_list li a[data-value=\"4\"] {\n  background: #AB8B00;\n  color: #F3E7B3;\n}\n.stamps #quality_list li:nth-last-child(2) a,\n.stamps #quality_list li:nth-last-child(5) a,\n.stamps #quality_list li:nth-last-child(2) a.pop_selected,\n.stamps #quality_list li:nth-last-child(5) a.pop_selected,\n.stamps #quality_list li:nth-last-child(2) a:hover,\n.stamps #quality_list li:nth-last-child(5) a:hover {\n  padding: 0;\n  width: 32px;\n}\n.stamps #quality_list li:nth-last-child(3) a {\n  padding: 0 2px;\n  width: 28px;\n}\n.stamps #quality_list li:nth-last-child(3) a.pop_selected,\n.stamps #quality_list li:nth-last-child(3) a:hover {\n  padding: 0;\n  width: 32px;\n}\n", ""]);



/***/ })
/******/ ]); 