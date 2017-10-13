// ==UserScriptLib==
// @version      0.1.0
// @description  Don't forget to update version for script includes
// @author       danikas2k2
// @require      https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js
// ==/UserScriptLib==

"use strict";

function info(msg) {
    $.notify(msg, 'info');
}

function err(msg) {
    $.notify(msg, 'error');
}

function ok(msg) {
    $.notify(msg, 'success');
}
