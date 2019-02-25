type RequestMethod = "GET" | "POST";

export async function ajax(url: RequestInfo, method: RequestMethod = "GET", body?: BodyInit) {
    return await fetch(url, {method, body});
}

export async function get(url: RequestInfo, body?: BodyInit) {
    return await ajax(url, "GET", body);
}

export async function post(url: RequestInfo, body?: BodyInit) {
    return await ajax(url, "POST", body);
}
