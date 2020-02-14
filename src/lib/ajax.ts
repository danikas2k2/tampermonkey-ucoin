type RequestMethod = 'GET' | 'POST';

export async function get(url: RequestInfo, body?: BodyInit): Promise<Response> {
    return await fetch(url, {method: 'GET', body});
}

export async function post(url: RequestInfo, body?: BodyInit): Promise<Response> {
    return await fetch(url, {method: 'POST', body});
}

async function responseOrError(url: RequestInfo, method: RequestMethod = 'GET', body?: BodyInit): Promise<Response> {
    const response = await fetch(url, {method, body});
    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
    if (response.redirected && location.href !== response.url) {
        history.pushState({}, null, response.url);
    }
    return response;
}

export async function getJson<T = any>(url: RequestInfo, body?: BodyInit): Promise<T> {
    return await (await responseOrError(url, 'GET', body)).json();
}

export async function postJson<T = any>(url: RequestInfo, body?: BodyInit): Promise<T> {
    return await (await responseOrError(url, 'POST', body)).json();
}

export async function getText(url: RequestInfo, body?: BodyInit): Promise<string> {
    return await (await responseOrError(url, 'GET', body)).text();
}

export async function postText(url: RequestInfo, body?: BodyInit): Promise<string> {
    return await (await responseOrError(url, 'POST', body)).text();
}

export function documentFragment(src: string): DocumentFragment {
    const temp = document.createElement('template');
    temp.innerHTML = src;
    return temp.content;
}

export async function getFragment(url: RequestInfo, body?: BodyInit): Promise<DocumentFragment> {
    return documentFragment(await getText(url, body));
}

export async function postFragment(url: RequestInfo, body?: BodyInit): Promise<DocumentFragment> {
    return documentFragment(await postText(url, body));
}
