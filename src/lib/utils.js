"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sp(str) {
    return ("" + (str || '')).replace(/\u{00A0}+/gu, ' ').replace(/\s+/g, ' ').trim();
}
exports.sp = sp;
//# sourceMappingURL=utils.js.map