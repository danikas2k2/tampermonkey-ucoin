import countryRegions from '../data/country-regions.json';
import regionNames from '../data/region-names.json';
import regionTree from '../data/region-tree.json';
import { _ } from './lang';
import { getHashParam, updateLocationHash } from './url';
import { slug, unique } from './utils';

export async function handleCountryRegions(): Promise<void> {
    const headingList = document.querySelector('ul.hor-switcher ~ ul.region-list');
    if (!headingList) {
        return;
    }

    const countryList = document.querySelector<HTMLDivElement>('ul.region-list ~ div.country-list');
    if (!countryList) {
        return;
    }

    const allText = headingList?.querySelector('li.region[value="0"]')?.textContent;
    const REGION_TAB = 'r';
    const currentRegion = getHashParam(REGION_TAB);
    const topRegions = Object.keys(regionTree);

    // add all regions
    countryList.insertAdjacentHTML('beforebegin', `<ul class='regions'></ul>`);
    (function renderRegions(container: Element, regions: Record<string, string[]> | string[]) {
        const entries: [string, string[]][] = Array.isArray(regions)
            ? regions.map((r) => [r, []])
            : Object.entries(regions);
        for (const [k, sub] of entries) {
            const id = slug(k);
            const active = currentRegion && id === currentRegion ? ' active' : '';
            const hide =
                currentRegion && id !== currentRegion && topRegions.includes(k) ? ` hide` : '';
            container.insertAdjacentHTML(
                'beforeend',
                `<li class='region${hide}${active}' id='${id}'><h2>${_(
                    k,
                    regionNames
                )}</h2><ul class='regions'></ul><div class='country-list catalog-list'></div></li>`
            );
            const region = container.querySelector(`#${id} .regions`);
            if (region) {
                renderRegions(region, sub);
            }
        }
    })(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        countryList.previousElementSibling!,
        regionTree
    );

    // move countries to regions
    const coinCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};
    countryList.querySelectorAll<HTMLDivElement>('div.cntry').forEach((c) => {
        const [, cid] = c.querySelector('a')?.href.match(/&country=(\w+)/) || [];
        // const found = countries.find((o) => cid === o.cid);
        // if (found) {
        //     const { regions, periods } = found;
        //     periods?.forEach((p) => p.regions && regions.push(...p.regions));
        //     unique(regions).forEach((r) => {
        const regions = (countryRegions as Record<string, string[]>)[cid];
        if (regions) {
            for (const r of unique(regions)) {
                const id = slug(r);
                const cl = document.querySelector(`.region#${id} > .country-list`);
                if (cl && !cl.querySelector(`#${cid}`)) {
                    const coinCount = +(c.querySelector('span.right')?.textContent || 0);
                    coinCounts[id] = (coinCounts[id] || 0) + coinCount;
                    countryCounts[id] = (countryCounts[id] || 0) + 1;
                    const cc = c.cloneNode(true) as HTMLElement;
                    cc.id = cid;
                    cl.append(cc);

                    for (
                        let p = cl.closest('.region')?.parentElement, r;
                        (r = p?.closest<HTMLDivElement>('.region'));
                        p = r.parentElement
                    ) {
                        const rid = r.id;
                        coinCounts[rid] =
                            (coinCounts[rid] || 0) >= coinCount ? coinCounts[rid] - coinCount : 0;
                        countryCounts[rid] =
                            (countryCounts[rid] || 0) >= 1 ? countryCounts[rid] - 1 : 0;
                        r.parentElement
                            ?.querySelector(`#${rid} > .country-list > #${cid}`)
                            ?.remove();
                    }
                }
            }
            c.remove();
        }
    });

    // cleanup empty containers
    document.querySelectorAll('.regions .country-list:empty').forEach((l) => l.remove());
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
    document
        .querySelectorAll('.regions .region')
        .forEach(
            (r) =>
                countryCounts[r.id] &&
                coinCounts[r.id] &&
                r
                    .querySelector('h2')
                    ?.insertAdjacentHTML(
                        'beforeend',
                        `<span class='lgray-13'>( ${countryCounts[r.id]} / ${
                            coinCounts[r.id]
                        } )</span>`
                    )
        );

    const ACTIVE = 'active';

    headingList.innerHTML = '';
    headingList.insertAdjacentHTML(
        'beforeend',
        `<li class='region${!currentRegion ? ` ${ACTIVE}` : ''}'>${allText}</li>`
    );
    for (const r of topRegions) {
        const id = slug(r);
        if (document.querySelector(`.region#${id}`)) {
            headingList.insertAdjacentHTML(
                'beforeend',
                `<li class='region${currentRegion === id ? ` ${ACTIVE}` : ''}' data-id='${id}'>${_(
                    r,
                    regionNames
                )}</li>`
            );
        }
    }
    headingList.addEventListener('click', async ({ target }) => {
        if (!target) {
            return;
        }

        const li = target as HTMLLIElement;
        headingList.querySelector(`li.${ACTIVE}`)?.classList.remove(ACTIVE);
        li.classList.add(ACTIVE);

        const id = li.dataset.id;
        if (!id) {
            await updateLocationHash((params) => params.delete(REGION_TAB));
            document
                .querySelectorAll<HTMLDivElement>('.region-list ~ .regions > li.region')
                .forEach((c) => {
                    c.classList.remove('active');
                    c.classList.remove('hide');
                });
        } else {
            await updateLocationHash((params) => params.set(REGION_TAB, id));
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
