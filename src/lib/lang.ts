import labels from '../data/labels.json';

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

export type Translations = Record<string, Record<string, string>>;

export function _(message: string, language?: string, messages?: Translations): string;
export function _(message: string, messages?: Translations, language?: string): string;
export function _(
    message: string,
    messages?: Translations | string,
    language?: string | Translations
): string {
    if (typeof messages === 'string') {
        [messages, language] = [language, messages];
    }
    return (
        ((messages as Translations) ?? labels)?.[message]?.[(language as string) ?? lang] || message
    );
}
