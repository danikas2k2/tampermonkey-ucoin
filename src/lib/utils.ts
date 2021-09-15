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
    elements.forEach((element) => element && element.classList.remove('hide'));
}

export function hide(...elements: HTMLElement[]): void {
    elements.forEach((element) => element && element.classList.add('hide'));
}

export function toggle(visible: string | boolean, ...elements: HTMLElement[]): void {
    elements.forEach((element) => element && element.classList.toggle('hide', !visible));
}

export function enable(...elements: HTMLElement[]): void {
    elements.forEach((element) => element && element.classList.remove('disable'));
}

export function disable(...elements: HTMLElement[]): void {
    elements.forEach((element) => element && element.classList.add('disable'));
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

export function updateRequiredElement(fragment: DocumentFragment, element: HTMLElement): HTMLElement {
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
                a.href = el.dataset.href;
                a.dispatchEvent(new MouseEvent(e.type, e));
            });
        });
    }
    return element;
}

export function updateOptionalElement(fragment: DocumentFragment, element: HTMLElement): HTMLElement {
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
    required = required.map((element) => updateRequiredElement(fragment, element));
    if (optional) {
        optional = optional.map((element) => updateOptionalElement(fragment, element));
    }
    return await callback();
}

export async function handleFormSubmit(form: HTMLFormElement, callback: RequestCallback): Promise<void> {
    form.addEventListener(
        'submit',
        ((onsubmit) => async (e: Event) => {
            cancel(e);
            const form = <HTMLFormElement>e.target;
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
            const link = <HTMLAnchorElement>e.target;
            if (onclick && onclick.call(link, e) === false) {
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
