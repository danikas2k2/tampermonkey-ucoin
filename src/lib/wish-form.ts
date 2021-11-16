import { Color, WishValue } from './cond';
import { ListForm } from './list-form';

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
        if (this.form?.is_type) {
            this.form.is_type.checked = true;
        }
    }

    protected async updateForm(): Promise<void> {
        await super.updateForm();
        this.updateVarieties();
    }

    protected updateVarieties(): void {
        const varieties: RadioNodeList = this.form?.[this.formVariety];
        if (varieties) {
            const firstVariety = varieties[0].parentElement as HTMLLabelElement;
            const anyVariety = firstVariety.cloneNode() as HTMLLabelElement;
            const anyVarietyInput = firstVariety.querySelector('input')?.cloneNode() as HTMLInputElement;
            anyVarietyInput.value = '';
            anyVariety.insertAdjacentElement('beforeend', anyVarietyInput);
            anyVariety.insertAdjacentText('beforeend', 'ANY');
            firstVariety.insertAdjacentElement('beforebegin', anyVariety);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    protected getConditionOption(o: HTMLOptionElement): ConditionOption | undefined {
        const { value, textContent } = o;
        if (value || textContent?.includes('ANY')) {
            return {
                text: textContent!,
                value,
                checked: value === '3' ? 'checked' : '',
                style: o.getAttribute('style') || '',
            };
        }
    }
}

export const enum WishFormAction {
    ADD = 'addwishcoin',
    DELETE = 'delwishcoin',
    EDIT = 'editwishcoin',
}
