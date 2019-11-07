import {Color, SwapValue} from './cond';
import {ListForm} from './list-form';
import {id} from './selectors';
import {addLinkComments, styleListLinks} from './swap-links';
import {SwapFormList} from './swap-form-list';

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

    private swapListManager = new SwapFormList(this);

    protected fillForm(uid?: string, cond?: string, price?: string, info?: string, vid?: string, qty?: string, replica?: string) {
        super.fillForm(uid, cond || replica && '100', price, vid);
        this.form.comment.value = info;
        this.form.qty.value = qty || '1';
        this.form.comment.value = info;
    }

    protected updateList() {
        this.listBlock = this.main.querySelector<HTMLElement>(id(this.listId));
        this.swapListManager.update(this.listBlock);
        for (const list of document.querySelectorAll<HTMLElement>(id(this.listId))) {
            styleListLinks(list);
        }
        addLinkComments();
    }

    protected async update(): Promise<void> {
        super.update();

        /// WHAT THIS PART DOES?! {{{
        /*const DIV_ID = 'some-strange-div';
        console.log(DIV_ID);
        listBlock.insertAdjacentHTML('afterbegin', `<div id="${DIV_ID}" style="max-height:400px;overflow-x:hidden;overflow-y:auto;background:red"/>`);
        const div = listBlock.querySelector(id(DIV_ID));
        for (const {a} of getSwapLinksWithMatches()) {
            div.insertAdjacentElement('beforeend', a);
        }*/
        /// }}}
    }

    protected getConditionOption(o: HTMLOptionElement) {
        const {value, textContent} = o;
        return {
            value,
            text: value ? textContent : 'Without condition',
            checked: (value === '3') ? 'checked' : '',
            style: o.getAttribute('style') || '',
        };
    }

    protected async updateForm() {
        super.updateForm();
        this.updateQty();
    }

    protected updateQty() {
        const {form} = this;
        const {qty} = form;

        qty.inputmode = 'numeric';
        qty.addEventListener('focus', () => {
            qty.setSelectionRange(0, qty.value.length);
        });

        const addQtyCtrlButton = (where: InsertPosition, name: string, text: string, valueChanger: (prevValue: number) => number): void => {
            qty.insertAdjacentHTML(where, `<button name="${name}" type="button" class="btn-s btn-gray btn-ctrl">${text}</button>`);
            form[name].addEventListener('click', () => {
                qty.value = `${valueChanger(+qty.value)}`;
            });
        };

        addQtyCtrlButton('afterend', 'minus', '&minus;', v => v - 1);
        addQtyCtrlButton('beforebegin', 'plus10', '+10', v => v + 10);
        addQtyCtrlButton('beforebegin', 'plus5', '+5', v => v + 5);
        addQtyCtrlButton('beforebegin', 'plus', '+', v => v + 1);
    }
}
