import {getFragment, postFragment} from './ajax';
import {Color, CondValue} from './cond';
import {AbstractForm} from './form';
import {id} from './selectors';
import {styleListLinks} from './swap-links';
import {cancel, disable, enable, handleFormSubmit, handleLinkSubmit, hide, show, toggle, updateRequiredElement} from './utils';
import {getCurrentVarietyId} from './vid';

export abstract class ListForm extends AbstractForm {
    protected widgetHeader: HTMLElement;
    protected listBlock: HTMLElement;
    protected formClose: HTMLElement;
    protected cancelButton: HTMLButtonElement;
    protected addButton: HTMLButtonElement;
    protected editButton: HTMLButtonElement;
    protected deleteButton: HTMLAnchorElement;

    protected buttonSetButtons: Map<string, [Color, CondValue]>;

    protected abstract formType: FormType;
    protected abstract formTypeMethod: FormTypeMethod;
    protected abstract formTypePrefix: FormTypePrefix;
    protected abstract formUidPrefix: FormUidPrefix;

    protected get headerId() {
        return `widget-${this.formType}-header`;
    }

    public get mainId() {
        return `my-${this.formType}-block`;
    }

    public get formId() {
        return `${this.formType}-form`;
    }

    protected get formCloseId() {
        return `${this.formType}-form-close`;
    }

    protected get formUid() {
        return `u${this.formUidPrefix}id`;
    }

    protected get formVariety() {
        return `${this.formType}-variety`;
    }

    protected funcId = 'my-coin-func-block';

    public get listId() {
        return `${this.formType}-block`;
    }

    protected get buttonSetId() {
        return `${this.formType}-button-set`;
    }

    protected get cancelButtonId() {
        return `btn-${this.formTypePrefix}cancel`;
    }

    protected get addButtonId() {
        return `btn-${this.formTypePrefix}add`;
    }

    protected get editButtonId() {
        return `btn-${this.formTypePrefix}edit`;
    }

    protected get deleteButtonId() {
        return `btn-${this.formTypePrefix}del`;
    }

    protected get formOnFunctionName(): string {
        return `Coin${this.formTypeMethod}FormOn`;
    }

    protected get formOffFunctionName(): string {
        return `Coin${this.formTypeMethod}FormOff`;
    }

    protected fillForm(uid?: string, cond?: string, price?: string, vid?: string) {
        this.form[this.formUid].value = uid;
        this.form.condition.value = cond;
        this.form.price.value = price;
        if (this.form[this.formVariety]) {
            this.form[this.formVariety].value = vid || getCurrentVarietyId();
        }
    }

    protected formOnHandler = (uid?: string, ...other: string[]): void => {
        hide(this.listBlock);
        show(this.form, this.formClose);
        disable(this.func);

        this.widgetHeader.removeEventListener('click', this.widgetHeaderRedirectHandler);
        this.widgetHeader.addEventListener('click', this.widgetHeaderCloseHandler);

        this.fillForm(uid, ...other);

        show(this.cancelButton);
        toggle(!uid, this.addButton);
        toggle(uid, this.editButton, this.deleteButton);
        this.deleteButton.href = `?action=del${this.formType}coin&${this.formUid}=${uid}`;
        (<HTMLInputElement> <unknown> this.form.action).value = uid ? `edit${this.formType}coin` : `add${this.formType}coin`;
    };

    protected formOffHandler = (): void => {
        hide(this.form, this.formClose);
        show(this.listBlock);
        enable(this.func);

        this.widgetHeader.removeEventListener('click', this.widgetHeaderCloseHandler);
        this.widgetHeader.addEventListener('click', this.widgetHeaderRedirectHandler);
    };

    protected widgetHeaderRedirectHandler: EventHandler;

    protected widgetHeaderCloseHandler: EventHandler = (e: Event) => {
        cancel(e);
        this.formOffHandler();
    };

    protected updateList() {
        this.listBlock = this.main.querySelector<HTMLElement>(id(this.listId));
        styleListLinks(this.listBlock);
    }

    protected removeOneButton() {
        const oneButtonBlock = this.main.previousElementSibling;
        if (oneButtonBlock.matches('center.action-btn')) {
            oneButtonBlock.remove();
        }
    }

    protected updateFormHandlers() {
        // @ts-ignore
        window[this.formOnFunctionName] = this.formOnHandler;
        // @ts-ignore
        window[this.formOffFunctionName] = this.formOffHandler;
    }

    protected async update(): Promise<void> {
        show(this.main);
        this.removeOneButton();
        this.updateList();
        this.updateWidget();
        this.updateForm();
    }

    protected updateButtonSet() {
        const oneButton = this.listBlock.querySelector<HTMLButtonElement>('center button.btn-s.btn-gray');
        if (!oneButton) {
            return;
        }

        oneButton.insertAdjacentHTML('afterend', `<div id="${this.buttonSetId}" class="btn-set"/>`);
        oneButton.remove();
        const buttonSet = this.main.querySelector(id(this.buttonSetId));
        if (!buttonSet) {
            return;
        }

        const addColorButton = (text: string, color: Color, value: CondValue): void => {
            const markerId = `${this.formType}-marker-${value}`;
            const markerClass = `btn-marker marked-${color}`;
            buttonSet.insertAdjacentHTML('beforeend', `<div id="${markerId}" class="${markerClass}">${text}</div>`);
            buttonSet.querySelector(id(markerId)).addEventListener('click', () => this.formOnHandler('', `${value}`));
        };

        for (const [text, [color, value]] of this.buttonSetButtons) {
            addColorButton(text, color, value);
        }
    }

    protected abstract getConditionOption(o: HTMLOptionElement): ConditionOption;

    protected updateCondition() {
        const condition: HTMLSelectElement = this.form.condition;
        condition.insertAdjacentHTML('afterend',
            `<fieldset name="conditionFieldset"><legend class="gray-12" style="padding:5px;">Condition</legend></fieldset>`);
        const fieldset = this.form.conditionFieldset;
        for (const o of condition.options) {
            const c = this.getConditionOption(o);
            if (c) {
                const {text, value, checked, style} = c;
                fieldset.insertAdjacentHTML('beforeend',
                    `<label class="dgray-12" style="margin-top:0;${style}"><input name="condition" value="${value}" ${checked} type="radio"/>${text}</label>`);
            }
        }
        condition.remove();
    }

    protected updateFormButtons() {
        this.cancelButton = this.form.querySelector(id(this.cancelButtonId));
        this.addButton = this.form.querySelector(id(this.addButtonId));
        this.editButton = this.form.querySelector(id(this.editButtonId));
        this.deleteButton = this.form.querySelector(id(this.deleteButtonId));
        this.deleteButton.classList.add('btn-red');
    }

    protected updateWidget() {
        this.widgetHeader = this.main.querySelector<HTMLElement>(id(this.headerId));
        this.widgetHeaderRedirectHandler = this.widgetHeader.onclick;
        this.widgetHeader.removeAttribute('onclick');
    }

    protected async updateFragment(fragment: DocumentFragment): Promise<void> {
        this.main = updateRequiredElement(fragment, this.main);
        return await this.update();
    }

    protected async updateForm() {
        this.func = this.main.querySelector<HTMLElement>(id(this.funcId));
        this.form = this.main.querySelector<HTMLFormElement>(id(this.formId));
        this.formClose = this.main.querySelector<HTMLElement>(id(this.formCloseId));

        await handleFormSubmit(this.form, async () => {
            return await this.updateFragment(await postFragment(location.href, new FormData(this.form)));
        });

        for (const link of this.form.querySelectorAll<HTMLAnchorElement>('a[type=submit]')) {
            await handleLinkSubmit(link, async () => {
                return await this.updateFragment(await getFragment(link.href));
            });
        }

        this.updateFormButtons();
        this.updateCondition();
        this.updateButtonSet();
    }

    public async handle(): Promise<void> {
        this.main = document.getElementById(this.mainId);
        if (!this.main) {
            return;
        }

        this.listBlock = this.main.querySelector(id(this.listId));
        if (!this.listBlock) {
            return;
        }

        this.updateFormHandlers();

        await this.update();
    }
}
