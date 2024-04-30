import { UID } from '../lib/uid';

export async function handleHomePage(): Promise<void> {
    const profile = document.getElementById('profile');
    if (!profile) {
        return;
    }

    const curPriceElement = profile.querySelector<HTMLDivElement>('div.worth-cur-value span');
    if (!curPriceElement) {
        return;
    }

    const colPrice = +(curPriceElement.textContent?.replace(/[^\d.]/g, '') ?? 0);
    const swapPriceElement = profile.querySelector(`a[href="/swap-list/?uid=${UID}"] span.right`);
    if (!swapPriceElement) {
        return;
    }

    const swapPrice = +(swapPriceElement.textContent?.replace(/[^\d.]/g, '') ?? 0);
    const price = new Intl.NumberFormat('en').format(colPrice + swapPrice);
    curPriceElement.classList.add('price');
    curPriceElement.insertAdjacentHTML(
        'beforeend',
        `<br/><small class="total"><abbr class="cur">€</abbr> ${price}</small>`
    );
}
