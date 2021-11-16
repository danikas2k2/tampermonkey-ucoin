// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import style from '../styles/ucoin.less';
import { handleCountryRegions } from './lib/regions';
import { UID } from './lib/uid';
import { handleCoinPage } from './pages/coin';
import { handleGalleryPage } from './pages/gallery';
import { handleHomePage } from './pages/home';
import { handleMessagePage } from './pages/message';
import { handleSwapPage } from './pages/swap';
import { handleTablePage } from './pages/table';
import { handleLanguages, handleTree } from './pages/all';
import { handleWishPage } from './pages/wish';

document.head.insertAdjacentHTML('beforeend', `<style>${style}</style>`);

(async function () {
    const loc = document.location.href;

    if (loc.includes(`/uid${UID}`)) {
        await handleHomePage();
    }

    if (loc.includes('/coin')) {
        await handleCoinPage();
    }

    if (loc.includes('/gallery') && loc.includes(`uid=${UID}`)) {
        await handleGalleryPage();
        if (loc.includes('view=country')) {
            await handleCountryRegions();
        }
    }

    if (loc.includes('/swap-')) {
        await handleSwapPage();
    }

    if (loc.includes('/wish-')) {
        await handleWishPage();
    }

    if (loc.includes('/table/')) {
        await handleTablePage();
    }

    if (loc.includes('/messages/')) {
        await handleMessagePage();
    }

    await handleTree();
    await handleLanguages();
})();
