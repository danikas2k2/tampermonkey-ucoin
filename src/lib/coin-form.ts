import HIDE from '../../images/hide.svg';
import LEAVE from '../../images/leave.svg';
import REPLACE from '../../images/replace.svg';
import SHOW from '../../images/show.svg';
import { getFragment, postFragment } from './ajax';
import { Color, FormColorValues, FormValue, FormValueColors } from './cond';
import { _ } from './lang';
import { updateTags } from './tags';
import {
    cancel,
    handleLinkClick,
    hide,
    isHidden,
    reload,
    show,
    todayMonth,
    toggle,
    updateOptionalElement,
    updateRequiredElement,
    wrapFormSubmit,
} from './utils';

const getCoinFormMainBlock = (): HTMLElement | null => document.querySelector('#my-func-block');
const getCoinFormViewBlock = (): HTMLElement | null => document.querySelector('#ucid-block');

export async function updateCoinForm(
    main: HTMLElement | null = getCoinFormMainBlock(),
    view: HTMLElement | null = getCoinFormViewBlock()
): Promise<void> {
    show(main);
    updateFormButtons(main);
    updateTitleToggle(main);
    for (const form of main?.querySelectorAll<HTMLFormElement>('form') || []) {
        updateCoinFormInputs(form);
        updateCoinViewLinks(view);
        if (form.parentElement?.matches('#edit-coin-form')) {
            addPublicityToggle(view, form);
            addReplacementToggle(view, form);
        }
    }
}

async function updateCoinFormFragment(fragment: DocumentFragment): Promise<void> {
    updateRequiredElement(fragment, getCoinFormMainBlock());
    updateOptionalElement(fragment, document.querySelector('#coin-chooser-dialog'));
    return updateCoinForm();
}

function updateCoinViewLinks(view: HTMLElement | null) {
    for (const link of view?.querySelectorAll<HTMLAnchorElement>('a[type=submit]') || []) {
        handleLinkClick(link, async ({ href }: HTMLAnchorElement) =>
            updateCoinFormFragment(await getFragment(href))
        );
    }
}

function updateCoinFormInputs(form: HTMLFormElement): void {
    updateBuyDateInput(form);
    addSyncConditionToColorTable(form);
    wrapFormSubmit(form, async (form: HTMLFormElement) => {
        if (form) {
            await updateCoinFormFragment(await postFragment(location.href, new FormData(form)));
        }
    });
    updateTags();
}

async function postForm(form: HTMLFormElement | undefined): Promise<boolean> {
    if (form && (await postFragment(location.href, new FormData(form)))) {
        return true;
    }
    return !!reload();
}

function addPublicityToggle(view: HTMLElement | null, form: HTMLFormElement): void {
    const status = view?.querySelector<HTMLDivElement>('.status-line .left');
    const buttons = view?.querySelector('.func-button');
    if (!status || !buttons) {
        return;
    }

    // const formId = form.parentElement?.id || '';
    const buttonId = `coin-form-visibility`;
    if (buttons.querySelector(`#${buttonId}`)) {
        return;
    }

    buttons.insertAdjacentHTML(
        'afterbegin',
        `<button id='${buttonId}' class='btn-l btn-i btn-narrow'/>`
    );
    const button = buttons.querySelector<HTMLButtonElement>(`#${buttonId}`);
    if (!button) {
        return;
    }

    const updateStatus = (): void => {
        const checked = form?.public?.checked;
        console.info({
            form,
            checked,
        });
        button.title = _(checked ? 'Hide' : 'Show');
        button.innerHTML = checked ? HIDE : SHOW;
        button.classList.toggle('btn-blue', !checked);
        button.classList.toggle('btn-gray', checked);
        status.innerText = _(checked ? 'Public' : 'Private');
        status.classList.toggle('status0', !checked);
        status.classList.toggle('status1', checked);
    };

    button.addEventListener('click', async () => {
        if (!form) {
            return;
        }
        form.public.checked = !form.public.checked;
        if (form.public.checked) {
            const tags = [...document.querySelectorAll('.textboxlist-bit-box')].filter(
                (x) => x.textContent === '+'
            );
            if (tags.length) {
                const url = new URL(location.href);
                url.pathname = '/coin/';
                url.searchParams.set('action', 'deltag');
                for (const x of tags) {
                    url.searchParams.set('tag', '+');
                    await fetch(url.href);
                    x.remove();
                }
            }
        }
        if (await postForm(form)) {
            updateStatus();
        }
    });

    updateStatus();
}

function addReplacementToggle(view: HTMLElement | null, form: HTMLFormElement): void {
    if (!view) {
        return;
    }

    let status: HTMLTableRowElement | null;
    for (const tr of view.querySelectorAll<HTMLTableRowElement>('.status-line + table tr')) {
        if (tr.querySelector('span.status2')) {
            status = tr;
        }
    }

    const buttons = view.querySelector('.func-button');
    if (!buttons) {
        return;
    }

    // const formId = form.parentElement?.id || '';
    const buttonId = `coin-form-replacement`;
    if (buttons.querySelector(`#${buttonId}`)) {
        return;
    }

    buttons.insertAdjacentHTML(
        'afterbegin',
        `<button id='${buttonId}' class='btn-l btn-i btn-narrow'/>`
    );
    const button = buttons.querySelector<HTMLButtonElement>(`#${buttonId}`);
    if (!button) {
        return;
    }

    const updateStatus = (): void => {
        const checked = form?.replace?.checked;
        button.title = checked ? `Don't replace` : `Replace`;
        button.innerHTML = checked ? LEAVE : REPLACE;

        button.classList.toggle('btn-blue', !checked);
        button.classList.toggle('btn-gray', checked);
        if (checked) {
            if (!status) {
                const tbody = view?.querySelector<HTMLTableElement>('.status-line + table tbody');
                if (tbody) {
                    tbody.insertAdjacentHTML(
                        'beforeend',
                        `<tr><td class='lgray-12' colspan='2'><span class='set status2 wrap' style='max-width: 232px;width: 232px;padding: 0;display: block;margin-top: 6px;'>Need to replace</span></td></tr>`
                    );
                    status = tbody.querySelector('tr:last-child');
                }
            }
        } else if (status) {
            status.remove();
            status = null;
        }
    };

    button.addEventListener('click', async () => {
        if (form) {
            form.replace.checked = !form.replace.checked;
            if (await postForm(form)) {
                updateStatus();
            }
        }
    });

    updateStatus();
}

function updateBuyDateInput(form: HTMLFormElement): void {
    const { buy_month: buyMonth, buy_year: buyYear } = form;
    let { buy_year_month: buyYearMonth } = form;
    hide(buyYear, buyMonth);
    if (!buyYearMonth) {
        buyYear.insertAdjacentHTML(
            'afterend',
            `<input id='buy_year_month' name='buy_year_month' type='month'/>`
        );
        buyYearMonth = form.buy_year_month;
    }
    buyYearMonth.max = todayMonth();
    buyYearMonth.addEventListener('change', (e: Event) => {
        cancel(e);
        const value = buyYearMonth.value || todayMonth();
        [buyYear.value, buyMonth.value] = value.split('-', 2);
        return false;
    });
}

function addSyncConditionToColorTable(form: HTMLFormElement): void {
    const condition: HTMLSelectElement = form.condition;
    const tableColor: HTMLInputElement = form.color;
    tableColor.nextElementSibling?.classList.add('btn-set');
    const setColor = form.querySelector<HTMLDivElement>('#edit-set-color');
    const markedDivs = form.querySelectorAll<HTMLDivElement>('table div[class^="marked-"]');
    for (const div of markedDivs) {
        if (div.matches('#set-color')) {
            continue;
        }

        div.classList.add('btn-marker');

        div.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            let color: Color | null = null;
            for (const c of target.classList) {
                if (c.startsWith('marked-')) {
                    color = +c.split('-', 3)[1];
                }
            }
            if (color && color in FormColorValues) {
                condition.value = `${FormColorValues[color]}`;
            }
        });
    }

    condition.addEventListener('change', (e: Event) => {
        if (!setColor) {
            return;
        }
        const target = e.target as HTMLSelectElement;
        setColor.classList.remove(`marked-${tableColor.value}`);
        const value = +target.value as FormValue;
        if (value in FormValueColors) {
            tableColor.value = `${FormValueColors[value]}`;
        }
        setColor.classList.add(`marked-${tableColor.value}`);
    });
}

function updateFormButtons(main: HTMLElement | null): void {
    for (const button of main?.querySelectorAll('.func-button .btn-l') || []) {
        button.classList.add('btn-narrow');
        if (button.matches('a')) {
            button.classList.replace('btn-gray', 'btn-red');
            button.setAttribute('type', 'submit');
        }
    }
}

function toggleTitle(e: PointerEvent): void {
    const title = e.target as HTMLElement;
    if (!title) {
        return;
    }
    const list = title.parentElement?.querySelector<HTMLElement>('#coin-list');
    if (!list) {
        return;
    }
    const hidden = isHidden(list);
    toggle(hidden, list);
    const arrow = title.querySelector<HTMLElement>('.arrow');
    if (arrow) {
        arrow.classList.toggle('atw', hidden);
        arrow.classList.toggle('abw', !hidden);
    }
}

function updateTitleToggle(main: HTMLElement | null): void {
    const toggle = main?.querySelector<HTMLElement>('.my-collection-block');
    if (toggle) {
        // TODO why replace?
        const clone = toggle.cloneNode(true);
        clone.addEventListener('click', toggleTitle);
        clone.addEventListener('touchstart', toggleTitle);
        toggle.replaceWith(clone);
    }
}
