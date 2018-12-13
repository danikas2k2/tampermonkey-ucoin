import {get, post} from "./ajax";
import {randomDelay} from "./delay";

export function addGalleryVisibilityToggle() {
    const gallery = <HTMLElement>document.getElementById('gallery');
    const coins = gallery.querySelector('.coin .desc-block .coin-desc');

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
        const button = <HTMLButtonElement>document.getElementById(buttonId);
        button.addEventListener("click", () => toggleGroupVisibility(visibility));
        return button;
    }

    function toggleButtonVisibility() {
        showButtonCount.textContent = `(${privateStatus.length})`;
        showButton.style.display = privateStatus.length ? 'block' : 'none';
        hideButtonCount.textContent = `(${publicStatus.length})`;
        hideButton.style.display = publicStatus.length ? 'block' : 'none';
    }

    function toggleGroupVisibility(checked: boolean) {
        let addClass = `status${checked ? 1 : 0}`;
        let removeClass = `status${checked ? 0 : 1}`;
        let text = checked ? 'Public' : 'Private';

        let queue = Promise.resolve();

        (checked ? privateStatus : publicStatus).forEach(status => {
            const url = (<HTMLAnchorElement>status.querySelector(`~ .coin-desc div a`)).href;

            queue = queue
                .then(() => get(url))
                .then(response => response.text())
                .then(text => {
                    const fragment = document.createDocumentFragment();
                    fragment.textContent = text;
                    return fragment;
                })
                .then((fragment: DocumentFragment) => fragment.getElementById('coin-form').querySelector('form'))
                .then(form => postPublicityForm(url, form, checked))
                .then(() => {
                    status.classList.replace(removeClass, addClass);
                    status.textContent = text;

                    updateStatusElements();
                    toggleButtonVisibility();
                })
                .then(randomDelay());
        });

        return queue;
    }

    function updateStatusElements() {
        privateStatus = coins.querySelectorAll('span.status0');
        publicStatus = coins.querySelectorAll('span.status1');
    }

    function postPublicityForm(url: RequestInfo, form: HTMLFormElement, checked: boolean) {
        (<HTMLInputElement>form.querySelector('input[name=public]')).checked = checked;
        return post(url, new FormData(form));
    }
}
