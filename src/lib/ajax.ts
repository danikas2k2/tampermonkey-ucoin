type RequestMethod = "GET" | "POST";

export function ajax(url: RequestInfo, method: RequestMethod = "GET", body?: BodyInit) {
    return fetch(url, {method, body});
}

export function get(url: RequestInfo, body?: BodyInit) {
    return ajax(url, "GET", body);
}

export function post(url: RequestInfo, body?: BodyInit) {
    return ajax(url, "POST", body);
}
