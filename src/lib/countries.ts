import { apiFetch } from './api';
import { lang } from './lang';

export async function getCountryId(name: string): Promise<string | undefined> {
    if (name.includes(',')) {
        name = name.split(',').pop()?.trim() || '';
    }

    const countries = await apiFetch<Record<string, string>>(
        `/countries/${lang}`,
        `countries_${lang}`
    );
    if (!countries) {
        return undefined;
    }

    const match = Object.entries(countries).find(([, n]) => n === name);
    return match?.[0];
}
