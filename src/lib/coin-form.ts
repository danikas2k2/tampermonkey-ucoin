import {err, info, ok} from "./notify";
import {post} from "./ajax";

export function addBuyDateResetButton() {
    const buyYear = <HTMLInputElement>document.getElementById('buy_year');
    const buyMonth = <HTMLInputElement>document.getElementById('buy_month');
    buyMonth.insertAdjacentHTML("beforebegin", `<a id="buy_reset" href="#">&#x21BB;</a>`);
    const buyReset = document.getElementById('buy_reset');
    buyReset.addEventListener("click", () => {
        const d = new Date();
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        buyMonth.value = (m < 10) ? `0${m}` : `${m}`;
        buyYear.value = `${y}`;
        return false;
    });
}

export function addSyncConditionToColorTable() {
    const cond = <HTMLSelectElement>document.getElementById('condition');

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

    document.getElementById('edit-coin-form').querySelectorAll('table div[class^="marked-"]').forEach((div: HTMLDivElement) => {
        if (div.id === 'set-color') {
            return;
        }
        div.addEventListener('click', e => {
            const div = <HTMLDivElement>e.target;
            let color = null;
            div.classList.forEach((c: string) => {
                if (c.startsWith('marked-')) {
                    color = c.split('-', 3)[1];
                }
            });
            if (CL.has(color)) {
                cond.value = CL.get(color);
            }
        });
    });


    const tableColor = <HTMLInputElement>document.getElementById('table-color');
    const setColor = document.getElementById('set-color');

    cond.addEventListener('change', e => {
        setColor.classList.remove(`marked-${tableColor.value}`);
        const condition = (<HTMLSelectElement>e.target).value;
        if (CN.has(condition)) {
            tableColor.value = CN.get(condition);
        }
        setColor.classList.add(`marked-${tableColor.value}`);
    });
}

export function addPublicityToggle() {
    const view = <HTMLDivElement>document.getElementById('ucid-block');
    const buttons = view.querySelector('.func-button');
    const edit = <HTMLButtonElement>buttons.querySelector('button.btn-blue');
    const status = <HTMLDivElement>view.querySelector('.status-line .left');

    buttons.querySelectorAll('.btn-l').forEach(button => {
        button.classList.add('btn-narrow');
    });

    const form = <HTMLFormElement>document.getElementById('edit-coin-form').querySelector('form');

    const publicCheckbox = <HTMLInputElement>form.querySelector('input[name=public]');
    let checked = publicCheckbox && publicCheckbox.checked;
    console.log(publicCheckbox);
    console.log(publicCheckbox.checked);

    const visibilityButton = <HTMLButtonElement>edit.cloneNode();
    edit.insertAdjacentElement("beforebegin", visibilityButton);
    visibilityButton.removeAttribute('onClick');
    visibilityButton.classList.add('btn-narrow');
    visibilityButton.addEventListener("click", () => {
        postPublicityForm(document.location.href, form, !checked).then(() => {
            checked = !checked;
            updatePublicityStatus();
            checked ? ok('Coin public') : info('Coin private');
        });
    });

    let prevKeyCode = -1;
    document.body.addEventListener("keydown", e => {
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
        visibilityButton.innerText = checked ? 'H' : 'S';
        status.innerText = checked ? 'Public' : 'Private';
        if (checked) {
            visibilityButton.classList.replace('btn-blue', 'btn-gray');
            status.classList.replace('status0', 'status1');
        } else {
            visibilityButton.classList.replace('btn-gray', 'btn-blue');
            status.classList.replace('status1', 'status0');
        }
    }

    function postPublicityForm(url: string, form: HTMLFormElement, checked: boolean) {
        const input: HTMLInputElement = form.querySelector('input[name=public]');
        if (input) {
            input.checked = checked;
        }
        return post(url, new FormData(form));
    }
}

export function addReplacementToggle() {
    const view = <HTMLDivElement>document.getElementById('ucid-block');
    const buttons = view.querySelector('.func-button');
    const edit = <HTMLButtonElement>buttons.querySelector('button.btn-blue');

    let replaceStatus: HTMLTableRowElement;
    view.querySelectorAll('.status-line + table tr').forEach((tr: HTMLTableRowElement) => {
        if (tr.querySelector('span.status2')) {
            replaceStatus = tr;
        }
    });

    buttons.querySelectorAll('.btn-l').forEach(button => {
        button.classList.add('btn-narrow');
    });

    const form = <HTMLFormElement>document.getElementById('edit-coin-form').querySelector('form');

    const replaceCheckbox = <HTMLInputElement>form.querySelector('input[name=replace]');
    console.log(replaceCheckbox);
    console.log(replaceCheckbox.checked);
    let replace = replaceCheckbox && replaceCheckbox.checked;

    const replacementButton = <HTMLButtonElement>edit.cloneNode();
    edit.insertAdjacentElement("beforebegin", replacementButton);
    replacementButton.removeAttribute('onClick');
    replacementButton.classList.add('btn-narrow');
    replacementButton.addEventListener("click", () => {
        postReplacementForm(document.location.href, form, !replace).then(() => {
            replace = !replace;
            updateReplacementStatus();
            replace ? err('Should be replaced') : info('No replace required');
        });
    });

    let prevKeyCode = -1;
    document.body.addEventListener("keydown", e => {
        if (e.keyCode === prevKeyCode) {
            if (e.keyCode === 82) {
                replacementButton.click();
            }
        }
        prevKeyCode = e.keyCode;
    });

    updateReplacementStatus();

    function updateReplacementStatus() {
        replacementButton.title = replace ? `Don't replace` : `Replace`;
        replacementButton.innerText = 'R';
        if (replace) {
            replacementButton.classList.replace('btn-blue', 'btn-gray');
            if (!replaceStatus) {
                const tbody = <HTMLTableElement>view.querySelector('.status-line + table tbody');
                if (tbody) {
                    tbody.insertAdjacentHTML("beforeend", `<tr><td class="lgray-12" colspan="2"><span class="set status2 wrap" style="max-width: 232px;width: 232px;padding: 0;display: block;margin-top: 6px;">Need to replace</span></td></tr>`);
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
