export enum Color {
    ANY = 1,
    __BLUE,
    PROOF,
    BU,
    COPY,
    UNKNOWN,
    G,
    VG,
    F,
    VF,
    XF,
    UNC,
    __YELLOW,
    __MAGENTA,
}

export const ConditionColors = new Map([
    ['G', Color.G],
    ['VG', Color.VG],
    ['F', Color.F],
    ['VF', Color.VF],
    ['VF+', Color.VF],
    ['XF', Color.XF],
    ['XF+', Color.XF],
    ['UNC', Color.UNC],
    ['PRF', Color.PROOF],
    ['BU', Color.BU],
]);

export enum Value {
    UNKNOWN,
    G,
    VG,
    F,
    VF,
    XF,
    UNC,
    PROOF,
    BU,
    ANY,
}

export const ConditionValues = new Map([
    ['G', Value.G],
    ['VG', Value.VG],
    ['F', Value.F],
    ['VF', Value.VF],
    ['XF', Value.XF],
    ['UNC', Value.UNC],
    ['PRF', Value.PROOF],
    ['BU', Value.BU],
]);

export const ColorValues = new Map([
    [Color.G, Value.G],
    [Color.VG, Value.VG],
    [Color.F, Value.F],
    [Color.VF, Value.VF],
    [Color.XF, Value.XF],
    [Color.UNC, Value.UNC],
    [Color.PROOF, Value.PROOF],
    [Color.BU, Value.BU],
    [Color.ANY, Value.ANY],
]);

export enum FormValue {
    UNKNOWN,
    UNC,
    XF,
    VF,
    F,
    VG,
    G,
    PROOF,
}

export const FormValueColors = new Map([
    [FormValue.G, Color.G],
    [FormValue.VG, Color.VG],
    [FormValue.F, Color.F],
    [FormValue.VF, Color.VF],
    [FormValue.XF, Color.XF],
    [FormValue.UNC, Color.UNC],
    [FormValue.PROOF, Color.PROOF],
]);

export const FormColorValues = new Map([
    [Color.G, FormValue.G],
    [Color.VG, FormValue.VG],
    [Color.F, FormValue.F],
    [Color.VF, FormValue.VF],
    [Color.XF, FormValue.XF],
    [Color.UNC, FormValue.UNC],
    [Color.PROOF, FormValue.PROOF],
]);

export enum SwapValue {
    UNKNOWN,
    UNC,
    XF,
    VF,
    F,
    VG,
    G,
    PROOF,
    COPY = 100,
}

export enum WishValue {
    ANY,
    UNC,
    XF,
    VF,
}

export type CondValue = SwapValue | WishValue;

export const ColorStyle = new Map([
    [Color.G, '#EC7000'],
    [Color.VG, '#B36D00'],
    [Color.F, '#AB8B00'],
    [Color.VF, '#636330'],
    [Color.XF, '#64992C'],
    [Color.UNC, '#006633'],
    [Color.PROOF, '#0000CC'],
    [Color.BU, '#5229A3'],
    [Color.ANY, '#5A6986'],
    [Color.COPY, '#854F61'],
    [Color.UNKNOWN, '#CC0000'],
]);
