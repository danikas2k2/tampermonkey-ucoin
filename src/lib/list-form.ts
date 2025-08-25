import { getFragment, postFragment } from './ajax';
import { Color, CondValue } from './cond';
import { styleListLinks } from './swap-links';
import {
    cancel,
    disable,
    enable,
    handleLinkClick,
    hide,
    show,
    toggle,
    updateRequiredElement,
    wrapFormSubmit,
} from './utils';

export abstract class ListForm {
    abstract formType: FormType;
    abstract formTypeMethod: FormTypeMethod;
    abstract formTypePrefix: FormTypePrefix;
    abstract formUidPrefix: FormUidPrefix;
    abstract buttonSetButtons: Map<string, [Color, CondValue]>;
    widgetHeaderRedirectHandler: EventHandler | null;
    private formClickTimeout: NodeJS.Timeout;

    constructor() {
        this.widgetHeaderCloseHandler = this.widgetHeaderCloseHandler.bind(this);
    }

    get listSelector(): string {
        return `#${this.formType}-block`;
    }

    get listBlock(): HTMLElement | null {
        return document.querySelector(this.listSelector);
    }

    get funcSelector(): string | null {
        return '#my-coin-func-block';
    }

    get mainSelector(): string {
        return `#my-${this.formType}-block, #${this.formType}-block`;
    }

    get main(): HTMLElement | null {
        return (this.mainSelector && document.querySelector(this.mainSelector)) || null;
    }

    get formSelector(): string {
        return `#${this.formType}-form`;
    }

    get form(): HTMLFormElement | null {
        return (this.formSelector && this.main?.querySelector(this.formSelector)) || null;
    }

    get formClose(): HTMLFormElement | null {
        return (
            (this.formSelector && this.main?.querySelector(`${this.formSelector}-close`)) || null
        );
    }

    get formUid(): string {
        return `u${this.formUidPrefix}id`;
    }

    get formVariety(): string {
        return `${this.formType}-variety`;
    }

    get buttonSetId(): string {
        return `${this.formType}-button-set`;
    }

    get formOnFunctionName(): string {
        return `Coin${this.formTypeMethod}FormOn`;
    }

    get formOffFunctionName(): string {
        return `Coin${this.formTypeMethod}FormOff`;
    }

    get widgetHeader(): HTMLElement | null {
        return this.main?.querySelector(`#widget-${this.formType}-header`) || null;
    }

    get cancelButton(): HTMLButtonElement | null {
        return this.form?.querySelector(`#btn-${this.formTypePrefix}cancel`) || null;
    }

    get addButton(): HTMLButtonElement | null {
        return this.form?.querySelector(`#btn-${this.formTypePrefix}add`) || null;
    }

    get editButton(): HTMLButtonElement | null {
        return this.form?.querySelector(`#btn-${this.formTypePrefix}edit`) || null;
    }

    get deleteButton(): HTMLAnchorElement | null {
        return this.form?.querySelector(`#btn-${this.formTypePrefix}del`) || null;
    }

    get oneButton(): HTMLButtonElement | null {
        return this.listBlock?.querySelector(`center button.btn-s.btn-gray`) || null;
    }

    get buttonSet(): HTMLElement | null {
        return this.main?.querySelector(`#${this.buttonSetId}`) || null;
    }

    get func(): HTMLElement | null {
        return (this.funcSelector && this.main?.querySelector(this.funcSelector)) || null;
    }

    async handle(): Promise<void> {
        if (!this.main) {
            return;
        }
        this.updateFormHandlers();
        return this.update();
    }

    fillForm(uid = '', cond = '', price = '', vid = ''): void {
        if (!this.form) {
            return;
        }
        if (this.form[this.formUid]) {
            this.form[this.formUid].value = uid;
        }
        if (this.form.condition) {
            if (!cond || cond === '0') {
                const input = this.form.querySelector<HTMLInputElement>(
                    'input[name=condition][value="0"], input[name=condition][value=""]'
                );
                if (input) {
                    input.checked = true;
                }
            } else {
                this.form.condition.value = cond;
            }
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
        (this.form.action as unknown as HTMLInputElement).value = uid
            ? `edit${this.formType}coin`
            : `add${this.formType}coin`;
    }

    formOnHandler(uid?: string, ...other: string[]): void {
        this.formClickTimeout = setTimeout(() => {
            if (this.listBlock) {
                hide(this.listBlock);
            }
            if (this.form && this.formClose) {
                show(this.form, this.formClose);
            }
            if (this.func) {
                disable(this.func);
            }
            if (this.widgetHeaderRedirectHandler) {
                this.widgetHeader?.removeEventListener('click', this.widgetHeaderRedirectHandler);
            }
            this.widgetHeader?.addEventListener('click', this.widgetHeaderCloseHandler);
            this.fillForm(uid, ...other);
            if (this.cancelButton) {
                show(this.cancelButton);
            }
            if (this.addButton) {
                toggle(!uid, this.addButton);
            }
            if (this.deleteButton) {
                if (this.editButton) {
                    toggle(!!uid, this.editButton, this.deleteButton);
                }
                this.deleteButton.href = `?action=del${this.formType}coin&${this.formUid}=${uid}`;
            }
            (uid ? this.editButton : this.addButton)?.focus();
        }, 300);
    }

    formOnHandlerSubmit(uid?: string, ...other: string[]): void {
        clearTimeout(this.formClickTimeout);
        this.fillForm(uid, ...other);
        this.form?.submit();
    }

    formOffHandler(): void {
        if (this.form && this.formClose) {
            hide(this.form, this.formClose);
        }
        if (this.listBlock) {
            show(this.listBlock);
        }
        if (this.func) {
            enable(this.func);
        }

        this.widgetHeader?.removeEventListener('click', this.widgetHeaderCloseHandler);
        if (this.widgetHeaderRedirectHandler) {
            this.widgetHeader?.addEventListener('click', this.widgetHeaderRedirectHandler);
        }
    }

    widgetHeaderCloseHandler(e: Event): void {
        cancel(e);
        this.formOffHandler();
    }

    updateList(): void {
        styleListLinks(this.listBlock);
    }

    removeOneButton(): void {
        const oneButtonBlock = this.main?.previousElementSibling;
        if (oneButtonBlock?.matches('center.action-btn')) {
            oneButtonBlock.remove();
        }
    }

    updateFormHandlers(): void {
        const userScope = unsafeWindow as unknown as Record<string, () => void>;
        userScope[this.formOnFunctionName] = (...args: string[]) => this.formOnHandler(...args);
        userScope[this.formOffFunctionName] = () => this.formOffHandler();
    }

    async update(): Promise<void> {
        if (this.main) {
            show(this.main);
            this.removeOneButton();
            this.updateWidget();
            await this.updateForm();
        }
        this.updateList();
    }

    updateButtonSet(): void {
        if (!this.oneButton) {
            return;
        }
        this.oneButton.insertAdjacentHTML(
            'afterend',
            `<div id='${this.buttonSetId}' class='btn-set'/>`
        );
        this.oneButton.remove();
        if (!this.buttonSet) {
            return;
        }

        const addColorButton = (text: string, color: Color, value: CondValue): void => {
            const markerId = `${this.formType}-marker-${value}`;
            const markerClass = `btn-marker marked-${color}`;
            this.buttonSet?.insertAdjacentHTML(
                'beforeend',
                `<div id='${markerId}' class='${markerClass}'>${text}</div>`
            );
            const marker = this.buttonSet?.querySelector(`#${markerId}`);
            if (marker) {
                marker.addEventListener('click', () => this.formOnHandler('', `${value}`));
                marker.addEventListener('dblclick', () => this.formOnHandlerSubmit('', `${value}`));
            }
        };

        for (const [text, [color, value]] of this.buttonSetButtons) {
            addColorButton(text, color, value);
        }
    }

    abstract getConditionOption(o: HTMLOptionElement): ConditionOption | undefined;

    updateCondition(): void {
        const condition: HTMLSelectElement = this.form?.condition;
        console.info(`[DEV]`, condition?.parentElement?.tagName);
        const inForm = condition?.parentElement?.tagName === 'FORM';
        const container = inForm ? condition : condition.parentElement;
        if (container) {
            container.insertAdjacentHTML(
                inForm ? 'afterend' : 'beforebegin',
                `<fieldset name='conditionFieldset'><legend class='gray-12' style='padding:5px;'>Condition</legend></fieldset>`
            );
            const fieldset = this.form?.conditionFieldset;
            for (const o of condition.options) {
                const c = this.getConditionOption(o);
                if (c) {
                    const { text, value, checked, style } = c;
                    fieldset.insertAdjacentHTML(
                        'beforeend',
                        `<label class='dgray-12' style='margin-top:0;${style}'><input name='condition' value='${value}' ${checked} type='radio'/>${text}</label>`
                    );
                }
            }
            condition.remove();
        }
    }

    updateFormButtons(): void {
        const classList = this.deleteButton?.classList;
        if (classList && !classList.contains('btn-red')) {
            classList.add('btn-red');
        }
    }

    updateWidget(): void {
        if (this.widgetHeader) {
            this.widgetHeaderRedirectHandler = this.widgetHeader.onclick;
            this.widgetHeader.removeAttribute('onclick');
        }
    }

    async updateFragment(fragment: DocumentFragment): Promise<void> {
        updateRequiredElement(fragment, this.main);
        return this.update();
    }

    async updateForm(): Promise<void> {
        if (!this.main || !this.form) {
            return;
        }

        wrapFormSubmit(this.form, async () =>
            this.form
                ? this.updateFragment(await postFragment(location.href, new FormData(this.form)))
                : undefined
        );

        for (const link of this.form.querySelectorAll<HTMLAnchorElement>('a[type=submit]')) {
            handleLinkClick(link, async () => this.updateFragment(await getFragment(link.href)));
        }

        this.updateFormButtons();
        this.updateCondition();
        this.updateButtonSet();
    }
}
