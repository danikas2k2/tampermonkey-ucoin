import countryCodes from '../data/country-codes.json';
import shippingPrices from '../data/shipping-prices.json';

export const enum Weight {
    SMALL_ENVELOPE = 50,
    LARGE_ENVELOPE = 450,
    SMALL_PACKAGE = 900,
    MEDIUM_PACKAGE = 1400,
    LARGE_PACKAGE = 1900,
}

// TODO add currency support for shipping prices
// TODO add support for number of coins
export function getShippingPrice(country: string, weight: number): number {
    const countryCode = (countryCodes as MapOf)[country];
    if (!(countryCode in shippingPrices)) {
        return -1;
    }

    // Split large packages into multiple packages, because they are cheaper
    if (weight > Weight.LARGE_PACKAGE) {
        return +(
            getShippingPrice(country, weight % Weight.LARGE_PACKAGE) +
            getShippingPrice(country, Weight.LARGE_PACKAGE) *
            Math.floor(weight / Weight.LARGE_PACKAGE)
        ).toFixed(2);
    }

    const prices = (shippingPrices as Prices)[countryCode];
    return Object.entries(prices).find(([w]) => weight <= +w)?.[1] || -1;
}
