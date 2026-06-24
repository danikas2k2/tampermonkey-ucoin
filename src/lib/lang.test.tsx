import { render } from '@testing-library/react';
import React from 'react';

describe('lang', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    it('return "en" by default', async () => {
        const { lang } = await import('./lang');
        expect(lang).toEqual('en');
    });

    it('return "lt" for different selected link', async () => {
        render(
            <div className="bottom-lang">
                <a href="https://en.ucoin.net/">English</a>
                <a className="active" href="https://lt.ucoin.net/">
                    Lietuvių
                </a>
                <a href="https://ru.ucoin.net/">Русский</a>
            </div>
        );

        const { lang } = await import('./lang');
        expect(lang).toEqual('lt');
    });
});

describe('translations', () => {
    it('return a default translation', async () => {
        vi.resetModules();
        const { _ } = await import('./lang');
        expect(_('Total')).toEqual('Total');
    });

    it('return a translation for specified language', async () => {
        vi.resetModules();
        const { _ } = await import('./lang');
        expect(_('Total', 'lt')).toEqual('Viso');
    });

    it('return a translation from custom messages', async () => {
        vi.resetModules();
        const { _ } = await import('./lang');
        expect(_('Total', { Total: { en: 'Complete' } })).toEqual('Complete');
    });

    it('return a translation for specified language from custom messages', async () => {
        vi.resetModules();
        const { _ } = await import('./lang');
        expect(_('Total', { Total: { de: 'Gesamt' } }, 'de')).toEqual('Gesamt');
    });

    it('return a translation for specified language from custom messages with different argument order', async () => {
        vi.resetModules();
        const { _ } = await import('./lang');
        expect(_('Total', 'de', { Total: { de: 'Gesamt' } })).toEqual('Gesamt');
    });
});
