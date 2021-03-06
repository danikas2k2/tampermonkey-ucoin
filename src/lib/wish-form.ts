import {Color, WishValue} from './cond';
import {ListForm} from './list-form';

// declare let CoinWishFormOn: (uwid: string, cond: string, price: string, tid: string, vid: string, ...other: string[]) => void;
// declare let CoinWishFormOff: (...other: string[]) => void;

export class WishForm extends ListForm {
    protected formType: FormType = 'wish';
    protected formTypeMethod: FormTypeMethod = 'Wish';
    protected formTypePrefix: FormTypePrefix = 'w';
    protected formUidPrefix: FormUidPrefix = 'w';

    protected buttonSetButtons: Map<string, [Color, WishValue]> = new Map([
        ['*', [Color.ANY, WishValue.ANY]],
        ['VF+', [Color.VF, WishValue.VF]],
        ['XF+', [Color.XF, WishValue.XF]],
        ['UN', [Color.UNC, WishValue.UNC]],
    ]);

    protected fillForm(uid = '', cond = '', price = '', _tid?: string, vid = ''): void {
        super.fillForm(uid, cond, price, vid);
        if (this.form.is_type) {
            this.form.is_type.checked = true;
        }
    }

    protected async updateForm(): Promise<void> {
        super.updateForm();
        this.updateVarieties();
    }

    protected updateVarieties(): void {
        const varieties: RadioNodeList = this.form[this.formVariety];
        if (varieties) {
            const firstVariety = <HTMLLabelElement> varieties[0].parentElement;
            const anyVariety = <HTMLLabelElement> firstVariety.cloneNode();
            const anyVarietyInput = <HTMLInputElement> firstVariety.querySelector('input').cloneNode();
            anyVarietyInput.value = '';
            anyVariety.insertAdjacentElement('beforeend', anyVarietyInput);
            anyVariety.insertAdjacentText('beforeend', 'Any');
            firstVariety.insertAdjacentElement('beforebegin', anyVariety);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    protected getConditionOption(o: HTMLOptionElement): ConditionOption {
        const {value, textContent} = o;
        if (value || textContent.includes('ANY')) {
            return {
                text: textContent,
                value,
                checked: (value === '3') ? 'checked' : '',
                style: o.getAttribute('style') || '',
            };
        }
    }
}
