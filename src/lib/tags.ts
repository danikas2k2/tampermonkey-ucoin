import { safe } from './ajax';

// wait for first time
let timeout = 1000;

export function updateTags(): void {
    setTimeout(() => {
        const tag = document.querySelector('#tag');
        const tagsContent = document.querySelector('#tags .textboxlist');
        if (tag && !tagsContent) {
            const myCss = GM_getResourceText('TextboxListStyle');
            GM_addStyle(myCss);
            (async () => {
                const t = new $.TextboxList('#tag', {
                    unique: true,
                    bitsOptions: { editable: { addKeys: 188 } },
                    plugins: { autocomplete: { placeholder: 'Type to receive suggestions' } },
                });
                t.getContainer().addClass('textboxlist-loading');
                try {
                    const r = await fetch('/coin/?action=autocompletetag', {
                        method: 'POST',
                        body: new URLSearchParams({ action: 'autocompletetag' }),
                    }).then(safe);
                    t.plugins.autocomplete.setValues(await r.json());
                    t.getContainer().removeClass('textboxlist-loading');
                } finally {
                }
            })();
        }
        // don't wait for subsequent times
        timeout = 0;
    }, timeout);
}
