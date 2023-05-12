import { getShippingPrice, Weight } from './shipping';

describe('getShippingPrice', () => {
    it('return small envelope shipping price for known country', () => {
        expect(getShippingPrice('france', Weight.SMALL_ENVELOPE)).toBeCloseTo(5.45);
    });

    it('return large envelope shipping price for known country', () => {
        expect(getShippingPrice('france', Weight.LARGE_ENVELOPE)).toBeCloseTo(6.05);
    });

    it('return small package shipping price for known country', () => {
        expect(getShippingPrice('france', Weight.SMALL_PACKAGE)).toBeCloseTo(7.5);
    });

    it('return large package shipping price for known country', () => {
        expect(getShippingPrice('france', Weight.LARGE_PACKAGE)).toBeCloseTo(9.4);
    });

    it('return shipping price for extra large weight split', () => {
        const weight = Weight.LARGE_PACKAGE + Weight.SMALL_PACKAGE;
        expect(getShippingPrice('france', weight)).toBeCloseTo(16.9);
    });

    it('return shipping price for extra large weight split and multiplied', () => {
        const weight = Weight.LARGE_PACKAGE * 3;
        expect(getShippingPrice('france', weight)).toBeCloseTo(33.58);
    });

    it('return -1 for unknown country', () => {
        expect(getShippingPrice('unknown', Weight.SMALL_ENVELOPE)).toBeCloseTo(-1);
    });

    it('return -1 for unsupported country', () => {
        expect(getShippingPrice('afghanistan', Weight.SMALL_ENVELOPE)).toBeCloseTo(-1);
    });
});
