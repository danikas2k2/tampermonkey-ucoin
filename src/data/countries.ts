import countryNames from './country-names.json';

const nameToCountry = Object.fromEntries(
    Object.entries(countryNames).flatMap(([id, variants]) =>
        Object.values(variants).map((variant) => [variant, id])
    )
);

export function getCountryId(name: string): string | undefined {
    if (name.includes(',')) {
        name = name.split(',').pop()?.trim() || '';
    }
    return nameToCountry[name];
}
