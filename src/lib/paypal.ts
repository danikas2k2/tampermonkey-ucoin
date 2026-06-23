import { apiFetch } from './api';

interface PayPalRates {
    fixed: number;
    variable: number;
}

export interface PayPalPrice {
    price: number;
    charges: number;
    percents: number;
    fixed: number;
}

// TODO add discount/custom prices
export async function getPayPalPrice(country: string, price: number): Promise<PayPalPrice | null> {
    const rates = await apiFetch<PayPalRates>(`/shipping/paypal/${country}`, `paypal_${country}`);
    if (!rates) {
        return null;
    }

    const charges = price * (rates.variable / 100) + rates.fixed;
    return {
        price: price + charges,
        charges,
        percents: rates.variable,
        fixed: rates.fixed,
    };
}
