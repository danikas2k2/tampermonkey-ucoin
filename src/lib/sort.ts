import { getHashParam, updateLocationHash } from './url';
import { tt } from './utils';

export type SortOrder = 'a' | 'd';

export type SortFunction = (a: DOMStringMap, b: DOMStringMap, o: number) => number;

export interface SortOption {
    index: number;
    label: string;
    sort: SortFunction;
}

export const x = (name: string): string =>
    `<div class='right close' title='Clear filter' data-filter-clear='${name}'>×</div>`;

export const a = (ord: string = 'a'): string =>
    `<div class='right'><span class='arrow ${ord === 'a' ? 'at' : 'ab'}'></span></div>`;

export const d = (ord: string = 'd'): string => a(ord);

export const o = (opt: string): string => `<div class='left gray-13'>${opt}</div>`;

export const s = (option: string, order: SortOrder) => `${o(option)}${a(order)}`;

export function c(html: string | undefined): string {
    if (!html) {
        return '';
    }
    const template = document.createElement('template');
    template.innerHTML = html;
    const opt = template.content.querySelector<HTMLDivElement>('div.left');
    opt?.classList.add('wrap');
    return template.innerHTML;
}

export function dropdown(id: string, selected: string, options: string[]) {
    return `
    <div class='right filter-container'>
        <div class='filter-box' id='${id}'>
            ${c(selected)}
        </div>
        <div class='drop hide filter-dialog' id='${id}-dialog'>
            ${options.join('')}
        </div>
    </div>
`;
}

export const num = (s: string | undefined): number => (s ? +s.replace(/[^.\d]/g, '') : 0);

export const cmp = <T = string | number>(a: T, b: T): number => -(a < b) || +(a > b);

export const sortField = <T extends string>(field: T) => `sort${tt(field)}`;

export const cmpNum = <T extends string>(a: DOMStringMap, b: DOMStringMap, field: T): number =>
    cmp(num(a[sortField(field)]), num(b[sortField(field)]));

export const cmpStr = <T extends string>(a: DOMStringMap, b: DOMStringMap, field: T): number =>
    cmp(a[sortField(field)], b[sortField(field)]);

export const cmpYear = (a: DOMStringMap, b: DOMStringMap, o = 1): number =>
    o * cmpNum(a, b, 'year') || o * cmpStr(a, b, 'mm');

export const cmpKm = (a: DOMStringMap, b: DOMStringMap, o = 1): number =>
    o * cmpStr(a, b, 'kmc') || o * cmpNum(a, b, 'km') || o * cmpStr(a, b, 'kma') || o * cmpYear(a, b);

export const cmpFace = (a: DOMStringMap, b: DOMStringMap, o = 1): number =>
    o * cmpStr(a, b, 'face') || o * cmpKm(a, b, -1);

export const cmpSubject = (a: DOMStringMap, b: DOMStringMap, o = 1): number =>
    o * cmpStr(a, b, 'subject') || cmpFace(a, b);

export const cmpCond = (a: DOMStringMap, b: DOMStringMap, o = 1): number => o * cmpNum(a, b, 'cond') || cmpFace(a, b);

export const cmpValue = (a: DOMStringMap, b: DOMStringMap, o = 1): number =>
    o * cmpNum(a, b, 'value') || cmpCond(a, b, -1);

export function sortBy(sections: NodeListOf<HTMLTableSectionElement>, sort: SortFunction, order: SortOrder): void {
    const ord = order === 'a' ? 1 : -1;
    for (const section of sections) {
        const rows = [...section.querySelectorAll('tr')];
        if (rows.length > 1) {
            rows.sort(({ dataset: a }, { dataset: b }) => sort(a, b, ord));
            section.append(...rows);
        }
    }
}

export const ORDER_PARAM = 'o';
export const ORDER_SEPARATOR = '_';

export const getActiveSortOption = (): [string, SortOrder] => {
    const [field = 'year', order = 'd'] = getHashParam(ORDER_PARAM)?.split(ORDER_SEPARATOR) || [];
    return [field, order as SortOrder];
};

export const setActiveSortOption = async (option: string, order: SortOrder) =>
    updateLocationHash((params) => {
        params.set(ORDER_PARAM, `${option}${ORDER_SEPARATOR}${order}`);
    });
