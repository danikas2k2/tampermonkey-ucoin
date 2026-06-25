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

export async function handleScraperPage(): Promise<void> {
    const data = scrapePage(document);
    console.info(`[DEV]`, data);
}
