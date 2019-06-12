export const UID: string = (() => {
    const a = document.querySelector<HTMLAnchorElement>('.header .partition .menu-l a[href^="/uid"');
    if (a) {
        const m = a.href.match(/\/uid(\d+)/);
        if (m) {
            return m[1];
        }
    }
    return null;
})();
