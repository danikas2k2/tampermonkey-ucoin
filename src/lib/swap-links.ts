export const CoinSwapFormOnMatcher = /CoinSwapFormOn\('(?<usid>[^']*)', '(?<cond>[^']*)', '(?<price>[^']*)', '(?<info>[^']*)', '(?<vid>[^']*)', '(?<strqty>[^']*)', '(?<replica>[^']*)'/;

export function getSwapLinks(d: DocumentFragment = document): NodeListOf<HTMLAnchorElement> {
    const swapBlock = d.getElementById('swap-block');
    return swapBlock
        ? swapBlock.querySelectorAll('a.list-link')
        : d.querySelectorAll('a.imaginary-list-link'); // should return empty list
}

export function forEachSwapLink(fn: (a: HTMLAnchorElement, m: CoinSwapFormOnMatchGroups) => void): void {
    const swapLinks = getSwapLinks();
    swapLinks.forEach(a => {
        if (a.querySelector(`div.ico-16`)) {
            return;
        }
        if (a.hasAttribute('onClick')) {
            const m = <CoinSwapFormOnMatchResult>a.getAttribute('onClick').match(CoinSwapFormOnMatcher);
            if (m && m.groups) {
                const {cond, info, vid} = m.groups;
                fn(a, {...m.groups, uniq: `${cond} ${vid} ${info}`});
            }
        }
    });
}
