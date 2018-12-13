// ==UserScript==
// @name         collector :: colnect.com
// @namespace    https://colnect.com/
// @version      [AIV]{version}[/AIV]
// @date         [AIV]{date}[/AIV]
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6UlEQVQ4jdWSTUhUcRTFf/c/b8ZyMUW5qhZF1MaNZF8qge2siGxR29o48wZ1EW1bqGCt2hTWvCGKaNenEFgEIwXiWKK7FhEtMoQKtbSEGN/8T4sUxI82rbqrC+eewzmHC//92NJSn4lqkk7dDk56eD6SDzMAxzqvVX2Lqy46dE5il8Fnj574RKXnTV/HdADQlM3v96anQFow64w0QO2Z+6nvCzMvQJtkPAK9kiw27EKiEpSOdN5uChoz0W5vKoJNWmLh8HBf+0RzV3cCIL11OgO23bBbeI2Wolzxj18NNoaF/jguX3FyugykMcsN93V8BNPLrq54MWGrsHsmzZWisLgsubzZdROnHNACaMfU5qE1Oqp28BPTw1VIRT8E1cFikTZRM1UHjAEcbCvstSDegGdIpuOlfO7qqvadb0U2ZA1h/jFwGmPexLDENoxamZ1PBsmBeKE8DtZf9lwaK2Rn6zNRMmkKzeiVt2ZnKAQ9Q2wUqsPxzokTIzezdxX/ihED4PelnL40hPkPKacZM9pwrmWkkB23ldaW/UV1KqFBRF3sKnsC77xgp2RfX0fh+6W7YG26LOWiO4hDGD2jN9o/LQKTKy/dWvTGMH8U44BhY3NTW3rXc7mugHBNJhUrsWt9++Bs+W8C/zy/AT3Myy3qczVrAAAAAElFTkSuQmCC
// @match        https://*.colnect.com/*/coins/*
// @match        https://*.colnect.com/*/banknotes/*
// @match        https://*.colnect.com/*/stamps/*
// @match        https://*.colnect.com/*/medals/*
// @match        https://*.colnect.com/*/tokens/*
// @run-at       document-end
// ==/UserScript==


import style from '../styles/colnect.less';
document.head.insertAdjacentHTML("beforeend", `<style type="text/css">${style}</style>`);


declare var Inventory: {
    updateQC: (e: Event, n: HTMLElement) => {},
    spanCBup: (n: HTMLElement) => {},
};


const loc = document.location.href;

const type = (loc => {
    if (loc.includes('/coins/')) {
        return 'coins';
    }
    if (loc.includes('/banknotes/')) {
        return 'banknotes';
    }
    if (loc.includes('/stamps/')) {
        return 'stamps';
    }
    if (loc.includes('/medals/')) {
        return 'medals';
    }
    if (loc.includes('/tokens/')) {
        return 'tokens';
    }
    return 'other';
})(loc);

document.body.classList.add(type);


const itemFullDetails = document.getElementById('item_full_details');
const itemCondition = itemFullDetails.querySelector('>.ibox >.ibox_list[data-lt="2"] .pop.condition');

const _updateQC = Inventory.updateQC;
const _spanCBup = Inventory.spanCBup;

if (type === 'coins' && loc.includes('/coin/')) {

    const itemYearVariants = itemFullDetails.querySelectorAll('>.year_variants >ul >li[data-id]');

    // clicking on year row
    itemYearVariants.forEach(itemYearVariant => {
        itemYearVariant.addEventListener("click", e => {
            const li = <HTMLLIElement>e.currentTarget;
            li.querySelector('.ibox_list[data-lt="2"] >.pop.condition')
                .dispatchEvent(new MouseEvent('mouseover'));
        });
    });


    const _q: {[key: string]: number} = {P: 1, FA: 2, G: 3, VG: 4, FI: 5, VF: 6, XF: 7, UNC: 8, BU: 9, FDC: 10};

    function q(s: string) {
        return (s && s in _q) ? _q[s] : 0;
    }


    //


    function updateOverallCondition(e: Event, current: number, container: HTMLElement) {
        const variants: number[] = [];
        itemYearVariants.forEach((n: HTMLElement) => {
            variants.push(n.classList.contains('open')
                ? current
                : q(n.querySelector('ul.oth_inv').textContent.split(':', 2).pop().trim()));
        });

        const best = Math.max(...variants);
        if (best && best !== q(itemCondition.textContent)) {
            itemCondition.dispatchEvent(new MouseEvent('mouseover'));
            _updateQC(e, itemCondition.querySelector(`#quality_list a[data-value="${best}"]`));

            if (container) {
                container.dispatchEvent(new MouseEvent('mouseover'));
            } else {
                itemCondition.dispatchEvent(new MouseEvent('mouseout'));
            }
        }
    }

    Inventory.updateQC = (e: Event, n: HTMLElement) => {
        const _r = _updateQC(e, n);

        updateOverallCondition(e, +n.dataset.value, n.querySelector('.pop.condition'));

        return _r;
    };

    Inventory.spanCBup = (n: HTMLElement) => {
        const _r = _spanCBup(n);

        if (n.classList.contains('cb_checked')) {
            updateOverallCondition(event, 0, null);
        } else {
            itemCondition.dispatchEvent(new MouseEvent('mouseover'));
        }

        return _r;
    };

} else {

    Inventory.spanCBup = (n: HTMLElement) => {
        const _r = _spanCBup(n);

        if (!n.classList.contains('cb_checked')) {
            itemCondition.dispatchEvent(new MouseEvent('mouseover'));
        }

        return _r;
    };

}
