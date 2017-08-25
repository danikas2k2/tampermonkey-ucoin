"use strict";

function getPrice(config, country, name, subject, year, q, comment, price) {
    const {prices, cheap, veryCheap} = config;

    if (subject) {
        name = `${name} *`;
    }

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

    if (subject) {
        if (veryCheap.has(country)) {
            /*
            const cheapCommemorative = new Map([['BU', 'UNC'], ['UNC', 'AU'], ['XF', 'XF2'], ['VF', 'XF1'], ['F', 'XF'], ['VG', 'VF1'], ['G', 'VF']]);
            if (cheapCommemorative.has(q)) {
                q = cheapCommemorative.get(q);
            }
            */
            // leave * commemorative prices
        } else if (cheap.has(country)) {
            /*
            const cheapCommemorative = new Map([['BU', 'UNC'], ['UNC', 'AU'], ['XF', 'XF2'], ['VF', 'XF1'], ['F', 'XF'], ['VG', 'VF1'], ['G', 'VF']]);
            if (cheapCommemorative.has(q)) {
                q = cheapCommemorative.get(q);
            }
            */
            // get ** commemorative prices
            name = `${name}*`; // **
        } else {
            /*const commemorative = new Map([['XF', 'AU'], ['VF', 'XF2'], ['F', 'XF1'], ['VG', 'XF'], ['G', 'VF1']]);
            if (commemorative.has(q)) {
                q = commemorative.get(q);
            }*/
            // get *3 commemorative prices
            name = `${name}3`; // *3
        }
    } else {
        if (veryCheap.has(country)) {
            const veryCheapRegular = new Map([['BU', 'AU'], ['UNC', 'XF2'], ['AU', 'XF1'], ['XF2', 'XF'], ['XF1', 'VF1'], ['XF', 'VF'], ['VF1', 'F'], ['VF', 'F'], ['VG', 'F'], ['G', 'F']]);
            if (veryCheapRegular.has(q)) {
                q = veryCheapRegular.get(q);
            }
        } else if (cheap.has(country)) {
            const cheapRegular = new Map([['BU', 'UNC'], ['UNC', 'AU'], ['AU', 'XF2'], ['XF2', 'XF1'], ['XF1', 'XF'], ['XF', 'VF1'], ['VF1', 'VF'], ['VF', 'F'], ['VG', 'F'], ['G', 'F']]);
            if (cheapRegular.has(q)) {
                q = cheapRegular.get(q);
            }
        } else {
            const regular = new Map([['VG', 'F'], ['G', 'F']]);
            if (regular.has(q)) {
                q = regular.get(q);
            }
        }
    }

    const nameVariants = [];
    if (subject) {
        nameVariants.unshift(
            `${country} ${name} ${subject} ${year}`,
            `${country} ${name} ${subject}`,
            `${country} ${name} ${year}`,
            `${country} ${name}`,
            `${name} ${subject} ${year}`,
            `${name} ${subject}`,
            `${name} ${year}`,
            name);
    } else {
        nameVariants.unshift(
            `${country} ${name} ${year}`,
            `${country} ${name}`,
            `${name} ${year}`,
            name);
    }

    for (let nameVariant of nameVariants) {
        const pp = getQPrice(nameVariant);
        if (pp !== false) {
            return pp;
        }
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
        return (pp < price) ? price : pp;
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
