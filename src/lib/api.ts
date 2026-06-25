import { getItem, setItem } from './storage';

export const API_BASE = 'https://api.andriaus.com';

if (GM_getValue('apiKey') == null) {
    GM_setValue('apiKey', '');
}
if (GM_getValue('apiUser') == null) {
    GM_setValue('apiUser', '');
}

export function getApiHeaders(extra?: Record<string, string>): Record<string, string> {
    return {
        'x-api-key': GM_getValue('apiKey', ''),
        'x-api-user': GM_getValue('apiUser', ''),
        ...extra,
    };
}

interface CacheEntry<T> {
    data: T;
    expires: string;
    lastModified: string;
}

export async function apiFetch<T>(path: string, cacheKey: string): Promise<T | null> {
    let cached: CacheEntry<T> | null = null;

    const entry = await getItem<CacheEntry<T>>(cacheKey);
    if (entry) {
        if (new Date(entry.expires) > new Date()) {
            return entry.data;
        }
        cached = entry;
    }

    try {
        const headers = getApiHeaders();
        if (cached?.lastModified) {
            headers['If-Modified-Since'] = cached.lastModified;
        }
        const response = await fetch(`${API_BASE}${path}`, { headers });
        if (response.status === 304 && cached) {
            const expires = response.headers.get('Expires');
            const lastModified = response.headers.get('Last-Modified');
            if (expires || lastModified) {
                await setItem(cacheKey, {
                    ...cached,
                    ...(expires && { expires }),
                    ...(lastModified && { lastModified }),
                });
            }
            return cached.data;
        }
        if (!response.ok) {
            return null;
        }
        const data: T = await response.json();
        const expires = response.headers.get('Expires');
        const lastModified = response.headers.get('Last-Modified');
        if (expires && lastModified) {
            await setItem(cacheKey, { data, expires, lastModified });
        }
        return data;
    } catch {
        return null;
    }
}
