import { lang } from '../lib/lang';

const API_BASE = 'https://api.andriaus.com/countries';
const API_KEY = process.env.API_KEY ?? '';
const CACHE_PREFIX = 'countries_';

interface CountriesResponse {
    countries: Record<string, string>;
    updatedAt: string;
    validTo: string;
}

function readCache(lc: string): CountriesResponse | null {
    try {
        const raw = localStorage.getItem(`${CACHE_PREFIX}${lc}`);
        if (!raw) {
            return null;
        }
        const cached: CountriesResponse = JSON.parse(raw);
        return new Date(cached.validTo) > new Date() ? cached : null;
    } catch {
        return null;
    }
}

function writeCache(lc: string, data: CountriesResponse): void {
    try {
        localStorage.setItem(`${CACHE_PREFIX}${lc}`, JSON.stringify(data));
    } catch {
        // localStorage quota exceeded — skip caching
    }
}

async function fetchCountries(lc: string): Promise<CountriesResponse | null> {
    const cached = readCache(lc);
    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(`${API_BASE}/${lc}`, {
            headers: { 'x-api-key': API_KEY },
        });
        if (!response.ok) {
            return null;
        }
        const data: CountriesResponse = await response.json();
        writeCache(lc, data);
        return data;
    } catch {
        return null;
    }
}

export async function getCountryId(name: string): Promise<string | undefined> {
    if (name.includes(',')) {
        name = name.split(',').pop()?.trim() || '';
    }

    const result = await fetchCountries(lang);
    if (!result) {
        return undefined;
    }

    const match = Object.entries(result.countries).find(([, n]) => n === name);
    return match?.[0];
}
