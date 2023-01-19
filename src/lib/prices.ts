import { countryRegions } from '../data/countries';
import { Europe, PayPal_Europe, PayPal_UK } from '../data/regions';
import { Condition, ConditionValues } from './cond';
import { cmp } from './sort';

type YearMap = Map<string, number[]>;
type MintMap = Map<string, YearMap>;

const COIN_ID = 'coin';

const SWAP_ID = 'swap';
const SWAP_BLOCK_ID = 'swap-block';

const RX_GRAMMS = /\([gг]/;
const RX_COUNTRY = /Country|Страна|Valstybė/;
const RX_RUSSIA = /Russia|Россия|Rusija|USSR|СССР|TSRS/;
const RX_COMPOSITION = /Composition|Материал|Sudėtis/;
const RX_SILVER = /Silver|Серебро|Sidabras/;
const RX_GOLD = /Gold|Золото|Auksas/;
// export const RX_YEAR = /Year|Год|Metai/;

const RU_PRICE = 0.006; //      3-8e/kg
const EU_PRICE = 0.012; //    10-15e/kg
const AG_PRICE = 0.621; //   .60-.80e/g
const AU_PRICE = 54.56; // 44.0-65.0e/g

function sortByCondition(a: Condition, b: Condition): number {
    const A = ConditionValues[a] || 0;
    const B = ConditionValues[b] || 0;
    return B - A;
}

export function estimateSwapPrices(): void {
    const theySwap = document.getElementById(SWAP_ID);
    if (!theySwap) {
        return;
    }

    const swapBlock = theySwap.nextElementSibling;
    if (!swapBlock || !swapBlock.matches(`#${SWAP_BLOCK_ID}`)) {
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

export function estimateWeightPrice(): void {
    const coinBlock = document.getElementById(COIN_ID);
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
            if (head.match(RX_GRAMMS)) {
                weight = +data;
            } else if (head.match(RX_COUNTRY)) {
                isRussia = !!data.match(RX_RUSSIA);
            } else if (head.match(RX_COMPOSITION)) {
                isSilver = !!data.match(RX_SILVER);
                isGold = !!data.match(RX_GOLD);
                if (isSilver || isGold) {
                    part = +(data.split(' ').pop() || 0);
                }
            }
        }
    }

    let price;
    let priceSource;
    if (isGold) {
        price = weight * (part || 1) * AU_PRICE;
        priceSource = 'au';
    } else if (isSilver) {
        price = weight * (part || 1) * AG_PRICE;
        priceSource = 'ag';
    } else if (isRussia) {
        price = weight * RU_PRICE;
        priceSource = 'ru';
    } else {
        price = weight * EU_PRICE;
        priceSource = '--';
    }

    const weightPrice = `<br/><price class='right' title='${priceSource}: ${price.toFixed(
        5
    )}'>€ ${price.toFixed(2)}</price>`;

    if (!aPrice) {
        let isAproximate = false;
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
                isAproximate = true;
            }
        }
        if (prices.length) {
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            const showPrices = [min.toFixed(2)];
            if (max > min) {
                showPrices.push(max.toFixed(2));
            } else if (isAproximate) {
                showPrices.unshift('');
            }
            head?.insertAdjacentHTML(
                'beforebegin',
                `<a href='#price' class='gray-12 right price-container'>Value:&nbsp;€ <span>${showPrices.join(
                    isAproximate ? '~' : '-'
                )}</span>${weightPrice}</a>`
            );
        }
    } else {
        aPrice.insertAdjacentHTML('beforeend', weightPrice);
    }
}

// { [condition]: [mul, add, min] }
export const PricePropsByCondition = new Map<Condition, [number, number, number]>([
    [Condition.UNC, [1.75, 0.5, 0.5]],
    [Condition.AU, [1.5, 0.25, 0.4]],
    [Condition.XF_, [1.3, 0.1, 0.3]],
    [Condition.XF, [1.2, 0.05, 0.2]],
    [Condition.VF_, [1.1, 0.03, 0.15]],
    [Condition.VF, [1.05, 0.01, 0.1]],
    [Condition.F, [0.98, 0, 0.09]],
    [Condition.VG, [0.95, -0.05, 0.08]],
    [Condition.G, [0.9, -0.1, 0.07]],
]);

const YEAR_MULTIPLIER = 0.05;
const YEAR_POWER = 0.015;
const MUL_PLUS_MULTIPLIER = 0.002;
const ADD_PLUS_MULTIPLIER = 0.02;

export function getPriceByConditions(
    price: number,
    cond: Condition,
    year?: string | null,
    plus = 0
): string {
    if (price && PricePropsByCondition.has(cond)) {
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
        return final.toFixed(2);
    }
    return '';
}

// TODO add currency support for shipping prices
export function getShippingPrice(country: string, weight: number): number {
    if (country === 'lithuania') {
        if (weight <= 50) {
            return 1.5;
        }
        if (weight <= 450) {
            return 2;
        }
        if (weight <= 900) {
            return 2.5;
        }
        if (weight <= 1900) {
            return 3;
        }
        return 5;
    }

    const isEurope = countryRegions[country].includes(Europe);
    if (weight <= 450) {
        return isEurope ? 6 : 7;
    }
    if (weight <= 900) {
        return isEurope ? 8 : 12;
    }
    if (weight <= 1900) {
        return isEurope ? 11 : 17;
    }

    return (
        Math.floor(weight / 1900) * getShippingPrice(country, 1900) +
        getShippingPrice(country, weight % 1900)
    );
}

export interface PayPalPrice {
    price: number;
    charges: number;
    percents: number;
    fixed: number;
}

// TODO add discount/custom prices
export function getPayPalPrice(country: string, price: number): PayPalPrice {
    let percents = 3.4;
    const fixed = 0.35;

    if (countryRegions[country].includes(PayPal_UK)) {
        percents += 1.29;
    } else if (!countryRegions[country].includes(PayPal_Europe)) {
        percents += 1.99;
    }

    const charges = price * (percents / 100) + fixed;
    return {
        price: price + charges,
        charges,
        percents,
        fixed,
    };
}
