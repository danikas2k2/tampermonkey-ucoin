import { render } from '@testing-library/react';
import React from 'react';

describe('lang', () => {
    it('return "en" by default', async () => {
        jest.isolateModules(() => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            expect(require('./lang').lang).toEqual('en');
        });
    });

    it('return "lt" for different selected link', async () => {
        jest.isolateModules(() => {
            render(
                <div className="bottom-lang">
                    <a href="https://en.ucoin.net/">English</a>
                    <a className="active" href="https://lt.ucoin.net/">
                        Lietuvių
                    </a>
                    <a href="https://ru.ucoin.net/">Русский</a>
                </div>
            );
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            expect(require('./lang').lang).toEqual('lt');
        });
    });
});

describe('messages', () => {
    it('return a default bunch of translated messages', async () => {
        jest.isolateModules(() => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            expect(require('./lang').messages).toEqual(
                expect.objectContaining({
                    Shipping: expect.objectContaining({ lt: 'Siuntimas', ru: 'Почта' }),
                    Total: expect.objectContaining({ lt: 'Viso', ru: 'Всего' }),
                })
            );
        });
    });
});

describe('translations', () => {
    jest.isolateModules(() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { _ } = require('./lang');

        it('return a default translation', async () => {
            expect(_('Total')).toEqual('Total');
        });

        it('return a translation for specified language', async () => {
            expect(_('Total', 'lt')).toEqual('Viso');
        });

        it('return a translation for specified language from custom messages', async () => {
            expect(_('Total', 'de', { Total: { de: 'Gesamt' } })).toEqual('Gesamt');
        });
    });
});
