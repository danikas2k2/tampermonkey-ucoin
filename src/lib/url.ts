const { location } = document;

export function loc(): URL {
    return new URL(location.href);
}

type ParamsProcessor = (params: URLSearchParams) => URLSearchParams | void;
type HashValue = string | URLSearchParams;
type HashType = HashValue | ParamsProcessor;

export function setHash(hash: HashValue) {
    const newHash = hash.toString();
    if (location.hash || newHash) {
        location.hash = `#${newHash}`;
    }
}

export function hashSearchParams(url = loc()): URLSearchParams {
    return new URLSearchParams(url.hash.substr(1));
}

function getUpdatedHash(hash: HashType, url = loc()): string {
    if (typeof hash !== 'function') {
        return hash.toString();
    }
    const params = hashSearchParams(url);
    const result = hash(params);
    return (result != null ? (result as URLSearchParams) : params).toString();
}

export function updateLocationHash(hash: HashType, url = loc()) {
    const newHash = getUpdatedHash(hash, url);
    if (location.hash || newHash) {
        location.hash = `#${newHash}`;
    }
}

export function updateHashHref(hash: HashType, url = loc()): string {
    const newHash = getUpdatedHash(hash, url);
    if (url.hash || newHash) {
        url.hash = `#${newHash}`;
    }
    return url.href;
}

export function deleteHashParam(name: string): string {
    return updateHashHref((params) => {
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
