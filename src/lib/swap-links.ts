export const CoinSwapFormOnMatcher = /CoinSwapFormOn\('(?<usid>[^']*)', '(?<cond>[^']*)', '(?<price>[^']*)', '(?<info>[^']*)', '(?<vid>[^']*)', '(?<strqty>[^']*)', '(?<replica>[^']*)'/;

export function* getSwapLinks(d: DocumentFragment = document): IterableIterator<HTMLAnchorElement> {
    const swapBlock = d.getElementById('swap-block');
    if (swapBlock) {
        const listOfLinks = <NodeListOf<HTMLAnchorElement>> swapBlock.querySelectorAll('a.list-link');
        for (const a of listOfLinks) {
            yield a;
        }
    }
}

export function* getSwapLinksWithMatches(): IterableIterator<CoinSwapAnchorAndMatchTuple> {
    for (const a of getSwapLinks()) {
        if (a.querySelector(`div.ico-16`)) {
            continue;
        }
        if (a.hasAttribute('onClick')) {
            const m = <CoinSwapFormOnMatchResult> a.getAttribute('onClick').match(CoinSwapFormOnMatcher);
            if (m && m.groups) {
                const {cond, info, vid} = m.groups;
                yield {a, m: {...m.groups, uniq: `${cond} ${vid} ${info}`}};
            }
        }
    }
}
