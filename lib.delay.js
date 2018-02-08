// ==UserScriptLib==
// @version      0.1.1
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

const minDelay = 500; // ms
const rndDelay = 500; // ms

function randomDelay() {
    return delay(Math.round(minDelay + Math.random() * rndDelay));
}
