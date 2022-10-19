import {
    deleteHashParam,
    getAllHashParams,
    getHashParam,
    getUrl,
    hasHashParam,
    hashSearchParams,
    loc,
    setHash,
    setHashParam,
    updateHashHref,
    updateLocationHash,
} from './url';

describe('loc', () => {
    it('return URL object for current location', () => {
        expect(loc())
            .toEqual(expect.any(URL))
            .toEqual(
                expect.objectContaining({
                    protocol: 'http:',
                    host: 'localhost',
                    pathname: '/',
                    searchParams: expect.any(URLSearchParams),
                })
            );
    });
});

describe('getUrl', () => {
    it('get URL object from string', () => {
        expect(getUrl('/foo?bar=baz'))
            .toEqual(expect.any(URL))
            .toEqual(expect.objectContaining({ href: 'http://localhost/foo?bar=baz' }));
    });

    it('get URL object from URL', () => {
        expect(getUrl(new URL('/foo?bar=baz', location.href)))
            .toEqual(expect.any(URL))
            .toEqual(expect.objectContaining({ href: 'http://localhost/foo?bar=baz' }));
    });
});

describe('setHash', () => {
    it('set hash from string', () => {
        setHash('foo');
        expect(location.hash).toEqual('#foo');
    });

    it('set hash from search params object', () => {
        setHash(new URLSearchParams({ foo: 'bar', baz: 'qux' }));
        expect(location.hash).toEqual('#foo=bar&baz=qux');
    });

    it('reset hash', () => {
        location.hash = '#foo';
        setHash('');
        expect(location.hash).toEqual('');
    });
});

describe('hashSearchParams', () => {
    it('get hash search params from default location', () => {
        const params = hashSearchParams();
        expect(params).toEqual(expect.any(URLSearchParams));
        expect([...params.keys()]).toEqual([]);
    });

    it('get URL object from URL', () => {
        const params = hashSearchParams(getUrl('/foo?bar=baz'));
        expect(params).toEqual(expect.any(URLSearchParams));
        expect([...params.keys()]).toEqual([]);
    });

    it('get params from URL hash', () => {
        const params = hashSearchParams(getUrl('/foo#bar=baz&qux=quux'));
        expect(params).toEqual(expect.any(URLSearchParams));
        expect([...params.keys()]).toEqual(['bar', 'qux']);
        expect(params.get('bar')).toEqual('baz');
        expect(params.get('qux')).toEqual('quux');
    });
});

describe('updateHashHref', () => {
    it('update location hash by string', async () => {
        expect(await updateHashHref('foo=bar&baz=qux')).toEqual(
            'http://localhost/#foo=bar&baz=qux'
        );
    });

    it('update location hash by search params', async () => {
        expect(await updateHashHref(new URLSearchParams({ foo: 'bar', baz: 'qux' }))).toEqual(
            'http://localhost/#foo=bar&baz=qux'
        );
    });

    it('update location hash by processor returning params', async () => {
        expect(await updateHashHref(() => new URLSearchParams({ foo: 'bar', baz: 'qux' }))).toEqual(
            'http://localhost/#foo=bar&baz=qux'
        );
    });

    it('update location hash by processor updating params', async () => {
        expect(
            await updateHashHref((params: URLSearchParams) => {
                params.set('foo', 'bar');
                params.set('baz', 'qux');
            })
        ).toEqual('http://localhost/#foo=bar&baz=qux');
    });

    it('update location hash by async processor returning params', async () => {
        expect(
            await updateHashHref(async () => new URLSearchParams({ foo: 'bar', baz: 'qux' }))
        ).toEqual('http://localhost/#foo=bar&baz=qux');
    });

    it('update location hash by async processor updating params', async () => {
        expect(
            await updateHashHref(async (params: URLSearchParams) => {
                params.set('foo', 'bar');
                params.set('baz', 'qux');
            })
        ).toEqual('http://localhost/#foo=bar&baz=qux');
    });

    it('update location hash from custom url by string', async () => {
        expect(await updateHashHref('foo=bar&baz=qux', getUrl('/que#bar=baz'))).toEqual(
            'http://localhost/que#foo=bar&baz=qux'
        );
    });

    it('update location hash from custom url by search params', async () => {
        expect(
            await updateHashHref(
                new URLSearchParams({ foo: 'bar', baz: 'qux' }),
                getUrl('/que#bar=baz')
            )
        ).toEqual('http://localhost/que#foo=bar&baz=qux');
    });

    it('update location hash from custom url by processor returning params', async () => {
        expect(
            await updateHashHref(
                () => new URLSearchParams({ foo: 'bar', baz: 'qux' }),
                getUrl('/que#bar=baz')
            )
        ).toEqual('http://localhost/que#foo=bar&baz=qux');
    });

    it('update location hash from custom url by processor updating params', async () => {
        expect(
            await updateHashHref((params: URLSearchParams) => {
                params.set('foo', 'bar');
                params.set('baz', 'qux');
            }, getUrl('/que#bar=baz'))
        ).toEqual('http://localhost/que#bar=baz&foo=bar&baz=qux');
    });

    it('update location hash from custom url by async processor returning params', async () => {
        expect(
            await updateHashHref(
                async () => new URLSearchParams({ foo: 'bar', baz: 'qux' }),
                getUrl('/que#bar=baz')
            )
        ).toEqual('http://localhost/que#foo=bar&baz=qux');
    });

    it('update location hash from custom url by async processor updating params', async () => {
        expect(
            await updateHashHref(async (params: URLSearchParams) => {
                params.set('foo', 'bar');
                params.set('baz', 'qux');
            }, getUrl('/que#bar=baz'))
        ).toEqual('http://localhost/que#bar=baz&foo=bar&baz=qux');
    });
});

describe('setHashParam', () => {
    beforeEach(() => {
        location.hash = '#foo=bar&baz=qux';
    });

    it('change param by name to location hash', async () => {
        expect(await setHashParam('foo', 'baz')).toEqual('http://localhost/#foo=baz&baz=qux');
    });

    it('add param by name to location hash', async () => {
        expect(await setHashParam('bar', 'baz')).toEqual(
            'http://localhost/#foo=bar&baz=qux&bar=baz'
        );
    });
});

describe('deleteHashParam', () => {
    beforeEach(() => {
        location.hash = '#foo=bar&baz=qux';
    });

    it('remove param by name from location hash', async () => {
        expect(await deleteHashParam('foo')).toEqual('http://localhost/#baz=qux');
    });

    it('leave location hash unchanged if param is missing', async () => {
        expect(await deleteHashParam('bar')).toEqual('http://localhost/#foo=bar&baz=qux');
    });
});

describe('hasHashParam', () => {
    beforeEach(() => {
        location.hash = '#foo=bar&baz=qux';
    });

    it('return true if param exist on location hash', () => {
        expect(hasHashParam('foo')).toBeTrue();
    });

    it('return false if param does not exist location hash', () => {
        expect(hasHashParam('bar')).toBeFalse();
    });
});

describe('getHashParam', () => {
    beforeEach(() => {
        location.hash = '#foo=bar&baz=qux';
    });

    it('return value if param exist on location hash', () => {
        expect(getHashParam('foo')).toEqual('bar');
    });

    it('return null if param does not exist location hash', () => {
        expect(getHashParam('bar')).toBeNull();
    });
});

describe('getAllHashParams', () => {
    beforeEach(() => {
        location.hash = '#foo=bar&baz=qux';
    });

    it('return all values by param name exist on location hash', () => {
        expect(getAllHashParams('foo')).toEqual(['bar']);
    });

    it('return empty array if param does not exist location hash', () => {
        expect(getAllHashParams('bar')).toEqual([]);
    });
});

describe('updateLocationHash', () => {
    beforeEach(() => {
        location.hash = '';
    });

    it('update location hash by string', async () => {
        await updateLocationHash('foo=bar&baz=qux');
        expect(location.hash).toEqual('#foo=bar&baz=qux');
    });

    it('update location hash by search params', async () => {
        await updateLocationHash(new URLSearchParams({ foo: 'bar', baz: 'qux' }));
        expect(location.hash).toEqual('#foo=bar&baz=qux');
    });

    it('update location hash by processor returning params', async () => {
        await updateLocationHash(() => new URLSearchParams({ foo: 'bar', baz: 'qux' }));
        expect(location.hash).toEqual('#foo=bar&baz=qux');
    });

    it('update location hash by processor updating params', async () => {
        await updateLocationHash((params: URLSearchParams) => {
            params.set('foo', 'bar');
            params.set('baz', 'qux');
        });
        expect(location.hash).toEqual('#foo=bar&baz=qux');
    });

    it('update location hash by async processor returning params', async () => {
        await updateLocationHash(async () => new URLSearchParams({ foo: 'bar', baz: 'qux' }));
        expect(location.hash).toEqual('#foo=bar&baz=qux');
    });

    it('update location hash by async processor updating params', async () => {
        await updateLocationHash(async (params: URLSearchParams) => {
            params.set('foo', 'bar');
            params.set('baz', 'qux');
        });
        expect(location.hash).toEqual('#foo=bar&baz=qux');
    });

    it('update location hash from custom url by string', async () => {
        await updateLocationHash('foo=bar&baz=qux', getUrl('#bar=baz'));
        expect(location.hash).toEqual('#foo=bar&baz=qux');
    });

    it('update location hash from custom url by search params', async () => {
        await updateLocationHash(
            new URLSearchParams({ foo: 'bar', baz: 'qux' }),
            getUrl('#bar=baz')
        );
        expect(location.hash).toEqual('#foo=bar&baz=qux');
    });

    it('update location hash from custom url by processor returning params', async () => {
        await updateLocationHash(
            () => new URLSearchParams({ foo: 'bar', baz: 'qux' }),
            getUrl('#bar=baz')
        );
        expect(location.hash).toEqual('#foo=bar&baz=qux');
    });

    it('update location hash from custom url by processor updating params', async () => {
        await updateLocationHash((params: URLSearchParams) => {
            params.set('foo', 'bar');
            params.set('baz', 'qux');
        }, getUrl('#bar=baz'));
        expect(location.hash).toEqual('#bar=baz&foo=bar&baz=qux');
    });

    it('update location hash from custom url by async processor returning params', async () => {
        await updateLocationHash(
            async () => new URLSearchParams({ foo: 'bar', baz: 'qux' }),
            getUrl('#bar=baz')
        );
        expect(location.hash).toEqual('#foo=bar&baz=qux');
    });

    it('update location hash from custom url by async processor updating params', async () => {
        await updateLocationHash(async (params: URLSearchParams) => {
            params.set('foo', 'bar');
            params.set('baz', 'qux');
        }, getUrl('#bar=baz'));
        expect(location.hash).toEqual('#bar=baz&foo=bar&baz=qux');
    });
});
