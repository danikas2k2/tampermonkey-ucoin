type RequestMethod = 'GET' | 'POST';

export async function ajax(url: RequestInfo, method: RequestMethod = 'GET', body?: BodyInit) {
    return await fetch(url, {method, body});
}

export async function get(url: RequestInfo, body?: BodyInit) {
    return await ajax(url, 'GET', body);
}

export async function post(url: RequestInfo, body?: BodyInit) {
    return await ajax(url, 'POST', body);
}

async function responseOrError(url: RequestInfo, method: RequestMethod = 'GET', body?: BodyInit): Promise<Response> {
    const response = await ajax(url, method, body);
    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
    if (response.redirected && location.href !== response.url) {
        history.pushState({}, null, response.url);
    }
    return response;
}

export async function getJson(url: RequestInfo, body?: BodyInit) {
    return await (await responseOrError(url, 'GET', body)).json();
}

export async function postJson(url: RequestInfo, body?: BodyInit) {
    return await (await responseOrError(url, 'POST', body)).json();
}

export async function getText(url: RequestInfo, body?: BodyInit) {
    return await (await responseOrError(url, 'GET', body)).text();
}

export async function postText(url: RequestInfo, body?: BodyInit) {
    return await (await responseOrError(url, 'POST', body)).text();
}

export function documentFragment(src: string) {
    const temp = document.createElement('template');
    temp.innerHTML = src;
    return temp.content;
}

export async function getFragment(url: RequestInfo, body?: BodyInit) {
    return documentFragment(await getText(url, body));
}

export async function postFragment(url: RequestInfo, body?: BodyInit) {
    return documentFragment(await postText(url, body));
}
