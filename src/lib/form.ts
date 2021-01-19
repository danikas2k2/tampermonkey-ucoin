export abstract class AbstractForm {
    protected funcId: string;
    protected main: HTMLElement;
    protected form: HTMLFormElement;
    protected func: HTMLElement;

    public get mainId(): string {
        return '';
    }

    public get formId(): string {
        return '';
    }

    public abstract handle(): Promise<void>;

    protected abstract updateFragment(fragment: DocumentFragment): Promise<void>;

    protected abstract update(): Promise<void>;
}
