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

export function _(message: string, language: string = lang, translations: Translations = messages): string {
    return translations?.[message]?.[language] || message;
}

export type Translations = Record<string, Record<string, string>>;

export const messages: Translations = {
    Shipping: { lt: 'Siuntimas', ru: 'Почта' },
    shipping: { lt: 'siuntimas', ru: 'почта' },
    Total: { lt: 'Viso', ru: 'Всего' },
    'PayPal charges': { lt: 'PayPal mokesčiai', ru: 'PayPal сборы' },
};
