"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function info(msg) {
    $.notify(msg, 'info');
}
exports.info = info;
function err(msg) {
    $.notify(msg, 'error');
}
exports.err = err;
function ok(msg) {
    $.notify(msg, 'success');
}
exports.ok = ok;
//# sourceMappingURL=notify.js.map