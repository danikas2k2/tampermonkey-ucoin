const DB_NAME = 'ucoin';
const DB_VERSION = 1;
const STORE_NAME = 'cache';

function openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = () => {
            request.result.createObjectStore(STORE_NAME);
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function getItem<T>(key: string): Promise<T | null> {
    try {
        const db = await openDb();
        return await new Promise((resolve) => {
            const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(key);
            request.onsuccess = () => resolve((request.result as T) ?? null);
            request.onerror = () => resolve(null);
        });
    } catch {
        return null;
    }
}

export async function setItem<T>(key: string, value: T): Promise<boolean> {
    try {
        const db = await openDb();
        return await new Promise((resolve) => {
            const request = db
                .transaction(STORE_NAME, 'readwrite')
                .objectStore(STORE_NAME)
                .put(value, key);
            request.onsuccess = () => resolve(true);
            request.onerror = () => resolve(false);
        });
    } catch {
        return false;
    }
}

export async function getAllKeys(prefix: string): Promise<string[]> {
    try {
        const db = await openDb();
        return await new Promise((resolve) => {
            const range = IDBKeyRange.bound(prefix, prefix + '￿');
            const request = db
                .transaction(STORE_NAME, 'readonly')
                .objectStore(STORE_NAME)
                .getAllKeys(range);
            request.onsuccess = () => resolve((request.result as string[]) ?? []);
            request.onerror = () => resolve([]);
        });
    } catch {
        return [];
    }
}

export async function removeItem(key: string): Promise<boolean> {
    try {
        const db = await openDb();
        return await new Promise((resolve) => {
            const request = db
                .transaction(STORE_NAME, 'readwrite')
                .objectStore(STORE_NAME)
                .delete(key);
            request.onsuccess = () => resolve(true);
            request.onerror = () => resolve(false);
        });
    } catch {
        return false;
    }
}
