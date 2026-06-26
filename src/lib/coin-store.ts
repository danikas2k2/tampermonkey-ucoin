import { API_BASE, getApiHeaders } from './api';
import { type CoinEntry, coinId, type CoinMintage, type CoinSide } from './scraper';
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

/** Returns a copy of `source` with undefined values stripped. */
function withDefined<T extends object>(source: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(source).filter(([, v]) => v !== undefined)
    ) as Partial<T>;
}

function mergeSide(existing: CoinSide, incoming: CoinSide): CoinSide {
    return { ...existing, ...withDefined(incoming) };
}

function diffSide(before: CoinSide, after: CoinSide): CoinSide | undefined {
    const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]) as Set<keyof CoinSide>;
    const changed = [...allKeys].filter(
        (k) => JSON.stringify(before[k]) !== JSON.stringify(after[k])
    );
    if (changed.length === 0) {
        return undefined;
    }
    return Object.fromEntries(changed.map((k) => [k, after[k]])) as CoinSide;
}

function mintageKey(row: CoinMintage, fallbackYear?: string): string {
    return row.year ?? fallbackYear ?? row.mint ?? '';
}

function mergeMintage(
    existing: CoinMintage[],
    incoming: CoinMintage[],
    fallbackYear?: string
): CoinMintage[] {
    const map = new Map<string, CoinMintage>();
    for (const row of existing) {
        map.set(mintageKey(row, fallbackYear), row);
    }
    for (const row of incoming) {
        const k = mintageKey(row, fallbackYear);
        const prev = map.get(k);
        map.set(k, prev ? { ...prev, ...withDefined(row) } : row);
    }
    return [...map.values()];
}

function diffMintage(
    before: CoinMintage[],
    after: CoinMintage[],
    fallbackYear?: string
): CoinMintage[] | undefined {
    const beforeMap = new Map<string, CoinMintage>();
    for (const row of before) {
        beforeMap.set(mintageKey(row, fallbackYear), row);
    }
    const changed: CoinMintage[] = [];
    for (const row of after) {
        const k = mintageKey(row, fallbackYear);
        const prev = beforeMap.get(k);
        if (!prev) {
            changed.push(row);
            continue;
        }
        const idField: Partial<CoinMintage> =
            row.year !== undefined
                ? { year: row.year }
                : row.mint !== undefined
                  ? { mint: row.mint }
                  : fallbackYear !== undefined
                    ? { year: fallbackYear }
                    : {};
        const allKeys = new Set([...Object.keys(prev), ...Object.keys(row)]) as Set<
            keyof CoinMintage
        >;
        const diffFields = Object.fromEntries(
            [...allKeys]
                .filter((key) => JSON.stringify(prev[key]) !== JSON.stringify(row[key]))
                .map((key) => [key, row[key]])
        ) as Partial<CoinMintage>;
        if (Object.keys(diffFields).length > 0) {
            changed.push({ ...idField, ...diffFields });
        }
    }
    return changed.length > 0 ? changed : undefined;
}

function mergePartialEntry(
    existing: CoinChanges,
    incoming: CoinChanges,
    fallbackYear?: string
): CoinChanges {
    const { obverse, reverse, edge, mintage, ...simpleIncoming } = incoming;
    const result: CoinChanges = { ...existing, ...withDefined(simpleIncoming) };
    if (obverse !== undefined) {
        result.obverse = existing.obverse ? mergeSide(existing.obverse, obverse) : obverse;
    }
    if (reverse !== undefined) {
        result.reverse = existing.reverse ? mergeSide(existing.reverse, reverse) : reverse;
    }
    if (edge !== undefined) {
        result.edge = existing.edge ? mergeSide(existing.edge, edge) : edge;
    }
    if (mintage !== undefined) {
        result.mintage = existing.mintage
            ? mergeMintage(existing.mintage, mintage, fallbackYear)
            : mintage;
    }
    return result;
}

function mergeEntry(existing: CoinEntry, incoming: CoinEntry): CoinEntry {
    return mergePartialEntry(existing, incoming, existing.year) as CoinEntry;
}

function diffEntry(before: CoinEntry, after: CoinEntry): CoinChanges {
    const { obverse: bObv, reverse: bRev, edge: bEdge, mintage: bMint, ...simpleBefore } = before;
    const { obverse: aObv, reverse: aRev, edge: aEdge, mintage: aMint, ...simpleAfter } = after;

    const allSimpleKeys = new Set([
        ...Object.keys(simpleBefore),
        ...Object.keys(simpleAfter),
    ]) as Set<keyof typeof simpleAfter>;
    const diff: CoinChanges = Object.fromEntries(
        [...allSimpleKeys]
            .filter((k) => JSON.stringify(simpleBefore[k]) !== JSON.stringify(simpleAfter[k]))
            .map((k) => [k, simpleAfter[k]])
    ) as CoinChanges;

    if (aObv) {
        const d = bObv ? diffSide(bObv, aObv) : aObv;
        if (d) {
            diff.obverse = d;
        }
    }
    if (aRev) {
        const d = bRev ? diffSide(bRev, aRev) : aRev;
        if (d) {
            diff.reverse = d;
        }
    }
    if (aEdge) {
        const d = bEdge ? diffSide(bEdge, aEdge) : aEdge;
        if (d) {
            diff.edge = d;
        }
    }

    const mintageDiff = diffMintage(bMint ?? [], aMint ?? [], after.year);
    if (mintageDiff) {
        diff.mintage = mintageDiff;
    }

    return diff;
}

function mergeChanges(existing: CoinChanges, incoming: CoinChanges): CoinChanges {
    return mergePartialEntry(existing, incoming);
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
