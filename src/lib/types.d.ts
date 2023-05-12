declare module '*.svg' {
    const svgCntent: string;
    // noinspection JSUnusedGlobalSymbols
    export default svgCntent;
}

declare interface CoinSwapFormOnMatchGroups extends Record<string, string> {
    uniq?: string;
    usid?: string;
    cond?: string;
    price?: string;
    info?: string;
    vid?: string;
    strqty?: string;
    replica?: string;
}

declare interface CoinSwapAnchorAndMatchTuple {
    a: HTMLAnchorElement;
    m: CoinSwapFormOnMatchGroups;
}

declare interface CoinSwapFormOnMatchResult extends RegExpMatchArray {
    groups: CoinSwapFormOnMatchGroups;
}

declare interface CoinSwapVariantData {
    cond?: string;
    price?: string;
    info?: string;
    vid?: string;
    qty?: number;
}

declare interface CoinSwapVariant extends CoinSwapVariantData {
    usid: string;
    usids: Set<string>;
    total: number;
}

declare interface CoinWishFormOnMatchGroups extends Record<string, string> {
    uwid?: string;
    cond?: string;
}

declare interface CoinWishFormOnMatchResult extends RegExpMatchArray {
    groups: CoinWishFormOnMatchGroups;
}

declare type FormType = 'swap' | 'wish';

declare type FormTypeMethod = 'Swap' | 'Wish';

declare type FormTypePrefix = '' | 'w';

declare type FormUidPrefix = 's' | 'w';

declare type SwapFormAction = 'addswapcoin' | 'delswapcoin' | 'editswapcoin';

declare type SwapListManageRole = 'expand' | 'combine';

// declare type UpdateCallback = (update: UpdateElements) => Promise<UpdateElements>;
declare type UpdateCallback = (target: EventTarget) => Promise<void>;
declare type RequestCallback = (target: EventTarget) => Promise<void>;

declare type EventHandler<T = HTMLElement, R = void> = (this: T, e: Event) => R;

declare interface ConditionOption {
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

declare type Optional<T> = T | null | undefined;

// noinspection JSUnusedGlobalSymbols
declare interface JQueryStatic {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TextboxList: any;
}

declare type MapOf<T = string> = Record<string, T>;
declare type Prices = MapOf<MapOf<number>>;
