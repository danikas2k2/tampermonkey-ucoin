declare module '*.svg' {
    const svgCntent: string;
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
    condition?: string;
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

interface UpdateElements {
    required: HTMLElement[];
    optional?: HTMLElement[];
}

// type UpdateCallback = (update: UpdateElements) => Promise<UpdateElements>;
type UpdateCallback = () => Promise<void>;

type RequestCallback = () => Promise<void>;

type EventHandler = (e: Event) => void;

interface ConditionOption {
    text: string;
    value: string;
    checked: string;
    style: string;
}

declare class Converter {
    makeHtml(t: string): string;
}

declare const showdown: {
    Converter: typeof Converter;
};
