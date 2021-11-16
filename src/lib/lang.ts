export const lang: string = (() => {
    const a = document.querySelector<HTMLAnchorElement>('.bottom-lang a.active');
    if (a) {
        const m = a.href.match(/:\/\/(\w+)\./);
        if (m) {
            return m[1];
        }
    }
    return 'en';
})();
