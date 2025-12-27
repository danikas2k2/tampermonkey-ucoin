import { Color, Condition, ConditionValues, SwapValue } from './cond';
// import { getDetails } from './details';
import { ListForm } from './list-form';
import { cmp } from './sort';
// import { getPriceByConditions } from './prices';
import { SwapFormList } from './swap-form-list';
import { addLinkComments, CoinSwapFormOnMatcher, styleListLinks } from './swap-links';
import { UID } from './uid';
import { loc } from './url';
import { getCurrentVarietyId } from './vid';

// const { debug } = console;

// declare let CoinSwapFormOn: (usid: string, cond: string, price: string, info: string, vid: string, qty: string, replica: string, ...other: string[]) => void;
// declare let CoinSwapFormOff: (...other: string[]) => void;

export class SwapForm extends ListForm {
    formType: FormType = 'swap';
    formTypeMethod: FormTypeMethod = 'Swap';
    formTypePrefix: FormTypePrefix = '';
    formUidPrefix: FormUidPrefix = 's';

    buttonSetButtons: Map<string, [Color, SwapValue]> = new Map([
        ['?', [Color.UNKNOWN, SwapValue.UNKNOWN]],
        ['G', [Color.G, SwapValue.G]],
        ['VG', [Color.VG, SwapValue.VG]],
        ['F', [Color.F, SwapValue.F]],
        ['VF', [Color.VF, SwapValue.VF]],
        ['XF', [Color.XF, SwapValue.XF]],
        ['UN', [Color.UNC, SwapValue.UNC]],
        ['PR', [Color.PROOF, SwapValue.PROOF]],
        ['CP', [Color.COPY, SwapValue.COPY]],
    ]);

    private swapListManager = new SwapFormList(this);

    fillForm(
        uid = '',
        cond = '',
        price = '',
        privateComment = '',
        publicComment = '',
        vid = '',
        qty = '',
        replica = ''
    ): void {
        super.fillForm(uid, cond || (replica && '100'), price, vid || getCurrentVarietyId());

        const { form } = this;
        if (!form) {
            return;
        }

        const { elements } = form;
        if (elements.comment_private) {
            elements.comment_private.value = privateComment;
        }
        if (elements.comment_public) {
            elements.comment_public.value = publicComment;
        }
        if (elements.qty) {
            elements.qty.value = qty || '1';
        }
    }

    updateList(): void {
        this.swapListManager.update(this.listBlock);
        const vid = loc().searchParams.get('vid');
        for (const list of document.querySelectorAll<HTMLElement>(this.listSelector)) {
            styleListLinks(list);
        }
        sortSwapLinks(this.listBlock, vid);
        addLinkComments();
    }

    getConditionOption(o: HTMLOptionElement): ConditionOption {
        const { value, textContent } = o;
        return {
            value,
            text: value && textContent ? textContent : 'Without condition',
            checked: value === '3' ? 'checked' : '',
            style: o.getAttribute('style') || '',
        };
    }

    async updateForm(): Promise<void> {
        await super.updateForm();
        this.updateQty();
        this.updatePrice();
    }

    updateQty(): void {
        const { form } = this;
        if (!form) {
            return;
        }

        const { qty } = form;
        if (!qty) {
            return;
        }

        qty.inputmode = 'numeric';
        qty.addEventListener('focus', () => {
            qty.setSelectionRange(0, qty.value.length);
        });

        const addQtyCtrlButton = (
            where: InsertPosition,
            name: string,
            text: string,
            valueChanger: (prevValue: number) => number
        ): void => {
            qty.insertAdjacentHTML(
                where,
                `<button name="${name}" type="button" class="btn-s btn-gray btn-ctrl">${text}</button>`
            );
            form[name].addEventListener('click', () => {
                qty.value = `${valueChanger(+qty.value)}`;
            });
        };

        addQtyCtrlButton('afterend', 'plus10', '+10', (v) => v + 10);
        addQtyCtrlButton('afterend', 'plus5', '+5', (v) => v + 5);
        addQtyCtrlButton('afterend', 'plus', '+', (v) => v + 1);
        addQtyCtrlButton('beforebegin', 'minus', '&minus;', (v) => v - 1);
    }

    updatePrice(): void {
        const { form } = this;
        if (!form) {
            return;
        }

        const { price } = form;
        if (!price) {
            return;
        }

        price.inputmode = 'numeric';
        price.addEventListener('focus', () => {
            price.setSelectionRange(0, price.value.length);
        });

        // price.insertAdjacentHTML(
        //     'afterend',
        //     `<button name='resetprice' type='button' class='btn-s btn-gray btn-ctrl btn-ctrl-price'>⟲</button>`
        // );

        // form.resetprice.addEventListener('click', () => {
        //     form.price.value = this.getPriceByCondition(
        //         (this.formVariety && form[this.formVariety]?.value) || ''
        //     );
        //     debug(form.price.value);
        // });
    }

    // getDefaultPrice(vid = ''): number {
    //     const { form } = this;
    //     return +(
    //         (vid &&
    //             document.querySelector(`#coin table.tbl tr td a[href$="&vid=${vid}#price"]`)
    //                 ?.childNodes?.[1]?.textContent) ||
    //         form?.price.placeholder
    //     );
    // }

    // getPriceByCondition(vid = ''): string | void {
    //     const { form } = this;
    //     if (!form) {
    //         return;
    //     }
    //
    //     const comment = form.comment.value.toLowerCase();
    //     if (comment.includes('.')) {
    //         return form.price.value;
    //     }
    //
    //     let cond = FormValueCondition[+form.condition.value as FormValue] || ('' as Condition);
    //     if (comment.startsWith('au')) {
    //         cond = Condition.AU;
    //     } else if (comment.startsWith('xf+')) {
    //         cond = Condition.XXF;
    //     } else if (comment.startsWith('vf+')) {
    //         cond = Condition.VXF;
    //     }
    //
    //     let plus = [...comment].filter((c) => c === '+').length;
    //     if (plus) {
    //         plus--;
    //     }
    //
    //     return getPriceByConditions(
    //         this.getDefaultPrice(vid),
    //         cond,
    //         plus,
    //         getDetails('Denomination'),
    //         getDetails('Year')
    //     );
    // }
}

function sortSwapLinks(block: HTMLElement | null, vid?: string | null): void {
    const links = Array.from(block?.querySelectorAll<HTMLAnchorElement>('a.list-link') || []);

    for (const a of links) {
        a.dataset.vid =
            (a.getAttribute('onClick')?.match(CoinSwapFormOnMatcher) as CoinSwapFormOnMatchResult)
                ?.groups?.vid || '';
    }

    links.sort((a, b) => {
        const [aQ, , aY] = Array.from(a.querySelectorAll('span')).map((span) => span.textContent);
        const [bQ, , bY] = Array.from(b.querySelectorAll('span')).map((span) => span.textContent);
        return (
            cmp(a.href.endsWith(`=${UID}`), b.href.endsWith(`=${UID}`)) ||
            cmp(a.dataset.vid === vid, b.dataset.vid === vid) ||
            cmp(bY, aY) ||
            cmp(ConditionValues[aQ as Condition], ConditionValues[bQ as Condition])
        );
    });

    for (const a of links) {
        block?.prepend(a);
    }

    for (const a of Array.from(block?.querySelectorAll<HTMLAnchorElement>('a.list-link') || [])) {
        if (
            (a.dataset.vid !== vid &&
                (a.previousElementSibling as HTMLElement)?.dataset.vid === vid) ||
            (!a.href.endsWith(`=${UID}`) &&
                (a.previousElementSibling as HTMLAnchorElement)?.href.endsWith(`=${UID}`))
        ) {
            a.classList.add('with-separator');
        }
    }
}
