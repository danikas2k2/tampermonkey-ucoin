import { parsePrice, formatNumber, formatPrice } from './prices';

describe('parsePrice', () => {
    it('return undefined for undefined input', () => {
        expect(parsePrice(undefined)).toBeUndefined();
    });

    it('return undefined for empty string', () => {
        expect(parsePrice('')).toBeUndefined();
    });

    it('return undefined for non-numeric string', () => {
        expect(parsePrice('abc')).toBeUndefined();
    });

    it('parse plain number string', () => {
        expect(parsePrice('42')).toBe(42);
    });

    it('parse decimal number string', () => {
        expect(parsePrice('3.14')).toBeCloseTo(3.14);
    });

    it('strip currency symbol and parse', () => {
        expect(parsePrice('€ 1.50')).toBeCloseTo(1.5);
    });

    it('strip comma and parse remaining digits as number', () => {
        expect(parsePrice('1,250.00')).toBeCloseTo(1250);
    });

    it('parse zero', () => {
        expect(parsePrice('0')).toBe(0);
    });

    it('return undefined for string that becomes empty after stripping', () => {
        expect(parsePrice('€')).toBeUndefined();
    });
});

describe('formatNumber', () => {
    it('format integer', () => {
        expect(formatNumber(1000)).toBe('1,000');
    });

    it('format decimal with maximum 2 decimal places', () => {
        expect(formatNumber(3.14159)).toBe('3.14');
    });

    it('format zero', () => {
        expect(formatNumber(0)).toBe('0');
    });

    it('format small decimal', () => {
        expect(formatNumber(0.5)).toBe('0.5');
    });

    it('format large number', () => {
        expect(formatNumber(1234567)).toBe('1,234,567');
    });
});

describe('formatPrice', () => {
    it('format price with EUR currency symbol', () => {
        expect(formatPrice(10)).toMatch(/€/);
        expect(formatPrice(10)).toContain('10');
    });

    it('format price with two decimal places', () => {
        expect(formatPrice(1.5)).toMatch(/1\.50/);
    });

    it('format zero price', () => {
        expect(formatPrice(0)).toMatch(/€/);
        expect(formatPrice(0)).toContain('0');
    });

    it('format large price with thousand separator', () => {
        expect(formatPrice(1234.56)).toMatch(/1,234/);
    });
});
