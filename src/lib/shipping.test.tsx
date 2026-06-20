import { getShippingPrice, Weight } from './shipping';

type PartialEntry = { weightFrom: number; weightTo: number; price: number };

const makeResponse = (entries: PartialEntry[]) => ({
    prices: entries.map((e) => ({
        country: 'fr',
        provider: 'post' as const,
        size: 'sm' as const,
        ...e,
    })),
    updatedAt: new Date(Date.now() - 1000).toISOString(),
    validTo: new Date(Date.now() + 86400_000).toISOString(),
});

const mockFetch = (entries: PartialEntry[]) => {
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => makeResponse(entries),
    } as Response);
};

// Realistic brackets: each tier covers up to its weightTo
const BRACKETS: PartialEntry[] = [
    { weightFrom: 0, weightTo: Weight.SMALL_ENVELOPE, price: 5.45 },
    { weightFrom: Weight.SMALL_ENVELOPE + 1, weightTo: Weight.LARGE_ENVELOPE, price: 6.05 },
    { weightFrom: Weight.LARGE_ENVELOPE + 1, weightTo: Weight.SMALL_PACKAGE, price: 7.5 },
    { weightFrom: Weight.SMALL_PACKAGE + 1, weightTo: Weight.MEDIUM_PACKAGE, price: 8.8 },
    { weightFrom: Weight.MEDIUM_PACKAGE + 1, weightTo: Weight.LARGE_PACKAGE, price: 9.4 },
];

beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
});

describe('getShippingPrice', () => {
    it('return small envelope shipping price for known country', async () => {
        mockFetch(BRACKETS);
        expect(await getShippingPrice('france', Weight.SMALL_ENVELOPE)).toBeCloseTo(5.45);
    });

    it('return large envelope shipping price for known country', async () => {
        mockFetch(BRACKETS);
        expect(await getShippingPrice('france', Weight.LARGE_ENVELOPE)).toBeCloseTo(6.05);
    });

    it('return small package shipping price for known country', async () => {
        mockFetch(BRACKETS);
        expect(await getShippingPrice('france', Weight.SMALL_PACKAGE)).toBeCloseTo(7.5);
    });

    it('return large package shipping price for known country', async () => {
        mockFetch(BRACKETS);
        expect(await getShippingPrice('france', Weight.LARGE_PACKAGE)).toBeCloseTo(9.4);
    });

    it('splits when multiple small packages are cheaper than one large', async () => {
        // cheap for up to 1000g, very expensive for 1001-2000g
        mockFetch([
            { weightFrom: 0, weightTo: 1000, price: 5.0 },
            { weightFrom: 1001, weightTo: 2000, price: 15.0 },
        ]);
        // weight=2000: direct=15, split=5+5=10 → split wins
        expect(await getShippingPrice('france', 2000)).toBeCloseTo(10.0);
    });

    it('uses single large package when it is cheaper than splitting', async () => {
        // very cheap large bracket, expensive small
        mockFetch([
            { weightFrom: 0, weightTo: 1000, price: 8.0 },
            { weightFrom: 1001, weightTo: 2000, price: 9.0 },
        ]);
        // weight=2000: direct=9, split=8+8=16 → direct wins
        expect(await getShippingPrice('france', 2000)).toBeCloseTo(9.0);
    });

    it('splits weight beyond all brackets using the cheapest chunks', async () => {
        mockFetch(BRACKETS);
        // 2800g: no direct bracket, best split should use LARGE_PACKAGE + something
        // 1900 (9.4) + 900 (7.5) = 16.9
        expect(
            await getShippingPrice('france', Weight.LARGE_PACKAGE + Weight.SMALL_PACKAGE)
        ).toBeCloseTo(16.9);
    });

    it('uses localStorage cache on second call', async () => {
        mockFetch(BRACKETS);
        await getShippingPrice('france', Weight.SMALL_ENVELOPE);
        await getShippingPrice('france', Weight.SMALL_ENVELOPE);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('return -1 for unknown country', async () => {
        expect(await getShippingPrice('unknown', Weight.SMALL_ENVELOPE)).toBe(-1);
    });

    it('return -1 when API returns no matching prices', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => makeResponse([]),
        } as Response);
        expect(await getShippingPrice('france', Weight.SMALL_ENVELOPE)).toBe(-1);
    });

    it('return -1 when API fails', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: false } as Response);
        expect(await getShippingPrice('france', Weight.SMALL_ENVELOPE)).toBe(-1);
    });
});
