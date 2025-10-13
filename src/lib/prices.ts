// import { Condition } from './cond';

import { Price, PriceKey } from './common/price';
import { documentFragment } from './utils';

export function parsePrice(str?: string): number | undefined {
    const val = str?.replaceAll(/[^\d.]/g, '');
    if (!val) {
        return undefined;
    }
    const num = +val;
    return isNaN(num) ? undefined : num;
}

const NUMBER_FORMAT: Intl.NumberFormatOptions = {
    maximumFractionDigits: 2,
};
const NF = new Intl.NumberFormat('en-US', NUMBER_FORMAT);

export const formatNumber = (value: number): string => NF.format(value);

const PRICE_FORMAT: Intl.NumberFormatOptions = {
    ...NUMBER_FORMAT,
    style: 'currency',
    currency: 'EUR',
};
const PF = new Intl.NumberFormat('en-US', PRICE_FORMAT);

export const formatPrice = (value: number): string => PF.format(value);

async function getPrice(key: PriceKey, defaultPrice: number): Promise<number> {
    let price = +(sessionStorage.getItem(key) ?? 0);
    if (!price || isNaN(price)) {
        const fragment = documentFragment(await fetch(`/`).then((r) => r.text()));
        const element = fragment.querySelector(`a[href="/catalog/?composition=${key}"] section`);
        price = parsePrice(element?.textContent) ?? 0;
        if (!price) {
            price = defaultPrice;
        }
        sessionStorage.setItem(key, price.toString());
    }
    return price;
}

const getSilverPrice = async (): Promise<number> => getPrice(PriceKey.Silver, Price.Silver);

const getGoldPrice = async (): Promise<number> => getPrice(PriceKey.Gold, Price.Gold);

/*
function sortByCondition(a: Condition, b: Condition): number {
    const A = ConditionValues[a] || 0;
    const B = ConditionValues[b] || 0;
    return B - A;
}

export function estimateSwapPrices(): void {
    const theySwap = document.getElementById('swap');
    if (!theySwap) {
        return;
    }

    const swapBlock = theySwap.nextElementSibling;
    if (!swapBlock || !swapBlock.matches('#swap-block')) {
        return;
    }

    const byType: YearMap = new Map();
    const byMint: MintMap = new Map();

    const listOfLinks = swapBlock.querySelectorAll(`a.list-link`);
    for (const a of listOfLinks) {
        const priceElement = a.querySelector(`.right.blue-13`);
        if (!priceElement) {
            continue;
        }
        let priceStr: string | null | undefined = priceElement.textContent;

        const pricePrefix = priceElement.firstChild?.textContent;
        if (pricePrefix) {
            priceStr = priceStr?.replace(pricePrefix, '');
        }

        const priceSuffix = priceElement.lastChild?.textContent;
        if (priceSuffix) {
            priceStr = priceStr?.replace(priceSuffix, '');
        }

        const price = priceStr ? +priceStr : 0;

        const cond = a.querySelector(`.left.dgray-11`)?.textContent || '';
        const p = byType.get(cond) || [];
        p.push(price);
        byType.set(cond, p);

        const mint = a.querySelector(`.left.gray-13`)?.textContent || '';
        const pm = byMint.get(mint) || new Map();
        const pc = pm.get(cond) || [];
        pc.push(price);
        pm.set(cond, pc);
        byMint.set(mint, pm);
    }

    function addPricesByType(byType: Map<string, number[]>): void {
        for (const cond of [...byType.keys()].sort(sortByCondition)) {
            const p: number[] = byType.get(cond)?.sort(cmp) || [];
            const { length } = p;
            if (length === 1) {
                p.push(p[0]);
            }
        }
    }

    if (byMint.size > 1) {
        addPricesByType(byType);
    } else {
        for (const [, byType] of byMint) {
            addPricesByType(byType);
        }
    }
}
*/

export async function estimateWeightPrice(): Promise<void> {
    const coinBlock = document.getElementById('coin');
    if (!coinBlock) {
        return;
    }
    const aPrice = coinBlock.querySelector('.right.price-container');
    const head = coinBlock.querySelector('h1');
    const trs = coinBlock.querySelectorAll<HTMLTableCellElement>('.coin-info tr');

    let weight = NaN;
    let isRussia = false;
    let isSilver = false;
    let isGold = false;
    let part = 1;

    for (const tr of trs) {
        const th = tr.querySelector('th');
        const head = (th && th.textContent) || '';
        const td = tr.querySelector('td');
        if (td) {
            const data = `${td.textContent}`;
            if (head.match(/\([gг]/)) {
                weight = +data;
            } else if (head.match(/Country|Страна|Valstybė/)) {
                isRussia = !!data.match(/Russia|Россия|Rusija|USSR|СССР|TSRS/);
            } else if (head.match(/Composition|Материал|Sudėtis/)) {
                isSilver = !!data.match(/Silver|Серебро|Sidabras/);
                isGold = !!data.match(/Gold|Золото|Auksas/);
                if (isSilver || isGold) {
                    part = +(data.split(' ').pop() || 0);
                }
            }
        }
    }

    let price;
    let priceSource;
    if (isGold) {
        price = weight * (part || 1) * (await getGoldPrice());
        priceSource = 'au';
    } else if (isSilver) {
        price = weight * (part || 1) * (await getSilverPrice());
        priceSource = 'ag';
    } else if (isRussia) {
        price = weight * Price.Russian;
        priceSource = 'ru';
    } else {
        price = weight * Price.Common;
        priceSource = '--';
    }

    const weightPrice = `<br/><price class="right" title="${priceSource}: ${price.toFixed(
        5
    )}">€ ${formatPrice(price)}</price>`;

    if (!aPrice) {
        let isApproximate = false;
        const prices: number[] = [];
        const all = coinBlock.querySelectorAll('#coin-list td.blue-13');
        for (const td of all) {
            const clone = td.cloneNode(true);
            for (const child of clone.childNodes) {
                child.remove();
            }
            const { textContent } = clone;
            if (textContent) {
                prices.push(+textContent);
            } else {
                isApproximate = true;
            }
        }
        if (prices.length) {
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            const showPrices = [min.toFixed(2)];
            if (max > min) {
                showPrices.push(max.toFixed(2));
            } else if (isApproximate) {
                showPrices.unshift('');
            }
            head?.insertAdjacentHTML(
                'beforebegin',
                `<a href='#price' class='gray-12 right price-container'>Value:&nbsp;€ <span>${showPrices.join(
                    isApproximate ? '~' : '-'
                )}</span>${weightPrice}</a>`
            );
        }
    } else {
        aPrice.insertAdjacentHTML('beforeend', weightPrice);
    }
}

// { [condition]: [mul, add, min] }
/*export const PricePropsByCondition = new Map<Condition, [number, number, number]>([
    [Condition.UNC, [1.25, 0.2, 0.35]],
    [Condition.AU, [1.15, 0.1, 0.3]],
    [Condition.XXF, [1.1, 0.05, 0.25]],
    [Condition.XF, [1, 0.02, 0.2]],
    [Condition.VXF, [0.985, 0.01, 0.15]],
    [Condition.VF, [0.975, 0, 0.1]],
    [Condition.F, [0.95, -0.05, 0.09]],
    [Condition.VG, [0.925, -0.1, 0.08]],
    [Condition.G, [0.9, -0.2, 0.07]],
]);

const YEAR_MULTIPLIER = 0.02;
const YEAR_POWER = 0.012;
const MUL_PLUS_MULTIPLIER = 0.0025;
const ADD_PLUS_MULTIPLIER = 0.025;

export function getPriceByConditions(
    price: number,
    cond: Condition,
    plus = 0,
    name?: string,
    year?: string
): string {
    if (!(price && PricePropsByCondition.has(cond))) {
        return '';
    }
    const y = +(year || 0);
    const yDiff = y && !isNaN(y) ? new Date().getUTCFullYear() - y : 0;
    const yPow = 1 + yDiff * YEAR_POWER;
    const yBase = 1 + (yPow - 1) * YEAR_MULTIPLIER;
    const yMul = yBase ** (yPow - 1);
    const addPlus = plus * ADD_PLUS_MULTIPLIER;
    const mulPlus = plus * MUL_PLUS_MULTIPLIER;
    const [mul = 1, add = 0, min = 0] = PricePropsByCondition.get(cond) || [];
    const maxPrice = (price + addPlus) * (mul + mulPlus) * yMul + add;
    const minPrice = (min + addPlus) * yMul;
    const final = Math.max(maxPrice, minPrice);
    const isEuro = name?.includes('euro');
    const value = Number.parseInt(name ?? '0') * (name?.includes('cent') ? 0.01 : 1);
    return (isEuro && final < value ? value : final).toFixed(2);
}*/
