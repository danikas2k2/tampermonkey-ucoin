const ConditionValues = new Map([
    ['G', 1],
    ['VG', 2],
    ['F', 3],
    ['VF', 4],
    ['XF', 5],
    ['UNC', 6],
    ['PRF', 7],
    ['BU', 8],
]);

const ConditionColors = new Map([
    ['G', 7],
    ['VG', 8],
    ['F', 9],
    ['VF', 10],
    ['XF', 11],
    ['UNC', 12],
    ['PRF', 3],
    ['BU', 4],
]);


export function estimateSwapPrices() {
    const theySwap = document.getElementById('swap');
    const swapBlock = theySwap && theySwap.nextElementSibling;
    if (!swapBlock || swapBlock.id !== 'swap-block') {
        return;
    }

    const byType = new Map();
    const byMint = new Map();

    let pricePrefix: string, priceSuffix: string;
    swapBlock.querySelectorAll(`a.list-link`).forEach((a: HTMLAnchorElement) => {

        const cond = a.querySelector(`.left.dgray-11`).textContent;
        const mint = a.querySelector(`.left.gray-13`).textContent;

        const priceElement = a.querySelector(`.right.blue-13`);
        let priceStr = priceElement.textContent;

        pricePrefix = priceElement.firstChild.textContent;
        if (pricePrefix) {
            priceStr = priceStr.replace(pricePrefix, '');
        }

        priceSuffix = priceElement.lastChild.textContent;
        if (priceSuffix) {
            priceStr = priceStr.replace(priceSuffix, '');
        }

        const price = +priceStr;

        const p = byType.has(cond) ? byType.get(cond) : [];
        p.push(price);
        byType.set(cond, p);

        const pm = byMint.has(mint) ? byMint.get(mint) : new Map();
        const pc = pm.has(cond) ? pm.get(cond) : [];
        pc.push(price);
        pm.set(cond, pc);
        byMint.set(mint, pm);
    });

    swapBlock.parentElement.insertAdjacentHTML("beforebegin", `<div class="widget estimated-prices-widget"><a class="widget-header">Estimated prices</a><div id="estimated-prices"></div></div>`);

    const estimatedPrices = document.getElementById('estimated-prices');
    if (byMint.size > 1) {
        addPricesByType(byType);
        estimatedPrices.insertAdjacentHTML("beforeend", `<div class="list-sep"></div>`);
    }
    byMint.forEach((byType, mint) => {
        addPricesByType(byType, mint);
    });

    function addPricesByType(byType: Map<string, number[]>, mint = '') {
        [...byType.keys()].sort(sortByCond).forEach((cond: string) => {
            const p: number[] = byType.get(cond).sort();
            const l = p.length, r = l % 2, h = (l + r) / 2;

            // const avg = p.reduce((sum: number, val: number): number => sum + val, 0) / p.length;
            const med = r ? p[h] : (p[h] + p[h+1]) / 2;
            const min = Math.min(...p); // p.reduce((min: number, val: number): number => min < val ? min : val, +Infinity);
            const max = Math.max(...p); // p.reduce((max: number, val: number): number => max > val ? max : val, -Infinity);

            const prices = [];
            prices.push(min.toFixed(2));
            if (med > min) {
                prices.push(med.toFixed(2));
                if (max > med) {
                    prices.push(max.toFixed(2));
                }
            }

            if (pricePrefix) {
                prices[0] = `<span class="lgray-11">${pricePrefix}</span>${prices[0]}`;
            }
            if (priceSuffix) {
                const n = prices.length - 1;
                prices[n] = `${prices[n]}<span class="lgray-11">${priceSuffix}</span>`;
            }

            const price = `<nobr>${prices.join(`</nobr><nobr><small> &middot; </small>`)}</nobr>`;

            const parts = mint.split(' ');
            const y = parts.shift();
            const m = parts.length ? ` <span class="lgray-11">${parts.join(' ')}</span>` : '';

            estimatedPrices.insertAdjacentHTML("beforeend", `<a class="list-link"><span class="left dgray-11 marked-${ConditionColors.get(cond)}">${cond}</span><span class="left gray-13">${y}${m}</span><span class="right blue-13">${price}</span></a>`);
        });
    }

    function sortByCond(a: string, b: string): number {
        return ConditionValues.get(b) - ConditionValues.get(a);
    }
}
