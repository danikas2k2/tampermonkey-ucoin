/** Coin type — shared by period table, catalog, and coin detail pages. */
export type CoinType = 'regular' | 'commemorative' | 'collector' | 'token';

/** One side (obverse or reverse) of a coin. */
export interface CoinSide {
    imageUrl?: string;
    themes?: string[];
    description?: string;
    legend?: string;
    creators?: string[];
}

/** One mintage row — from either the by-year (tid) or by-mint (cid/ucid) table. */
export interface CoinMintage {
    /** Year label, e.g. "2024". Present on tid pages only. */
    year?: string;
    /** Link to the specific issue page. Present on tid pages only. */
    href?: string;
    /** Mint facility name, e.g. "Austria, Vienna". Present on cid/ucid pages only. */
    mint?: string;
    /** Mintage count. undefined = unspecified, 0 = none (-), -1 = unknown (+), >0 = count. */
    unc?: number;
    bu?: number;
    proof?: number;
    /** Rarity code, e.g. "A", "B". Present on tid pages only. */
    rarity?: string;
    /** Current catalog value in EUR. Present on tid pages only. */
    price?: number;
}

/** A single coin entry from any page (period table, catalog, gallery, or coin detail). */
export interface CoinEntry {
    slug: string;
    /** Price in EUR. For "price1->price2" format only the final value is kept. */
    price?: number;
    tid?: number;
    cid?: number;
    ucid?: number;
    name?: string;
    subject?: string;
    /** true = in collection, false = swap/want, undefined = unknown. */
    has?: boolean;
    km?: string;
    denomination?: string;
    type?: CoinType;
    material?: string;
    weight?: number;
    diameter?: number;
    condition?: string;
    country?: string;
    period?: string;
    periodYears?: string;
    ruler?: string;
    currency?: string;
    /** Year or year range string from coin detail page, e.g. "2002 - 2026". */
    year?: string;
    shape?: string;
    alignment?: string;
    composition?: string;
    thickness?: number;
    obverse?: CoinSide;
    reverse?: CoinSide;
    edge?: CoinSide;
    mintage?: CoinMintage[];
    rarity?: string;
}

/**
 * Returns a stable unique ID for a coin entry regardless of which page it was scraped from.
 * ucid → cid → tid, each prefixed to avoid collisions across ID spaces.
 * Returns undefined only when no ID is available (e.g. slug-only entries).
 */
export function coinId(entry: Pick<CoinEntry, 'ucid' | 'cid' | 'tid'>): string | undefined {
    if (entry.ucid !== undefined) {
        return `u${entry.ucid}`;
    }
    if (entry.cid !== undefined) {
        return `c${entry.cid}`;
    }
    if (entry.tid !== undefined) {
        return `t${entry.tid}`;
    }
    return undefined;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parsePrice(text: string): number | undefined {
    const last = text.split('->').pop() ?? '';
    const m = last.match(/(\d+(?:[.,]\d+)?)/);
    if (!m) {
        return undefined;
    }
    const n = parseFloat(m[1].replace(',', '.'));
    return isNaN(n) ? undefined : n;
}

function parseId(href: string, param: string): number | undefined {
    const m = href.match(new RegExp(`[?&]${param}=(\\d+)`));
    return m ? parseInt(m[1], 10) : undefined;
}

function buildImgUrl(a: HTMLAnchorElement, imgIndex: string): string {
    const imgPath = a.dataset.tooltipImgpath ?? '';
    const sampleId = a.dataset.tooltipSample ?? '0';
    const code = a.dataset.tooltipCode ?? '';
    return `${imgPath}/${sampleId}-${imgIndex}s/${code}.jpg`;
}

function extractCoinImgUrls(container: Element): { obverseUrl: string; reverseUrl: string } {
    const imgs = container.querySelectorAll<HTMLImageElement>('td.coin-img img');
    return {
        obverseUrl: imgs[0]?.getAttribute('src') ?? '',
        reverseUrl: imgs[1]?.getAttribute('src') ?? '',
    };
}

function parseCoinCell(td: Element): CoinEntry | null {
    const a = td.querySelector<HTMLAnchorElement>('a.cell');
    if (!a) {
        return null;
    }

    const href = a.getAttribute('href') ?? '';
    const cid = parseId(href, 'cid');
    const ucid = parseId(href, 'ucid');
    if (cid === undefined && ucid === undefined) {
        return null;
    }

    const slugMatch = href.match(/\/coin\/([^/?]+)\//);
    const obverseUrl = buildImgUrl(a, a.dataset.tooltipSampleImg1 ?? '1');
    const reverseUrl = buildImgUrl(a, a.dataset.tooltipSampleImg2 ?? '2');

    let has: boolean | undefined;
    for (const cls of td.classList) {
        if (cls === 'marked-km' || cls === 'marked-11' || cls === 'marked-12') {
            has = true;
            break;
        }
        if (cls === 'marked-s' || cls === 'marked-w') {
            has = false;
            break;
        }
    }

    const priceVal = parsePrice(a.dataset.tooltipPrice ?? '');

    return {
        slug: slugMatch?.[1] ?? a.dataset.tooltipCode ?? '',
        ...(cid !== undefined && { cid }),
        ...(ucid !== undefined && { ucid }),
        name: a.dataset.tooltipName ?? '',
        subject: a.dataset.tooltipSubject ?? '',
        ...(priceVal !== undefined && { price: priceVal }),
        ...(obverseUrl && { obverse: { imageUrl: obverseUrl } }),
        ...(reverseUrl && { reverse: { imageUrl: reverseUrl } }),
        ...(has !== undefined && { has }),
        km: '',
        denomination: '',
    };
}

// ---------------------------------------------------------------------------
// Period
// ---------------------------------------------------------------------------

/**
 * Extract all coin entries from a period table (circulation, commemorative, or collection).
 */
export function extractPeriodCoins(doc: Document): CoinEntry[] {
    const table = doc.querySelector<HTMLTableElement>('table.table');
    if (!table) {
        return [];
    }

    const results: CoinEntry[] = [];

    const firstRow = table.querySelector<HTMLTableRowElement>('tbody tr');
    const isCommTable = firstRow?.hasAttribute('data-sort-year') ?? false;

    if (isCommTable) {
        for (const tr of table.querySelectorAll<HTMLTableRowElement>('tbody tr')) {
            if (isNaN(parseInt(tr.dataset.sortYear ?? '', 10))) {
                continue;
            }
            const valueTd = tr.querySelector<HTMLElement>('td');
            if (!valueTd) {
                continue;
            }
            const coin = parseCoinCell(valueTd);
            if (!coin) {
                continue;
            }
            coin.km = tr.dataset.sortKmz ?? '';
            coin.denomination = tr.dataset.sortFace ?? '';
            results.push(coin);
        }
    } else {
        const headerCells = Array.from(table.querySelectorAll<HTMLElement>('thead th'));
        const denomHeaders = headerCells.slice(1, headerCells.length - 1);
        const denominations = denomHeaders.map((th) => th.textContent?.trim() ?? '');

        for (const tr of table.querySelectorAll<HTMLTableRowElement>('tbody tr')) {
            if (!tr.querySelector<HTMLElement>('th a.year')) {
                continue;
            }
            tr.querySelectorAll<HTMLElement>('td').forEach((td, i) => {
                const denomination = denominations[i];
                if (!denomination) {
                    return;
                }
                const coin = parseCoinCell(td);
                if (!coin) {
                    return;
                }
                coin.km = td.querySelector<HTMLAnchorElement>('a.cell')?.dataset.tooltipKm ?? '';
                coin.denomination = denomination;
                results.push(coin);
            });
        }
    }

    return results;
}

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

const COIN_INFO_RE = /([\d.]+)g[,\s\xa0]+ø[,\s\xa0]*([\d.]+)mm[,\s\xa0]*(.+?)(?:\s*[·].*)?$/;

function parseCatalogEntry(
    href: string,
    denomText: string,
    yearRange: string,
    subject: string | undefined,
    infoEl: HTMLElement | null,
    statEl: HTMLElement | null,
    obverseUrl: string,
    reverseUrl: string
): CoinEntry | null {
    const tidMatch = href.match(/[?&]tid=(\d+)/);
    if (!tidMatch) {
        return null;
    }
    const tid = parseInt(tidMatch[1], 10);
    const slugMatch = href.match(/\/coin\/([^/?]+)\//);
    const slug = slugMatch ? slugMatch[1] : '';

    const infoClone = infoEl?.cloneNode(true) as HTMLElement | undefined;
    infoClone?.querySelector('.wrap')?.remove();
    const infoText = infoClone?.textContent?.replace(/[\s\xa0]+/g, ' ').trim() ?? '';

    const material = infoEl?.querySelector<HTMLElement>('.wrap')?.textContent?.trim() ?? '';
    let weight = 0;
    let diameter = 0;
    let km = '';

    const infoMatch = infoText.match(COIN_INFO_RE);
    if (infoMatch) {
        weight = parseFloat(infoMatch[1]);
        diameter = parseFloat(infoMatch[2]);
        km = infoMatch[3].trim();
    }

    const haveEl = statEl?.querySelector<HTMLElement>('label b');
    const haveCount = parseInt(haveEl?.textContent ?? '0', 10);
    const has = haveCount > 0 ? true : undefined;

    const priceText =
        statEl
            ?.querySelector<HTMLElement>('.price')
            ?.textContent?.replace(/[^\d.,]/g, '')
            .trim() ?? '';
    const priceVal = parsePrice(priceText);

    return {
        tid,
        slug,
        denomination: denomText,
        year: yearRange,
        ...(subject !== undefined && { subject }),
        material,
        weight,
        diameter,
        km,
        ...(has !== undefined && { has }),
        ...(priceVal !== undefined && { price: priceVal }),
        ...(obverseUrl && { obverse: { imageUrl: obverseUrl } }),
        ...(reverseUrl && { reverse: { imageUrl: reverseUrl } }),
    };
}

/**
 * Extract all coin type summaries from a catalog page.
 * Supports both grid layout (div.coin-block-cell) and list layout (table.coin td.coin-info).
 */
export function extractCatalogCoins(doc: Document): CoinEntry[] {
    // Grid layout
    const gridCells = doc.querySelectorAll<HTMLElement>('.coin-block-cell');
    if (gridCells.length > 0) {
        const results: CoinEntry[] = [];
        for (const cell of gridCells) {
            const link = cell.querySelector<HTMLAnchorElement>('a.left.value');
            if (!link) {
                continue;
            }
            const href = link.getAttribute('href') ?? '';
            const denomText = link.textContent?.trim() ?? '';
            const yearRange =
                cell.querySelector<HTMLElement>('a.right.value')?.textContent?.trim() ?? '';
            const subject = cell.querySelector<HTMLElement>('.wrap.subject')?.textContent?.trim();
            const infoEl = cell.querySelector<HTMLElement>('.info');
            const statEl = cell.querySelector<HTMLElement>('.coin-stat');
            const { obverseUrl, reverseUrl } = extractCoinImgUrls(cell);
            const entry = parseCatalogEntry(
                href,
                denomText,
                yearRange,
                subject,
                infoEl,
                statEl,
                obverseUrl,
                reverseUrl
            );
            if (entry) {
                results.push(entry);
            }
        }
        return results;
    }

    // List layout: each coin is a separate table.coin with td.coin-info
    const results: CoinEntry[] = [];
    for (const td of doc.querySelectorAll<HTMLElement>('table.coin td.coin-info')) {
        const link = td.querySelector<HTMLAnchorElement>('a.value');
        if (!link) {
            continue;
        }
        const href = link.getAttribute('href') ?? '';
        // Link text is "denomination, yearRange" — split on last comma
        const linkText = link.textContent?.trim() ?? '';
        const commaIdx = linkText.lastIndexOf(',');
        const denomText = commaIdx >= 0 ? linkText.slice(0, commaIdx).trim() : linkText;
        const yearRange = commaIdx >= 0 ? linkText.slice(commaIdx + 1).trim() : '';

        const subject = td.querySelector<HTMLElement>('div.subject')?.textContent?.trim();
        const infoEl = td.querySelector<HTMLElement>('div.info');
        const statEl = td.querySelector<HTMLElement>('div.coin-stat');
        const { obverseUrl, reverseUrl } = extractCoinImgUrls(td.closest('tr') ?? td);
        const entry = parseCatalogEntry(
            href,
            denomText,
            yearRange,
            subject,
            infoEl,
            statEl,
            obverseUrl,
            reverseUrl
        );
        if (entry) {
            results.push(entry);
        }
    }
    return results;
}

// ---------------------------------------------------------------------------
// Coin detail
// ---------------------------------------------------------------------------

function parseCoinSide(table: Element): CoinSide {
    const imgEl = table.querySelector<HTMLImageElement>('img');
    const imageUrl = imgEl?.getAttribute('src') ?? '';

    const themes = Array.from(table.querySelectorAll<HTMLElement>('a.theme, span.theme'))
        .map((el) => el.textContent?.trim() ?? '')
        .filter(Boolean);

    function extractLabelled(label: string): string {
        const spans = Array.from(table.querySelectorAll<HTMLElement>('span.mgray-11'));
        const span = spans.find((s) => s.textContent?.trim().replace(/:$/, '') === label);
        if (!span) {
            return '';
        }
        const parts: string[] = [];
        let node: Node | null = span.nextSibling;
        while (node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const t = node.textContent?.trim();
                if (t) {
                    parts.push(t);
                }
            } else if ((node as Element).tagName === 'BR') {
                // skip
            } else {
                break;
            }
            node = node.nextSibling;
        }
        return parts.join('\n');
    }

    function extractCreators(): string[] {
        const spans = Array.from(table.querySelectorAll<HTMLElement>('span.mgray-11'));
        const label = spans.find((s) => s.textContent?.trim().startsWith('Creators'));
        if (!label) {
            return [];
        }
        const p = label.closest('p');
        if (!p) {
            return [];
        }
        const clone = p.cloneNode(true) as HTMLElement;
        clone.querySelector('span.mgray-11')?.remove();
        const raw = clone.textContent ?? '';
        return raw
            .split(/,(?![^(]*\))/)
            .map((s) => s.trim())
            .filter(Boolean);
    }

    const description = extractLabelled('Description');
    const legend = extractLabelled('Legend');
    const creators = extractCreators();

    return {
        ...(imageUrl && { imageUrl }),
        ...(themes.length > 0 && { themes }),
        ...(description && { description }),
        ...(legend && { legend }),
        ...(creators.length > 0 && { creators }),
    };
}

function parseMintageCount(text: string): number | undefined {
    const t = text.trim();
    if (t === '') {
        return undefined;
    }
    if (t === '-') {
        return 0;
    }
    if (t === '+') {
        return -1;
    }
    const n = parseInt(t.replace(/\./g, ''), 10);
    return isNaN(n) ? undefined : n;
}

function extractMintageRows(doc: Document): CoinMintage[] {
    const table = doc.querySelector<HTMLTableElement>('.tabMintage table.tbl');
    if (!table) {
        return [];
    }
    const firstHeader = table.querySelector('thead th')?.textContent?.trim();
    if (firstHeader !== 'Year') {
        return [];
    }
    const rows: CoinMintage[] = [];
    for (const tr of table.querySelectorAll<HTMLTableRowElement>('tbody tr')) {
        const href = tr.getAttribute('data-href') ?? '';
        const cells = tr.querySelectorAll('td');
        if (cells.length < 5) {
            continue;
        }
        const year = cells[0].querySelector('strong')?.textContent?.trim() ?? '';
        const unc = parseMintageCount(cells[1].textContent ?? '');
        const bu = parseMintageCount(cells[2].textContent ?? '');
        const proof = parseMintageCount(cells[3].textContent ?? '');
        const rarityEl = cells[4].querySelector<HTMLElement>('[class*="rarity-"]');
        const rarity = rarityEl?.textContent?.trim() || undefined;
        const valueStr = cells[5]?.querySelector('b')?.textContent?.trim() ?? '';
        const value = valueStr ? parseFloat(valueStr) : undefined;
        rows.push({
            year,
            href,
            ...(unc !== undefined && { unc }),
            ...(bu !== undefined && { bu }),
            ...(proof !== undefined && { proof }),
            ...(rarity !== undefined && { rarity }),
            ...(value !== undefined && { price: value }),
        });
    }
    return rows;
}

function extractMintageByMintRows(doc: Document): CoinMintage[] {
    const table = doc.querySelector<HTMLTableElement>('.tabMintage table.tbl');
    if (!table) {
        return [];
    }
    const firstHeader = table.querySelector('thead th')?.textContent?.trim();
    if (firstHeader !== 'Mint') {
        return [];
    }
    const rows: CoinMintage[] = [];
    for (const tr of table.querySelectorAll<HTMLTableRowElement>('tbody tr')) {
        const mint = tr.querySelector('th')?.textContent?.trim() ?? '';
        const cells = tr.querySelectorAll('td');
        if (!mint || cells.length < 3) {
            continue;
        }
        const unc = parseMintageCount(cells[0].textContent ?? '');
        const bu = parseMintageCount(cells[1].textContent ?? '');
        const proof = parseMintageCount(cells[2].textContent ?? '');
        rows.push({
            mint,
            ...(unc !== undefined && { unc }),
            ...(bu !== undefined && { bu }),
            ...(proof !== undefined && { proof }),
        });
    }
    return rows;
}

function parsePeriodField(raw: string): { period?: string; periodYears?: string } {
    if (!raw) {
        return {};
    }
    const m = raw.match(/^(.*?)\s*\((\d{4}[^)]*)\)\s*$/);
    if (m) {
        return { period: m[1].trim(), periodYears: m[2].trim() };
    }
    return { period: raw };
}

/**
 * Extract structured coin details from a coin type (tid) or coin issue (cid) page.
 */
export function extractCoinTypeDetails(doc: Document): CoinEntry | null {
    const canonical = doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalHref = canonical?.getAttribute('href') ?? '';

    const slugMatch = canonicalHref.match(/\/coin\/([^/?]+)\//);
    const slug = slugMatch ? slugMatch[1] : '';

    const tidMatch = canonicalHref.match(/[?&]tid=(\d+)/);
    const tid = tidMatch ? parseInt(tidMatch[1], 10) : undefined;

    const cidMatch = doc
        .querySelector<HTMLAnchorElement>('a[href*="?cid="]')
        ?.getAttribute('href')
        ?.match(/[?&]cid=(\d+)/);
    const cid = cidMatch ? parseInt(cidMatch[1], 10) : undefined;

    const infoTable = Array.from(
        doc.querySelectorAll<HTMLTableElement>('table.tbl.coin-info')
    ).find((t) => t.querySelector('th')?.textContent === 'Number');

    if (!infoTable) {
        return null;
    }

    const fields: Record<string, string> = {};
    for (const row of infoTable.querySelectorAll<HTMLTableRowElement>('tr')) {
        const th = row.querySelector('th')?.textContent?.trim() ?? '';
        const td = row.querySelector('td')?.textContent?.trim() ?? '';
        if (th) {
            fields[th] = td;
        }
    }

    const descTables = Array.from(doc.querySelectorAll<HTMLElement>('table.tbl.coin-desc'));
    const obverse = descTables[0] ? parseCoinSide(descTables[0]) : undefined;
    const reverse = descTables[1] ? parseCoinSide(descTables[1]) : undefined;

    const mintage = [...extractMintageRows(doc), ...extractMintageByMintRows(doc)];

    const rarityLabel = doc.querySelector<HTMLElement>('.informer [class*="rarity-"]');
    const rarity = rarityLabel?.textContent?.trim() || undefined;

    const worthEl = doc.querySelector<HTMLElement>('.tabWorth h3 b');
    const price = worthEl ? parsePrice(worthEl.textContent?.trim() ?? '') : undefined;

    const weightStr = fields['Weight (g)'];
    const diameterStr = fields['Diameter (mm)'];
    const thicknessStr = fields['Thickness (mm)'];
    return {
        ...(tid !== undefined && { tid }),
        ...(cid !== undefined && { cid }),
        slug,
        km: fields['Number'] ?? '',
        country: fields['Country'] ?? '',
        ...parsePeriodField(fields['Period'] ?? ''),
        ...(fields['Ruler'] !== undefined && { ruler: fields['Ruler'] }),
        currency: fields['Currency'] ?? '',
        denomination: fields['Denomination'] ?? '',
        year: fields['Year'] ?? '',
        ...(fields['Edge type'] !== undefined && {
            edge: {
                ...(fields['Edge type'] && { description: fields['Edge type'] }),
                ...(fields['Edge description'] && { legend: fields['Edge description'] }),
            },
        }),
        ...(fields['Shape'] !== undefined && { shape: fields['Shape'] }),
        ...(fields['Alignment'] !== undefined && { alignment: fields['Alignment'] }),
        ...(fields['Composition'] !== undefined && { composition: fields['Composition'] }),
        ...(weightStr && { weight: parseFloat(weightStr) }),
        ...(diameterStr && { diameter: parseFloat(diameterStr) }),
        ...(thicknessStr && { thickness: parseFloat(thicknessStr) }),
        ...(obverse && Object.keys(obverse).length > 0 && { obverse }),
        ...(reverse && Object.keys(reverse).length > 0 && { reverse }),
        mintage,
        ...(rarity !== undefined && { rarity }),
        ...(price !== undefined && { price }),
    };
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

/**
 * Extract all coins from the user's gallery page (personal collection view).
 */
export function extractGalleryCoins(doc: Document): CoinEntry[] {
    const results: CoinEntry[] = [];
    for (const table of doc.querySelectorAll<HTMLTableElement>('table[style="width:100%;"]')) {
        const link = table.querySelector<HTMLAnchorElement>('td.coin-img a[href*="ucid="]');
        if (!link) {
            continue;
        }
        const href = link.getAttribute('href') ?? '';
        const ucidMatch = href.match(/[?&]ucid=(\d+)/);
        if (!ucidMatch) {
            continue;
        }
        const ucid = parseInt(ucidMatch[1], 10);
        const slugMatch = href.match(/\/coin\/([^/?]+)\//);
        const slug = slugMatch ? slugMatch[1] : '';

        const descEl = table.querySelector<HTMLElement>('div.coin-desc');
        const nameEl = descEl?.querySelector<HTMLAnchorElement>('a.blue-15');
        const nameClone = nameEl?.cloneNode(true) as HTMLElement | undefined;
        nameClone?.querySelector('img')?.remove();
        const name = nameClone?.textContent?.trim() ?? '';

        const subject =
            descEl?.querySelector<HTMLElement>('div.dgray-15')?.textContent?.trim() ?? '';

        const descInfoEl = descEl?.querySelector<HTMLElement>('div.desc');
        const material =
            descInfoEl?.querySelector<HTMLElement>('div.wrap')?.textContent?.trim() ?? '';

        const colEl = table.querySelector<HTMLElement>('div.coin-col');
        const condEl = colEl?.querySelector<HTMLElement>('label.cond');
        const condition = condEl?.textContent?.trim() ?? '';

        const statusEl = colEl?.querySelector<HTMLElement>('label.set:not(.cond)');
        const statusClass = statusEl?.className ?? '';
        const has = !(statusClass.includes('marked-s') || statusClass.includes('marked-w'));

        const priceVal = parsePrice(
            colEl?.querySelector<HTMLElement>('span.p')?.textContent?.trim() ?? ''
        );

        const { obverseUrl, reverseUrl } = extractCoinImgUrls(table);
        results.push({
            ucid,
            slug,
            name,
            subject,
            material,
            condition,
            has,
            ...(priceVal !== undefined && { price: priceVal }),
            ...(obverseUrl && { obverse: { imageUrl: obverseUrl } }),
            ...(reverseUrl && { reverse: { imageUrl: reverseUrl } }),
        });
    }
    return results;
}

// ---------------------------------------------------------------------------
// Period name from tree
// ---------------------------------------------------------------------------

/**
 * Find the period name and date range from the catalog-tree sidebar by period ID.
 * Returns a combined string like "European Union (Euro) (2002 - 2026)", or undefined if not found.
 */
export function extractPeriodFromTree(doc: Document, periodId: number): string | undefined {
    const a = doc.querySelector<HTMLAnchorElement>(`#catalog-tree a.period[pid="${periodId}"]`);
    if (!a) {
        return undefined;
    }
    const datesDiv = a.querySelector('div');
    const dates = datesDiv?.textContent?.trim() ?? '';
    const clone = a.cloneNode(true) as HTMLElement;
    clone.querySelector('div')?.remove();
    const name = clone.textContent?.trim() ?? '';
    if (!name) {
        return undefined;
    }
    return dates ? `${name} (${dates})` : name;
}

// ---------------------------------------------------------------------------
// Page type detection
// ---------------------------------------------------------------------------

export type PageType =
    | { kind: 'period' | 'catalog' | 'gallery'; type?: CoinType; country: string; periodId: number }
    | { kind: 'coin'; tid?: number; cid?: number; ucid?: number; slug: string }
    | { kind: 'unknown' };

export function detectPageType(doc: Document): PageType {
    const pageUrl = doc.location?.href ?? '';
    const canonicalUrl =
        doc.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.getAttribute('href') ?? '';

    const currentUrl = pageUrl || canonicalUrl;
    const slugSource = canonicalUrl || pageUrl;
    const slugMatch = slugSource.match(/\/coin\/([^/?]+)\//);
    const slug = slugMatch?.[1] ?? '';

    const ucidMatch = currentUrl.match(/[?&]ucid=(\d+)/);
    if (ucidMatch) {
        return { kind: 'coin', ucid: parseInt(ucidMatch[1], 10), slug };
    }

    const cidMatch = currentUrl.match(/[?&]cid=(\d+)/);
    if (cidMatch) {
        return { kind: 'coin', cid: parseInt(cidMatch[1], 10), slug };
    }

    const tidMatch = currentUrl.match(/[?&]tid=(\d+)/) ?? canonicalUrl.match(/[?&]tid=(\d+)/);
    if (tidMatch) {
        return { kind: 'coin', tid: parseInt(tidMatch[1], 10), slug };
    }

    // Gallery page: /gallery/?country=X&period=Y (params may appear in any order)
    const galleryUrlMatch = currentUrl.match(/\/gallery\/[^?]*\?/);
    if (galleryUrlMatch) {
        const galleryCountry = currentUrl.match(/[?&]country=([^&]+)/)?.[1];
        const galleryPeriod = currentUrl.match(/[?&]period=(\d+)/)?.[1];
        if (galleryCountry && galleryPeriod) {
            return {
                kind: 'gallery',
                country: galleryCountry,
                periodId: parseInt(galleryPeriod, 10),
            };
        }
    }

    const periodUrlMatch = currentUrl.match(
        /\/(period|table|catalog)\/[^?]*\?country=([^&]+)&period=(\d+)/
    );
    if (!periodUrlMatch) {
        return { kind: 'unknown' };
    }

    const [, section, country, periodStr] = periodUrlMatch;
    const periodId = parseInt(periodStr, 10);

    const typeMatch = currentUrl.match(/&type=([^&]+)/);
    const typeParam = typeMatch?.[1];

    let coinType: CoinType = 'regular';
    if (typeParam === '2' || typeParam === 'commemorative') {
        coinType = 'commemorative';
    } else if (typeParam === '3' || typeParam === 'collection' || typeParam === 'collector') {
        coinType = 'collector';
    } else if (typeParam === '4' || typeParam === 'tokens' || typeParam === 'token') {
        coinType = 'token';
    }

    if (section === 'catalog') {
        return { kind: 'catalog', type: coinType, country, periodId };
    }

    return { kind: 'period', type: coinType, country, periodId };
}
