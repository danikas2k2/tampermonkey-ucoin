const store: Record<string, unknown> = {};
jest.mock('./storage', () => ({
    getItem: jest.fn(async (key: string) => store[key] ?? null),
    setItem: jest.fn(async (key: string, value: unknown) => {
        store[key] = value;
        return true;
    }),
}));

import { getCountryId } from './countries';

const mockFetch = (countries: Record<string, string>) => {
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        headers: new Headers({
            Expires: new Date(Date.now() + 86400_000).toUTCString(),
            'Last-Modified': new Date().toUTCString(),
        }),
        json: async () => countries,
    } as Response);
};

beforeEach(() => {
    for (const key of Object.keys(store)) {
        delete store[key];
    }
    jest.clearAllMocks();
});

describe('getCountryId', () => {
    it('returns country id for known name', async () => {
        mockFetch({ france: 'France', germany: 'Germany' });
        expect(await getCountryId('France')).toBe('france');
    });

    it('returns undefined for unknown name', async () => {
        mockFetch({ france: 'France' });
        expect(await getCountryId('Unknown')).toBeUndefined();
    });

    it('returns undefined when API fails', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 500,
            headers: new Headers(),
            json: async () => ({}),
        } as Response);
        expect(await getCountryId('France')).toBeUndefined();
    });

    it('strips trailing comma-prefix from name', async () => {
        mockFetch({ france: 'France' });
        expect(await getCountryId('Something, France')).toBe('france');
    });

    it('trims whitespace after comma split', async () => {
        mockFetch({ france: 'France' });
        expect(await getCountryId('City,  France')).toBe('france');
    });
});
