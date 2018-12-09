// ==UserScript==
// @name         Colnect: Coin
// @namespace    https://colnect.com/
// @version      0.3
// @author       danikas2k2
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6UlEQVQ4jdWSTUhUcRTFf/c/b8ZyMUW5qhZF1MaNZF8qge2siGxR29o48wZ1EW1bqGCt2hTWvCGKaNenEFgEIwXiWKK7FhEtMoQKtbSEGN/8T4sUxI82rbqrC+eewzmHC//92NJSn4lqkk7dDk56eD6SDzMAxzqvVX2Lqy46dE5il8Fnj574RKXnTV/HdADQlM3v96anQFow64w0QO2Z+6nvCzMvQJtkPAK9kiw27EKiEpSOdN5uChoz0W5vKoJNWmLh8HBf+0RzV3cCIL11OgO23bBbeI2Wolzxj18NNoaF/jguX3FyugykMcsN93V8BNPLrq54MWGrsHsmzZWisLgsubzZdROnHNACaMfU5qE1Oqp28BPTw1VIRT8E1cFikTZRM1UHjAEcbCvstSDegGdIpuOlfO7qqvadb0U2ZA1h/jFwGmPexLDENoxamZ1PBsmBeKE8DtZf9lwaK2Rn6zNRMmkKzeiVt2ZnKAQ9Q2wUqsPxzokTIzezdxX/ihED4PelnL40hPkPKacZM9pwrmWkkB23ldaW/UV1KqFBRF3sKnsC77xgp2RfX0fh+6W7YG26LOWiO4hDGD2jN9o/LQKTKy/dWvTGMH8U44BhY3NTW3rXc7mugHBNJhUrsWt9++Bs+W8C/zy/AT3Myy3qczVrAAAAAElFTkSuQmCC
// @match        https://*.colnect.com/*/coins/*
// @match        https://*.colnect.com/*/banknotes/*
// @match        https://*.colnect.com/*/stamps/*
// @match        https://*.colnect.com/*/medals/*
// @match        https://*.colnect.com/*/tokens/*
// ==/UserScript==

((W: Window, D: Document, I) => {

    const loc = D.location.href;

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

    D.body.classList.add(type);

    D.head.insertAdjacentHTML("beforeend", `
        <style type="text/css">
            #quality_list {
                display: flex;
                visibility: visible;
                opacity: 1;
                width: auto;
                padding: 0 1px;
            }

            #quality_list li {
                width: 32px;
                flex: 0 0 32px;
                overflow: hidden;
            }

            #quality_list li + li {
                margin-left: 1px;
            }

            #quality_list li a {
                margin: 0;
                padding: 0 8px;
                width: 16px;
                height: 32px;
                white-space: normal;
                text-align: center;
                line-height: 32px;
            }

            #quality_list li a.pop_selected,
            #quality_list li a:hover {
                font-size: 14px;
                padding: 0 6px;
                width: 20px;
                border-top: 1px solid #fff;
                border-bottom: 1px solid #fff;
            }

            #quality_list li:first-child a::before {
                content: "- ";
            }

            #quality_list li a[data-value="-1"] { background:#5A6986;color:#dee5f2; } /* reserved */
            #quality_list li a[data-value="-2"] { background:#854F61;color:#FDE9F4; } /* reserved */

            #quality_list li a[data-value="0"]  { background:#EEEEEE;color:#242633; } /* - */

            /* coins */
            .coins #quality_list li a[data-value="1"]  { background:#CC0000;color:#FFE3E3; } /* P */
            .coins #quality_list li a[data-value="2"]  { background:#EC7000;color:#FFF0E1; } /* FA */
            .coins #quality_list li a[data-value="3"]  { background:#B36D00;color:#FADCB3; } /* G */
            .coins #quality_list li a[data-value="4"]  { background:#AB8B00;color:#F3E7B3; } /* VG */
            .coins #quality_list li a[data-value="5"]  { background:#636330;color:#FFFFD4; } /* FI */
            .coins #quality_list li a[data-value="6"]  { background:#64992C;color:#F9FFEF; } /* VF */
            .coins #quality_list li a[data-value="7"]  { background:#006633;color:#F1F5EC; } /* XF */
            .coins #quality_list li a[data-value="8"]  { background:#206CFF;color:#E0ECFF; } /* UNC */
            .coins #quality_list li a[data-value="9"]  { background:#0000CC;color:#DFE2FF; } /* BU */
            .coins #quality_list li a[data-value="10"] { background:#5229A3;color:#E0D5F9; } /* FDC */

            .coins #quality_list li:nth-last-child(1) a              /* FDC */,
            .coins #quality_list li:nth-last-child(1) a.pop_selected /* FDC */,
            .coins #quality_list li:nth-last-child(1) a:hover        /* FDC */,
            .coins #quality_list li:nth-last-child(3) a              /* UNC */,
            .coins #quality_list li:nth-last-child(3) a.pop_selected /* UNC */,
            .coins #quality_list li:nth-last-child(3) a:hover        /* UNC */ {
                padding: 0;
                width: 32px;
            }

            /* tokens */
            .tokens #quality_list li a[data-value="1"]  { background:#CC0000;color:#FFE3E3; } /* P */
            .tokens #quality_list li a[data-value="2"]  { background:#EC7000;color:#FFF0E1; } /* FA */
            .tokens #quality_list li a[data-value="3"]  { background:#B36D00;color:#FADCB3; } /* G */
            .tokens #quality_list li a[data-value="4"]  { background:#AB8B00;color:#F3E7B3; } /* VG */
            .tokens #quality_list li a[data-value="5"]  { background:#636330;color:#FFFFD4; } /* FI */
            .tokens #quality_list li a[data-value="6"]  { background:#64992C;color:#F9FFEF; } /* VF */
            .tokens #quality_list li a[data-value="7"]  { background:#006633;color:#F1F5EC; } /* XF */
            .tokens #quality_list li a[data-value="8"]  { background:#206CFF;color:#E0ECFF; } /* UNC */
            .tokens #quality_list li a[data-value="9"]  { background:#0000CC;color:#DFE2FF; } /* BU */
            .tokens #quality_list li a[data-value="10"] { background:#5229A3;color:#E0D5F9; } /* FDC */

            .tokens #quality_list li:nth-last-child(1) a              /* FDC */,
            .tokens #quality_list li:nth-last-child(1) a.pop_selected /* FDC */,
            .tokens #quality_list li:nth-last-child(1) a:hover        /* FDC */,
            .tokens #quality_list li:nth-last-child(3) a              /* UNC */,
            .tokens #quality_list li:nth-last-child(3) a.pop_selected /* UNC */,
            .tokens #quality_list li:nth-last-child(3) a:hover        /* UNC */ {
                padding: 0;
                width: 32px;
            }

            /* medals */
            .medals #quality_list li a[data-value="1"]  { background:#CC0000;color:#FFE3E3; } /* P */
            .medals #quality_list li a[data-value="2"]  { background:#AB8B00;color:#F3E7B3; } /* G */
            .medals #quality_list li a[data-value="3"]  { background:#64992C;color:#F9FFEF; } /* VG */
            .medals #quality_list li a[data-value="4"]  { background:#006633;color:#F1F5EC; } /* E */
            .medals #quality_list li a[data-value="5"]  { background:#0000CC;color:#DFE2FF; } /* M */

            /* banknotes */
            .banknotes #quality_list li a[data-value="1"]  { background:#CC0000;color:#FFE3E3; } /* P */
            .banknotes #quality_list li a[data-value="2"]  { background:#EC7000;color:#FFF0E1; } /* FA */
            .banknotes #quality_list li a[data-value="3"]  { background:#B36D00;color:#FADCB3; } /* G */
            .banknotes #quality_list li a[data-value="4"]  { background:#AB8B00;color:#F3E7B3; } /* VG */
            .banknotes #quality_list li a[data-value="5"]  { background:#636330;color:#FFFFD4; } /* FI */
            .banknotes #quality_list li a[data-value="6"]  { background:#64992C;color:#F9FFEF; } /* VF */
            .banknotes #quality_list li a[data-value="7"]  { background:#006633;color:#F1F5EC; } /* XF */
            .banknotes #quality_list li a[data-value="8"]  { background:#206CFF;color:#E0ECFF; } /* AUNC */
            .banknotes #quality_list li a[data-value="9"]  { background:#0000CC;color:#DFE2FF; } /* UNC */

            .banknotes #quality_list li:nth-last-child(1) a              /* UNC */,
            .banknotes #quality_list li:nth-last-child(1) a.pop_selected /* UNC */,
            .banknotes #quality_list li:nth-last-child(1) a:hover        /* UNC */ {
                padding: 0;
                width: 32px;
            }

            .banknotes #quality_list li:nth-last-child(2) a::before /* AUNC */ {
                content: "AU ";
            }

            /* stamps */
            .stamps #quality_list li a[data-value="1"]  { background:#006633;color:#F1F5EC; } /* MNH */
            .stamps #quality_list li a[data-value="2"]  { background:#64992C;color:#F9FFEF; } /* MH */
            .stamps #quality_list li a[data-value="3"]  { background:#636330;color:#FFFFD4; } /* U */
            .stamps #quality_list li a[data-value="4"]  { background:#AB8B00;color:#F3E7B3; } /* CTO */

            .stamps #quality_list li:nth-child(2) a              /* MNH */,
            .stamps #quality_list li:nth-child(2) a.pop_selected /* MNH */,
            .stamps #quality_list li:nth-child(2) a:hover        /* MNH */,
            .stamps #quality_list li:nth-child(5) a              /* CTO */,
            .stamps #quality_list li:nth-child(5) a.pop_selected /* CTO */,
            .stamps #quality_list li:nth-child(5) a:hover        /* CTO */ {
                padding: 0;
                width: 32px;
            }

            .stamps #quality_list li:nth-child(3) a              /* MH */ {
                padding: 0 2px;
                width: 28px;
            }
            .stamps #quality_list li:nth-child(3) a.pop_selected /* MH */,
            .stamps #quality_list li:nth-child(3) a:hover        /* MH */ {
                padding: 0;
                width: 32px;
            }
        </style>
    `);


    const itemFullDetails = D.getElementById('item_full_details');
    const itemCondition   = itemFullDetails.querySelector('>.ibox >.ibox_list[data-lt="2"] .pop.condition');

    const _updateQC = I.updateQC;
    const _spanCBup = I.spanCBup;

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


        const _q = {P: 1, FA: 2, G: 3, VG: 4, FI: 5, VF: 6, XF: 7, UNC: 8, BU: 9, FDC: 10};

        function q(s: string) {
            // @ts-ignore
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

        I.updateQC = (e: Event, n: HTMLElement) => {
            const _r = _updateQC(e, n);

            updateOverallCondition(e, +n.dataset.value, n.querySelector('.pop.condition'));

            return _r;
        };

        I.spanCBup = (n: HTMLElement) => {
            const _r = _spanCBup(n);

            if (n.classList.contains('cb_checked')) {
                updateOverallCondition(event, 0, null);
            } else {
                itemCondition.dispatchEvent(new MouseEvent('mouseover'));
            }

            return _r;
        };

    } else {

        I.spanCBup = (n: HTMLElement) => {
            const _r = _spanCBup(n);

            if (!n.classList.contains('cb_checked')) {
                itemCondition.dispatchEvent(new MouseEvent('mouseover'));
            }

            return _r;
        };

    }

})(window, document,
    // @ts-ignore
    Inventory
);
