"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loc = document.location.href;
function updateLinkHref() {
    var a = $(this);
    var before = ['page', 'view'];
    var after = [];
    var href = a.attr('href');
    if (a.hasClass('active')) {
        after.push('view');
    }
    else if (a.hasClass('switcher')) {
        var view = getHrefParts(href)[1].get('view');
        after.push(view);
    }
    a.attr('href', updateHref(href, before, after));
}
exports.updateLinkHref = updateLinkHref;
function updateOnClickHref() {
    var div = $(this);
    var match = div.attr('onclick').match(/location.href='([^']+)';/);
    if (match) {
        var before = ['page'];
        if (div.parent('#status-filter').length) {
            before.push('status');
        }
        else {
            var a = div.prevAll('a.switcher');
            if (a.length) {
                var view = getHrefParts(a.attr('href'))[1].get('view');
                before.push('view');
                before.push(view);
            }
        }
        div.attr('onclick', "location.href='" + updateHref(match[1], before) + "';");
    }
}
exports.updateOnClickHref = updateOnClickHref;
function updateHref(href, before, after) {
    if (before === void 0) { before = null; }
    if (after === void 0) { after = null; }
    var _a = getHrefParts(loc), locPath = _a[0], locQuery = _a[1];
    if (before) {
        applyQuery(locQuery, before);
    }
    applyQuery(locQuery, getHrefParts(href)[1]);
    if (after) {
        applyQuery(locQuery, after);
    }
    return [locPath, locQuery.entries().slice().map(function (_a) {
            var k = _a[0], v = _a[1];
            return k + "=" + v.replace(/\+/g, '%2B');
        }).join('&')].join('?');
}
exports.updateHref = updateHref;
function applyQuery(query, apply) {
    if (apply) {
        if (!(apply instanceof Map)) {
            apply = new Map(arrayOf(apply).map(arrayOf));
        }
        for (var _i = 0, _a = apply.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (!value || !value.length) {
                query.delete(key);
            }
            else {
                query.set(key, value);
            }
        }
    }
}
exports.applyQuery = applyQuery;
function arrayOf(a) {
    return Array.isArray(a) ? a : [a];
}
exports.arrayOf = arrayOf;
function getHrefParts(href) {
    var parts = href.split('?');
    return [parts.shift(), new Map(parts.join('%3F').split('&').map(function (q) { return q.split('='); }))];
}
exports.getHrefParts = getHrefParts;
//# sourceMappingURL=links.js.map