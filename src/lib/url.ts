export const loc = (): URL => new URL(location.href);

type ParamsProcessor = (params: URLSearchParams) => URLSearchParams | void;
type AsyncParamsProcessor = (params: URLSearchParams) => Promise<URLSearchParams | void>;
type HashValue = string | URLSearchParams;
type HashType = HashValue | ParamsProcessor | AsyncParamsProcessor;
type UrlType = URL | string;

export function setHash(hash: HashValue): void {
    const newHash = hash.toString();
    if (location.hash || newHash) {
        history.replaceState({}, '', new URL(`#${newHash}`, location.href));
        // location.hash = `#${newHash}`;
    }
}

export const getUrl = (href: UrlType): URL =>
    typeof href === 'string' ? new URL(href, location.href) : href;

export const hashSearchParams = (url: UrlType = loc()): URLSearchParams =>
    new URLSearchParams(getUrl(url).hash.slice(1));

async function getUpdatedHash(hash: HashType, url: UrlType = loc()): Promise<string> {
    if (typeof hash !== 'function') {
        return hash.toString();
    }
    const params = hashSearchParams(url);
    const result = await hash(params);
    return (result != null ? (result as URLSearchParams) : params).toString();
}

export async function updateLocationHash(hash: HashType, url: UrlType = loc()): Promise<void> {
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

export const deleteHashParam = async (name: string): Promise<string> =>
    updateHashHref((params) => {
        params.delete(name);
        return params;
    });

export const setHashParam = async (name: string, value: string): Promise<string> =>
    updateHashHref((params) => {
        params.set(name, value);
        return params;
    });

export const hasHashParam = (name: string): boolean => hashSearchParams().has(name);

export const getHashParam = (name: string): string | null => hashSearchParams().get(name);

export const getAllHashParams = (name: string): string[] => hashSearchParams().getAll(name);
