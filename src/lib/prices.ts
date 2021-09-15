import { ColorStyle, ConditionColors, ConditionValues } from './cond';
import { cmp } from './swap-list-sort';

type YearMap = Map<string, number[]>;
type MintMap = Map<string, YearMap>;

const COIN_ID = 'coin';

const SWAP_ID = 'swap';
const SWAP_BLOCK_ID = 'swap-block';
const ESTIMATED_PRICES_ID = 'estimated-prices';

const RX_GRAMMS = /\([gг]/;
const RX_COUNTRY = /Country|Страна|Valstybė/;
const RX_RUSSIA = /Russia|Россия|Rusija|USSR|СССР|TSRS/;
const RX_COMPOSITION = /Composition|Материал|Sudėtis/;
const RX_SILVER = /Silver|Серебро|Sidabras/;
const RX_GOLD = /Gold|Золото|Auksas/;

const RU_PRICE = 0.005; //       3-8e/kg
const EU_PRICE = 0.012; //     10-15e/kg
const AG_PRICE = 0.77;  //   .60-.80e/g
const AU_PRICE = 49.0;  // 45.0-55.0e/g

function sortByCondition(a: string, b: string): number {
    return ConditionValues.get(b) - ConditionValues.get(a);
}

export function estimateSwapPrices(): void {
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

    swapBlock.parentElement.insertAdjacentHTML(
        'beforebegin',
        `<div class="widget estimated-prices-widget"><a class="widget-header">Estimated prices</a><div id="${ESTIMATED_PRICES_ID}"></div></div>`
    );

    const estimatedPrices = document.getElementById(ESTIMATED_PRICES_ID);

    function addPricesByType(byType: Map<string, number[]>, mint = ''): void {
        const keys = [...byType.keys()].sort(sortByCondition);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
                    yAxes: [
                        {
                            type: 'linear',
                            display: true,
                            ticks: { beginAtZero: true },
                        },
                    ],
                },
                legend: { display: false },
                elements: { point: { radius: 1 } },
            },
        };

        const maxLength = 100;
        for (const cond of keys) {
            const p: number[] = byType.get(cond).sort(cmp);
            let { length } = p;
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
                data: p.map((v, i) => ({ x: (i * maxLength) / length, y: v })),
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
        const ctx = (<HTMLCanvasElement>document.getElementById(id)).getContext('2d');

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line
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

export function estimateWeightPrice(): void {
    const coinBlock = document.getElementById(COIN_ID);
    const aPrice = coinBlock?.querySelector('.right.pricewj');
    const head = coinBlock?.querySelector('h1');
    const trs = coinBlock?.querySelectorAll<HTMLTableHeaderCellElement>('.coin-info tr');

    let weight = NaN;
    let isRussia = false;
    let isSilver = false;
    let isGold = false;
    let part = 1;

    for (const tr of trs) {
        const th = tr.querySelector('th');
        const head = (th && th.textContent) || '';
        const td = tr.querySelector('td');
        if (td) {
            const data = `${td.textContent}`;
            if (head.match(RX_GRAMMS)) {
                weight = +data;
            } else if (head.match(RX_COUNTRY)) {
                isRussia = !!data.match(RX_RUSSIA);
            } else if (head.match(RX_COMPOSITION)) {
                isSilver = !!data.match(RX_SILVER);
                isGold = !!data.match(RX_GOLD);
                if (isSilver || isGold) {
                    part = +data.split(' ').pop();
                }
            }
        }
    }

    let price;
    let priceSource;
    if (isGold) {
        price = weight * (part || 1) * AU_PRICE;
        priceSource = 'au';
    } else if (isSilver) {
        price = weight * (part || 1) * AG_PRICE;
        priceSource = 'ag';
    } else if (isRussia) {
        price = weight * RU_PRICE;
        priceSource = 'ru';
    } else {
        price = weight * EU_PRICE;
        priceSource = '--';
    }

    const weightPrice = `<br/><price class="right" title="${priceSource}: ${price.toFixed(5)}">€ ${price.toFixed(
        2
    )}</price>`;

    if (!aPrice) {
        let isAproximate = false;
        const prices: number[] = [];
        const all = coinBlock.querySelectorAll('#coin-list td.blue-13');
        for (const td of all) {
            const clone = td.cloneNode(true);
            for (const child of clone.childNodes) {
                child.remove();
            }
            const { textContent } = clone;
            if (textContent) {
                prices.push(+textContent);
            } else {
                isAproximate = true;
            }
        }
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const showPrices = [min.toFixed(2)];
        if (max > min) {
            showPrices.push(max.toFixed(2));
        } else if (isAproximate) {
            showPrices.unshift('');
        }
        head.insertAdjacentHTML(
            'beforebegin',
            `<a href="#price" class="gray-12 right pricewj">Value:&nbsp;€ <span>${showPrices.join(
                isAproximate ? '~' : '-'
            )}</span>${weightPrice}</a>`
        );
    } else {
        aPrice.insertAdjacentHTML('beforeend', weightPrice);
    }
}
