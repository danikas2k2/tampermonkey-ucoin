import {ConditionColors} from './cond';

export const CoinSwapFormOnMatcher = /CoinSwapFormOn\('(?<usid>[^']*)', '(?<cond>[^']*)', '(?<price>[^']*)', '(?<info>[^']*)', '(?<vid>[^']*)', '(?<strqty>[^']*)', '(?<replica>[^']*)'/;

export function* getSwapLinks(d: DocumentFragment = document): IterableIterator<HTMLAnchorElement> {
    const swapBlock = d.getElementById('swap-block');
    if (swapBlock) {
        const listOfLinks = swapBlock.querySelectorAll<HTMLAnchorElement>('a.list-link');
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

export function styleSwapLink(a: HTMLAnchorElement) {
    const condBlock = a.querySelector(`.left.dgray-11`);
    const cond = condBlock.textContent.trim();
    condBlock.classList.add(`marked-${ConditionColors.get(cond)}`);

    const mintBlock = a.querySelector(`.left.gray-13`);
    const mint = mintBlock.textContent;
    const parts = mint.split(' ');
    const y = parts.shift();
    if (parts.length) {
        mintBlock.textContent = y;
        mintBlock.insertAdjacentHTML('beforeend', ` <span class="lgray-11">${parts.join(' ')}</span>`);
    }
}
