// ==UserScriptLib==
// @version      0.1.0
// @description  Don't forget to update version for script includes
// @author       danikas2k2
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScriptLib==

"use strict";

const loc = document.location.href;
const [locPath, locQuery] = getHrefParts(loc);

function updateLinkHref() {
    const a      = $(this);
    const before = ['page', 'view'];
    const after  = [];
    const href   = a.attr('href');
    if (a.hasClass('active')) {
        after.push('view');
    } else if (a.hasClass('switcher')) {
        const view = getHrefParts(href)[1].get('view');
        after.push(view);
    }
    a.attr('href', updateHref(href, before, after));
}

function updateOnClickHref() {
    const div   = $(this);
    const match = div.attr('onclick').match(/location.href='([^']+)';/);
    if (match) {
        const before = ['page'];
        if (div.parent('#status-filter').length) {
            before.push('status');
        } else {
            const a = div.prevAll('a.switcher');
            if (a.length) {
                const view = getHrefParts(a.attr('href'))[1].get('view');
                before.push('view');
                before.push(view);
            }
        }
        div.attr('onclick', `location.href='${updateHref(match[1], before)}';`);
    }
}

function updateHref(href, before = null, after = null) {
    if (before) {
        applyQuery(locQuery, before);
    }

    applyQuery(locQuery, getHrefParts(href)[1]);

    if (after) {
        applyQuery(locQuery, after);
    }

    return [locPath, [...locQuery.entries()].map(([k, v]) => `${k}=${v.replace(/\+/g, '%2B')}`).join('&')].join('?');
}

function applyQuery(query, apply) {
    if (apply) {
        if (!(apply instanceof Map)) {
            apply = new Map(arrayOf(apply).map(arrayOf));
        }
        for (const [key, value] of apply.entries()) {
            if (!value || !value.length) {
                query.delete(key);
            } else {
                query.set(key, value);
            }
        }
    }
}

function arrayOf(a) {
    return Array.isArray(a) ? a : [a];
}

function getHrefParts(href) {
    const parts = href.split('?');
    return [parts.shift(), new Map(parts.join('%3F').split('&').map(q => q.split('=')))];
}
