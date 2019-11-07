import {ColorStyle, Color, ConditionColors, ConditionValues} from './cond';
import {cmp} from './swap-list-sort';

type YearMap = Map<string, number[]>;
type MintMap = Map<string, YearMap>;

const SWAP_ID = 'swap';
const SWAP_BLOCK_ID = 'swap-block';
const ESTIMATED_PRICES_ID = 'estimated-prices';

function sortByCondition(a: string, b: string): number {
    return ConditionValues.get(b) - ConditionValues.get(a);
}

export function estimateSwapPrices() {
    const theySwap = document.getElementById(SWAP_ID);
    if (!theySwap) {
        return;
    }

    const swapBlock = theySwap.nextElementSibling;
    if (!swapBlock || !swapBlock.matches(`#${SWAP_BLOCK_ID}`)) {
        return;
    }

    const byType: YearMap = new Map();
    const byMint: MintMap = new Map();

    let pricePrefix: string, priceSuffix: string;
    const listOfLinks = swapBlock.querySelectorAll(`a.list-link`);
    for (const a of listOfLinks) {
        const cond = a.querySelector(`.left.dgray-11`).textContent;
        const mint = a.querySelector(`.left.gray-13`).textContent;

        const priceElement = a.querySelector(`.right.blue-13`);
        let priceStr = priceElement.textContent;

        pricePrefix = priceElement.firstChild.textContent;
        if (pricePrefix) {
            priceStr = priceStr.replace(pricePrefix, '');
        }

        priceSuffix = priceElement.lastChild.textContent;
        if (priceSuffix) {
            priceStr = priceStr.replace(priceSuffix, '');
        }

        const price = +priceStr;

        const p = byType.has(cond) ? byType.get(cond) : [];
        p.push(price);
        byType.set(cond, p);

        const pm = byMint.has(mint) ? byMint.get(mint) : new Map();
        const pc = pm.has(cond) ? pm.get(cond) : [];
        pc.push(price);
        pm.set(cond, pc);
        byMint.set(mint, pm);
    }

    swapBlock.parentElement.insertAdjacentHTML('beforebegin', `<div class="widget estimated-prices-widget"><a class="widget-header">Estimated prices</a><div id="${ESTIMATED_PRICES_ID}"></div></div>`);

    const estimatedPrices = document.getElementById(ESTIMATED_PRICES_ID);

    function addPricesByType(byType: Map<string, number[]>, mint = '') {
        const keys = [...byType.keys()].sort(sortByCondition);

        // @ts-ignore
        const options: Chart.ChartConfiguration = {
            type: 'line',
            data: { datasets: [] },
            options: {
                title: { display: true, text: mint },
                responsive: true,
                hover: { mode: 'nearest', intersect: true },
                scales: {
                    xAxes: [],
                    yAxes: [{
                        type: 'linear',
                        display: true,
                        ticks: { beginAtZero: true },
                    }],
                },
                legend: { display: false },
                elements: { point: { radius: 1 } },
            },
        };

        const maxLength = 100;
        for (const cond of keys) {
            const p: number[] = byType.get(cond).sort(cmp);
            let {length} = p;
            if (length === 1) {
                p.push(p[0]);
            } else {
                length -= 1;
            }
            const color = ColorStyle.get(ConditionColors.get(cond));
            const xAxisID = `x-axis-${cond}`;
            options.data.datasets.push({
                xAxisID,
                label: cond,
                data: p.map((v, i) => ({x: i * maxLength / length, y: v})),
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                fill: false,
            });
            options.options.scales.xAxes.push({
                id: xAxisID,
                type: 'linear',
                display: false,
            });
        }

        const id = `${ESTIMATED_PRICES_ID}-${mint.trim()}`;
        estimatedPrices.insertAdjacentHTML('beforeend', `<canvas id="${id}" width="239" height="119"/>`);
        const ctx = (<HTMLCanvasElement> document.getElementById(id)).getContext('2d');
        // @ts-ignore
        new Chart(ctx, options);
    }

    if (byMint.size > 1) {
        addPricesByType(byType);
    } else {
        for (const [mint, byType] of byMint) {
            if (byMint.size > 1) {
                estimatedPrices.insertAdjacentHTML('beforeend', `<div class="list-sep"></div>`);
            }
            addPricesByType(byType, mint);
        }
    }
}
