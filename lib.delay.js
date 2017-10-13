// ==UserScriptLib==
// @version      0.1.0
// @description  Don't forget to update version for script includes
// @author       danikas2k2
// ==/UserScriptLib==

"use strict";

function delay(time) {
    return () => {
        const ret = new $.Deferred();
        setTimeout(() => {
            ret.resolve();
        }, time);
        return ret;
    };
}

function randomDelay() {
    return delay(Math.round(1000 + Math.random() * 1000));
}
