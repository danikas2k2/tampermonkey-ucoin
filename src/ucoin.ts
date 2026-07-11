import '../styles/ucoin.less';
import { handleCountryRegions } from './lib/regions';
import { UID } from './lib/uid';
import { loc } from './lib/url';
import { handleLanguages, handleTree } from './pages/all';
import { handleCoinPage } from './pages/coin';
import { handleGalleryPage } from './pages/gallery';
import { handleHomePage } from './pages/home';
import { handleMessagePage } from './pages/message';
import { handleSwapPage } from './pages/swap';
import { handleTablePage } from './pages/table';
import { handleWishPage } from './pages/wish';

(async function () {
    const actions: Promise<void>[] = [];

    const { pathname: path, searchParams: params } = loc();

    if (path.includes(`/uid${UID}`)) {
        actions.push(handleHomePage());
    }

    if (path.includes('/coin')) {
        actions.push(handleCoinPage());
    }

    if (path.includes('/gallery') && params.get('uid') === UID) {
        actions.push(handleGalleryPage());
        if (params.get('view') === 'country') {
            actions.push(handleCountryRegions());
        }
    }

    if (path.includes('/swap-')) {
        actions.push(handleSwapPage());
    }

    if (path.includes('/wish-')) {
        actions.push(handleWishPage());
    }

    if (path.includes('/table/')) {
        actions.push(handleTablePage());
    }

    if (path.includes('/messages/')) {
        actions.push(handleMessagePage());
    }

    actions.push(handleTree());
    actions.push(handleLanguages());

    await Promise.all(actions);
})();
