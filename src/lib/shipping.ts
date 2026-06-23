import { apiFetch } from './api';

export const enum Weight {
    SMALL_ENVELOPE = 50,
    LARGE_ENVELOPE = 450,
    SMALL_PACKAGE = 900,
    MEDIUM_PACKAGE = 1400,
    LARGE_PACKAGE = 1900,
}

interface ShippingEntry {
    country: string;
    weightFrom: number;
    weightTo: number;
    provider: 'omniva' | 'lpe' | 'post';
    size: 'xs' | 'sm' | 'md' | 'lg';
    type?: 'ordinary' | 'registered' | 'tracked';
    price: number;
}

type ShippingPrices = ShippingEntry[];

// Finds the cheapest way to ship `totalWeight` grams using available price brackets.
// Compares sending as a single package vs splitting into sub-packages (DP, memoized).
function cheapestSplit(prices: ShippingEntry[], totalWeight: number): number {
    const memo = new Map<number, number>();

    function solve(weight: number): number {
        if (weight <= 0) {
            return 0;
        }
        if (memo.has(weight)) {
            return memo.get(weight)!;
        }

        let best = Infinity;

        for (const entry of prices) {
            if (weight >= entry.weightFrom && weight <= entry.weightTo) {
                // Direct: single package covers this weight
                best = Math.min(best, entry.price);
            } else if (entry.weightTo < weight) {
                // Chunk: send entry.weightTo as one package, solve remainder
                const sub = solve(weight - entry.weightTo);
                if (sub >= 0) {
                    best = Math.min(best, entry.price + sub);
                }
            }
        }

        const result = best === Infinity ? -1 : best;
        memo.set(weight, result);
        return result;
    }

    const result = solve(totalWeight);
    return result < 0 ? -1 : +result.toFixed(2);
}

const SHIPPING_FEE = 0.3;
const SHIPPING_ROUND_STEP = 0.25;

function applyFee(price: number): number {
    return Math.ceil((price + SHIPPING_FEE) / SHIPPING_ROUND_STEP) * SHIPPING_ROUND_STEP;
}

// TODO add currency support for shipping prices
// TODO add support for number of coins
export async function getShippingPrice(country: string, weight: number): Promise<number> {
    const codes = await apiFetch<Record<string, string>>('/countries/codes', 'countries_codes');
    const countryCode = codes?.[country];
    if (!countryCode) {
        return -1;
    }

    const prices = await apiFetch<ShippingPrices>(
        `/shipping/${countryCode}/${weight}`,
        `shipping_${countryCode}_${weight}`
    );
    if (!prices) {
        return -1;
    }

    const base = cheapestSplit(prices, weight);
    return base < 0 ? -1 : applyFee(base);
}
