// ==UserScriptLib==
// @version      0.1.7
// @description  Don't forget to update version for script includes
// @author       danikas2k2
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScriptLib==

"use strict";

function getPrice(config, country, name, subject, year, q, comment, price) {
    const {prices, cheap, veryCheap, rules: {regular, commemorative, fallback}} = config;

    if (comment.includes('aUNC')) {
        q = 'AU';
    } else if (comment.includes('XF++')) {
        q = 'XF2';
    } else if (comment.includes('XF+')) {
        q = 'XF1';
    } else if (comment.includes('VF+')) {
        q = 'VF1';
    }
    if (q === 'PRF') {
        q = 'BU';
    }

    let alias;
    if (subject) {
        let flag;

        if (veryCheap.has(country)) {
            flag = commemorative.veryCheap || commemorative['very-cheap'];
        } else if (cheap.has(country)) {
            flag = commemorative.cheap;
        } else {
            flag = commemorative.common || commemorative[''];
        }

        if (flag) {
            alias = `${name} ${flag}`.trim();
        }
        name = `${name} *`;
    } else {
        let mapping;

        if (veryCheap.has(country)) {
            mapping = regular.veryCheap || regular['very-cheap'];
        } else if (cheap.has(country)) {
            mapping = regular.cheap;
        } else {
            mapping = regular.common || regular[''];
        }

        if (mapping && mapping.has(q)) {
            q = mapping.get(q);
        }
    }

    const nameVariants = [];
    if (subject) {
        if (alias && alias !== name) {
            nameVariants.unshift(
                `${country} ${alias} ${subject} ${year}`,
                `${country} ${name} ${subject} ${year}`,
                `${country} ${alias} ${subject}`,
                `${country} ${name} ${subject}`,
                `${country} ${alias} ${year}`,
                `${country} ${name} ${year}`,
                `${country} ${alias}`,
                `${country} ${name}`,
                `${alias} ${subject} ${year}`,
                `${name} ${subject} ${year}`,
                `${alias} ${subject}`,
                `${name} ${subject}`,
                `${alias} ${year}`,
                `${name} ${year}`,
                alias,
                name);
        } else {
            nameVariants.unshift(
                `${country} ${name} ${subject} ${year}`,
                `${country} ${name} ${subject}`,
                `${country} ${name} ${year}`,
                `${country} ${name}`,
                `${name} ${subject} ${year}`,
                `${name} ${subject}`,
                `${name} ${year}`,
                name);
        }
    } else {
        nameVariants.unshift(
            `${country} ${name} ${year}`,
            `${country} ${name}`,
            `${name} ${year}`,
            name);
    }

    for (; fallback && q;) {
        for (let nameVariant of nameVariants) {
            const pp = getQPrice(nameVariant);
            if (pp !== false) {
                return pp;
            }
        }

        if (!fallback.has(q)) {
            return false;
        }

        q = fallback.get(q);
    }

    return false;

    function getQPrice(name) {
        if (!prices.has(name)) {
            return false;
        }

        const pn = prices.get(name);
        if (!pn.has(q)) {
            return false;
        }

        const pp = pn.get(q);
        return (+pp < +price) ? price : pp;
    }
}

function getPriceConfig() {
    return getOrLoadPriceConfig().then(config => {
        if (!config) {
            err('config not found');
            return null;
        }

        if (!config.prices) {
            err('prices not found');
            return null;
        }

        const map = new Map(Object.entries(config.prices));
        for (const [name, prices] of map.entries()) {
            map.set(name, new Map(Object.entries(prices)));
        }

        return {
            prices:    map,
            cheap:     new Set(config.cheap || []),
            veryCheap: new Set(config.veryCheap || config['very-cheap'] || []),
            rules:     {
                regular:       new Map(config.rules && config.rules.regular ? Object.entries(config.rules.regular) : []),
                commemorative: new Map(config.rules && config.rules.commemorative ? Object.entries(config.rules.commemorative) : []),
                fallback:      new Map(config.rules && config.rules.fallback ? Object.entries(config.rules.fallback) : []),
            },
        };
    });
}

function getOrLoadPriceConfig() {
    if (localStorage.ucoinSwapPrices && (Date.now() - localStorage.ucoinSwapPricesUpdated < 86400000)) {
        try {
            return jQuery.when(JSON.parse(localStorage.ucoinSwapPrices));
        } catch (e) {
            return loadPriceConfig();
        }
    } else {
        return loadPriceConfig();
    }
}

function loadPriceConfig() {
    return jQuery.when(jQuery.getJSON('//dev.andriaus.com/ucoin/ucoin-swap-prices.json')).then(data => {
        localStorage.ucoinSwapPrices        = JSON.stringify(data);
        localStorage.ucoinSwapPricesUpdated = Date.now();
        return data;
    });
}
