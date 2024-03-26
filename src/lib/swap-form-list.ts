import { getFragment, postFragment } from './ajax';
import { randomDecoratedDelay } from './delay';
import { ListForm } from './list-form';
import {
    addComment,
    CoinSwapFormOnMatcher,
    getSwapLinks,
    getSwapLinksWithMatches,
    styleListLinks,
    styleSwapLink,
} from './swap-links';
import { UID } from './uid';
import { hide, reload, show } from './utils';

const { debug } = console;

export class SwapFormList {
    #variants = new Map<string, CoinSwapVariant>();
    #expandAvailable = false;
    #combineAvailable = false;
    #listBlock: HTMLElement | undefined | null;
    #listForm: ListForm;

    constructor(listForm: ListForm) {
        this.#listForm = listForm;
    }

    get form(): HTMLFormElement | null {
        return (
            this.#listBlock?.querySelector(this.#listForm.formSelector) ||
            document.querySelector(this.#listForm.formSelector) ||
            null
        );
    }

    get buttonSet(): HTMLElement | null {
        return this.#listBlock?.querySelector('center') || null;
    }

    public update(listBlock: HTMLElement | null): void {
        if (this.#listBlock && listBlock) {
            this.#listBlock.replaceWith(listBlock);
        } else {
            this.#listBlock = listBlock;
        }

        if (this.buttonSet) {
            /*const oldButton = this.buttonSet.querySelector('button.btn-s.btn-gray');
            if (oldButton) {
                oldButton.remove();
            }*/
            this.addButton('expand', 0, '&laquo;*&raquo;', (n) => this.onExpand(n));
            this.addButton('expand', 5, '&laquo;5&raquo;', (n) => this.onExpand(n));
            this.addButton('expand', 10, '&laquo;10&raquo;', (n) => this.onExpand(n));
            this.addButton('combine', 0, '&raquo;&middot;&laquo;', () => this.onCombine());
            this.updateButtons();
        }
    }

    private addButton(
        role: SwapListManageRole,
        qty: number,
        text: string,
        clickHandler: (qty: number) => void
    ): void {
        if (!this.buttonSet) {
            return;
        }
        const buttonId = `${role}-qty`;
        const expand = this.buttonSet.querySelector<HTMLElement>(`#${buttonId}`);
        if (expand) {
            show(expand);
        } else {
            this.buttonSet.insertAdjacentHTML(
                'beforeend',
                `<button id='${buttonId}' type='button' class='btn--${role} btn-s btn-blue'>${text}</button>`
            );
            this.buttonSet.querySelector(`#${buttonId}`)?.addEventListener('click', async () => {
                this.hideButtons();
                await clickHandler(qty);
                this.updateButtons();
            });
        }
    }

    private updateVariants(): void {
        this.#expandAvailable = false;
        this.#combineAvailable = false;
        this.#variants.clear();

        for (const { m } of getSwapLinksWithMatches()) {
            const {
                uniq = '',
                usid = '',
                cond = '',
                price = '',
                info = '',
                vid = '',
                strqty = 0,
            } = m;
            const qty = +strqty;
            if (qty > 1) {
                this.#expandAvailable = true;
            }

            let variant: CoinSwapVariant | undefined;
            if (this.#variants.has(uniq)) {
                variant = this.#variants.get(uniq);
                if (variant) {
                    variant.usids.add(usid);
                    variant.total += qty;
                }
                this.#combineAvailable = true;
            } else {
                variant = { usid, usids: new Set([usid]), cond, price, info, vid, qty, total: qty };
            }
            if (variant) {
                this.#variants.set(uniq, variant);
            }
        }
    }

    private showButtons(role?: SwapListManageRole): void {
        if (this.buttonSet) {
            show(
                ...this.buttonSet.querySelectorAll<HTMLButtonElement>(
                    `button${role ? `.btn--${role}` : ''}`
                )
            );
        }
    }

    private hideButtons(role?: SwapListManageRole): void {
        if (this.buttonSet) {
            hide(
                ...this.buttonSet.querySelectorAll<HTMLButtonElement>(
                    `button${role ? `.btn--${role}` : ''}`
                )
            );
        }
    }

    private showExpandButtons(): void {
        this.showButtons('expand');
    }

    private showCombineButtons(): void {
        this.showButtons('combine');
    }

    private hideExpandButtons(): void {
        this.hideButtons('expand');
    }

    private hideCombineButtons(): void {
        this.hideButtons('combine');
    }

    private updateButtons(): void {
        this.updateVariants();
        if (this.#expandAvailable) {
            this.showExpandButtons();
        } else {
            this.hideExpandButtons();
        }

        if (this.#combineAvailable) {
            this.showCombineButtons();
        } else {
            this.hideCombineButtons();
        }
    }

    /**
     * @param expandTo number of links (0 for unlimited)
     */
    private async onExpand(expandTo = 0): Promise<void> {
        debug(`EXPANDING...`);

        let isAddFailed = false;
        let isUpdFailed = false;
        let isFirstQuery = true;

        for await (const { a, m } of getSwapLinksWithMatches()) {
            const {
                uniq = '',
                usid = '',
                cond = '',
                price = '',
                info = '',
                vid = '',
                strqty = 0,
            } = m;
            const qty = +strqty;

            const n = expandTo > 0 ? Math.min(qty, expandTo) : qty;
            if (n <= 1) {
                debug(`IGNORING ${uniq} ${usid}`);
                continue; // return?
            }

            for (let i = n, qq = qty, q = Math.floor(qq / i); i > 1; i--, q = Math.floor(qq / i)) {
                qq -= q;
                if (!isFirstQuery) {
                    await randomDecoratedDelay();
                }
                isFirstQuery = false;

                debug(`ADDING ${uniq} ${n - i + 1} -> ${q}`);
                const addR = await this.addSwapCoin({ cond, qty: q, vid, info, price });
                if (!addR) {
                    isAddFailed = true;
                    break;
                }

                const links = new Set();
                for (const l of getSwapLinks()) {
                    if (!l.hasAttribute('onClick')) {
                        continue;
                    }

                    const m = l
                        .getAttribute('onClick')
                        ?.match(CoinSwapFormOnMatcher) as CoinSwapFormOnMatchResult;
                    if (m && m.groups) {
                        links.add(m.groups.usid);
                    }
                }

                for (const l of getSwapLinks(addR)) {
                    if (!l.hasAttribute('onClick')) {
                        continue;
                    }

                    const m = l
                        .getAttribute('onClick')
                        ?.match(CoinSwapFormOnMatcher) as CoinSwapFormOnMatchResult;
                    const usid = m && m.groups && m.groups.usid;
                    if (!usid || links.has(usid)) {
                        continue;
                    }
                    links.add(usid);
                    styleSwapLink(l);
                    a.insertAdjacentElement('afterend', l);
                    addComment(l);
                }

                if (!isFirstQuery) {
                    await randomDecoratedDelay();
                }
                isFirstQuery = false;

                debug(`UPDATING ${uniq} ${usid} -> ${qq}`);
                const updR = await this.updateSwapCoin(usid, { cond, qty: qq, vid, info, price });
                if (!updR) {
                    isUpdFailed = true;
                    break;
                }

                this.updateLinkQty(a, qq);
            }

            if (isAddFailed || isUpdFailed) {
                break;
            }
        }

        if (isAddFailed) {
            debug('ADD FAILED :(');
        } else if (isUpdFailed) {
            debug('UPDATE FAILED :(');
        } else {
            debug('DONE!');
        }
    }

    private async onCombine(): Promise<void> {
        debug(`COMBINING...`);

        let isDelFailed = false;
        let isUpdFailed = false;

        for (const variant of [...this.#variants.values()]) {
            const { usid, usids, qty = 0, total } = variant;
            debug(`VARIANT usid=${usid} usids=${[...usids].join(',')} qty=${qty} total=${total}`);
            if (total <= qty) {
                continue;
            }

            const remove = new Set<string>(usids);
            remove.delete(usid);
            if (!remove.size) {
                continue;
            }

            debug(`REMOVING ${[...remove].join(', ')}`);
            const deleteContent = await this.deleteSwapCoin(remove);
            if (deleteContent) {
                const newListBlock = deleteContent.querySelector<HTMLElement>(
                    this.#listForm.listSelector
                );
                if (newListBlock && this.#listBlock) {
                    const center = this.#listBlock.querySelector('center');
                    if (center) {
                        newListBlock.querySelector('center')?.replaceWith(center);
                    }
                    styleListLinks(newListBlock);
                    this.update(newListBlock);
                }
            } else {
                isDelFailed = true;
                break;
            }

            debug(`UPDATING ${usid}`);
            const updateContent = await this.updateSwapCoin(usid, { ...variant, qty: total });
            if (updateContent) {
                const newListBlock = updateContent.querySelector<HTMLElement>(
                    this.#listForm.listSelector
                );
                debug(this.#listForm.listSelector, this.#listBlock, newListBlock);
                if (newListBlock && this.#listBlock) {
                    const center = this.#listBlock.querySelector('center');
                    if (center) {
                        newListBlock.querySelector('center')?.replaceWith(center);
                    }
                    styleListLinks(newListBlock);
                    this.update(newListBlock);
                }
            } else {
                isUpdFailed = true;
                break;
            }
        }

        if (isDelFailed) {
            debug('REMOVE FAILED :(');
        } else if (isUpdFailed) {
            debug('UPDATE FAILED :(');
        } else {
            debug('DONE!');
        }
    }

    private async updateSwapCoin(
        usid: string,
        { cond, qty, vid, info, price }: CoinSwapVariantData,
        action: SwapFormAction = 'editswapcoin'
    ): Promise<DocumentFragment | null> {
        if (!this.form) {
            return null;
        }
        const data = new FormData(this.form);
        data.set('usid', `${usid || ''}`);
        data.set('condition', `${cond || ''}`);
        data.set('qty', `${qty || ''}`);
        data.set('swap-variety', `${vid || ''}`);
        data.set('comment', `${info || ''}`);
        data.set('price', `${price || ''}`);
        data.set('action', `${action || ''}`);

        const fragment = await postFragment(location.href, data);

        debug('fragment');
        debug(fragment);
        debug('this.listForm.mainSelector');
        debug(this.#listForm.mainSelector);
        debug('fragment.querySelector(this.listForm.mainSelector)');
        debug(fragment.querySelector(this.#listForm.mainSelector));

        if (!fragment.querySelector(this.#listForm.mainSelector)) {
            return reload();
        }

        return fragment;
    }

    private async addSwapCoin(data: CoinSwapVariantData): Promise<DocumentFragment | null> {
        return await this.updateSwapCoin('', data, 'addswapcoin');
    }

    // eslint-disable-next-line class-methods-use-this
    private async deleteSwapCoin(usid: string | Set<string>): Promise<DocumentFragment | null> {
        if (!UID) {
            return null;
        }
        if (usid instanceof Set) {
            usid = [...usid].join(',');
        }

        const url = new URL('/swap-list/', location.href);
        const p = url.searchParams;
        p.set('f', 'del');
        p.set('usid', usid);
        p.set('uid', UID);

        const fragment = await getFragment(url.href, null, false);
        if (!fragment) {
            return reload();
        }
        return fragment;
    }

    // eslint-disable-next-line class-methods-use-this
    private updateLinkQty(a: HTMLAnchorElement, qty: number): void {
        if (a.hasAttribute('onClick')) {
            const onClick = a
                .getAttribute('onClick')
                ?.replace(
                    CoinSwapFormOnMatcher,
                    `CoinSwapFormOn('$<usid>', '$<cond>', '$<price>', '$<info>', '$<vid>', '${qty}', '$<replica>'`
                );
            if (onClick) {
                a.setAttribute('onClick', onClick);
            }
        }
        for (const span of a.querySelectorAll('span.left.dblue-13')) {
            span.remove();
        }
        if (qty > 1) {
            for (const span of a.querySelectorAll('span.left.gray-13.wrap')) {
                span.insertAdjacentHTML(
                    'afterend',
                    `<span class='left dblue-13'><span>&times;</span>${qty}</span>`
                );
            }
        }
    }
}
