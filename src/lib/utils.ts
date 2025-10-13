import { location } from './url';

export const sp = (str = ''): string => str.replace(/\p{Z}+/gu, ' ').trim();

export function tt(str = ''): string {
    const index = str.match(/\P{Z}/u)?.index ?? 0;
    return `${str.slice(0, index)}${str.charAt(index).toUpperCase()}${str.slice(index + 1)}`;
}

export function isHidden(element: HTMLElement | null): boolean {
    return !!element?.classList.contains('hide');
}

export function show(...elements: (HTMLElement | null)[]): void {
    for (const element of elements) {
        element?.classList.remove('hide');
    }
}

export function hide(...elements: (HTMLElement | null)[]): void {
    for (const element of elements) {
        element?.classList.add('hide');
    }
}

export function toggle(visible: boolean, ...elements: (HTMLElement | null)[]): void {
    for (const element of elements) {
        element?.classList.toggle('hide', !visible);
    }
}

export function enable(...elements: (HTMLElement | null)[]): void {
    for (const element of elements) {
        element?.classList.remove('disable');
    }
}

export function disable(...elements: (HTMLElement | null)[]): void {
    for (const element of elements) {
        element?.classList.add('disable');
    }
}

export function cancel(e: Event): void {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
}

export function reload(): null {
    location().reload();
    return null;
}

export function documentFragment(src: string): DocumentFragment {
    const temp = document.createElement('template');
    temp.innerHTML = src;
    return temp.content;
}

export function dataHrefClickHandler(e: Event): void {
    cancel(e);
    const a = document.createElement('a');
    a.href = (e.target as HTMLElement | null)?.dataset?.href ?? '';
    a.dispatchEvent(new MouseEvent(e.type, e));
}

export function wrapDataHrefClicks(element: HTMLElement | null): void {
    const elements = element?.querySelectorAll('[data-href]');
    if (elements?.length) {
        for (const el of elements) {
            el.addEventListener('click', dataHrefClickHandler);
        }
    }
}

export function updateRequiredElement(
    fragment: DocumentFragment,
    element: HTMLElement | null,
    onUpdated: (element: HTMLElement | null) => void = wrapDataHrefClicks,
    onMissing: (element: HTMLElement | null) => void = reload
): void {
    if (!element) {
        return;
    }
    const newElement = fragment.getElementById(element.id);
    if (!newElement) {
        return onMissing?.(element);
    }
    element.innerHTML = newElement.innerHTML;
    onUpdated?.(element);
}

export function updateOptionalElement(
    fragment: DocumentFragment,
    element: HTMLElement | null
): HTMLElement | null {
    if (element) {
        const newElement = fragment.getElementById(element.id);
        if (newElement) {
            element.innerHTML = newElement.innerHTML;
        } else {
            element.remove();
            element = null;
        }
    }
    return element;
}

/*export async function updateParts(
    fragment: DocumentFragment,
    callback: UpdateCallback,
    required: HTMLElement[],
    optional?: HTMLElement[]
): Promise<void> {
    required.map((element) => updateRequiredElement(fragment, element));
    if (optional) {
        optional.map((element) => updateOptionalElement(fragment, element));
    }
    return await callback();
}*/

export async function formSubmitHandler(
    e: Event,
    onSubmit?: EventHandler<HTMLFormElement, boolean> | null,
    onSuccess?: UpdateCallback
): Promise<void> {
    cancel(e);
    const form = e.target as HTMLFormElement;
    if (onSubmit?.call(form, e) !== false) {
        return onSuccess?.(form);
    }
}

export function wrapFormSubmit(form: HTMLFormElement, onSuccess?: UpdateCallback): void {
    form.addEventListener(
        'submit',
        (
            (onSubmit) => async (e: Event) =>
                formSubmitHandler(e, onSubmit, onSuccess)
        )(form.onsubmit)
    );
    form.removeAttribute('onsubmit');
}

export async function linkClickHandler(
    e: Event,
    onClick?: EventHandler<HTMLAnchorElement, boolean> | null,
    onSuccess?: UpdateCallback
): Promise<void> {
    cancel(e);
    const link = e.target as HTMLAnchorElement;
    if (onClick?.call(link, e) !== false) {
        return onSuccess?.(link);
    }
}

export function handleLinkClick(link: HTMLAnchorElement, onSuccess: RequestCallback): void {
    link.addEventListener(
        'click',
        (
            (onClick) => (e: Event) =>
                linkClickHandler(e, onClick, onSuccess)
        )(link.onclick)
    );
    link.removeAttribute('onclick');
}

export function todayMonth(): string {
    return new Date().toISOString().split('-', 2).join('-');
}

export function unique<T>(array: T[]): T[] {
    return array.reduce<T[]>((r, v) => (r.includes(v) ? r : [...r, v]), []);
}

export function slug(s: string): string {
    return s.replace(/\W+/g, '-').replace(/^-+/, '').replace(/-+$/, '').toLowerCase();
}

export function scrollIntoView(element?: HTMLElement | null): void {
    element?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
}
