import { IDBFactory } from 'fake-indexeddb';
import { getItem, removeItem, setItem } from './storage';

const freshIdb = () => {
    const idb = new IDBFactory();
    global.indexedDB = idb;
    Object.defineProperty(window, 'indexedDB', { value: idb, writable: true, configurable: true });
};

// Each test gets a fresh IndexedDB instance so tests are isolated
beforeEach(freshIdb);

describe('storage', () => {
    it('returns null for missing key', async () => {
        expect(await getItem('missing')).toBeNull();
    });

    it('stores and retrieves a value', async () => {
        await setItem('key', { a: 1 });
        expect(await getItem('key')).toEqual({ a: 1 });
    });

    it('overwrites an existing value', async () => {
        await setItem('key', 'first');
        await setItem('key', 'second');
        expect(await getItem('key')).toBe('second');
    });

    it('removes a key', async () => {
        await setItem('key', 'value');
        await removeItem('key');
        expect(await getItem('key')).toBeNull();
    });

    it('removeItem on missing key returns true', async () => {
        expect(await removeItem('nonexistent')).toBe(true);
    });

    it('setItem returns true on success', async () => {
        expect(await setItem('x', 1)).toBe(true);
    });
});

describe('storage error paths', () => {
    it('getItem returns null when indexedDB.open fails', async () => {
        Object.defineProperty(window, 'indexedDB', {
            value: {
                open: () => {
                    const req = {} as IDBOpenDBRequest;
                    setTimeout(() => (req as unknown as { onerror: () => void }).onerror?.(), 0);
                    return req;
                },
            },
            writable: true,
            configurable: true,
        });
        expect(await getItem('key')).toBeNull();
        freshIdb();
    });

    it('setItem returns false when indexedDB.open fails', async () => {
        Object.defineProperty(window, 'indexedDB', {
            value: {
                open: () => {
                    const req = {} as IDBOpenDBRequest;
                    setTimeout(() => (req as unknown as { onerror: () => void }).onerror?.(), 0);
                    return req;
                },
            },
            writable: true,
            configurable: true,
        });
        expect(await setItem('key', 'val')).toBe(false);
        freshIdb();
    });

    it('removeItem returns false when indexedDB.open fails', async () => {
        Object.defineProperty(window, 'indexedDB', {
            value: {
                open: () => {
                    const req = {} as IDBOpenDBRequest;
                    setTimeout(() => (req as unknown as { onerror: () => void }).onerror?.(), 0);
                    return req;
                },
            },
            writable: true,
            configurable: true,
        });
        expect(await removeItem('key')).toBe(false);
        freshIdb();
    });
});
