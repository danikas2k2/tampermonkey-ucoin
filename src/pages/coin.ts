import { CoinForm } from '../lib/coin-form';
import { updateLinkHref } from '../lib/links';
import { estimateSwapPrices, estimateWeightPrice } from '../lib/prices';
import { SwapForm } from '../lib/swap-form';
import { WishForm } from '../lib/wish-form';
import { syncCoinWish } from '../lib/wish-list';

export async function handleCoinPage(): Promise<void> {
    const tags = document.getElementById('tags');
    if (tags) {
        // fixTagLinks
        const links = tags.querySelectorAll<HTMLAnchorElement>('a[href^="/gallery/"]');
        for (const a of links) {
            updateLinkHref(a);
        }
    }

    await new CoinForm().handle();
    await new SwapForm().handle();
    await estimateSwapPrices();
    await estimateWeightPrice();
    await new WishForm().handle();

    await syncCoinWish();
}
