
type QueryArgEntry = [string, string];
type QueryArgs = Map<string, string>;
type ApplyArgs = string|QueryArgs;

const loc = document.location.href;

export function updateLinkHref(a: HTMLAnchorElement) {
    const before = ['page', 'view'];
    const after  = [];
    const href   = a.href;
    if (a.classList.contains('active')) {
        after.push('view');
    } else if (a.classList.contains('switcher')) {
        const view = getHrefParts(href)[1].get('view');
        after.push(view);
    }
    a.href = updateHref(href, before, after);
}

export function updateOnClickHref(div: HTMLDivElement) {
    const match = div.getAttribute('onclick').match(/location.href='([^']+)';/);
    if (match) {
        const before = ['page'];
        if (document.getElementById('status-filter')) {
            before.push('status');
        } else {
            const a = <HTMLAnchorElement>div.querySelector('a.switcher');
            if (a) {
                const view = getHrefParts(a.href)[1].get('view');
                before.push('view');
                before.push(view);
            }
        }
        div.setAttribute('onclick', `location.href='${updateHref(match[1], before)}';`);
    }
}

export function updateHref(href: string, before?: string[], after?: string[]) {
    const [locPath, locQuery] = getHrefParts(loc);

    if (before) {
        applyQuery(locQuery, before);
    }

    applyQuery(locQuery, getHrefParts(href)[1]);

    if (after) {
        applyQuery(locQuery, after);
    }

    return [locPath, [...locQuery.entries()]
        .map(([k, v]) => `${k}=${v.replace(/\+/g, '%2B')}`).join('&')]
        .join('?');
}

export function applyQuery(query: QueryArgs, apply: Map<string,string>|string[]): void {
    if (!apply) {
        return;
    }
    if (!(apply instanceof Map)) {
        // @ts-ignore
        apply = new Map(arrayOf(apply).map(arrayOf));
    }
    for (const [key, value] of apply.entries()) {
        if (!value || !value.length) {
            // @ts-ignore
            query.delete(key);
        } else {
            // @ts-ignore
            query.set(key, value);
        }
    }
}

export function arrayOf(a: string|string[]): string[] {
    return Array.isArray(a) ? a : [a];
}

export function getHrefParts(href: string): [string, QueryArgs] {
    const parts = href.split('?');
    const add = parts.join('%3F').split('&').map(q => q.split('='));
    // @ts-ignore
    return [parts.shift(), new Map(add)];
}
