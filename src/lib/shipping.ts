export const enum Weight {
    SMALL_ENVELOPE = 50,
    LARGE_ENVELOPE = 450,
    SMALL_PACKAGE = 900,
    MEDIUM_PACKAGE = 1400,
    LARGE_PACKAGE = 1900,
}

const API_BASE = 'https://api.andriaus.com/shipping';
const CODES_API = 'https://api.andriaus.com/countries/codes';
const API_KEY = process.env.API_KEY ?? '';
const CACHE_PREFIX = 'shipping_';
const CODES_CACHE_KEY = 'countries_codes';

interface CountryCodesResponse {
    codes: Record<string, string>;
    updatedAt: string;
    validTo: string;
}

function readCodesCache(): CountryCodesResponse | null {
    try {
        const raw = localStorage.getItem(CODES_CACHE_KEY);
        if (!raw) {
            return null;
        }
        const cached: CountryCodesResponse = JSON.parse(raw);
        return new Date(cached.validTo) > new Date() ? cached : null;
    } catch {
        return null;
    }
}

function writeCodesCache(data: CountryCodesResponse): void {
    try {
        localStorage.setItem(CODES_CACHE_KEY, JSON.stringify(data));
    } catch {
        // localStorage quota exceeded — skip caching
    }
}

async function fetchCountryCodes(): Promise<Record<string, string> | null> {
    const cached = readCodesCache();
    if (cached) {
        return cached.codes;
    }

    try {
        const response = await fetch(CODES_API, {
            headers: { 'x-api-key': API_KEY },
        });
        if (!response.ok) {
            return null;
        }
        const data: CountryCodesResponse = await response.json();
        writeCodesCache(data);
        return data.codes;
    } catch {
        return null;
    }
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

interface ShippingResponse {
    prices: ShippingEntry[];
    updatedAt: string;
    validTo: string;
}

interface CachedShipping {
    data: ShippingResponse;
    updatedAt: string;
    validTo: string;
}

function getCacheKey(countryCode: string, weight: number): string {
    return `${CACHE_PREFIX}${countryCode}_${weight}`;
}

function readCache(countryCode: string, weight: number): ShippingResponse | null {
    try {
        const raw = localStorage.getItem(getCacheKey(countryCode, weight));
        if (!raw) {
            return null;
        }

        const cached: CachedShipping = JSON.parse(raw);
        return new Date(cached.validTo) > new Date() ? cached.data : null;
    } catch {
        return null;
    }
}

function writeCache(countryCode: string, weight: number, data: ShippingResponse): void {
    try {
        const entry: CachedShipping = {
            data,
            updatedAt: data.updatedAt,
            validTo: data.validTo,
        };
        localStorage.setItem(getCacheKey(countryCode, weight), JSON.stringify(entry));
    } catch {
        // localStorage quota exceeded — skip caching
    }
}

async function fetchShippingData(
    countryCode: string,
    weight: number
): Promise<ShippingResponse | null> {
    const cached = readCache(countryCode, weight);
    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(`${API_BASE}/${countryCode}/${weight}`, {
            headers: { 'x-api-key': API_KEY },
        });
        if (!response.ok) {
            return null;
        }
        const data: ShippingResponse = await response.json();
        writeCache(countryCode, weight, data);
        return data;
    } catch {
        return null;
    }
}

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
    const codes = await fetchCountryCodes();
    const countryCode = codes?.[country];
    if (!countryCode) {
        return -1;
    }

    const data = await fetchShippingData(countryCode, weight);
    if (!data) {
        return -1;
    }

    const base = cheapestSplit(data.prices, weight);
    return base < 0 ? -1 : applyFee(base);
}
