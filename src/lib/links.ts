const loc = document.location.href;

export function updateLinkHref(a: HTMLAnchorElement) {
    const oldUrl = new URL(a.href, loc);
    const oldParams = oldUrl.searchParams;

    const newUrl = new URL(loc);
    newUrl.pathname = oldUrl.pathname;

    const newParams = newUrl.searchParams;
    newParams.delete('page');
    newParams.delete('view');

    for (const [k, v] of oldParams.entries()) {
        newParams.set(k, v);
    }

    if (a.classList.contains('active')) {
        newParams.delete('view');
    } else if (a.classList.contains('switcher')) {
        newParams.delete(oldParams.get('view'));
    }

    a.href = newUrl.href;
}

export function updateOnClickHref(div: HTMLDivElement) {
    const match = div.getAttribute('onclick').match(/location.href='([^']+)';/);
    if (match) {
        const oldUrl = new URL(match[1], loc);
        const oldParams = oldUrl.searchParams;

        const newUrl = new URL(loc);
        newUrl.pathname = oldUrl.pathname;

        const newParams = newUrl.searchParams;
        newParams.delete('page');

        for (const [k, v] of oldParams.entries()) {
            newParams.set(k, v);
        }

        if (document.getElementById('status-filter')) {
            newParams.delete('status');
        } else {
            const a = <HTMLAnchorElement> div.querySelector('a.switcher');
            if (a) {
                newParams.delete('view');
                newParams.delete(new URL(a.href, loc).searchParams.get('view'));
            }
        }
        div.setAttribute('onclick', `location.href='${newUrl.href}';`);
    }
}
