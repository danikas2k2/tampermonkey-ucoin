import HIDE from '../../images/hide.svg';
import LEAVE from '../../images/leave.svg';
import REPLACE from '../../images/replace.svg';
import SHOW from '../../images/show.svg';
import { getFragment, postFragment } from './ajax';
import { Color, FormColorValues, FormValue, FormValueColors } from './cond';
import { AbstractForm } from './form';
import { id } from './selectors';
import { cancel, handleFormSubmit, handleLinkSubmit, hide, reload, show, todayMonth, updateOptionalElement, updateRequiredElement } from './utils';

export class CoinForm extends AbstractForm {
    protected addFormId = 'add-coin-form';
    protected editFormId = 'edit-coin-form';
    protected funcId = 'my-func-block';
    protected viewId = 'ucid-block';
    protected coinChooserId = 'coin-chooser-dialog';

    private addForm: HTMLFormElement | null;
    private editForm: HTMLFormElement | null;
    private view: HTMLElement | null;
    private coinChooser: HTMLElement | null;

    public async handle(/*loc: string*/): Promise<void> {
        this.func = document.getElementById(this.funcId) as HTMLElement;
        if (!this.func) {
            return;
        }

        this.coinChooser = document.getElementById(this.coinChooserId) as HTMLElement;

        await this.update();
    }

    protected async updateFragment(fragment: DocumentFragment): Promise<void> {
        this.func = updateRequiredElement(fragment, this.func);
        this.coinChooser = updateOptionalElement(fragment, this.coinChooser);
        return await this.update();
    }

    private tagsInitialized = false;

    private updateTags() {
        if (this.tagsInitialized) {
            [...document.querySelectorAll<HTMLScriptElement>('script')]
                .filter((s) => s.textContent?.includes('#tag'))
                .forEach((s) => eval(s.textContent!));
        } else {
            this.tagsInitialized = true;
        }
    }

    protected async update(): Promise<void> {
        if (!this.func) {
            return;
        }

        show(this.func);

        this.updateButtons();

        this.addForm = this.func.querySelector<HTMLFormElement>(`#${this.addFormId} form`);
        this.editForm = this.func.querySelector<HTMLFormElement>(`#${this.editFormId} form`);
        this.form = this.editForm || this.addForm;

        if (this.form) {
            this.view = this.func.querySelector<HTMLDivElement>(id(this.viewId));
            if (this.view) {
                this.addPublicityToggle();
                this.addReplacementToggle();
            }

            this.updateBuyDateInput();
            this.addSyncConditionToColorTable();

            await handleFormSubmit(
                this.form,
                async () => await this.updateFragment(await postFragment(location.href, new FormData(this.form!))),
            );

            if (this.view) {
                for (const link of this.view.querySelectorAll<HTMLAnchorElement>('a[type=submit]')) {
                    await handleLinkSubmit(link, async () => await this.updateFragment(await getFragment(link.href)));
                }
            }

            this.updateTags();
        }
    }

    private updateBuyDateInput(): void {
        if (this.form) {
            const { buy_month: buyMonth, buy_year: buyYear } = this.form;
            let { buy_year_month: buyYearMonth } = this.form;
            hide(buyYear, buyMonth);
            if (!buyYearMonth) {
                buyYear.insertAdjacentHTML(
                    'afterend',
                    `<input id='buy_year_month' name='buy_year_month' type='month'/>`,
                );
                buyYearMonth = this.form.buy_year_month;
            }

            buyYearMonth.max = todayMonth();
            buyYearMonth.addEventListener('change', (e: Event) => {
                cancel(e);
                const value = buyYearMonth.value || todayMonth();
                [buyYear.value, buyMonth.value] = value.split('-', 2);
                return false;
            });
        }
    }

    private addSyncConditionToColorTable(): void {
        if (this.form) {
            const condition: HTMLSelectElement = this.form.condition;
            const tableColor: HTMLInputElement = this.form.color;
            tableColor.nextElementSibling?.classList.add('btn-set');
            const setColor: HTMLDivElement | null = this.form.querySelector(id('edit-set-color'));

            const markedDivs = this.form.querySelectorAll<HTMLDivElement>('table div[class^="marked-"]');
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
    }

    private async postForm(): Promise<boolean> {
        if (this.form && (await postFragment(location.href, new FormData(this.form)))) {
            return true;
        }
        return !!reload();
    }

    private addPublicityToggle(): void {
        // const form = view.nextElementSibling.querySelector<HTMLFormElement>('form');
        const status = this.view?.querySelector<HTMLDivElement>('.status-line .left');
        const buttons = this.view?.querySelector('.func-button');
        if (!status || !buttons) {
            return;
        }

        const buttonId = 'coin-form-visibility';
        buttons.insertAdjacentHTML('afterbegin', `<button id='${buttonId}' class='btn-l btn-i btn-narrow'/>`);
        const button = buttons.querySelector<HTMLButtonElement>(id(buttonId));
        if (!button) {
            return;
        }

        const updateStatus = () => {
            const checked = this.form?.public?.checked;
            button.title = checked ? 'Hide' : 'Show';
            button.innerHTML = checked ? HIDE : SHOW;
            button.classList.toggle('btn-blue', !checked);
            button.classList.toggle('btn-gray', checked);
            status.innerText = checked ? 'Public' : 'Private';
            status.classList.toggle('status0', !checked);
            status.classList.toggle('status1', checked);
        };

        button.addEventListener('click', async () => {
            if (!this.form) {
                return;
            }
            this.form.public.checked = !this.form.public.checked;
            if (this.form.public.checked) {
                const tags = [...document.querySelectorAll('.textboxlist-bit-box')].filter(x => x.textContent === '+');
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
            if (await this.postForm()) {
                updateStatus();
            }
        });

        updateStatus();
    }

    private addReplacementToggle(): void {
        // const form = view.nextElementSibling.querySelector<HTMLFormElement>('form');
        if (!this.view) {
            return;
        }

        let status: HTMLTableRowElement | null;
        for (const tr of this.view.querySelectorAll<HTMLTableRowElement>('.status-line + table tr')) {
            if (tr.querySelector('span.status2')) {
                status = tr;
            }
        }

        const buttons = this.view.querySelector('.func-button');
        if (!buttons) {
            return;
        }

        const buttonId = 'coin-form-replacement';
        buttons.insertAdjacentHTML('afterbegin', `<button id='${buttonId}' class='btn-l btn-i btn-narrow'/>`);
        const button = buttons.querySelector<HTMLButtonElement>(id(buttonId));
        if (!button) {
            return;
        }

        const updateStatus = () => {
            const checked = this.form?.replace?.checked;
            button.title = checked ? `Don't replace` : `Replace`;
            button.innerHTML = checked ? LEAVE : REPLACE;

            button.classList.toggle('btn-blue', !checked);
            button.classList.toggle('btn-gray', checked);
            if (checked) {
                if (!status) {
                    const tbody = this.view?.querySelector<HTMLTableElement>('.status-line + table tbody');
                    if (tbody) {
                        tbody.insertAdjacentHTML(
                            'beforeend',
                            `<tr><td class='lgray-12' colspan='2'><span class='set status2 wrap' style='max-width: 232px;width: 232px;padding: 0;display: block;margin-top: 6px;'>Need to replace</span></td></tr>`,
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
            if (this.form) {
                this.form.replace.checked = !this.form.replace.checked;
                if (await this.postForm()) {
                    updateStatus();
                }
            }
        });

        updateStatus();
    }

    private updateButtons(): void {
        const buttons = this.func?.querySelectorAll<HTMLElement>('.func-button .btn-l');
        if (buttons) {
            for (const button of buttons) {
                button.classList.add('btn-narrow');
                if (button.matches('a')) {
                    button.classList.replace('btn-gray', 'btn-red');
                    button.setAttribute('type', 'submit');
                }
            }
        }
    }
}
