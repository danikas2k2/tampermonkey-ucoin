export abstract class AbstractForm {
    protected funcId: string | null;
    protected main: HTMLElement | null;
    protected form: HTMLFormElement | null;
    protected func: HTMLElement | null;

    public abstract handle(): Promise<void>;

    protected abstract updateFragment(fragment: DocumentFragment): Promise<void>;

    protected abstract update(): Promise<void>;
}
