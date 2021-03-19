import {getFragment, postFragment} from './ajax';
import {Color, CondValue} from './cond';
import {AbstractForm} from './form';
import {id} from './selectors';
import {styleListLinks} from './swap-links';
import {cancel, disable, enable, handleFormSubmit, handleLinkSubmit, hide, show, toggle, updateRequiredElement} from './utils';

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
    protected funcId = 'my-coin-func-block';
    protected widgetHeaderRedirectHandler: EventHandler;
    private formClickTimeout: number;

    public get mainId(): string {
        return `my-${this.formType}-block`;
    }

    public get formId(): string {
        return `${this.formType}-form`;
    }

    public get listId(): string {
        return `${this.formType}-block`;
    }

    protected get headerId(): string {
        return `widget-${this.formType}-header`;
    }

    protected get formCloseId(): string {
        return `${this.formType}-form-close`;
    }

    protected get formUid(): string {
        return `u${this.formUidPrefix}id`;
    }

    protected get formVariety(): string {
        return `${this.formType}-variety`;
    }

    protected get buttonSetId(): string {
        return `${this.formType}-button-set`;
    }

    protected get cancelButtonId(): string {
        return `btn-${this.formTypePrefix}cancel`;
    }

    protected get addButtonId(): string {
        return `btn-${this.formTypePrefix}add`;
    }

    protected get editButtonId(): string {
        return `btn-${this.formTypePrefix}edit`;
    }

    protected get deleteButtonId(): string {
        return `btn-${this.formTypePrefix}del`;
    }

    protected get formOnFunctionName(): string {
        return `Coin${this.formTypeMethod}FormOn`;
    }

    protected get formOffFunctionName(): string {
        return `Coin${this.formTypeMethod}FormOff`;
    }

    public async handle(): Promise<void> {
        this.main = document.getElementById(this.mainId);
        // if (!this.main) {
        //     return;
        // }

        // this.listBlock = document.getElementById(this.listId);
        // if (!this.listBlock) {
        //     return;
        // }

        this.updateFormHandlers();

        await this.update();
    }

    protected fillForm(uid = '', cond = '', price = '', vid = ''): void {
        if (this.form[this.formUid]) {
            this.form[this.formUid].value = uid;
        }
        if (this.form.condition) {
            this.form.condition.value = cond;
        }
        if (this.form.price) {
            this.form.price.value = price;
        }
        if (this.form[this.formVariety]) {
            if (vid) {
                this.form[this.formVariety].value = vid;
            } else {
                this.form[this.formVariety][0].checked = true;
            }
        }
        (<HTMLInputElement> <unknown> this.form.action).value = uid ? `edit${this.formType}coin` : `add${this.formType}coin`;
    }

    protected formOnHandler(uid?: string, ...other: string[]): void {
        this.formClickTimeout = <number> <unknown> setTimeout(() => {
            hide(this.listBlock);
            show(this.form, this.formClose);
            disable(this.func);
            this.widgetHeader.removeEventListener('click', e => this.widgetHeaderRedirectHandler(e));
            this.widgetHeader.addEventListener('click', e => this.widgetHeaderCloseHandler(e));
            this.fillForm(uid, ...other);
            show(this.cancelButton);
            toggle(!uid, this.addButton);
            toggle(uid, this.editButton, this.deleteButton);
            this.deleteButton.href = `?action=del${this.formType}coin&${this.formUid}=${uid}`;
            (uid ? this.editButton : this.addButton).focus();
        }, 300);
    }

    protected formOnHandlerSubmit(uid?: string, ...other: string[]): void {
        clearTimeout(this.formClickTimeout);
        this.fillForm(uid, ...other);
        this.form.submit();
    }

    protected formOffHandler(): void {
        hide(this.form, this.formClose);
        show(this.listBlock);
        enable(this.func);

        this.widgetHeader.removeEventListener('click', e => this.widgetHeaderCloseHandler(e));
        this.widgetHeader.addEventListener('click', e => this.widgetHeaderRedirectHandler(e));
    }

    protected widgetHeaderCloseHandler(e: Event): void {
        cancel(e);
        this.formOffHandler();
    }

    protected updateList(): void {
        this.listBlock = document.getElementById(this.listId);
        if (this.listBlock) {
            styleListLinks(this.listBlock);
        }
    }

    protected removeOneButton(): void {
        const oneButtonBlock = this.main.previousElementSibling;
        if (oneButtonBlock.matches('center.action-btn')) {
            oneButtonBlock.remove();
        }
    }

    protected updateFormHandlers(): void {
        const {unsafeWindow: userScope} = <{ unsafeWindow: Record<string, () => void> }> <unknown> global;
        userScope[this.formOnFunctionName] = (...args: string[]) => this.formOnHandler(...args);
        userScope[this.formOffFunctionName] = () => this.formOffHandler();
    }

    protected async update(): Promise<void> {
        if (this.main) {
            show(this.main);
            this.removeOneButton();
            this.updateWidget();
            this.updateForm();
        }
        this.updateList();
    }

    protected updateButtonSet(): void {
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
            const marker = buttonSet.querySelector(id(markerId));
            marker.addEventListener('click', () => this.formOnHandler('', `${value}`));
            marker.addEventListener('dblclick', () => this.formOnHandlerSubmit('', `${value}`));
        };

        for (const [text, [color, value]] of this.buttonSetButtons) {
            addColorButton(text, color, value);
        }
    }

    protected abstract getConditionOption(o: HTMLOptionElement): ConditionOption;

    protected updateCondition(): void {
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

    protected updateFormButtons(): void {
        this.cancelButton = this.form.querySelector(id(this.cancelButtonId));
        this.addButton = this.form.querySelector(id(this.addButtonId));
        this.editButton = this.form.querySelector(id(this.editButtonId));
        this.deleteButton = this.form.querySelector(id(this.deleteButtonId));
        this.deleteButton.classList.add('btn-red');
    }

    protected updateWidget(): void {
        this.widgetHeader = this.main.querySelector<HTMLElement>(id(this.headerId));
        this.widgetHeaderRedirectHandler = this.widgetHeader.onclick;
        this.widgetHeader.removeAttribute('onclick');
    }

    protected async updateFragment(fragment: DocumentFragment): Promise<void> {
        this.main = updateRequiredElement(fragment, this.main);
        return await this.update();
    }

    protected async updateForm(): Promise<void> {
        this.func = this.main.querySelector<HTMLElement>(id(this.funcId));
        this.form = this.main.querySelector<HTMLFormElement>(id(this.formId));
        this.formClose = this.main.querySelector<HTMLElement>(id(this.formCloseId));

        await handleFormSubmit(this.form, async () => await this.updateFragment(await postFragment(location.href, new FormData(this.form))));

        for (const link of this.form.querySelectorAll<HTMLAnchorElement>('a[type=submit]')) {
            await handleLinkSubmit(link, async () => await this.updateFragment(await getFragment(link.href)));
        }

        this.updateFormButtons();
        this.updateCondition();
        this.updateButtonSet();
    }
}
