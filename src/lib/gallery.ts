import {get, post} from "./ajax";
import {randomDelay} from "./delay";

export function addGalleryVisibilityToggle() {
    const gallery = <HTMLElement> document.getElementById('gallery');

    let privateStatus: NodeListOf<HTMLDivElement>,
        publicStatus: NodeListOf<HTMLDivElement>;

    updateStatusElements();

    const buttonContainerId = 'button-container';
    const sortFilter = document.getElementById('sort-filter').parentElement;
    sortFilter.insertAdjacentHTML("afterend", `<div id="${buttonContainerId}" class="left filter-container" style="float:right">`);
    const container = document.getElementById(buttonContainerId);

    const showButton = addVisibilityToggleButton('Show', 'btn-blue', true);
    const showButtonCount = showButton.querySelector('small');
    const hideButton = addVisibilityToggleButton('Hide', 'btn-gray', false);
    const hideButtonCount = hideButton.querySelector('small');

    toggleButtonVisibility();

    function addVisibilityToggleButton(text: string, className: string, visibility: boolean): HTMLButtonElement {
        const buttonId = `button-${text.toLowerCase()}`;
        container.insertAdjacentHTML("beforeend", `<button id="${buttonId}" class="btn-l ${className}" style="padding: 0 14px; height: 26px">${text} <small></small></button>`);
        const button = <HTMLButtonElement> document.getElementById(buttonId);
        button.addEventListener("click", () => toggleGroupVisibility(visibility));
        return button;
    }

    function toggleButtonVisibility() {
        showButtonCount.textContent = `(${privateStatus.length})`;
        showButton.style.display = privateStatus.length ? 'block' : 'none';
        hideButtonCount.textContent = `(${publicStatus.length})`;
        hideButton.style.display = publicStatus.length ? 'block' : 'none';
    }

    async function toggleGroupVisibility(checked: boolean) {
        let addClass = `status${checked ? 1 : 0}`;
        let removeClass = `status${checked ? 0 : 1}`;
        let statusText = checked ? 'Public' : 'Private';

        const statusList = checked ? privateStatus : publicStatus;
        for await (const status of statusList) {
            const url = (<HTMLAnchorElement> status.parentElement.querySelector(`.coin-desc div a`)).href;

            const response = await get(url);
            const responseText = await response.text();

            const temp = document.createElement('template');
            temp.innerHTML = responseText;
            const fragment: DocumentFragment = temp.content;

            const coinForm = fragment.getElementById('edit-coin-form') || document.getElementById('add-coin-form');
            const form = coinForm.querySelector('form');

            await postPublicityForm(url, form, checked);

            status.classList.replace(removeClass, addClass);
            status.textContent = statusText;

            updateStatusElements();
            toggleButtonVisibility();
            await randomDelay();
        }
    }

    function updateStatusElements() {
        privateStatus = gallery.querySelectorAll('.coin .desc-block span.status0');
        publicStatus = gallery.querySelectorAll('.coin .desc-block span.status1');
    }

    async function postPublicityForm(url: RequestInfo, form: HTMLFormElement, checked: boolean) {
        (<HTMLInputElement> form.querySelector('input[name=public]')).checked = checked;
        return await post(url, new FormData(form));
    }
}
