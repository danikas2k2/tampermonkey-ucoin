import { randomDecoratedDelay } from './delay';
import { documentFragment } from './utils';

type VisibilityToggleCallback = (container: HTMLElement, checked: boolean) => void;

const gallery = document.getElementById('gallery');

let privateStatus: NodeListOf<HTMLDivElement> | undefined;
let publicStatus: NodeListOf<HTMLDivElement> | undefined;

function updateStatusElements(): void {
    privateStatus = gallery?.querySelectorAll<HTMLDivElement>('.coin .desc-block span.status0');
    publicStatus = gallery?.querySelectorAll<HTMLDivElement>('.coin .desc-block span.status1');
}

async function postPublicityForm(
    url: RequestInfo,
    form: HTMLFormElement,
    checked: boolean
): Promise<Response> {
    const publicInput = form.querySelector<HTMLInputElement>('input[name=public]');
    if (publicInput) {
        publicInput.checked = checked;
    }
    return fetch(url, { method: 'POST', body: new FormData(form) });
}

function addVisibilityToggleButton(
    container: HTMLElement,
    text: string,
    className: string,
    visibility: boolean,
    count: number,
    callback: VisibilityToggleCallback
): HTMLButtonElement {
    const buttonId = `button-${text.toLowerCase()}`;

    let button = document.getElementById(buttonId) as HTMLButtonElement;
    if (!button) {
        container.insertAdjacentHTML(
            'beforeend',
            `<button id="${buttonId}" class="btn-l ${className}" style="padding: 0 14px; height: 26px">${text} <small></small></button>`
        );
        button = document.getElementById(buttonId) as HTMLButtonElement;
        button.addEventListener(
            'click',
            () =>
                // eslint-disable-next-line no-alert
                confirm(`Are you sure to ${text.toLowerCase()}?`) && callback(container, visibility)
        );
    }

    const small = button.querySelector('small');
    if (small) {
        small.textContent = `(${count})`;
    }

    button.style.display = count ? 'block' : 'none';
    return button;
}

function toggleButtonVisibility(container: HTMLElement, callback: VisibilityToggleCallback): void {
    addVisibilityToggleButton(
        container,
        'Show',
        'btn-blue',
        true,
        privateStatus?.length || 0,
        callback
    );
    addVisibilityToggleButton(
        container,
        'Hide',
        'btn-gray',
        false,
        publicStatus?.length || 0,
        callback
    );
}

async function toggleGroupVisibility(container: HTMLElement, checked: boolean): Promise<void> {
    const addClass = `status${checked ? 1 : 0}`;
    const removeClass = `status${checked ? 0 : 1}`;
    const statusText = checked ? 'Public' : 'Private';

    const statusList = checked ? privateStatus : publicStatus;
    if (!statusList) {
        return;
    }

    for await (const status of statusList) {
        const url =
            status.parentElement?.querySelector<HTMLAnchorElement>(`.coin-desc div a`)?.href;
        if (!url) {
            continue;
        }

        const fragment = documentFragment(await fetch(url).then((r) => r.text()));
        const coinForm =
            fragment.getElementById('edit-coin-form') || document.getElementById('add-coin-form');
        if (!coinForm) {
            continue;
        }

        const form = coinForm.querySelector('form');
        if (!form) {
            continue;
        }

        await postPublicityForm(url, form, checked);

        status.classList.replace(removeClass, addClass);
        status.textContent = statusText;

        updateStatusElements();
        toggleButtonVisibility(container, toggleGroupVisibility);
        await randomDecoratedDelay();
    }
}

export function addGalleryVisibilityToggle(): void {
    updateStatusElements();

    const buttonContainerId = 'button-container';
    const sortFilter = document.getElementById('sort-filter')?.parentElement;
    sortFilter?.insertAdjacentHTML(
        'afterend',
        `<div id="${buttonContainerId}" class="left filter-container" style="float:right">`
    );

    const container = document.getElementById(buttonContainerId);
    if (container) {
        toggleButtonVisibility(container, toggleGroupVisibility);
    }
}
