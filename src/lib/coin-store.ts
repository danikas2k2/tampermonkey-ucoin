import { API_BASE, getApiHeaders } from './api';
import { type CoinEntry, coinId } from './scraper';
import { getAllKeys, getItem, removeItem, setItem } from './storage';

// ---------------------------------------------------------------------------
// Keys
// ---------------------------------------------------------------------------

const keyCoin = (id: string) => `coin:${id}`;
const keyChanges = (id: string) => `changes:${id}`;

const KEY_PENDING_CHANGE_PREFIX = 'pending:change:';
const keyPendingChange = (id: string) => `${KEY_PENDING_CHANGE_PREFIX}${id}`;

const KEY_PENDING_IMAGE_PREFIX = 'pending:image:';
const keyPendingImage = (url: string) => `${KEY_PENDING_IMAGE_PREFIX}${url}`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CoinChanges = Partial<CoinEntry>;

// ---------------------------------------------------------------------------
// Merge helpers
// ---------------------------------------------------------------------------

/**
 * Merge incoming (possibly partial) data onto existing stored data.
 * Rule: incoming defined value always wins over existing (including overwriting).
 * Incoming undefined never overwrites an existing defined value.
 */
function mergeEntry(existing: CoinEntry, incoming: CoinEntry): CoinEntry {
    const result = { ...existing };
    for (const key of Object.keys(incoming) as (keyof CoinEntry)[]) {
        const val = incoming[key];
        if (val !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (result as any)[key] = val;
        }
    }
    return result;
}

/**
 * Compute the diff between old and new: only keys whose value changed.
 */
function diffEntry(before: CoinEntry, after: CoinEntry): CoinChanges {
    const diff: CoinChanges = {};
    const keys = new Set([
        ...(Object.keys(before) as (keyof CoinEntry)[]),
        ...(Object.keys(after) as (keyof CoinEntry)[]),
    ]);
    for (const key of keys) {
        const a = before[key];
        const b = after[key];
        if (JSON.stringify(a) !== JSON.stringify(b)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (diff as any)[key] = b;
        }
    }
    return diff;
}

/**
 * Merge two changesets: prefer the newer value when the same key appears in both.
 */
function mergeChanges(existing: CoinChanges, incoming: CoinChanges): CoinChanges {
    const result = { ...existing };
    for (const key of Object.keys(incoming) as (keyof CoinChanges)[]) {
        const val = incoming[key];
        if (val !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (result as any)[key] = val;
        }
    }
    return result;
}

// ---------------------------------------------------------------------------
// Pending queue helpers — each item is its own IDB key (race-safe across tabs)
// ---------------------------------------------------------------------------

async function addToPendingChanges(id: string): Promise<void> {
    await setItem(keyPendingChange(id), 1);
}

async function getPendingChangeId(): Promise<string | undefined> {
    const keys = await getAllKeys(KEY_PENDING_CHANGE_PREFIX);
    return keys[0]?.slice(KEY_PENDING_CHANGE_PREFIX.length);
}

async function removePendingChange(id: string): Promise<void> {
    await removeItem(keyPendingChange(id));
}

async function addToPendingImages(url: string): Promise<void> {
    await setItem(keyPendingImage(url), 1);
}

async function getPendingImageUrl(): Promise<string | undefined> {
    const keys = await getAllKeys(KEY_PENDING_IMAGE_PREFIX);
    return keys[0]?.slice(KEY_PENDING_IMAGE_PREFIX.length);
}

async function removePendingImage(url: string): Promise<void> {
    await removeItem(keyPendingImage(url));
}

// ---------------------------------------------------------------------------
// Image tracking
// ---------------------------------------------------------------------------

async function trackImages(entry: CoinEntry): Promise<void> {
    const sides: ('obverse' | 'reverse')[] = ['obverse', 'reverse'];
    for (const side of sides) {
        const src = entry[side]?.imageUrl;
        if (!src) {
            continue;
        }
        await addToPendingImages(src);
    }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Ingest a scraped coin entry: merge with stored data, record changeset and image updates.
 */
export async function ingestCoin(incoming: CoinEntry): Promise<void> {
    const id = coinId(incoming);
    if (!id) {
        return;
    }

    const existing = await getItem<CoinEntry>(keyCoin(id));

    if (!existing) {
        await setItem(keyCoin(id), incoming);
        await trackImages(incoming);
        const existingChanges = await getItem<CoinChanges>(keyChanges(id));
        const merged = mergeChanges(existingChanges ?? {}, incoming);
        if (Object.keys(merged).length > 0) {
            await setItem(keyChanges(id), merged);
            await addToPendingChanges(id);
        }
        return;
    }

    const merged = mergeEntry(existing, incoming);
    const diff = diffEntry(existing, merged);

    if (Object.keys(diff).length === 0) {
        return;
    }

    await setItem(keyCoin(id), merged);
    await trackImages(merged);

    const existingChanges = await getItem<CoinChanges>(keyChanges(id));
    const mergedChanges = mergeChanges(existingChanges ?? {}, diff);
    await setItem(keyChanges(id), mergedChanges);
    await addToPendingChanges(id);
}

// ---------------------------------------------------------------------------
// Background sync — one call per invocation, meant to be called repeatedly
// ---------------------------------------------------------------------------

/**
 * Send one pending changeset to the API. Removes it from the index on success.
 * Returns true if a request was made, false if queue was empty.
 */
export async function flushOneChange(): Promise<boolean> {
    const id = await getPendingChangeId();
    if (!id) {
        return false;
    }

    const changes = await getItem<CoinChanges>(keyChanges(id));
    if (!changes) {
        await removePendingChange(id);
        return false;
    }

    try {
        const res = await fetch(`${API_BASE}/ucoin/update`, {
            method: 'POST',
            headers: getApiHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ id, changes }),
        });
        if (res.ok) {
            await removeItem(keyChanges(id));
            await removePendingChange(id);
        }
    } catch {
        // network error — leave in queue, retry next time
    }

    return true;
}

/**
 * Upload one pending image to the API. Removes it from the index on success.
 * Returns true if a request was made, false if queue was empty.
 */
export async function flushOneImage(): Promise<boolean> {
    const url = await getPendingImageUrl();
    if (!url) {
        return false;
    }

    try {
        const blob = await new Promise<Blob>((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url,
                responseType: 'blob',
                onload: (r) => resolve(r.response as Blob),
                onerror: reject,
            });
        });
        const ext = url.split('.').pop() ?? 'jpg';
        const form = new FormData();
        form.append('url', url);
        form.append('file', blob, `image.${ext}`);
        const res = await fetch(`${API_BASE}/ucoin/upload`, {
            method: 'POST',
            headers: getApiHeaders(),
            body: form,
        });
        if (res.ok) {
            await removePendingImage(url);
        }
    } catch {
        // network error or image unavailable — leave in queue, retry next time
    }

    return true;
}
