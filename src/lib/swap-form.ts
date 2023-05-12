import { Color, Condition, FormValue, FormValueCondition, SwapValue } from './cond';
import { getDetails } from './details';
import { ListForm } from './list-form';
import { getPriceByConditions } from './prices';
import { SwapFormList } from './swap-form-list';
import { addLinkComments, styleListLinks } from './swap-links';
import { getCurrentVarietyId } from './vid';

const { debug } = console;

// declare let CoinSwapFormOn: (usid: string, cond: string, price: string, info: string, vid: string, qty: string, replica: string, ...other: string[]) => void;
// declare let CoinSwapFormOff: (...other: string[]) => void;

export class SwapForm extends ListForm {
    protected formType: FormType = 'swap';
    protected formTypeMethod: FormTypeMethod = 'Swap';
    protected formTypePrefix: FormTypePrefix = '';
    protected formUidPrefix: FormUidPrefix = 's';

    protected buttonSetButtons: Map<string, [Color, SwapValue]> = new Map([
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

    // eslint-disable-next-line no-invalid-this
    private swapListManager = new SwapFormList(this);

    protected fillForm(
        uid = '',
        cond = '',
        price = '',
        info = '',
        vid = '',
        qty = '',
        replica = ''
    ): void {
        super.fillForm(uid, cond || (replica && '100'), price, vid || getCurrentVarietyId());
        const { form } = this;
        if (!form) {
            return;
        }
        form.comment.value = info;
        form.qty.value = qty || '1';
        // eslint-disable-next-line eqeqeq
        if (!form.price.value || form.price.value == this.getDefaultPrice(vid)) {
            form.price.value = this.getPriceByCondition(vid);
            debug(form.price.value);
        }
    }

    protected updateList(): void {
        this.listBlock = document.getElementById(this.listId);
        if (this.listBlock) {
            this.swapListManager.update(this.listBlock);
            for (const list of document.querySelectorAll<HTMLElement>(`#${this.listId}`)) {
                styleListLinks(list);
            }
            addLinkComments();
        }
    }

    /*protected async update(): Promise<void> {
        super.update();

        const DIV_ID = 'some-strange-div';
        console.log(DIV_ID);
        listBlock.insertAdjacentHTML('afterbegin', `<div id="${DIV_ID}" style="max-height:400px;overflow-x:hidden;overflow-y:auto;background:red"/>`);
        const div = listBlock.querySelector(`#${DIV_ID}`);
        for (const {a} of getSwapLinksWithMatches()) {
            div.insertAdjacentElement('beforeend', a);
        }
    }*/

    // eslint-disable-next-line class-methods-use-this
    protected getConditionOption(o: HTMLOptionElement): ConditionOption {
        const { value, textContent } = o;
        return {
            value,
            text: value && textContent ? textContent : 'Without condition',
            checked: value === '3' ? 'checked' : '',
            style: o.getAttribute('style') || '',
        };
    }

    protected async updateForm(): Promise<void> {
        await super.updateForm();
        this.updateQty();
        this.updatePrice();
    }

    protected updateQty(): void {
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
                `<button name='${name}' type='button' class='btn-s btn-gray btn-ctrl'>${text}</button>`
            );
            form[name].addEventListener('click', () => {
                qty.value = `${valueChanger(+qty.value)}`;
            });
        };

        addQtyCtrlButton('beforebegin', 'plus10', '+10', (v) => v + 10);
        addQtyCtrlButton('beforebegin', 'plus5', '+5', (v) => v + 5);
        addQtyCtrlButton('beforebegin', 'plus', '+', (v) => v + 1);
        addQtyCtrlButton('beforebegin', 'minus', '&minus;', (v) => v - 1);
    }

    protected updatePrice(): void {
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

        price.insertAdjacentHTML(
            'afterend',
            `<button name='resetprice' type='button' class='btn-s btn-gray btn-ctrl btn-ctrl-price'>⟲</button>`
        );

        form.resetprice.addEventListener('click', () => {
            form.price.value = this.getPriceByCondition(
                (this.formVariety && form[this.formVariety]?.value) || ''
            );
            debug(form.price.value);
        });
    }

    getDefaultPrice(vid = ''): number {
        const { form } = this;
        return +(
            (vid &&
                document.querySelector(`#coin table.tbl tr td a[href$="&vid=${vid}#price"]`)
                    ?.childNodes?.[1]?.textContent) ||
            form?.price.placeholder
        );
    }

    getPriceByCondition(vid = ''): string | void {
        const { form } = this;
        if (!form) {
            return;
        }

        const comment = form.comment.value.toLowerCase();
        if (comment.includes('.')) {
            return form.price.value;
        }

        let cond = FormValueCondition[+form.condition.value as FormValue] || ('' as Condition);
        if (comment.startsWith('au')) {
            cond = Condition.AU;
        } else if (comment.startsWith('xf+')) {
            cond = Condition.XXF;
        } else if (comment.startsWith('vf+')) {
            cond = Condition.VXF;
        }

        let plus = [...comment].filter((c) => c === '+').length;
        if (plus) {
            plus--;
        }

        return getPriceByConditions(
            this.getDefaultPrice(vid),
            cond,
            plus,
            getDetails('Denomination'),
            getDetails('Year')
        );
    }
}
