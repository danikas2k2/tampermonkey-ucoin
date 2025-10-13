import { hide, isHidden, show, toggle } from '../lib/utils';

function filterCountryTree(value: string): void {
    const tree = document.querySelector<HTMLElement>('#catalog-tree');
    if (!tree) {
        return;
    }

    const pattern = new RegExp(value?.replace(/\W+/g, '.*?'), 'i');
    const countryNames = tree.querySelectorAll('a.country-name');
    for (const a of countryNames) {
        const country = a.closest<HTMLElement>('div.country');
        if (country) {
            const countryVisible: boolean = pattern.test(a.textContent ?? '');
            let visiblePeriods = 0;
            const periods = country.querySelectorAll<HTMLElement>('a.period');
            for (const p of periods) {
                if (!countryVisible) {
                    const periodVisible: boolean = pattern.test(p.textContent ?? '');
                    toggle(periodVisible, p);
                    if (periodVisible) {
                        visiblePeriods += 1;
                    }
                } else {
                    show(p);
                }
            }
            toggle(countryVisible || !!visiblePeriods, country);
            const showPeriods: boolean = visiblePeriods > 0 && visiblePeriods < 6;
            const periodsBlock = country.querySelector<HTMLDivElement>('.periods');
            if (periodsBlock) {
                periodsBlock.style.display = showPeriods ? 'block' : 'none';
            }
            const plusMinus = country.querySelector<HTMLImageElement>('img');
            if (plusMinus) {
                plusMinus.src = showPeriods ? '/i/bg/minus.gif' : '/i/bg/plus.gif';
            }
        }
    }

    // remove duplicated
    for (const country of tree.querySelectorAll<HTMLElement>('div.country')) {
        if (!isHidden(country)) {
            const otherCountries = [
                ...tree.querySelectorAll<HTMLElement>('div.country:not(.hide)'),
            ].filter((c) => c !== country && c.textContent === country.textContent);
            for (const otherCountry of otherCountries) {
                hide(otherCountry);
            }
        }
    }

    // expand only visible country
    const visibleCountries = tree.querySelectorAll('div.country:not(.hide)');
    if (visibleCountries.length === 1) {
        const country = visibleCountries[0];
        const periodsBlock = country.querySelector<HTMLDivElement>('.periods');
        if (periodsBlock) {
            periodsBlock.style.display = 'block';
        }
        const plusMinus = country.querySelector<HTMLImageElement>('img');
        if (plusMinus) {
            plusMinus.src = '/i/bg/minus.gif';
        }
    }

    // expand visible periods
    const regions = tree.querySelectorAll<HTMLElement>('div.reg');
    for (const reg of regions) {
        const { length } = reg.querySelectorAll('div.country:not(.hide)');
        toggle(!!length, reg);

        const region = reg.querySelector('.region');
        if (region) {
            const visibleRegion: boolean = (length > 0 && length <= 5) || region.matches('.open');
            reg.classList.toggle('open', !visibleRegion);
            const regionCountries = reg.querySelector<HTMLElement>('.countries');
            if (regionCountries) {
                regionCountries.style.display = '';
                toggle(visibleRegion, regionCountries);
            }
        }
    }
}

export async function handleTree(): Promise<void> {
    const tree = document.getElementById('catalog-tree');
    if (!tree) {
        return;
    }

    const treeSearchId = 'tree-search';
    document.getElementById(treeSearchId)?.closest('div')?.remove();
    const searchInputId = 'search-input-id';
    tree.insertAdjacentHTML(
        'beforebegin',
        `<input id="${searchInputId}" class="tree-filter" placeholder="Search"/>`
    );
    document
        .getElementById(searchInputId)
        ?.addEventListener('input', (e) => filterCountryTree((e.target as HTMLInputElement).value));
}

export async function handleLanguages(): Promise<void> {
    let lt = document.querySelector<HTMLAnchorElement>('ul.bottom-lang a[href*="://lt."]');
    if (lt) {
        console.error('handleLanguages: lt language already exists');
        return;
    }
    const it = document.querySelector<HTMLAnchorElement>('ul.bottom-lang a[href*="://it."]');
    if (!it) {
        console.error('handleLanguages: it language not found');
        return;
    }
    const lit = it.closest('li');
    const sep = lit?.nextElementSibling;
    const llt = lit?.cloneNode(true) as HTMLLIElement;
    lt = llt?.querySelector('a');
    if (!lt) {
        return;
    }
    lt.href = it.href.replace('/it.', '/lt.');
    lt.textContent = 'Lietuvių';
    sep?.insertAdjacentElement('afterend', llt);
    llt?.insertAdjacentElement('afterend', sep?.cloneNode(true) as HTMLElement);
}
