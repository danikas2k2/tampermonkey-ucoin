export function sp(str: string): string {
    return `${str || ''}`
        .replace(/\u{00A0}+/gu, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export function tt(str: string): string {
    str = `${str || ''}`;
    return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
}

export function show(...elements: HTMLElement[]): void {
    for (const element of elements) {
        element?.classList.remove('hide');
    }
}

export function hide(...elements: HTMLElement[]): void {
    for (const element of elements) {
        element?.classList.add('hide');
    }
}

export function toggle(visible: boolean, ...elements: HTMLElement[]): void {
    for (const element of elements) {
        element?.classList.toggle('hide', !visible);
    }
}

export function enable(...elements: HTMLElement[]): void {
    for (const element of elements) {
        element?.classList.remove('disable');
    }
}

export function disable(...elements: HTMLElement[]): void {
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

// export function immediateCancel(e: Event) {
//     if (e) {
//         e.preventDefault();
//         e.stopPropagation();
//     }
// }
//
// export function preventDefault(e: Event) {
//     e && e.preventDefault();
// }
//
// export function stopPropagation(e: Event) {
//     e && e.stopPropagation();
// }
//
// export function stopImmediatePropagation(e: Event) {
//     e && e.stopImmediatePropagation();
// }

export function reload(): null {
    location.reload();
    return null;
}

export function updateRequiredElement(fragment: DocumentFragment, element: HTMLElement | null): HTMLElement | null {
    if (element) {
        const newElement = fragment.getElementById(element.id);
        if (!newElement) {
            return reload();
        }
        element.replaceWith(newElement);
        element = newElement;
        element.querySelectorAll('[data-href]').forEach((el: HTMLElement) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const a = document.createElement('a');
                a.href = el.dataset.href!;
                a.dispatchEvent(new MouseEvent(e.type, e));
            });
        });
    }
    return element;
}

export function updateOptionalElement(fragment: DocumentFragment, element: HTMLElement | null): HTMLElement | null {
    if (element) {
        const newElement = fragment.getElementById(element.id);
        if (newElement) {
            element.replaceWith(newElement);
            element = newElement;
        } else {
            element.remove();
            element = null;
        }
    }
    return element;
}

export async function updateParts(
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
}

export async function handleFormSubmit(form: HTMLFormElement, callback: RequestCallback): Promise<void> {
    form.addEventListener(
        'submit',
        ((onsubmit) => async (e: Event) => {
            cancel(e);
            const form = e.target as HTMLFormElement;
            if (onsubmit && onsubmit.call(form, e) === false) {
                return;
            }
            await callback();
        })(form.onsubmit)
    );
    form.removeAttribute('onsubmit');
}

export async function handleLinkSubmit(link: HTMLAnchorElement, callback: RequestCallback): Promise<void> {
    link.addEventListener(
        'click',
        ((onclick) => async (e: Event) => {
            cancel(e);
            const link = e.target as HTMLAnchorElement;
            if (onclick?.call(link, e) === false) {
                return;
            }
            await callback();
        })(link.onclick)
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

export function scrollIntoView(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
}
