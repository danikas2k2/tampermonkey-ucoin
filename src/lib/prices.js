"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPrice(config, country, name, subject, year, q, comment, price) {
    var prices = config.prices, cheap = config.cheap, veryCheap = config.veryCheap, _a = config.rules, regular = _a.regular, commemorative = _a.commemorative, fallback = _a.fallback;
    if (comment.includes('NP')) {
        return false;
    }
    if (comment.includes('aUNC')) {
        q = 'AU';
    }
    else if (comment.includes('XF++')) {
        q = 'XF2';
    }
    else if (comment.includes('XF+')) {
        q = 'XF1';
    }
    else if (comment.includes('VF+')) {
        q = 'VF1';
    }
    if (q === 'PRF') {
        q = 'BU';
    }
    var alias;
    if (subject) {
        var flag = void 0;
        if (veryCheap.has(country)) {
            flag = commemorative.veryCheap || commemorative['very-cheap'];
        }
        else if (cheap.has(country)) {
            flag = commemorative.cheap;
        }
        else {
            flag = commemorative.common || commemorative[''];
        }
        if (flag) {
            alias = (name + " " + flag).trim();
        }
        name = name + " *";
    }
    else {
        var mapping = void 0;
        if (veryCheap.has(country)) {
            mapping = regular.veryCheap || regular['very-cheap'];
        }
        else if (cheap.has(country)) {
            mapping = regular.cheap;
        }
        else {
            mapping = regular.common || regular[''];
        }
        if (mapping && mapping.has(q)) {
            q = mapping.get(q);
        }
    }
    var nameVariants = [];
    if (subject) {
        if (alias && alias !== name) {
            nameVariants.unshift(country + " " + alias + " " + subject + " " + year, country + " " + name + " " + subject + " " + year, country + " " + alias + " " + subject, country + " " + name + " " + subject, country + " " + alias + " " + year, country + " " + name + " " + year, country + " " + alias, country + " " + name, alias + " " + subject + " " + year, name + " " + subject + " " + year, alias + " " + subject, name + " " + subject, alias + " " + year, name + " " + year, alias, name);
        }
        else {
            nameVariants.unshift(country + " " + name + " " + subject + " " + year, country + " " + name + " " + subject, country + " " + name + " " + year, country + " " + name, name + " " + subject + " " + year, name + " " + subject, name + " " + year, name);
        }
    }
    else {
        nameVariants.unshift(country + " " + name + " " + year, country + " " + name, name + " " + year, name);
    }
    for (; fallback && q;) {
        for (var _i = 0, nameVariants_1 = nameVariants; _i < nameVariants_1.length; _i++) {
            var nameVariant = nameVariants_1[_i];
            var pp = getQPrice(nameVariant);
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
        var pn = prices.get(name);
        if (!pn.has(q)) {
            return false;
        }
        var pp = +pn.get(q);
        return (pp < +price) ? price : pp.toFixed(2);
    }
}
exports.getPrice = getPrice;
function getPriceConfig() {
    var config = JSON.parse(localStorage.ucoinSwapPrices);
    if (!config) {
        err('config not found');
        return null;
    }
    if (!config.prices) {
        err('prices not found');
        return null;
    }
    var map = new Map(Object.entries(config.prices));
    for (var _i = 0, _a = map.entries(); _i < _a.length; _i++) {
        var _b = _a[_i], name_1 = _b[0], prices = _b[1];
        map.set(name_1, new Map(Object.entries(prices)));
    }
    return {
        prices: map,
        cheap: new Set(config.cheap || []),
        veryCheap: new Set(config.veryCheap || config['very-cheap'] || []),
        rules: {
            regular: new Map(config.rules && config.rules.regular ? Object.entries(config.rules.regular) : []),
            commemorative: new Map(config.rules && config.rules.commemorative ? Object.entries(config.rules.commemorative) : []),
            fallback: new Map(config.rules && config.rules.fallback ? Object.entries(config.rules.fallback) : []),
        },
    };
}
exports.getPriceConfig = getPriceConfig;
//# sourceMappingURL=prices.js.map