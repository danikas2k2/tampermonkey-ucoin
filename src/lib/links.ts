const loc = document.location.href;

export function updateLinkHref(a: HTMLAnchorElement): void {
    const oldUrl = new URL(a.href, loc);
    const oldParams = oldUrl.searchParams;

    const newUrl = new URL(loc);
    newUrl.pathname = oldUrl.pathname;

    const newParams = newUrl.searchParams;
    newParams.delete('page');
    newParams.delete('view');

    for (const [k, v] of oldParams.entries()) {
        newParams.set(k, k === 'tag' && a.href.match(/&tag=\+/) ? '+' : v);
    }

    if (a.classList.contains('active')) {
        newParams.delete('view');
    } else if (a.classList.contains('switcher')) {
        const view = oldParams.get('view');
        view && newParams.delete(view);
    }

    a.href = newUrl.href;
}

export function updateOnClickHref(div: HTMLDivElement, remove?: string[]): void {
    const match = div.getAttribute('onclick')?.match(/location.href='([^']+)';/);
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
            const a = div.querySelector<HTMLAnchorElement>('a.switcher');
            if (a) {
                newParams.delete('view');
                const view = new URL(a.href, loc).searchParams.get('view');
                view && newParams.delete(view);
            }
        }

        if (remove && remove.length) {
            for (const name of remove) {
                newParams.delete(name);
            }
        }

        div.setAttribute('onclick', `location.href='${newUrl.href}';`);
    }
}
