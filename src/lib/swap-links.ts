import { Condition, ConditionColors } from './cond';
import { UID } from './uid';

export const CoinSwapFormOnMatcher =
    /CoinSwapFormOn\('(?<usid>[^']*)', '(?<cond>[^']*)', '(?<price>[^']*)', '(?<info>[^']*)', '(?<vid>[^']*)', '(?<strqty>[^']*)', '(?<replica>[^']*)'/;

export function* getSwapLinks(
    d: Document | DocumentFragment = document
): IterableIterator<HTMLAnchorElement> {
    const block = d.querySelector('#swap #swap-block');
    if (block) {
        const links = block.querySelectorAll<HTMLAnchorElement>('a.list-link');
        if (!links.length) {
            console.debug('No swap links found.');
        }
        for (const a of links) {
            yield a;
        }
    } else {
        console.debug('Swap block not found.');
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

    const condBlock = a.querySelector(`.cond`);
    console.info(`[DEV]`, condBlock);
    if (condBlock) {
        const cond = condBlock.textContent?.trim() as Condition;
        console.info(`[DEV]`, cond);
        condBlock.classList.add(`marked-${ConditionColors[cond]}`);
    }

    const mintBlock = a.querySelector(`.year`);
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

export function styleListLinks(list: HTMLElement): void {
    const links = list.querySelectorAll<HTMLAnchorElement>('a.list-link');
    if (!links.length) {
        console.debug('No swap links found in the provided list.');
    }
    for (const a of links) {
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
