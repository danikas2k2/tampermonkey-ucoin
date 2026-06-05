import { safe, redirect, text } from './ajax';

function makeResponse(opts: {
    ok?: boolean;
    status?: number;
    statusText?: string;
    redirected?: boolean;
    url?: string;
    body?: string;
}): Response {
    return {
        ok: opts.ok ?? true,
        status: opts.status ?? 200,
        statusText: opts.statusText ?? 'OK',
        redirected: opts.redirected ?? false,
        url: opts.url ?? location.href,
        text: () => Promise.resolve(opts.body ?? ''),
    } as unknown as Response;
}

describe('safe', () => {
    it('return response when ok', () => {
        const response = makeResponse({ ok: true });
        expect(safe(response)).toBe(response);
    });

    it('throw when response is not ok', () => {
        const response = makeResponse({ ok: false, status: 404, statusText: 'Not Found' });
        expect(() => safe(response)).toThrow('404: Not Found');
    });

    it('throw with status code and text in message', () => {
        const response = makeResponse({ ok: false, status: 500, statusText: 'Internal Server Error' });
        expect(() => safe(response)).toThrow('500: Internal Server Error');
    });
});

describe('redirect', () => {
    beforeEach(() => {
        history.replaceState({}, '', '/');
    });

    it('return response when not redirected', () => {
        const response = makeResponse({ redirected: false });
        expect(redirect(response)).toBe(response);
    });

    it('throw when response is not ok', () => {
        const response = makeResponse({ ok: false, status: 403, statusText: 'Forbidden' });
        expect(() => redirect(response)).toThrow('403: Forbidden');
    });

    it('push state when redirected to a different URL', () => {
        const pushState = jest.spyOn(history, 'pushState');
        const response = makeResponse({
            redirected: true,
            url: 'http://localhost/new-path',
        });
        redirect(response);
        expect(pushState).toHaveBeenCalledWith({}, '', 'http://localhost/new-path');
        pushState.mockRestore();
    });

    it('not push state when redirected URL matches current location', () => {
        const pushState = jest.spyOn(history, 'pushState');
        const response = makeResponse({
            redirected: true,
            url: location.href,
        });
        redirect(response);
        expect(pushState).not.toHaveBeenCalled();
        pushState.mockRestore();
    });
});

describe('text', () => {
    it('return response body as text', async () => {
        const response = makeResponse({ body: 'hello world' });
        await expect(text(response)).resolves.toBe('hello world');
    });

    it('throw when response is not ok', async () => {
        const response = makeResponse({ ok: false, status: 404, statusText: 'Not Found' });
        expect(() => text(response)).toThrow('404: Not Found');
    });
});
