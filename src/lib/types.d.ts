type Dictionary = { [key: string]: string };

interface CoinSwapFormOnMatchGroups extends Dictionary {
    uniq?: string,
    usid?: string,
    cond?: string,
    price?: string,
    info?: string,
    vid?: string,
    strqty?: string,
    replica?: string,
}

interface CoinSwapAnchorAndMatchTuple {
    a: HTMLAnchorElement,
    m: CoinSwapFormOnMatchGroups,
}

interface CoinSwapFormOnMatchResult extends RegExpMatchArray {
    groups: CoinSwapFormOnMatchGroups,
}

type SwapFormAction = 'addswapcoin' | 'delswapcoin' | 'editswapcoin';
