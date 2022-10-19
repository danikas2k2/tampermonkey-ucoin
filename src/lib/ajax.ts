import { documentFragment } from './utils';

type RequestMethod = 'GET' | 'POST';

export async function get(url: RequestInfo, body: BodyInit | null = null): Promise<Response> {
    return await fetch(url, { method: 'GET', body });
}

export async function post(url: RequestInfo, body: BodyInit | null = null): Promise<Response> {
    return await fetch(url, { method: 'POST', body });
}

async function responseOrError(
    url: RequestInfo,
    method: RequestMethod = 'GET',
    body: BodyInit | null = null,
    autoRedirect = true
): Promise<Response> {
    const response = await fetch(url, { method, body });
    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
    if (autoRedirect && response.redirected && location.href !== response.url) {
        history.pushState({}, '', response.url);
    }
    return response;
}

export async function getJson<T = unknown>(
    url: RequestInfo,
    body: BodyInit | null = null,
    autoRedirect = true
): Promise<T> {
    return await (await responseOrError(url, 'GET', body, autoRedirect)).json();
}

export async function postJson<T = unknown>(
    url: RequestInfo,
    body: BodyInit | null = null,
    autoRedirect = true
): Promise<T> {
    return await (await responseOrError(url, 'POST', body, autoRedirect)).json();
}

export async function getText(
    url: RequestInfo,
    body: BodyInit | null = null,
    autoRedirect = true
): Promise<string> {
    return await (await responseOrError(url, 'GET', body, autoRedirect)).text();
}

export async function postText(
    url: RequestInfo,
    body: BodyInit | null = null,
    autoRedirect = true
): Promise<string> {
    return await (await responseOrError(url, 'POST', body, autoRedirect)).text();
}

export async function getFragment(
    url: RequestInfo,
    body: BodyInit | null = null,
    autoRedirect = true
): Promise<DocumentFragment> {
    return documentFragment(await getText(url, body, autoRedirect));
}

export async function postFragment(
    url: RequestInfo,
    body: BodyInit | null = null,
    autoRedirect = true
): Promise<DocumentFragment> {
    return documentFragment(await postText(url, body, autoRedirect));
}
