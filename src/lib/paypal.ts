import paypalCountries from '../data/paypal-countries.json';

export function getPayPalCharges(country: string): number {
    switch ((paypalCountries as MapOf)[country]) {
        case 'eu':
            return 3.4;
        case 'uk':
            return 4.69; // 3.4 + 1.29
        default:
            return 5.39; // 3.4 + 2.99
    }
}

export interface PayPalPrice {
    price: number;
    charges: number;
    percents: number;
    fixed: number;
}

// TODO add discount/custom prices
export function getPayPalPrice(country: string, price: number): PayPalPrice {
    const fixed = 0.35;
    const percents = getPayPalCharges(country);
    const charges = price * (percents / 100) + fixed;
    return {
        price: price + charges,
        charges,
        percents,
        fixed,
    };
}
