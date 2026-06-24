import { apiFetch } from './api';
import { Param } from './common/params';
import { _, lang } from './lang';
import { getHashParam, loc, updateLocationHash } from './url';
import { slug, unique } from './utils';

interface RegionTree {
    [key: string]: string[] | RegionTree;
}

function getEuroSlugsFromTree(tree: RegionTree): Set<string> {
    const ch = tree.euro;
    const out = [slug('euro')];
    if (Array.isArray(ch)) {
        for (const r of ch) {
            if (typeof r === 'string') {
                out.push(slug(r));
            }
        }
    }
    return new Set(out);
}

/** Parse ucoin country rows: `country` param → `span.right` (coin count) */
function parseCoinCountsByCountryFromDoc(root: Document | ParentNode): Record<string, number> {
    const m: Record<string, number> = {};
    for (const c of root.querySelectorAll<HTMLDivElement>('div.cntry')) {
        const [, cid] = c.querySelector('a')?.href.match(/&country=(\w+)/) || [];
        if (cid) {
            m[cid] = +(c.querySelector('span.right')?.textContent ?? 0) || 0;
        }
    }
    return m;
}

function updateRegionHeadingsByDirectLists(): void {
    for (const r of document.querySelectorAll<HTMLDivElement>('.regions .region')) {
        r.querySelector('h2 .lgray-13')?.remove();
        const cl = r.querySelector<HTMLDivElement>(':scope > .country-list');
        let countryN = 0;
        let coinN = 0;
        if (cl) {
            for (const cntry of cl.querySelectorAll<HTMLDivElement>(':scope > div.cntry')) {
                countryN += 1;
                coinN += +(cntry.querySelector('span.right')?.textContent ?? 0) || 0;
            }
        }
        if (countryN && coinN) {
            r.querySelector('h2')?.insertAdjacentHTML(
                'beforeend',
                `<span class="lgray-13">( ${countryN} / ${coinN} )</span>`
            );
        }
    }
}

export async function handleCountryRegions(): Promise<void> {
    const regionNames =
        (await apiFetch<Record<string, string>>(`/regions/${lang}`, `countries_regions_${lang}`)) ??
        {};
    const countryList = document.querySelector<HTMLDivElement>(
        'ul.hor-switcher ~ div.country-list'
    );
    if (!countryList) {
        return;
    }

    const perCountryTotal: Record<string, number> = {};
    for (const c of countryList.querySelectorAll<HTMLDivElement>('div.cntry')) {
        const [, cid] = c.querySelector('a')?.href.match(/&country=(\w+)/) || [];
        if (cid) {
            perCountryTotal[cid] = +(c.querySelector('span.right')?.textContent ?? 0) || 0;
        }
    }

    let headingList = document.querySelector('ul.hor-switcher ~ ul.region-list');
    if (!headingList) {
        countryList.insertAdjacentHTML('beforebegin', `<ul class="region-list"/>`);
        headingList = document.querySelector('ul.hor-switcher ~ ul.region-list');
    }

    const allText = headingList?.querySelector('li.region[value="0"]')?.textContent;
    const currentRegion = getHashParam(Param.REGION);

    const regionTree = (await apiFetch<RegionTree>('/regions/tree', 'regions_tree')) ?? {};
    const countryRegions =
        (await apiFetch<Record<string, string[]>>('/countries/regions', 'countries_regions')) ?? {};
    const topRegions = Object.keys(regionTree);

    // add all regions
    countryList.insertAdjacentHTML('beforebegin', `<ul class="regions"></ul>`);
    (function renderRegions(container: Element, regions: RegionTree | string[]) {
        const entries: [string, RegionTree | string[]][] = Array.isArray(regions)
            ? regions.map((r) => [r, []])
            : Object.entries(regions);
        for (const [k, sub] of entries) {
            const id = slug(k);
            const active = currentRegion && id === currentRegion ? ' active' : '';
            const hide =
                currentRegion && id !== currentRegion && topRegions.includes(k) ? ` hide` : '';
            container.insertAdjacentHTML(
                'beforeend',
                `<li class="region${hide}${active}" id="${id}"><h2>${regionNames[k] ?? k}</h2><ul class="regions"></ul><div class="country-list catalog-list"></div></li>`
            );
            const region = container.querySelector(`#${id} .regions`);
            if (region) {
                renderRegions(region, sub);
            }
        }
    })(countryList.previousElementSibling!, regionTree);

    // move countries to regions
    for (const c of countryList.querySelectorAll<HTMLDivElement>('div.cntry')) {
        const [, cid] = c.querySelector('a')?.href.match(/&country=(\w+)/) || [];
        const regions = countryRegions[cid];
        if (regions) {
            for (const r of unique(regions)) {
                const id = slug(r);
                const cl = document.querySelector(`.region#${id} > .country-list`);
                if (cl && !cl.querySelector(`#${cid}`)) {
                    const cc = c.cloneNode(true) as HTMLElement;
                    cc.id = cid;
                    cl.append(cc);

                    for (
                        let p = cl.closest('.region')?.parentElement, r;
                        (r = p?.closest<HTMLDivElement>('.region'));
                        p = r.parentElement
                    ) {
                        const rid = r.id;
                        r.parentElement
                            ?.querySelector(`#${rid} > .country-list > #${cid}`)
                            ?.remove();
                    }
                }
            }
            c.remove();
        }
    }

    if (!loc().searchParams.has('currency')) {
        const euroByCountry: Record<string, number> = {};
        const fetchUrl = new URL(loc().href);
        fetchUrl.searchParams.set('currency', '1');
        let parsed = false;
        try {
            const res = await fetch(fetchUrl, { credentials: 'same-origin' });
            if (res.ok) {
                const eur = new DOMParser().parseFromString(await res.text(), 'text/html');
                const list = eur.querySelector<HTMLDivElement>(
                    'ul.hor-switcher ~ div.country-list'
                );
                if (list) {
                    Object.assign(euroByCountry, parseCoinCountsByCountryFromDoc(list));
                } else {
                    Object.assign(euroByCountry, parseCoinCountsByCountryFromDoc(eur));
                }
                parsed = true;
            }
        } catch {
            // leave euroByCountry empty; rows stay at full totals
        }
        if (parsed) {
            const euroSlugs = getEuroSlugsFromTree(regionTree);
            const rows = document.querySelectorAll<HTMLDivElement>(
                'ul.hor-switcher ~ ul.regions div.cntry'
            );
            for (const c of rows) {
                const cid = c.id || c.querySelector('a')?.href.match(/&country=(\w+)/)?.[1];
                if (!cid) {
                    continue;
                }
                const total =
                    perCountryTotal[cid] !== undefined
                        ? perCountryTotal[cid]
                        : +(c.querySelector('span.right')?.textContent ?? 0) || 0;
                const eurC = euroByCountry[cid] ?? 0;
                const r = c.closest<HTMLElement>('.region');
                const inEuro = r && euroSlugs.has(r.id);
                const n = inEuro ? eurC : Math.max(0, total - eurC);
                const s = c.querySelector('span.right');
                if (s) {
                    s.textContent = String(n);
                }
                if (n <= 0) {
                    c.remove();
                }
            }
        }
    }

    // cleanup empty containers
    for (const l of document.querySelectorAll('.regions .country-list:empty')) {
        l.remove();
    }
    while (document.querySelectorAll('.regions .regions:empty').length) {
        for (const l of document.querySelectorAll('.regions .regions:empty')) {
            l.remove();
        }
        for (const l of document.querySelectorAll('.regions .region h2:only-child')) {
            l.remove();
        }
        for (const l of document.querySelectorAll('.regions .region:empty')) {
            l.remove();
        }
    }

    // update region counts
    updateRegionHeadingsByDirectLists();

    if (headingList) {
        headingList.innerHTML = '';
        headingList.insertAdjacentHTML(
            'beforeend',
            `<li class="region${!currentRegion ? ' active' : ''}">${allText ?? _('All')}</li>`
        );
        for (const r of topRegions) {
            const id = slug(r);
            if (document.querySelector(`.region#${id}`)) {
                headingList.insertAdjacentHTML(
                    'beforeend',
                    `<li class="region${currentRegion === id ? ' active' : ''}" data-id="${id}">${regionNames[r] ?? r}</li>`
                );
            }
        }
        headingList.addEventListener('click', async ({ target }) => {
            if (!target) {
                return;
            }

            const li = target as HTMLLIElement;
            headingList.querySelector('li.active')?.classList.remove('active');
            li.classList.add('active');

            const id = li.dataset.id;
            if (!id) {
                await updateLocationHash((params) => params.delete(Param.REGION));
                for (const c of document.querySelectorAll<HTMLDivElement>(
                    '.region-list ~ .regions > li.region'
                )) {
                    c.classList.remove('active');
                    c.classList.remove('hide');
                }
            } else {
                await updateLocationHash((params) => params.set(Param.REGION, id));
                const cc = document.querySelectorAll<HTMLDivElement>(
                    `.region-list ~ .regions > li.region:not(#${id})`
                );
                for (const c of cc) {
                    c.classList.remove('active');
                    c.classList.add('hide');
                }
                document.getElementById(id)?.classList.remove('hide');
                document.getElementById(id)?.classList.add('active');
            }
        });
    }
}
