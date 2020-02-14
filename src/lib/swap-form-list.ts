import {getFragment, postFragment} from './ajax';
import {randomDelay} from './delay';
import {ListForm} from './list-form';
import {id} from './selectors';
import {addComment, CoinSwapFormOnMatcher, getSwapLinks, getSwapLinksWithMatches, styleListLinks, styleSwapLink} from './swap-links';
import {UID} from './uid';
import {hide, reload, show} from './utils';

const {debug} = console;

export class SwapFormList {
    private variants = new Map<string, CoinSwapVariant>();
    private expandAvailable = false;
    private combineAvailable = false;
    private listBlock: HTMLElement;
    private buttonSet: HTMLElement;
    private form: HTMLFormElement;

    private listForm: ListForm;

    public constructor(listForm: ListForm) {
        this.listForm = listForm;
    }

    public update(listBlock: HTMLElement): void {
        this.listBlock = listBlock;
        this.form = listBlock.querySelector(id(this.listForm.formId));
        if (this.form) {
            this.buttonSet = listBlock.querySelector('center');
            this.addButton('expand', 0, '&laquo;*&raquo;', this.onExpand);
            this.addButton('expand', 5, '&laquo;5&raquo;', this.onExpand);
            this.addButton('expand', 10, '&laquo;10&raquo;', this.onExpand);
            this.addButton('combine', 0, '&raquo;&middot;&laquo;', this.onCombine);
            this.updateButtons();
        }
    }

    private addButton(role: SwapListManageRole, qty: number, text: string, clickHandler: (qty: number) => void): void {
        const buttonId = `${role}-qty`;
        const expand = this.buttonSet.querySelector<HTMLElement>(id(buttonId));
        if (expand) {
            show(expand);
        } else {
            this.buttonSet.insertAdjacentHTML('beforeend',
                `<button id="${buttonId}" type="button" class="btn--${role} btn-s btn-blue">${text}</button>`);
            this.buttonSet.querySelector(id(buttonId)).addEventListener('click', () => {
                this.hideButtons();
                clickHandler(qty);
                this.updateButtons();
            });
        }
    }

    private updateVariants(): void {
        this.expandAvailable = false;
        this.combineAvailable = false;
        this.variants.clear();

        for (const {m} of getSwapLinksWithMatches()) {
            const {uniq, usid, cond, price, info, vid, strqty} = m;
            const qty = +strqty;
            if (qty > 1) {
                this.expandAvailable = true;
            }

            let variant: CoinSwapVariant;
            if (this.variants.has(uniq)) {
                variant = this.variants.get(uniq);
                variant.usids.add(usid);
                variant.total += qty;
                this.combineAvailable = true;
            } else {
                variant = {usid, usids: new Set([usid]), cond, price, info, vid, qty, total: qty};
            }
            this.variants.set(uniq, variant);
        }
    }

    private showButtons(role?: SwapListManageRole): void {
        show(...this.buttonSet.querySelectorAll<HTMLButtonElement>(`button${role ? `.btn--${role}` : ''}`));
    }

    private hideButtons(role?: SwapListManageRole): void {
        hide(...this.buttonSet.querySelectorAll<HTMLButtonElement>(`button${role ? `.btn--${role}` : ''}`));
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
        this.expandAvailable ? this.showExpandButtons() : this.hideExpandButtons();
        this.combineAvailable ? this.showCombineButtons() : this.hideCombineButtons();
    }

    /**
     * @param expandTo number of links (0 for unlimited)
     */
    private async onExpand(expandTo = 0): Promise<void> {
        debug(`EXPANDING...`);

        let isAddFailed = false;
        let isUpdFailed = false;
        let isFirstQuery = true;

        for await (const {a, m} of getSwapLinksWithMatches()) {
            const {uniq, usid, cond, price, info, vid, strqty} = m;
            const qty = +strqty;

            const n = expandTo > 0 ? Math.min(qty, expandTo) : qty;
            if (n <= 1) {
                debug(`IGNORING ${uniq} ${usid}`);
                continue; // return?
            }

            for (let i = n, qq = qty, q = Math.floor(qq / i); i > 1; i--, q = Math.floor(qq / i)) {
                qq -= q;
                if (!isFirstQuery) {
                    await randomDelay();
                }
                isFirstQuery = false;

                debug(`ADDING ${uniq} ${n - i + 1} -> ${q}`);
                const addR = await this.addSwapCoin({cond, qty: q, vid, info, price});
                if (!addR) {
                    isAddFailed = true;
                    break;
                }

                const links = new Set();
                for (const l of getSwapLinks()) {
                    if (!l.hasAttribute('onClick')) {
                        continue;
                    }

                    const m = <CoinSwapFormOnMatchResult> l.getAttribute('onClick').match(CoinSwapFormOnMatcher);
                    if (m && m.groups) {
                        links.add(m.groups.usid);
                    }
                }

                for (const l of getSwapLinks(addR)) {
                    if (!l.hasAttribute('onClick')) {
                        continue;
                    }
                    const m = <CoinSwapFormOnMatchResult> l.getAttribute('onClick').match(CoinSwapFormOnMatcher);
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
                    await randomDelay();
                }
                isFirstQuery = false;

                debug(`UPDATING ${uniq} ${usid} -> ${qq}`);
                const updR = await this.updateSwapCoin(usid, {cond, qty: qq, vid, info, price});
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

        for (const variant of this.variants.values()) {
            const {usid, usids, qty, total} = variant;
            if (total <= qty) {
                continue;
            }

            const remove = new Set<string>(usids);
            remove.delete(usid);

            debug(`REMOVING ${remove}`);
            if (!await this.deleteSwapCoin(remove)) {
                isDelFailed = true;
                break;
            }

            debug(`UPDATING ${usid}`);
            const content = await this.updateSwapCoin(usid, {...variant, qty: total});
            if (content) {
                const newListBlock = content.getElementById(this.listForm.mainId);
                if (newListBlock && this.listBlock) {
                    this.listBlock.replaceWith(newListBlock);
                    styleListLinks(this.listBlock);
                    this.listBlock = newListBlock;
                }
            } else {
                isUpdFailed = true;
                break;
            }
        }

        if (isDelFailed) {
            debug('ADD FAILED :(');
        } else if (isUpdFailed) {
            debug('UPDATE FAILED :(');
        } else {
            debug('DONE!');
        }
    }

    private async updateSwapCoin(usid: string, {cond, qty, vid, info, price}: CoinSwapVariantData, action: SwapFormAction = 'editswapcoin'): Promise<DocumentFragment> {
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
        debug('this.listForm.mainId');
        debug(this.listForm.mainId);
        debug('fragment.getElementById(this.listForm.mainId)');
        debug(fragment.getElementById(this.listForm.mainId));

        if (!fragment.getElementById(this.listForm.mainId)) {
            return reload();
        }

        return fragment;
    }

    private async addSwapCoin(data: CoinSwapVariantData): Promise<DocumentFragment> {
        return await this.updateSwapCoin('', data, 'addswapcoin');
    }

    private async deleteSwapCoin(usid: string | Set<string>): Promise<DocumentFragment> {
        if (usid instanceof Set) {
            usid = [...usid].join(',');
        }

        const url = new URL('/swap-list/', location.href);
        const p = url.searchParams;
        p.set('f', 'del');
        p.set('uid', UID);
        p.set('usid', usid);

        const fragment = await getFragment(url.href);
        if (!fragment.getElementById(this.listForm.listId)) {
            return reload();
        }

        return fragment;
    }

    // eslint-disable-next-line class-methods-use-this
    private updateLinkQty(a: HTMLAnchorElement, qty: number): void {
        if (a.hasAttribute('onClick')) {
            a.setAttribute('onClick', a.getAttribute('onClick').replace(CoinSwapFormOnMatcher,
                `CoinSwapFormOn('$<usid>', '$<cond>', '$<price>', '$<info>', '$<vid>', '${qty}', '$<replica>'`));
        }

        for (const span of a.querySelectorAll('span.left.dblue-13')) {
            span.remove();
        }
        if (qty > 1) {
            for (const span of a.querySelectorAll('span.left.gray-13.wrap')) {
                span.insertAdjacentHTML('afterend', `<span class="left dblue-13"><span>&times;</span>${qty}</span>`);
            }
        }
    }
}
