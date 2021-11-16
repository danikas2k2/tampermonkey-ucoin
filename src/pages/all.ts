export async function handleTree() {
    const tree = document.getElementById('catalog-tree');
    if (tree) {
        const treeSearchId = 'tree-search';
        const treeSearch = document.getElementById(treeSearchId);
        if (treeSearch) {
            treeSearch.closest('div')?.remove();
        }

        const searchInputId = 'search-input-id';
        tree.insertAdjacentHTML(
            'beforebegin',
            `<input id='${searchInputId}' class='tree-filter' placeholder='Search'/>`
        );
        const searchInput = document.getElementById(searchInputId) as HTMLInputElement;
        searchInput.addEventListener('input', () => {
            // const pattern = new RegExp([...searchInput.value].join('.*?'), 'i');
            const pattern = new RegExp(searchInput.value.replace(/\W+/g, '.*?'), 'i');
            for (const a of tree.querySelectorAll('a.country-name')) {
                const country = a.closest('div.country');
                if (country) {
                    const countryVisible: boolean = pattern.test(a.textContent!);
                    let visiblePeriods = 0;
                    const periods = country.querySelectorAll('a.period');
                    for (const p of periods) {
                        if (!countryVisible) {
                            const periodVisible: boolean = pattern.test(p.textContent!);
                            p.classList.toggle('hide', !periodVisible);
                            if (periodVisible) {
                                visiblePeriods += 1;
                            }
                        } else {
                            p.classList.remove('hide');
                        }
                    }
                    country.classList.toggle('hide', !countryVisible && !visiblePeriods);
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

            for (const reg of tree.querySelectorAll('div.reg')) {
                const { length } = reg.querySelectorAll('div.country:not(.hide)');
                reg.classList.toggle('hide', !length);

                const region = reg.querySelector('.region');
                if (region) {
                    const visibleRegion: boolean = (length > 0 && length <= 5) || region.matches('.open');
                    reg.querySelector('.countries')?.classList.toggle('hide', !visibleRegion);
                }
            }
        });
    }
}

export async function handleLanguages() {
    let lt = document.querySelector<HTMLAnchorElement>('ul.bottom-lang a[href*="://lt."]');
    if (lt) {
        return;
    }
    const it = document.querySelector<HTMLAnchorElement>('ul.bottom-lang a[href*="://it."]');
    if (!it) {
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
