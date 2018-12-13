interface CoinSwapFormOnMatchGroups {
    uniq?: string,
    usid?: string,
    cond?: string,
    price?: string,
    info?: string,
    vid?: string,
    strqty?: string,
    replica?: string,
}

interface CoinSwapFormOnMatchResult extends RegExpMatchArray {
    groups: CoinSwapFormOnMatchGroups,
}

type SwapFormAction = 'addswapcoin' | 'delswapcoin' | 'editswapcoin';
