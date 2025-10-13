import { formatNumber, parsePrice } from '../lib/prices';
import { UID } from '../lib/uid';

export async function handleHomePage(): Promise<void> {
    const profile = document.getElementById('profile');
    if (!profile) {
        console.error('Profile element not found');
        return;
    }

    const curPriceElement = profile.querySelector<HTMLDivElement>('div.worth-cur-value span');
    if (!curPriceElement) {
        console.error('Current price element not found');
        return;
    }

    const colPrice = parsePrice(curPriceElement.textContent) ?? 0;
    const swapPriceElement = profile.querySelector(`a[href="/swap-list/?uid=${UID}"] span.right`);
    if (!swapPriceElement) {
        console.error('Swap price element not found');
        return;
    }

    const swapPrice = parsePrice(swapPriceElement.textContent) ?? 0;
    const price = formatNumber(colPrice + swapPrice);
    curPriceElement.classList.add('price');
    curPriceElement.insertAdjacentHTML(
        'beforeend',
        `<br/><small class="total"><abbr class="cur">€</abbr> ${price}</small>`
    );
}
