// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import style from '../styles/ucoin.less';
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

document.head.insertAdjacentHTML('beforeend', `<style>${style}</style>`);

(function () {
    const { pathname: path, searchParams: params } = loc();

    if (path.includes(`/uid${UID}`)) {
        void handleHomePage();
    }

    if (path.includes('/coin')) {
        void handleCoinPage();
    }

    if (path.includes('/gallery') && params.get('uid') === UID) {
        void handleGalleryPage();
        if (params.get('view') === 'country') {
            void handleCountryRegions();
        }
    }

    if (path.includes('/swap-')) {
        void handleSwapPage();
    }

    if (path.includes('/wish-')) {
        void handleWishPage();
    }

    if (path.includes('/table/')) {
        void handleTablePage();
    }

    if (path.includes('/messages/')) {
        void handleMessagePage();
    }

    void handleTree();
    void handleLanguages();
})();
