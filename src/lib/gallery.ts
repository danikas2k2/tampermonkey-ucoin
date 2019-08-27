import {get, post} from './ajax';
import {randomDelay} from './delay';

type VisibilityToggleCallback = (container: HTMLElement, checked: boolean) => void;

const gallery = <HTMLElement> document.getElementById('gallery');

let privateStatus: NodeListOf<HTMLDivElement>;
let publicStatus: NodeListOf<HTMLDivElement>;

function updateStatusElements() {
    privateStatus = gallery.querySelectorAll<HTMLDivElement>('.coin .desc-block span.status0');
    publicStatus = gallery.querySelectorAll<HTMLDivElement>('.coin .desc-block span.status1');
}

async function postPublicityForm(url: RequestInfo, form: HTMLFormElement, checked: boolean) {
    form.querySelector<HTMLInputElement>('input[name=public]').checked = checked;
    return await post(url, new FormData(form));
}

function addVisibilityToggleButton(container: HTMLElement, text: string, className: string, visibility: boolean, count: number, callback: VisibilityToggleCallback): HTMLButtonElement {
    const buttonId = `button-${text.toLowerCase()}`;

    let button = <HTMLButtonElement> document.getElementById(buttonId);
    if (!button) {
        container.insertAdjacentHTML('beforeend',
            `<button id="${buttonId}" class="btn-l ${className}" style="padding: 0 14px; height: 26px">${text} <small></small></button>`);
        button = <HTMLButtonElement> document.getElementById(buttonId);
        button.addEventListener('click', () => confirm(`Are you sure to ${text.toLowerCase()}?`) &&
            callback(container, visibility));
    }

    const small = button.querySelector('small');
    small.textContent = `(${count})`;

    button.style.display = count ? 'block' : 'none';
    return button;
}

function toggleButtonVisibility(container: HTMLElement, callback: VisibilityToggleCallback) {
    addVisibilityToggleButton(container, 'Show', 'btn-blue', true, privateStatus.length, callback);
    addVisibilityToggleButton(container, 'Hide', 'btn-gray', false, publicStatus.length, callback);
}

async function toggleGroupVisibility(container: HTMLElement, checked: boolean) {
    const addClass = `status${checked ? 1 : 0}`;
    const removeClass = `status${checked ? 0 : 1}`;
    const statusText = checked ? 'Public' : 'Private';

    const statusList = checked ? privateStatus : publicStatus;
    for await (const status of statusList) {
        const url = status.parentElement.querySelector<HTMLAnchorElement>(`.coin-desc div a`).href;

        const response = await get(url);
        const responseText = await response.text();

        const temp = document.createElement('template');
        temp.innerHTML = responseText;
        const fragment: DocumentFragment = temp.content;

        const coinForm = fragment.getElementById('edit-coin-form') || document.getElementById('add-coin-form');
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
        await randomDelay();
    }
}

export function addGalleryVisibilityToggle() {
    updateStatusElements();

    const buttonContainerId = 'button-container';

    const sortFilter = document.getElementById('sort-filter').parentElement;
    sortFilter.insertAdjacentHTML('afterend', `<div id="${buttonContainerId}" class="left filter-container" style="float:right">`);

    const container = document.getElementById(buttonContainerId);
    toggleButtonVisibility(container, toggleGroupVisibility);
}
