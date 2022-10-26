import { postJson } from './ajax';

// wait for first time
let timeout = 1000;

export async function updateTags(): Promise<void> {
    setTimeout(() => {
        const tag = document.querySelector('#tag');
        const tagsContent = document.querySelector('#tags .textboxlist');
        if (tag && !tagsContent) {
            const myCss = GM_getResourceText('TextboxListStyle');
            GM_addStyle(myCss);

            (() => {
                const t = new $.TextboxList('#tag', {
                    unique: true,
                    bitsOptions: { editable: { addKeys: 188 } },
                    plugins: { autocomplete: { placeholder: 'Type to receive suggestions' } },
                });
                t.getContainer().addClass('textboxlist-loading');
                postJson(
                    '/coin/?action=autocompletetag',
                    new URLSearchParams({ action: 'autocompletetag' })
                )
                    .then((r) => {
                        t.plugins.autocomplete.setValues(r);
                        t.getContainer().removeClass('textboxlist-loading');
                    })
                    .catch((/*XMLHttpRequest, textStatus, errorThrown*/) => {
                        //alert("Status: " + textStatus); alert("Error: " + errorThrown);
                    });
            })();
        }

        // don't wait for subsequent times
        timeout = 0;
    }, timeout);
}
