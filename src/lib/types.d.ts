declare module '*.svg' {
    const svgCntent: string;
    // noinspection JSUnusedGlobalSymbols
    export default svgCntent;
}

interface CoinSwapFormOnMatchGroups extends Record<string, string> {
    uniq?: string;
    usid?: string;
    cond?: string;
    price?: string;
    info?: string;
    vid?: string;
    strqty?: string;
    replica?: string;
}

interface CoinSwapAnchorAndMatchTuple {
    a: HTMLAnchorElement;
    m: CoinSwapFormOnMatchGroups;
}

interface CoinSwapFormOnMatchResult extends RegExpMatchArray {
    groups: CoinSwapFormOnMatchGroups;
}

interface CoinSwapVariantData {
    cond?: string;
    price?: string;
    info?: string;
    vid?: string;
    qty?: number;
}

interface CoinSwapVariant extends CoinSwapVariantData {
    usid: string;
    usids: Set<string>;
    total: number;
}

interface CoinWishFormOnMatchGroups extends Record<string, string> {
    uwid?: string;
    cond?: string;
}

interface CoinWishFormOnMatchResult extends RegExpMatchArray {
    groups: CoinWishFormOnMatchGroups;
}

type FormType = 'swap' | 'wish';

type FormTypeMethod = 'Swap' | 'Wish';

type FormTypePrefix = '' | 'w';

type FormUidPrefix = 's' | 'w';

type SwapFormAction = 'addswapcoin' | 'delswapcoin' | 'editswapcoin';

type SwapListManageRole = 'expand' | 'combine';

// type UpdateCallback = (update: UpdateElements) => Promise<UpdateElements>;
type UpdateCallback = (target: EventTarget) => Promise<void>;
type RequestCallback = (target: EventTarget) => Promise<void>;

type EventHandler<T = HTMLElement, R = void> = (this: T, e: Event) => R;

interface ConditionOption {
    text: string;
    value: string;
    checked: string;
    style: string;
}

// declare class Converter {
//     makeHtml(t: string): string;
// }

// declare const showdown: {
//     Converter: typeof Converter;
// };

type Optional<T> = T | null | undefined;

// noinspection JSUnusedGlobalSymbols
declare interface JQueryStatic {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TextboxList: any;
}
