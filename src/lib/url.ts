const { location } = document;

export function loc(): URL {
    return new URL(location.href);
}

type ParamsProcessor = (params: URLSearchParams) => URLSearchParams | void;
type AsyncParamsProcessor = (params: URLSearchParams) => Promise<URLSearchParams | void>;
type HashValue = string | URLSearchParams;
type HashType = HashValue | ParamsProcessor | AsyncParamsProcessor;
type UrlType = URL | string;

export function setHash(hash: HashValue) {
    const newHash = hash.toString();
    if (location.hash || newHash) {
        history.replaceState({}, '', new URL(`#${newHash}`, location.href));
        // location.hash = `#${newHash}`;
    }
}

export function getUrl(href: UrlType): URL {
    return typeof href === 'string' ? new URL(href) : href;
}

export function hashSearchParams(url: UrlType = loc()): URLSearchParams {
    return new URLSearchParams(getUrl(url).hash.substr(1));
}

async function getUpdatedHash(hash: HashType, url: UrlType = loc()) {
    if (typeof hash !== 'function') {
        return hash.toString();
    }
    const params = hashSearchParams(url);
    const result = await hash(params);
    return (result != null ? (result as URLSearchParams) : params).toString();
}

export async function updateLocationHash(hash: HashType, url: UrlType = loc()) {
    const newHash = await getUpdatedHash(hash, url);
    if (location.hash || newHash) {
        history.replaceState({}, '', new URL(`#${newHash}`, url));
    }
}

export async function updateHashHref(hash: HashType, href: UrlType = loc()): Promise<string> {
    const url = getUrl(href);
    const newHash = await getUpdatedHash(hash, url);
    if (url.hash || newHash) {
        url.hash = `#${newHash}`;
    }
    return url.href;
}

export async function deleteHashParam(name: string): Promise<string> {
    return await updateHashHref((params) => {
        params.delete(name);
        return params;
    });
}

export function setHashParam(name: string, value: string) {
    return updateHashHref((params) => {
        params.set(name, value);
        return params;
    });
}

export function hasHashParam(name: string) {
    return hashSearchParams().has(name);
}

export function getHashParam(name: string) {
    return hashSearchParams().get(name);
}

export function getAllHashParams(name: string) {
    return hashSearchParams().getAll(name);
}
