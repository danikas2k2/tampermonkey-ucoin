import { Condition, ConditionColors } from './cond';
import { UID } from './uid';

export const CoinSwapFormOnMatcher =
    /CoinSwapFormOn\('(?<usid>[^']*)', '(?<cond>[^']*)', '(?<price>[^']*)', '(?<info>[^']*)', '(?<vid>[^']*)', '(?<strqty>[^']*)', '(?<replica>[^']*)'/;

export function* getSwapLinks(
    d: Document | DocumentFragment = document
): IterableIterator<HTMLAnchorElement> {
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
            const m = a
                .getAttribute('onClick')
                ?.match(CoinSwapFormOnMatcher) as CoinSwapFormOnMatchResult;
            if (m && m.groups) {
                const { cond, info, vid } = m.groups;
                yield { a, m: { ...m.groups, uniq: `${cond} ${vid} ${info}` } };
            }
        }
    }
}

export function styleSwapLink(a: HTMLAnchorElement): void {
    if (
        !a.href.endsWith(`?uid=${UID}`) &&
        (a.previousElementSibling as HTMLAnchorElement)?.href.endsWith(`?uid=${UID}`)
    ) {
        a.classList.add('with-separator');
    }

    const condBlock = a.querySelector(`.left.dgray-11`);
    if (condBlock) {
        const cond = condBlock.textContent?.trim() as Condition;
        condBlock.classList.add(`marked-${ConditionColors[cond]}`);
    }

    const mintBlock = a.querySelector(`.left.gray-13`);
    if (!mintBlock) {
        return;
    }

    const mint = mintBlock.textContent;
    const parts = mint?.split(' ');
    const y = parts?.shift();
    if (parts?.length) {
        mintBlock.textContent = y || '';
        mintBlock.insertAdjacentHTML(
            'beforeend',
            ` <span class="lgray-11">${parts.join(' ')}</span>`
        );
    }
}

export function styleListLinks(list?: HTMLElement | null): void {
    const listOfLinks = list?.querySelectorAll<HTMLAnchorElement>('a.list-link') ?? [];
    for (const a of listOfLinks) {
        styleSwapLink(a);
    }
}

export function addComment(a: HTMLAnchorElement): void {
    if (a.hasAttribute('onClick')) {
        const m = a
            .getAttribute('onClick')
            ?.match(CoinSwapFormOnMatcher) as CoinSwapFormOnMatchResult;
        if (m?.groups) {
            const { info } = m.groups;
            if (info && !a.querySelector('.comments')) {
                a.insertAdjacentHTML(
                    'beforeend',
                    `<span class="right dgray-11 wrap comments" title="${info}"><div class="ico-16"></div> ${info}</span>`
                );
            }
        }
    }
}

export function addLinkComments(): void {
    for (const a of getSwapLinks()) {
        addComment(a);
    }
}
