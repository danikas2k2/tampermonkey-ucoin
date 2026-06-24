import { IDBFactory } from 'fake-indexeddb';
import { apiFetch } from './api';

const freshIdb = () => {
    const idb = new IDBFactory();
    global.indexedDB = idb;
    Object.defineProperty(window, 'indexedDB', { value: idb, writable: true, configurable: true });
};

const futureExpires = () => new Date(Date.now() + 86400_000).toUTCString();
const pastExpires = () => new Date(Date.now() - 1000).toUTCString();
const lastModified = () => new Date(Date.now() - 5000).toUTCString();

const makeHeaders = (overrides: Record<string, string> = {}) =>
    new Headers({ Expires: futureExpires(), 'Last-Modified': lastModified(), ...overrides });

beforeEach(freshIdb);

describe('apiFetch', () => {
    it('fetches and returns data', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            headers: makeHeaders(),
            json: async () => ({ value: 42 }),
        } as Response);
        expect(await apiFetch('/test', 'k1')).toEqual({ value: 42 });
    });

    it('returns null on non-ok response', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            headers: new Headers(),
            json: async () => ({}),
        } as Response);
        expect(await apiFetch('/test', 'k2')).toBeNull();
    });

    it('returns null on network error', async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error('network'));
        expect(await apiFetch('/test', 'k3')).toBeNull();
    });

    it('returns cached data on second call without fetching', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            headers: makeHeaders(),
            json: async () => ({ v: 1 }),
        } as Response);
        global.fetch = fetchMock;
        await apiFetch('/test', 'k4');
        await apiFetch('/test', 'k4');
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('re-fetches when cache is expired', async () => {
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: makeHeaders({ Expires: pastExpires() }),
                json: async () => ({ v: 1 }),
            } as Response)
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: makeHeaders(),
                json: async () => ({ v: 2 }),
            } as Response);
        global.fetch = fetchMock;
        await apiFetch('/test', 'k5');
        const result = await apiFetch('/test', 'k5');
        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(result).toEqual({ v: 2 });
    });

    it('sends If-Modified-Since on re-fetch after expiry', async () => {
        const lm = lastModified();
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: makeHeaders({ Expires: pastExpires(), 'Last-Modified': lm }),
                json: async () => ({ v: 1 }),
            } as Response)
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: makeHeaders(),
                json: async () => ({ v: 2 }),
            } as Response);
        global.fetch = fetchMock;
        await apiFetch('/test', 'k6');
        await apiFetch('/test', 'k6');
        expect(fetchMock.mock.calls[1][1].headers['If-Modified-Since']).toBe(lm);
    });

    it('returns cached data on 304 and updates expires', async () => {
        const newExpires = futureExpires();
        global.fetch = vi
            .fn()
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: makeHeaders({ Expires: pastExpires() }),
                json: async () => ({ v: 1 }),
            } as Response)
            .mockResolvedValueOnce({
                ok: false,
                status: 304,
                headers: new Headers({ Expires: newExpires }),
                json: async () => ({}),
            } as unknown as Response);
        await apiFetch('/test', 'k7');
        const result = await apiFetch('/test', 'k7');
        expect(result).toEqual({ v: 1 });
    });

    it('does not cache when Expires header is missing', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            headers: new Headers({ 'Last-Modified': lastModified() }),
            json: async () => ({ v: 1 }),
        } as Response);
        global.fetch = fetchMock;
        await apiFetch('/test', 'k8');
        await apiFetch('/test', 'k8');
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('does not cache when Last-Modified header is missing', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            headers: new Headers({ Expires: futureExpires() }),
            json: async () => ({ v: 1 }),
        } as Response);
        global.fetch = fetchMock;
        await apiFetch('/test', 'k9');
        await apiFetch('/test', 'k9');
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('304 with only Last-Modified updates lastModified but not expires', async () => {
        const newLm = new Date(Date.now() - 100).toUTCString();
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: makeHeaders({ Expires: pastExpires() }),
                json: async () => ({ v: 1 }),
            } as Response)
            .mockResolvedValueOnce({
                ok: false,
                status: 304,
                headers: new Headers({ 'Last-Modified': newLm }),
                json: async () => ({}),
            } as unknown as Response);
        global.fetch = fetchMock;
        await apiFetch('/test', 'k10');
        const result = await apiFetch('/test', 'k10');
        expect(result).toEqual({ v: 1 });
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });
});
