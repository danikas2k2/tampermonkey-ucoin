// @ts-ignore
import HIDE from '../../images/hide.svg';
// @ts-ignore
import LEAVE from '../../images/leave.svg';
// @ts-ignore
import REPLACE from '../../images/replace.svg';
// @ts-ignore
import SHOW from '../../images/show.svg';
import {post} from './ajax';
import {err, info, ok} from './notify';

function getCurrentForm(): HTMLFormElement {
    return <HTMLFormElement> document.getElementById('edit-coin-form')
        || <HTMLFormElement> document.getElementById('add-coin-form');
}

export function addBuyDateResetButton() {
    const coinForm = getCurrentForm();
    const buyYear = coinForm.querySelector<HTMLInputElement>('#buy_year');
    const buyMonth = coinForm.querySelector<HTMLInputElement>('#buy_month');
    buyMonth.insertAdjacentHTML('beforebegin', `<a id="buy_reset" href="#">${REPLACE}</a>`);
    const buyReset = coinForm.querySelector<HTMLInputElement>('#buy_reset');
    buyReset.addEventListener('click', () => {
        const d = new Date();
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        buyMonth.value = (m < 10) ? `0${m}` : `${m}`;
        buyYear.value = `${y}`;
        return false;
    });
}

export function addSyncConditionToColorTable() {
    const coinForm = getCurrentForm();
    const cond = coinForm.querySelector<HTMLSelectElement>('#condition');

    const CN = new Map([
        ['6', '7'],  // G
        ['5', '8'],  // VG
        ['4', '9'],  // F
        ['3', '10'], // VF
        ['2', '11'], // XF
        ['1', '12'], // UNC
        ['7', '3'],  // PRf
    ]);

    // @ts-ignore
    const CL = new Map([...CN.entries()].map(([k, v]) => [v, k])); // switch conditions and colors

    if (coinForm) {
        const markedDivs = coinForm.querySelectorAll<HTMLDivElement>('table div[class^="marked-"]');
        for (const div of markedDivs) {
            if (div.id === 'set-color') {
                continue;
            }
            div.addEventListener('click', function () {
                let color = null;
                for (const c of this.classList) {
                    if (c.startsWith('marked-')) {
                        color = c.split('-', 3)[1];
                    }
                }
                if (CL.has(color)) {
                    cond.value = CL.get(color);
                }
            });
        }
    }


    const tableColor = <HTMLInputElement> document.getElementById('edit-table-color');
    const setColor = document.getElementById('edit-set-color');

    cond.addEventListener('change', function () {
        setColor.classList.remove(`marked-${tableColor.value}`);
        const condition = this.value;
        if (CN.has(condition)) {
            tableColor.value = CN.get(condition);
        }
        setColor.classList.add(`marked-${tableColor.value}`);
    });
}

export function updateFormStyles() {
    const view = <HTMLDivElement> document.getElementById('ucid-block');

    const buttons = view.querySelector('.func-button');
    for (const button of buttons.querySelectorAll('.btn-l')) {
        button.classList.add('btn-narrow');
    }

    const remove = buttons.querySelector<HTMLAnchorElement>('a.btn-gray');
    remove.classList.replace('btn-gray', 'btn-red');
}

export function addPublicityToggle() {
    const view = <HTMLDivElement> document.getElementById('ucid-block');
    const buttons = view.querySelector('.func-button');
    const edit = buttons.querySelector<HTMLButtonElement>('button.btn-blue');
    const status = view.querySelector<HTMLDivElement>('.status-line .left');

    const form = document.getElementById('edit-coin-form').querySelector<HTMLFormElement>('form');

    const publicCheckbox = form.querySelector<HTMLInputElement>('input[name=public]');
    let checked = publicCheckbox && publicCheckbox.checked;

    const visibilityButton = <HTMLButtonElement> edit.cloneNode();
    edit.insertAdjacentElement('beforebegin', visibilityButton);
    visibilityButton.removeAttribute('onClick');
    visibilityButton.classList.add('btn-i', 'btn-narrow');
    visibilityButton.addEventListener('click', async () => {
        await postPublicityForm(document.location.href, form, !checked);
        checked = !checked;
        updatePublicityStatus();
        checked ? ok('Coin public') : info('Coin private');
    });

    let prevKeyCode = -1;
    document.body.addEventListener('keydown', e => {
        if (e.keyCode === prevKeyCode) {
            if (e.keyCode === 72 || e.keyCode === 83) {
                visibilityButton.click();
            }
        }
        prevKeyCode = e.keyCode;
    });

    updatePublicityStatus();

    function updatePublicityStatus() {
        visibilityButton.title = checked ? 'Hide' : 'Show';
        visibilityButton.innerHTML = checked ? HIDE : SHOW;
        status.innerText = checked ? 'Public' : 'Private';
        if (checked) {
            visibilityButton.classList.replace('btn-blue', 'btn-gray');
            status.classList.replace('status0', 'status1');
        } else {
            visibilityButton.classList.replace('btn-gray', 'btn-blue');
            status.classList.replace('status1', 'status0');
        }
    }

    async function postPublicityForm(url: string, form: HTMLFormElement, checked: boolean) {
        const input: HTMLInputElement = form.querySelector('input[name=public]');
        if (input) {
            input.checked = checked;
        }
        return await post(url, new FormData(form));
    }
}

export function addReplacementToggle() {
    const view = <HTMLDivElement> document.getElementById('ucid-block');
    const funcButtons = view.querySelector('.func-button');
    const edit = funcButtons.querySelector<HTMLButtonElement>('button.btn-blue');

    let replaceStatus: HTMLTableRowElement;
    const statusRows = view.querySelectorAll<HTMLTableRowElement>('.status-line + table tr');
    for (const tr of statusRows) {
        if (tr.querySelector('span.status2')) {
            replaceStatus = tr;
        }
    }

    const form = document.getElementById('edit-coin-form').querySelector<HTMLFormElement>('form');

    const replaceCheckbox = form.querySelector<HTMLInputElement>('input[name=replace]');
    let leave = replaceCheckbox && replaceCheckbox.checked;

    const replacementButton = <HTMLButtonElement> edit.cloneNode();
    edit.insertAdjacentElement('beforebegin', replacementButton);
    replacementButton.removeAttribute('onClick');
    replacementButton.classList.add('btn-i', 'btn-narrow');
    replacementButton.addEventListener('click', () => {
        postReplacementForm(document.location.href, form, !leave).then(() => {
            leave = !leave;
            updateReplacementStatus();
            leave ? err('Should be replaced') : info('No replace required');
        });
    });

    let prevKeyCode = -1;
    document.body.addEventListener('keydown', e => {
        if (e.keyCode === prevKeyCode) {
            if (e.keyCode === 82) {
                replacementButton.click();
            }
        }
        prevKeyCode = e.keyCode;
    });

    updateReplacementStatus();

    function updateReplacementStatus() {
        replacementButton.title = leave ? `Don't replace` : `Replace`;
        replacementButton.innerText = 'R';
        replacementButton.innerHTML = leave ? LEAVE : REPLACE;
        if (leave) {
            replacementButton.classList.replace('btn-blue', 'btn-gray');
            if (!replaceStatus) {
                const tbody = view.querySelector<HTMLTableElement>('.status-line + table tbody');
                if (tbody) {
                    tbody.insertAdjacentHTML('beforeend', `<tr><td class="lgray-12" colspan="2"><span class="set status2 wrap" style="max-width: 232px;width: 232px;padding: 0;display: block;margin-top: 6px;">Need to replace</span></td></tr>`);
                    replaceStatus = tbody.querySelector('tr:last-child');
                }
            }
        } else {
            replacementButton.classList.replace('btn-gray', 'btn-blue');
            if (replaceStatus) {
                replaceStatus.remove();
                replaceStatus = null;
            }
        }
    }

    function postReplacementForm(url: string, form: HTMLFormElement, replace: boolean) {
        const input: HTMLInputElement = form.querySelector('input[name=replace]');
        if (input) {
            input.checked = replace;
        }
        return post(url, new FormData(form));
    }
}
