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
/******/ ({

/***/ 3:
/***/ (function(module, exports) {

// ==UserScript==
// @name         Colnect: Coin
// @namespace    https://colnect.com/
// @version      0.3
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6UlEQVQ4jdWSTUhUcRTFf/c/b8ZyMUW5qhZF1MaNZF8qge2siGxR29o48wZ1EW1bqGCt2hTWvCGKaNenEFgEIwXiWKK7FhEtMoQKtbSEGN/8T4sUxI82rbqrC+eewzmHC//92NJSn4lqkk7dDk56eD6SDzMAxzqvVX2Lqy46dE5il8Fnj574RKXnTV/HdADQlM3v96anQFow64w0QO2Z+6nvCzMvQJtkPAK9kiw27EKiEpSOdN5uChoz0W5vKoJNWmLh8HBf+0RzV3cCIL11OgO23bBbeI2Wolzxj18NNoaF/jguX3FyugykMcsN93V8BNPLrq54MWGrsHsmzZWisLgsubzZdROnHNACaMfU5qE1Oqp28BPTw1VIRT8E1cFikTZRM1UHjAEcbCvstSDegGdIpuOlfO7qqvadb0U2ZA1h/jFwGmPexLDENoxamZ1PBsmBeKE8DtZf9lwaK2Rn6zNRMmkKzeiVt2ZnKAQ9Q2wUqsPxzokTIzezdxX/ihED4PelnL40hPkPKacZM9pwrmWkkB23ldaW/UV1KqFBRF3sKnsC77xgp2RfX0fh+6W7YG26LOWiO4hDGD2jN9o/LQKTKy/dWvTGMH8U44BhY3NTW3rXc7mugHBNJhUrsWt9++Bs+W8C/zy/AT3Myy3qczVrAAAAAElFTkSuQmCC
// @match        https://*.colnect.com/*/coins/*
// @match        https://*.colnect.com/*/banknotes/*
// @match        https://*.colnect.com/*/stamps/*
// @match        https://*.colnect.com/*/medals/*
// @match        https://*.colnect.com/*/tokens/*
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
(function (W, D, I) {
    var loc = D.location.href;
    var type = (function (loc) {
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
    D.body.classList.add(type);
    D.head.insertAdjacentHTML("beforeend", "\n        <style type=\"text/css\">\n            #quality_list {\n                display: flex;\n                visibility: visible;\n                opacity: 1;\n                width: auto;\n                padding: 0 1px;\n            }\n\n            #quality_list li {\n                width: 32px;\n                flex: 0 0 32px;\n                overflow: hidden;\n            }\n\n            #quality_list li + li {\n                margin-left: 1px;\n            }\n\n            #quality_list li a {\n                margin: 0;\n                padding: 0 8px;\n                width: 16px;\n                height: 32px;\n                white-space: normal;\n                text-align: center;\n                line-height: 32px;\n            }\n\n            #quality_list li a.pop_selected,\n            #quality_list li a:hover {\n                font-size: 14px;\n                padding: 0 6px;\n                width: 20px;\n                border-top: 1px solid #fff;\n                border-bottom: 1px solid #fff;\n            }\n\n            #quality_list li:first-child a::before {\n                content: \"- \";\n            }\n\n            #quality_list li a[data-value=\"-1\"] { background:#5A6986;color:#dee5f2; } /* reserved */\n            #quality_list li a[data-value=\"-2\"] { background:#854F61;color:#FDE9F4; } /* reserved */\n\n            #quality_list li a[data-value=\"0\"]  { background:#EEEEEE;color:#242633; } /* - */\n\n            /* coins */\n            .coins #quality_list li a[data-value=\"1\"]  { background:#CC0000;color:#FFE3E3; } /* P */\n            .coins #quality_list li a[data-value=\"2\"]  { background:#EC7000;color:#FFF0E1; } /* FA */\n            .coins #quality_list li a[data-value=\"3\"]  { background:#B36D00;color:#FADCB3; } /* G */\n            .coins #quality_list li a[data-value=\"4\"]  { background:#AB8B00;color:#F3E7B3; } /* VG */\n            .coins #quality_list li a[data-value=\"5\"]  { background:#636330;color:#FFFFD4; } /* FI */\n            .coins #quality_list li a[data-value=\"6\"]  { background:#64992C;color:#F9FFEF; } /* VF */\n            .coins #quality_list li a[data-value=\"7\"]  { background:#006633;color:#F1F5EC; } /* XF */\n            .coins #quality_list li a[data-value=\"8\"]  { background:#206CFF;color:#E0ECFF; } /* UNC */\n            .coins #quality_list li a[data-value=\"9\"]  { background:#0000CC;color:#DFE2FF; } /* BU */\n            .coins #quality_list li a[data-value=\"10\"] { background:#5229A3;color:#E0D5F9; } /* FDC */\n\n            .coins #quality_list li:nth-last-child(1) a              /* FDC */,\n            .coins #quality_list li:nth-last-child(1) a.pop_selected /* FDC */,\n            .coins #quality_list li:nth-last-child(1) a:hover        /* FDC */,\n            .coins #quality_list li:nth-last-child(3) a              /* UNC */,\n            .coins #quality_list li:nth-last-child(3) a.pop_selected /* UNC */,\n            .coins #quality_list li:nth-last-child(3) a:hover        /* UNC */ {\n                padding: 0;\n                width: 32px;\n            }\n\n            /* tokens */\n            .tokens #quality_list li a[data-value=\"1\"]  { background:#CC0000;color:#FFE3E3; } /* P */\n            .tokens #quality_list li a[data-value=\"2\"]  { background:#EC7000;color:#FFF0E1; } /* FA */\n            .tokens #quality_list li a[data-value=\"3\"]  { background:#B36D00;color:#FADCB3; } /* G */\n            .tokens #quality_list li a[data-value=\"4\"]  { background:#AB8B00;color:#F3E7B3; } /* VG */\n            .tokens #quality_list li a[data-value=\"5\"]  { background:#636330;color:#FFFFD4; } /* FI */\n            .tokens #quality_list li a[data-value=\"6\"]  { background:#64992C;color:#F9FFEF; } /* VF */\n            .tokens #quality_list li a[data-value=\"7\"]  { background:#006633;color:#F1F5EC; } /* XF */\n            .tokens #quality_list li a[data-value=\"8\"]  { background:#206CFF;color:#E0ECFF; } /* UNC */\n            .tokens #quality_list li a[data-value=\"9\"]  { background:#0000CC;color:#DFE2FF; } /* BU */\n            .tokens #quality_list li a[data-value=\"10\"] { background:#5229A3;color:#E0D5F9; } /* FDC */\n\n            .tokens #quality_list li:nth-last-child(1) a              /* FDC */,\n            .tokens #quality_list li:nth-last-child(1) a.pop_selected /* FDC */,\n            .tokens #quality_list li:nth-last-child(1) a:hover        /* FDC */,\n            .tokens #quality_list li:nth-last-child(3) a              /* UNC */,\n            .tokens #quality_list li:nth-last-child(3) a.pop_selected /* UNC */,\n            .tokens #quality_list li:nth-last-child(3) a:hover        /* UNC */ {\n                padding: 0;\n                width: 32px;\n            }\n\n            /* medals */\n            .medals #quality_list li a[data-value=\"1\"]  { background:#CC0000;color:#FFE3E3; } /* P */\n            .medals #quality_list li a[data-value=\"2\"]  { background:#AB8B00;color:#F3E7B3; } /* G */\n            .medals #quality_list li a[data-value=\"3\"]  { background:#64992C;color:#F9FFEF; } /* VG */\n            .medals #quality_list li a[data-value=\"4\"]  { background:#006633;color:#F1F5EC; } /* E */\n            .medals #quality_list li a[data-value=\"5\"]  { background:#0000CC;color:#DFE2FF; } /* M */\n\n            /* banknotes */\n            .banknotes #quality_list li a[data-value=\"1\"]  { background:#CC0000;color:#FFE3E3; } /* P */\n            .banknotes #quality_list li a[data-value=\"2\"]  { background:#EC7000;color:#FFF0E1; } /* FA */\n            .banknotes #quality_list li a[data-value=\"3\"]  { background:#B36D00;color:#FADCB3; } /* G */\n            .banknotes #quality_list li a[data-value=\"4\"]  { background:#AB8B00;color:#F3E7B3; } /* VG */\n            .banknotes #quality_list li a[data-value=\"5\"]  { background:#636330;color:#FFFFD4; } /* FI */\n            .banknotes #quality_list li a[data-value=\"6\"]  { background:#64992C;color:#F9FFEF; } /* VF */\n            .banknotes #quality_list li a[data-value=\"7\"]  { background:#006633;color:#F1F5EC; } /* XF */\n            .banknotes #quality_list li a[data-value=\"8\"]  { background:#206CFF;color:#E0ECFF; } /* AUNC */\n            .banknotes #quality_list li a[data-value=\"9\"]  { background:#0000CC;color:#DFE2FF; } /* UNC */\n\n            .banknotes #quality_list li:nth-last-child(1) a              /* UNC */,\n            .banknotes #quality_list li:nth-last-child(1) a.pop_selected /* UNC */,\n            .banknotes #quality_list li:nth-last-child(1) a:hover        /* UNC */ {\n                padding: 0;\n                width: 32px;\n            }\n\n            .banknotes #quality_list li:nth-last-child(2) a::before /* AUNC */ {\n                content: \"AU \";\n            }\n\n            /* stamps */\n            .stamps #quality_list li a[data-value=\"1\"]  { background:#006633;color:#F1F5EC; } /* MNH */\n            .stamps #quality_list li a[data-value=\"2\"]  { background:#64992C;color:#F9FFEF; } /* MH */\n            .stamps #quality_list li a[data-value=\"3\"]  { background:#636330;color:#FFFFD4; } /* U */\n            .stamps #quality_list li a[data-value=\"4\"]  { background:#AB8B00;color:#F3E7B3; } /* CTO */\n\n            .stamps #quality_list li:nth-child(2) a              /* MNH */,\n            .stamps #quality_list li:nth-child(2) a.pop_selected /* MNH */,\n            .stamps #quality_list li:nth-child(2) a:hover        /* MNH */,\n            .stamps #quality_list li:nth-child(5) a              /* CTO */,\n            .stamps #quality_list li:nth-child(5) a.pop_selected /* CTO */,\n            .stamps #quality_list li:nth-child(5) a:hover        /* CTO */ {\n                padding: 0;\n                width: 32px;\n            }\n\n            .stamps #quality_list li:nth-child(3) a              /* MH */ {\n                padding: 0 2px;\n                width: 28px;\n            }\n            .stamps #quality_list li:nth-child(3) a.pop_selected /* MH */,\n            .stamps #quality_list li:nth-child(3) a:hover        /* MH */ {\n                padding: 0;\n                width: 32px;\n            }\n        </style>\n    ");
    var itemFullDetails = D.getElementById('item_full_details');
    var itemCondition = itemFullDetails.querySelector('>.ibox >.ibox_list[data-lt="2"] .pop.condition');
    var _updateQC = I.updateQC;
    var _spanCBup = I.spanCBup;
    if (type === 'coins' && loc.includes('/coin/')) {
        var itemYearVariants_1 = itemFullDetails.querySelectorAll('>.year_variants >ul >li[data-id]');
        // clicking on year row
        itemYearVariants_1.forEach(function (itemYearVariant) {
            itemYearVariant.addEventListener("click", function (e) {
                var li = e.currentTarget;
                li.querySelector('.ibox_list[data-lt="2"] >.pop.condition')
                    .dispatchEvent(new MouseEvent('mouseover'));
            });
        });
        var _q_1 = { P: 1, FA: 2, G: 3, VG: 4, FI: 5, VF: 6, XF: 7, UNC: 8, BU: 9, FDC: 10 };
        function q(s) {
            // @ts-ignore
            return (s && s in _q_1) ? _q_1[s] : 0;
        }
        //
        function updateOverallCondition(e, current, container) {
            var variants = [];
            itemYearVariants_1.forEach(function (n) {
                variants.push(n.classList.contains('open')
                    ? current
                    : q(n.querySelector('ul.oth_inv').textContent.split(':', 2).pop().trim()));
            });
            var best = Math.max.apply(Math, __spread(variants));
            if (best && best !== q(itemCondition.textContent)) {
                itemCondition.dispatchEvent(new MouseEvent('mouseover'));
                _updateQC(e, itemCondition.querySelector("#quality_list a[data-value=\"" + best + "\"]"));
                if (container) {
                    container.dispatchEvent(new MouseEvent('mouseover'));
                }
                else {
                    itemCondition.dispatchEvent(new MouseEvent('mouseout'));
                }
            }
        }
        I.updateQC = function (e, n) {
            var _r = _updateQC(e, n);
            updateOverallCondition(e, +n.dataset.value, n.querySelector('.pop.condition'));
            return _r;
        };
        I.spanCBup = function (n) {
            var _r = _spanCBup(n);
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
        I.spanCBup = function (n) {
            var _r = _spanCBup(n);
            if (!n.classList.contains('cb_checked')) {
                itemCondition.dispatchEvent(new MouseEvent('mouseover'));
            }
            return _r;
        };
    }
})(window, document, 
// @ts-ignore
Inventory);


/***/ })

/******/ });