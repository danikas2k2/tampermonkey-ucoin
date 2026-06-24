const store: Record<string, unknown> = {};
vi.mock('./storage', () => ({
    getItem: vi.fn(async (key: string) => store[key] ?? null),
    setItem: vi.fn(async (key: string, value: unknown) => {
        store[key] = value;
        return true;
    }),
}));

import { getPayPalPrice } from './paypal';

const mockFetch = (rates: { fixed: number; variable: number }) => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({
            Expires: new Date(Date.now() + 86400_000).toUTCString(),
            'Last-Modified': new Date().toUTCString(),
        }),
        json: async () => rates,
    } as Response);
};

beforeEach(() => {
    for (const key of Object.keys(store)) {
        delete store[key];
    }
    vi.clearAllMocks();
});

describe('getPayPalPrice', () => {
    it('calculates price with variable and fixed rates', async () => {
        mockFetch({ fixed: 0.35, variable: 3.4 });
        const result = await getPayPalPrice('france', 10);
        expect(result).not.toBeNull();
        // charges = 10 * 0.034 + 0.35 = 0.34 + 0.35 = 0.69
        expect(result!.charges).toBeCloseTo(0.69);
        expect(result!.price).toBeCloseTo(10.69);
        expect(result!.percents).toBe(3.4);
        expect(result!.fixed).toBe(0.35);
    });

    it('returns null when API fails', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            headers: new Headers(),
            json: async () => ({}),
        } as Response);
        expect(await getPayPalPrice('france', 10)).toBeNull();
    });

    it('returns null on network error', async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error('network'));
        expect(await getPayPalPrice('france', 10)).toBeNull();
    });

    it('scales charges proportionally to price', async () => {
        mockFetch({ fixed: 0.35, variable: 5.0 });
        const r1 = await getPayPalPrice('lt', 20);
        vi.clearAllMocks();
        mockFetch({ fixed: 0.35, variable: 5.0 });
        const r2 = await getPayPalPrice('uk', 40);
        // charges should double when price doubles (fixed stays)
        expect(r2!.charges - r1!.charges).toBeCloseTo(1.0);
    });
});
