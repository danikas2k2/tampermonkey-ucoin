export abstract class AbstractForm {
    public mainId: string;
    public formId: string;
    protected funcId: string;

    protected main: HTMLElement;
    protected form: HTMLFormElement;
    protected func: HTMLElement;

    protected abstract async updateFragment(fragment: DocumentFragment): Promise<void>;

    protected abstract async update(): Promise<void>;

    public abstract async handle(): Promise<void>;
}
