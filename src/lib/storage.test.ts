import { IDBFactory } from 'fake-indexeddb';
import { getItem, removeItem, setItem } from './storage';

// Each test gets a fresh IndexedDB instance so tests are isolated
beforeEach(() => {
    const idb = new IDBFactory();
    global.indexedDB = idb;
    Object.defineProperty(window, 'indexedDB', { value: idb, writable: true, configurable: true });
});

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
