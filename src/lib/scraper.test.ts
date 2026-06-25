import {
    type CoinEntry,
    detectPageType,
    extractCatalogCoins,
    extractCoinTypeDetails,
    extractGalleryCoins,
    extractPeriodCoins,
} from './scraper';

function makeDoc(html: string): Document {
    return new DOMParser().parseFromString(html, 'text/html');
}

function makeCell(opts: {
    cid?: number;
    ucid?: number;
    km?: string;
    status?: string;
    denom?: string;
    subject?: string;
    price?: string;
    code?: string;
    name?: string;
    sample?: string;
    imgpath?: string;
    img1?: string;
    img2?: string;
}): string {
    const {
        cid = 100,
        ucid,
        km = 'KM# 1',
        status = 'marked-0',
        denom = '1c',
        subject = '',
        price = '€ 1.00',
        code = 'austria-1c-2020',
        name = 'Austria 1 cent 2020',
        sample = '12345',
        imgpath = 'https://i.ucoin.net/coin/12/345',
        img1 = '1',
        img2 = '2',
    } = opts;
    const href = ucid !== undefined ? `/coin/${code}/?ucid=${ucid}` : `/coin/${code}/?cid=${cid}`;
    return `<td class="${status}">
        <a name="${km}" class="cell ${status}" href="${href}"
            data-tooltip-code="${code}"
            data-tooltip-name="${name}"
            data-tooltip-km="${km}"
            data-tooltip-subject="${subject}"
            data-tooltip-price="${price}"
            data-tooltip-sample="${sample}"
            data-tooltip-imgpath="${imgpath}"
            data-tooltip-sample-img1="${img1}"
            data-tooltip-sample-img2="${img2}"
        >${denom}</a>
    </td>`;
}

describe('extractPeriodCoins', () => {
    it('returns empty when no table', () => {
        const doc = makeDoc('<html><body></body></html>');
        expect(extractPeriodCoins(doc)).toEqual([]);
    });

    it('groups circulation coins by km+denomination', () => {
        const doc = makeDoc(`
            <table class="table">
                <thead><tr><th>Year</th><th>1c</th><th>2c</th><th>Year</th></tr></thead>
                <tbody>
                    <tr>
                        <th><div><a class="year">2024</a></div></th>
                        ${makeCell({ cid: 10, denom: '1c', km: 'KM# 10', status: 'marked-km' })}
                        ${makeCell({ cid: 11, denom: '2c', km: 'KM# 11', status: 'marked-0' })}
                    </tr>
                    <tr>
                        <th><div><a class="year">2023</a></div></th>
                        ${makeCell({ cid: 12, denom: '1c', km: 'KM# 10', status: 'marked-0' })}
                        ${makeCell({ cid: 13, denom: '2c', km: 'KM# 11', status: 'marked-s' })}
                    </tr>
                </tbody>
            </table>
        `);
        const result = extractPeriodCoins(doc);
        expect(result).toHaveLength(4);

        const cent1 = result.filter((t) => t.denomination === '1c');
        expect(cent1).toHaveLength(2);
        expect(cent1[0]).toMatchObject<Partial<CoinEntry>>({ km: 'KM# 10', cid: 10, has: true });
        expect(cent1[1]).toMatchObject<Partial<CoinEntry>>({ km: 'KM# 10', cid: 12 });

        const cent2 = result.filter((t) => t.denomination === '2c');
        expect(cent2[1]).toMatchObject({ has: false });
    });

    it('builds imgObverse and imgReverse URLs', () => {
        const doc = makeDoc(`
            <table class="table">
                <thead><tr><th>Year</th><th>1c</th><th>Year</th></tr></thead>
                <tbody>
                    <tr>
                        <th><div><a class="year">2024</a></div></th>
                        ${makeCell({ cid: 10, km: 'KM# 1', code: 'austria-1c-2024', sample: '99999', imgpath: 'https://i.ucoin.net/coin/99/999', img1: '1', img2: '2' })}
                    </tr>
                </tbody>
            </table>
        `);
        const coin = extractPeriodCoins(doc)[0];
        expect(coin.obverse?.imageUrl).toBe(
            'https://i.ucoin.net/coin/99/999/99999-1s/austria-1c-2024.jpg'
        );
        expect(coin.reverse?.imageUrl).toBe(
            'https://i.ucoin.net/coin/99/999/99999-2s/austria-1c-2024.jpg'
        );
    });

    it('skips circulation rows without year element', () => {
        const doc = makeDoc(`
            <table class="table">
                <thead><tr><th>Year</th><th>1c</th><th>Year</th></tr></thead>
                <tbody>
                    <tr><td class="marked-0"></td></tr>
                </tbody>
            </table>
        `);
        expect(extractPeriodCoins(doc)).toEqual([]);
    });

    it('skips circulation cells without anchor', () => {
        const doc = makeDoc(`
            <table class="table">
                <thead><tr><th>Year</th><th>1c</th><th>Year</th></tr></thead>
                <tbody>
                    <tr>
                        <th><div><a class="year">2024</a></div></th>
                        <td class="marked-0"></td>
                    </tr>
                </tbody>
            </table>
        `);
        expect(extractPeriodCoins(doc)).toEqual([]);
    });

    it('sets ucid on personal page cells', () => {
        const doc = makeDoc(`
            <table class="table">
                <thead><tr><th>Year</th><th>1c</th><th>Year</th></tr></thead>
                <tbody>
                    <tr>
                        <th><div><a class="year">2020</a></div></th>
                        ${makeCell({ ucid: 999, km: 'KM# 1', status: 'marked-12' })}
                    </tr>
                </tbody>
            </table>
        `);
        const result = extractPeriodCoins(doc);
        expect(result[0]).toMatchObject({ ucid: 999, has: true });
    });

    it('marks swap cells correctly', () => {
        const doc = makeDoc(`
            <table class="table">
                <thead><tr><th>Year</th><th>1c</th><th>Year</th></tr></thead>
                <tbody>
                    <tr>
                        <th><div><a class="year">2021</a></div></th>
                        ${makeCell({ cid: 50, km: 'KM# 1', status: 'marked-s' })}
                    </tr>
                </tbody>
            </table>
        `);
        expect(extractPeriodCoins(doc)[0]).toMatchObject({ has: false });
    });

    it('groups commemorative coins by km+denomination', () => {
        const doc = makeDoc(`
            <table class="table">
                <thead><tr><th>Year</th><th>Value</th><th>Subject</th><th>Number</th></tr></thead>
                <tbody>
                    <tr data-sort-year="2022" data-sort-mm="" data-sort-face="€2"
                        data-sort-subject="Erasmus Programme" data-sort-kmz="UC# 100">
                        <th><a class="year">2022</a></th>
                        ${makeCell({ cid: 200, denom: '€2', km: 'UC# 100', status: 'marked-0', subject: 'Erasmus Programme' })}
                    </tr>
                    <tr data-sort-year="2023" data-sort-mm="" data-sort-face="€2"
                        data-sort-subject="Another" data-sort-kmz="UC# 200">
                        <th><a class="year">2023</a></th>
                        ${makeCell({ cid: 201, denom: '€2', km: 'UC# 200', status: 'marked-km', subject: 'Another' })}
                    </tr>
                </tbody>
            </table>
        `);
        const result = extractPeriodCoins(doc);
        expect(result).toHaveLength(2);
        expect(result[0]).toMatchObject({ km: 'UC# 100', denomination: '€2', cid: 200 });
        expect(result[1]).toMatchObject({ km: 'UC# 200', denomination: '€2', has: true });
    });

    it('skips commemorative rows without valid year', () => {
        const doc = makeDoc(`
            <table class="table">
                <thead><tr><th>Year</th></tr></thead>
                <tbody>
                    <tr data-sort-year="abc">
                        <th><a class="year">abc</a></th>
                        ${makeCell({ cid: 1 })}
                    </tr>
                </tbody>
            </table>
        `);
        expect(extractPeriodCoins(doc)).toHaveLength(0);
    });
});

describe('extractCatalogCoinEntries', () => {
    it('returns empty when no coin-block-cell', () => {
        const doc = makeDoc('<html><body></body></html>');
        expect(extractCatalogCoins(doc)).toEqual([]);
    });

    it('extracts catalog entries', () => {
        const doc = makeDoc(`
            <table class="coin-block"><tbody><tr>
                <td class="coin-block-cell">
                    <table><tbody>
                        <tr>
                            <td class="coin-img"><a href="/coin/austria-1-euro-cent-2002-2026/?tid=10"></a></td>
                        </tr>
                        <tr>
                            <td colspan="3" class="coin-value">
                                <a href="/coin/austria-1-euro-cent-2002-2026/?tid=10" class="left wrap value">1 euro cent</a>
                                <a href="/coin/austria-1-euro-cent-2002-2026/?tid=10" class="right value">2002-2026</a>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="coin-info">
                                <div class="info">
                                    <div class="wrap">Copper plated Steel</div>
                                    2.3g,&nbsp;ø&nbsp;16.25mm,&nbsp;KM# 3082
                                </div>
                                <div class="coin-stat">
                                    <label class="have"><b>1</b><small>/</small>25</label>
                                    <div class="price"><small>€ </small>0.02<small></small></div>
                                </div>
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr></tbody></table>
        `);
        const entries = extractCatalogCoins(doc);
        expect(entries).toHaveLength(1);
        expect(entries[0]).toMatchObject({
            tid: 10,
            slug: 'austria-1-euro-cent-2002-2026',
            denomination: '1 euro cent',
            year: '2002-2026',
            material: 'Copper plated Steel',
            has: true,
        });
        expect(entries[0].km).toContain('KM# 3082');
        expect(entries[0].weight).toBe(2.3);
        expect(entries[0].diameter).toBe(16.25);
    });

    it('extracts subject for commemorative entries', () => {
        const doc = makeDoc(`
            <table class="coin-block"><tbody><tr>
                <td class="coin-block-cell">
                    <table><tbody>
                        <tr><td class="coin-value">
                            <a href="/coin/austria-2-euro-2005/?tid=1046" class="left wrap value">2 euro</a>
                            <a href="/coin/austria-2-euro-2005/?tid=1046" class="right value">2005</a>
                        </td></tr>
                        <tr><td class="coin-info">
                            <div class="wrap subject">Austrian State Treaty</div>
                            <div class="info"><div class="wrap">Bi-Metallic</div>8.5g,&nbsp;ø&nbsp;25.75mm,&nbsp;KM# 3124</div>
                            <div class="coin-stat">
                                <label class="have"><b>1</b><small>/</small>1</label>
                                <div class="price"><small>€ </small>2.01</div>
                            </div>
                        </td></tr>
                    </tbody></table>
                </td>
            </tr></tbody></table>
        `);
        const entries = extractCatalogCoins(doc);
        expect(entries[0].subject).toBe('Austrian State Treaty');
    });

    it('skips cells without tid link', () => {
        const doc = makeDoc(`
            <table class="coin-block"><tbody><tr>
                <td class="coin-block-cell">
                    <table><tbody><tr><td class="coin-value">
                        <a href="/coin/test/?uid=5" class="left wrap value">something</a>
                    </td></tr></tbody></table>
                </td>
            </tr></tbody></table>
        `);
        expect(extractCatalogCoins(doc)).toHaveLength(0);
    });
});

describe('extractCoinTypeDetails', () => {
    function makeInfoTable(rows: [string, string][]): string {
        return `<table class="tbl coin-info"><tbody>${rows.map(([th, td]) => `<tr><th>${th}</th><td>${td}</td></tr>`).join('')}</tbody></table>`;
    }

    it('returns null when no info table', () => {
        const doc = makeDoc('<html><body></body></html>');
        expect(extractCoinTypeDetails(doc)).toBeNull();
    });

    it('extracts fields from coin type page', () => {
        const doc = makeDoc(`
            <html><head>
                <link rel="canonical" href="https://en.ucoin.net/coin/austria-1-euro-cent-2002-2026/?tid=10">
            </head><body>
                ${makeInfoTable([
                    ['Number', 'KM# 3082'],
                    ['Country', 'Austria'],
                    ['Period', 'European Union (Euro) (2002 - 2026)'],
                    ['Currency', 'Euro'],
                    ['Coin type', 'Circulation coins'],
                    ['Denomination', '1 euro cent'],
                    ['Year', '2002 - 2026'],
                    ['Edge type', 'Smooth'],
                    ['Shape', 'Round'],
                    ['Alignment', 'Medal (0°)'],
                    ['Composition', 'Copper plated Steel'],
                    ['Weight (g)', '2.3'],
                    ['Diameter (mm)', '16.25'],
                    ['Thickness (mm)', '1.67'],
                ])}
            </body></html>
        `);
        const result = extractCoinTypeDetails(doc);
        expect(result).not.toBeNull();
        expect(result).toMatchObject({
            tid: 10,
            slug: 'austria-1-euro-cent-2002-2026',
            km: 'KM# 3082',
            country: 'Austria',
            denomination: '1 euro cent',
            year: '2002 - 2026',
            composition: 'Copper plated Steel',
            weight: 2.3,
            diameter: 16.25,
            thickness: 1.67,
        });
    });

    it('does not set tid when canonical has no tid param', () => {
        const doc = makeDoc(`
            <html><head>
                <link rel="canonical" href="https://en.ucoin.net/coin/test-coin/?cid=5">
            </head><body>
                ${makeInfoTable([
                    ['Number', 'KM# 1'],
                    ['Country', 'Test'],
                    ['Period', 'p'],
                    ['Currency', 'c'],
                    ['Coin type', 't'],
                    ['Denomination', 'd'],
                    ['Year', '2020'],
                ])}
            </body></html>
        `);
        const result = extractCoinTypeDetails(doc);
        expect(result?.tid).toBeUndefined();
    });

    function makeMinimalInfoTable(): string {
        return makeInfoTable([
            ['Number', 'KM# 1'],
            ['Country', 'Test'],
            ['Period', 'p'],
            ['Currency', 'c'],
            ['Coin type', 't'],
            ['Denomination', 'd'],
            ['Year', '2020'],
        ]);
    }

    it('extracts obverse and reverse sides', () => {
        const doc = makeDoc(`
            <html><head>
                <link rel="canonical" href="https://en.ucoin.net/coin/test/?tid=1">
            </head><body>
                ${makeMinimalInfoTable()}
                <h3>Obverse:</h3>
                <table class="tbl coin-desc"><tbody><tr>
                    <th><img src="https://i.ucoin.net/coin/1/2/3-1/test.jpg"></th>
                    <td>
                        <p><a href="/catalog/?theme=flowers" class="theme">Flowers</a></p>
                        <p class="dgray-12"><span class="mgray-11">Description</span><br>Gentiana<br></p>
                        <p><span class="mgray-11">Legend</span><br>EIN EURO CENT</p>
                        <p class="dgray-11"><span class="mgray-11">Creators:&nbsp;</span>Josef Kaiser</p>
                    </td>
                </tr></tbody></table>
                <h3>Reverse</h3>
                <table class="tbl coin-desc"><tbody><tr>
                    <th><img src="https://i.ucoin.net/coin/1/2/3-2/test.jpg"></th>
                    <td>
                        <p><span class="theme">Geography</span></p>
                        <p class="dgray-12"><span class="mgray-11">Description</span><br>Globe<br></p>
                        <p><span class="mgray-11">Legend</span><br>1 EURO CENT<br>LL</p>
                        <p class="dgray-11"><span class="mgray-11">Creators:&nbsp;</span>Luc Luycx<span class="mgray-11">&nbsp;(LL)</span></p>
                    </td>
                </tr></tbody></table>
            </body></html>
        `);
        const result = extractCoinTypeDetails(doc);
        expect(result?.obverse).toMatchObject({
            imageUrl: 'https://i.ucoin.net/coin/1/2/3-1/test.jpg',
            themes: ['Flowers'],
            description: 'Gentiana',
            legend: 'EIN EURO CENT',
            creators: ['Josef Kaiser'],
        });
        expect(result?.reverse).toMatchObject({
            imageUrl: 'https://i.ucoin.net/coin/1/2/3-2/test.jpg',
            themes: ['Geography'],
            description: 'Globe',
        });
        expect(result?.reverse?.legend).toContain('1 EURO CENT');
    });

    it('extracts mintage rows', () => {
        const doc = makeDoc(`
            <html><head>
                <link rel="canonical" href="https://en.ucoin.net/coin/test/?tid=1">
            </head><body>
                ${makeMinimalInfoTable()}
                <div class="tabMintage">
                    <table class="tbl">
                        <thead>
                            <tr><th rowspan="2">Year</th><th colspan="3">Mintage</th><th rowspan="2">Rarity</th><th rowspan="2">Value, EUR</th></tr>
                            <tr><th>UNC</th><th>BU</th><th>Proof</th></tr>
                        </thead>
                        <tbody>
                            <tr data-href="/coin/test-2024/?cid=100">
                                <td><strong>2024</strong></td>
                                <td>28.600.000</td><td>100.000</td><td>-</td>
                                <td><div class="rarity rarity-B">B</div></td>
                                <td class="price"><small>€ </small><b>0.25</b></td>
                            </tr>
                            <tr data-href="/coin/test-2016/?cid=101">
                                <td><strong>2016</strong></td>
                                <td>-</td><td>50.000</td><td>10.000</td>
                                <td><div class="rarity rarity-R">R</div></td>
                                <td class="price"><small>€ </small><b>11.81</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body></html>
        `);
        const result = extractCoinTypeDetails(doc);
        expect(result?.mintage).toHaveLength(2);
        expect(result?.mintage?.[0]).toMatchObject({
            year: '2024',
            href: '/coin/test-2024/?cid=100',
            unc: 28600000,
            bu: 100000,
            proof: 0,
            rarity: 'B',
            price: 0.25,
        });
        expect(result?.mintage?.[1]).toMatchObject({ rarity: 'R', price: 11.81 });
    });

    it('extracts rarity and worth from issue page widgets', () => {
        const doc = makeDoc(`
            <html><head>
                <link rel="canonical" href="https://en.ucoin.net/coin/test/?tid=1">
            </head><body>
                ${makeMinimalInfoTable()}
                <div class="informer">
                    <a class="tab-pointer" data-tab="tabRarity">
                        <label class="rarity-A">A</label>
                        <div><span>Rarity</span><b>Common</b></div>
                    </a>
                </div>
                <div class="tabWorth tab hide">
                    <h3>Worth, EUR<div class="right"><b class="blue-13">0.03</b></div></h3>
                </div>
            </body></html>
        `);
        const result = extractCoinTypeDetails(doc);
        expect(result?.rarity).toBe('A');
        expect(result?.price).toBe(0.03);
    });

    it('returns empty mintage and undefined rarity/price when absent', () => {
        const doc = makeDoc(`
            <html><head>
                <link rel="canonical" href="https://en.ucoin.net/coin/test/?tid=1">
            </head><body>${makeMinimalInfoTable()}</body></html>
        `);
        const result = extractCoinTypeDetails(doc);
        expect(result?.mintage).toEqual([]);
        expect(result?.rarity).toBeUndefined();
        expect(result?.price).toBeUndefined();
    });

    it('extracts mintage rows from cid/ucid page (by-mint)', () => {
        const doc = makeDoc(`
            <html><head>
                <link rel="canonical" href="https://en.ucoin.net/coin/test/?tid=1">
            </head><body>
                ${makeMinimalInfoTable()}
                <div class="tabMintage">
                    <table class="tbl">
                        <thead>
                            <tr><th rowspan="2">Mint</th><th colspan="3">Mintage</th></tr>
                            <tr><th>UNC</th><th>BU</th><th>Proof</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Austria, Vienna</th>
                                <td>185.500.000</td><td>50.000</td><td>10.000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body></html>
        `);
        const result = extractCoinTypeDetails(doc);
        expect(result?.mintage).toHaveLength(1);
        expect(result?.mintage?.[0]).toMatchObject({
            mint: 'Austria, Vienna',
            unc: 185500000,
            bu: 50000,
            proof: 10000,
        });
    });
});

describe('detectPageType', () => {
    function makeCanonical(href: string): string {
        return `<html><head><link rel="canonical" href="${href}"></head><body></body></html>`;
    }

    it('detects coin page with tid', () => {
        const doc = makeDoc(
            makeCanonical('https://en.ucoin.net/coin/austria-1-euro-cent-2002-2026/?tid=10')
        );
        expect(detectPageType(doc)).toEqual({
            kind: 'coin',
            tid: 10,
            slug: 'austria-1-euro-cent-2002-2026',
        });
    });

    it('detects coin page with cid', () => {
        const doc = makeDoc(
            makeCanonical('https://en.ucoin.net/coin/austria-1-euro-cent-2002-2026/?cid=35608')
        );
        expect(detectPageType(doc)).toEqual({
            kind: 'coin',
            cid: 35608,
            slug: 'austria-1-euro-cent-2002-2026',
        });
    });

    it('detects coin page with ucid', () => {
        const doc = makeDoc(
            makeCanonical('https://en.ucoin.net/coin/austria-1-euro-cent-2002-2026/?ucid=6954580')
        );
        expect(detectPageType(doc)).toEqual({
            kind: 'coin',
            ucid: 6954580,
            slug: 'austria-1-euro-cent-2002-2026',
        });
    });

    it('returns unknown when no canonical', () => {
        const doc = makeDoc('<html><body></body></html>');
        expect(detectPageType(doc)).toEqual({ kind: 'unknown' });
    });

    it('returns unknown for unrecognised URL', () => {
        const doc = makeDoc(makeCanonical('https://en.ucoin.net/home/'));
        expect(detectPageType(doc)).toEqual({ kind: 'unknown' });
    });

    it('detects catalog regular (no type param)', () => {
        const doc = makeDoc(
            makeCanonical('https://en.ucoin.net/catalog/?country=austria&period=311')
        );
        expect(detectPageType(doc)).toEqual({
            kind: 'catalog',
            type: 'regular',
            country: 'austria',
            periodId: 311,
        });
    });

    it('detects catalog commemorative (type=2)', () => {
        const doc = makeDoc(
            makeCanonical('https://en.ucoin.net/catalog/?country=austria&period=311&type=2')
        );
        expect(detectPageType(doc)).toEqual({
            kind: 'catalog',
            type: 'commemorative',
            country: 'austria',
            periodId: 311,
        });
    });

    it('detects catalog collector (type=3)', () => {
        const doc = makeDoc(
            makeCanonical('https://en.ucoin.net/catalog/?country=austria&period=311&type=3')
        );
        expect(detectPageType(doc)).toEqual({
            kind: 'catalog',
            type: 'collector',
            country: 'austria',
            periodId: 311,
        });
    });

    it('detects period circulation (no type param)', () => {
        const doc = makeDoc(
            makeCanonical('https://en.ucoin.net/table/?country=united_kingdom&period=77')
        );
        expect(detectPageType(doc)).toEqual({
            kind: 'period',
            type: 'regular',
            country: 'united_kingdom',
            periodId: 77,
        });
    });

    it('detects period circulation with uid', () => {
        const doc = makeDoc(
            makeCanonical('https://en.ucoin.net/table/?country=united_kingdom&period=77&uid=28609')
        );
        expect(detectPageType(doc)).toEqual({
            kind: 'period',
            type: 'regular',
            country: 'united_kingdom',
            periodId: 77,
        });
    });

    it('detects period circulation via explicit type=1', () => {
        const doc = makeDoc(
            makeCanonical('https://en.ucoin.net/table/?country=united_kingdom&period=77&type=1')
        );
        expect(detectPageType(doc)).toMatchObject({ kind: 'period', type: 'regular' });
    });

    it('detects period commemorative via type=2', () => {
        const doc = makeDoc(
            makeCanonical(
                'https://en.ucoin.net/table/?country=united_kingdom&period=77&type=2&uid=28609'
            )
        );
        expect(detectPageType(doc)).toEqual({
            kind: 'period',
            type: 'commemorative',
            country: 'united_kingdom',
            periodId: 77,
        });
    });

    it('detects period collector via type=3', () => {
        const doc = makeDoc(
            makeCanonical(
                'https://en.ucoin.net/table/?country=united_kingdom&period=77&type=3&uid=28609'
            )
        );
        expect(detectPageType(doc)).toEqual({
            kind: 'period',
            type: 'collector',
            country: 'united_kingdom',
            periodId: 77,
        });
    });

    it('detects period token via type=4', () => {
        const doc = makeDoc(
            makeCanonical(
                'https://en.ucoin.net/table/?country=united_kingdom&period=283&type=4&uid=28609'
            )
        );
        expect(detectPageType(doc)).toEqual({
            kind: 'period',
            type: 'token',
            country: 'united_kingdom',
            periodId: 283,
        });
    });

    it('detects gallery page', () => {
        const doc = makeDoc(
            makeCanonical('https://en.ucoin.net/gallery/?country=united_kingdom&period=8&uid=28609')
        );
        expect(detectPageType(doc)).toEqual({
            kind: 'gallery',
            country: 'united_kingdom',
            periodId: 8,
        });
    });

    it('returns unknown for gallery without country+period', () => {
        const doc = makeDoc(makeCanonical('https://en.ucoin.net/gallery/?uid=28609'));
        expect(detectPageType(doc)).toEqual({ kind: 'unknown' });
    });
});

describe('extractCatalogCoins list layout', () => {
    function makeListDoc(coinInfoHtml: string): Document {
        return makeDoc(
            `<html><body><table class="coin"><tbody><tr>${coinInfoHtml}</tr></tbody></table></body></html>`
        );
    }

    it('returns empty when no table.coin', () => {
        const doc = makeDoc('<html><body></body></html>');
        expect(extractCatalogCoins(doc)).toEqual([]);
    });

    it('extracts list layout entry', () => {
        const doc = makeListDoc(`
            <td class="coin-img"></td>
            <td class="coin-info">
                <a href="/coin/united_kingdom-1-penny-1996/?tid=1556&uid=28609" class="value">1 penny,&nbsp;1996</a>
                <br>
                <div class="subject">Maundy</div>
                <div class="info">
                    <span class="Ag">Ag</span>Silver 0.925, 3.56g,&nbsp;\xf8&nbsp;20.32mm<br>KM# 935b
                </div>
                <div class="coin-stat" data-tid="1556">
                    <label><b>1</b><small>/</small>5</label>
                    <div class="price"><small>€ </small>13.32</div>
                </div>
            </td>
        `);
        const entries = extractCatalogCoins(doc);
        expect(entries).toHaveLength(1);
        expect(entries[0]).toMatchObject({
            tid: 1556,
            slug: 'united_kingdom-1-penny-1996',
            denomination: '1 penny',
            year: '1996',
            subject: 'Maundy',
            has: true,
            price: 13.32,
        });
        expect(entries[0].km).toContain('KM# 935b');
        expect(entries[0].weight).toBe(3.56);
        expect(entries[0].diameter).toBe(20.32);
    });

    it('skips list entry without tid', () => {
        const doc = makeListDoc(`
            <td class="coin-info">
                <a href="/coin/test/?cid=5" class="value">test, 2020</a>
            </td>
        `);
        expect(extractCatalogCoins(doc)).toHaveLength(0);
    });
});

describe('extractGalleryCoins', () => {
    function makeGalleryDoc(rows: string): Document {
        return makeDoc(`<html><body>${rows}</body></html>`);
    }

    it('returns empty when no gallery tables', () => {
        expect(extractGalleryCoins(makeDoc('<html><body></body></html>'))).toEqual([]);
    });

    it('extracts gallery coin entry', () => {
        const doc = makeGalleryDoc(`
            <table style="width:100%;"><tbody><tr>
                <td class="coin-img">
                    <a href="/coin/united_kingdom-50-pence-2022/?ucid=85480918" title="50 pence"></a>
                </td>
                <td>
                    <div class="coin-desc">
                        <a href="/coin/united_kingdom-50-pence-2022/?ucid=85480918" class="blue-15">
                            <img src="flag.png">United Kingdom 50 pence, 2022
                        </a>
                        <div class="dgray-15">50th Anniversary</div>
                        <div class="desc"><div class="wrap">Copper-Nickel</div>, 8g, 27.3mm</div>
                    </div>
                    <div class="coin-col">
                        <div class="board">
                            <label class="set marked-12"></label>
                            <label class="set cond">UNC</label>
                        </div>
                        <div class="price dgray-13"><span class="p">€ 4.48</span></div>
                    </div>
                </td>
            </tr></tbody></table>
        `);
        const coins = extractGalleryCoins(doc);
        expect(coins).toHaveLength(1);
        expect(coins[0]).toMatchObject({
            ucid: 85480918,
            slug: 'united_kingdom-50-pence-2022',
            name: 'United Kingdom 50 pence, 2022',
            subject: '50th Anniversary',
            material: 'Copper-Nickel',
            condition: 'UNC',
            price: 4.48,
            has: true,
        });
    });

    it('skips table without ucid link', () => {
        const doc = makeGalleryDoc(`
            <table style="width:100%;"><tbody><tr>
                <td class="coin-img"><a href="/coin/test/?tid=5"></a></td>
            </tr></tbody></table>
        `);
        expect(extractGalleryCoins(doc)).toHaveLength(0);
    });
});
