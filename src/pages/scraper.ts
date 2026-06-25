import { flushOneChange, flushOneImage, ingestCoin } from '../lib/coin-store';
import {
    type CoinEntry,
    detectPageType,
    extractCatalogCoins,
    extractCoinTypeDetails,
    extractGalleryCoins,
    extractPeriodCoins,
} from '../lib/scraper';

export function scrapePage(doc: Document): CoinEntry[] {
    const pageType = detectPageType(doc);
    switch (pageType.kind) {
        case 'period': {
            return extractPeriodCoins(doc).map((c) => ({ ...pageType, ...c }));
        }
        case 'catalog': {
            return extractCatalogCoins(doc).map((c) => ({ ...pageType, ...c }));
        }
        case 'gallery': {
            return extractGalleryCoins(doc).map((c) => ({ ...pageType, ...c }));
        }
        case 'coin': {
            const details = extractCoinTypeDetails(doc);
            if (!details) {
                return [];
            }
            return [{ ...pageType, ...details }];
        }
        case 'unknown':
        default: {
            return [];
        }
    }
}

async function ingestAll(coins: CoinEntry[]): Promise<void> {
    for (const coin of coins) {
        await ingestCoin(coin);
    }
}

// ---------------------------------------------------------------------------
// Background flusher — runs on every page load, one request per tick
// ---------------------------------------------------------------------------

function startBackgroundSync(): void {
    let running = false;

    async function tick(): Promise<void> {
        if (running) {
            return;
        }
        running = true;
        try {
            const didChange = await flushOneChange();
            if (!didChange) {
                await flushOneImage();
            }
        } finally {
            running = false;
        }
    }

    // Run once on load, then every 5 seconds
    void tick();
    setInterval(() => void tick(), 5000);
}

export async function handleScraperPage(): Promise<void> {
    startBackgroundSync();

    const coins = scrapePage(document);
    console.info(`[DEV]`, coins);
    if (coins.length > 0) {
        await ingestAll(coins);
    }
}
