import { updateCoinForm } from '../lib/coin-form';
import { updateLinkHref } from '../lib/links';
import { estimateWeightPrice } from '../lib/prices';
import { SwapForm } from '../lib/swap-form';
import { WishForm } from '../lib/wish-form';
// import { syncCoinWish } from '../lib/wish-list';

export async function handleCoinPage(): Promise<void> {
    const tags = document.getElementById('tags');
    if (tags) {
        // fixTagLinks
        const links = tags.querySelectorAll<HTMLAnchorElement>('a[href^="/gallery/"]');
        for (const a of links) {
            updateLinkHref(a);
        }
    }

    // hide coin chooser dialog by default
    const chooser = document.getElementById('coin-chooser-dialog');
    if (chooser && !chooser.style.display) {
        chooser.style.display = 'none';
    }

    await updateAddButtonBlock();

    await updateCoinForm();

    await new SwapForm().handle();

    // await estimateSwapPrices();
    await estimateWeightPrice();

    await new WishForm().handle();

    // await syncCoinWish();
}

const ADD_BUTTON_BLOCK = 'add-button-block';

async function updateAddButtonBlock(): Promise<void> {
    const addButtonBlock = document.getElementById(ADD_BUTTON_BLOCK);
    if (addButtonBlock) {
        const addButton = addButtonBlock.querySelector<HTMLAnchorElement>('a');
        if (addButton) {
            addButton.href = '#';
            addButton.addEventListener('click', (e) => {
                e.preventDefault();
                const chooser = document.getElementById('coin-chooser-dialog');
                if (chooser) {
                    chooser.style.display = 'block';
                }
            });
        }
    }
}
