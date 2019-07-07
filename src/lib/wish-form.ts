import {styleSwapLink} from './swap-links';
import {getCurrentVarietyId} from './vid';

declare var CoinWishFormOn: (...args: string[]) => void;

export function addWishColorMarkers() {
    const id = 'wish-cond-fieldset';
    const cond = document.getElementById('wish-cond');
    cond.insertAdjacentHTML('afterend',
        `<fieldset id="${id}"><legend class="gray-12" style="padding:5px;">Condition</legend></fieldset>`);
    const fieldset = document.getElementById(id);

    const options = cond.querySelectorAll('option');
    for (const o of options) {
        const val = o.value;
        const text = o.textContent;
        if (val || text.includes('ANY')) {
            const checked = (val === '3') ? 'checked' : '';
            const style = o.getAttribute('style') || '';
            fieldset.insertAdjacentHTML('beforeend',
                `<label class="dgray-12" style="margin-top:0;${style}"><input name="condition" value="${val}" ${checked} type="radio"/>${text}</label>`);
        }
    }

    cond.remove();

    const _onCoinWishForm = CoinWishFormOn;
    if (!_onCoinWishForm) {
        return;
    }

    const wishForm = <HTMLFormElement> document.getElementById('wish-form');

    CoinWishFormOn = function (...args: any[]) {
        _onCoinWishForm(...args);

        const [, cond] = args;
        const checkbox = fieldset.querySelector<HTMLInputElement>(`input[name="condition"][value="${cond}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }

        wishForm.querySelector<HTMLInputElement>(`#wish-type`).checked = true;

        /*if (!new FormData(wishForm).has('wish-variety')) {
            const vid = getCurrentVarietyId();
            if (vid) {
                document.querySelector<HTMLInputElement>(`input[name="wish-variety"][value="${vid}"]`).checked = true;
            }
        }*/
    };

    const myWish = <HTMLElement> document.getElementById('my-wish-block');
    const wishBlock = myWish.querySelector<HTMLElement>('#wish-block');
    const addButton = wishBlock.querySelector<HTMLButtonElement>('center button.btn-s.btn-gray');
    if (!addButton) {
        return;
    }

    const buttonSetId = 'wish-button-set';
    addButton.insertAdjacentHTML('afterend', `<div id="${buttonSetId}" class="btn-set"/>`);
    addButton.remove();

    const buttonSet = document.getElementById(buttonSetId);
    if (!buttonSet) {
        return;
    }

    addWishMarker('*', 1, 0);
    addWishMarker('VF+', 10, 3);
    addWishMarker('XF+', 11, 2);
    addWishMarker('UN', 12, 1);

    function addWishMarker(text: string, color: number, value: number): void {
        const markerId = `wish-marker-${value}`;
        const markerClass = `marked-${color}`;
        buttonSet.insertAdjacentHTML('beforeend', `<div id="${markerId}" class="${markerClass}">${text}</div>`);
        document.getElementById(markerId).addEventListener('click', () => CoinWishFormOn('', `${value}`));
    }
}

export function styleWishLists() {
    const listOfLinks = document.querySelectorAll<HTMLAnchorElement>('#wish-block a.list-link');
    for (const a of listOfLinks) {
        styleSwapLink(a);
    }
}
