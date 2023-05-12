import { getPayPalCharges } from './paypal';

describe('getPayPalCharges', () => {
    it('return paypal charges for europe country', () => {
        expect(getPayPalCharges('france')).toBeCloseTo(3.4);
    });

    it('return paypal charges for uk related country', () => {
        expect(getPayPalCharges('gibraltar')).toBeCloseTo(4.69);
    });

    it('return paypal charges for other country', () => {
        expect(getPayPalCharges('afghanistan')).toBeCloseTo(5.39);
    });

    it('return paypal charges for unknown country', () => {
        // unknown country is considered as other
        expect(getPayPalCharges('unknown')).toBeCloseTo(5.39);
    });
});
