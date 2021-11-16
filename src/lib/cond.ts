export const enum Condition {
    G = 'G',
    VG = 'VG',
    F = 'F',
    VF = 'VF',
    VF_ = 'VF+',
    XF = 'XF',
    XF_ = 'XF+',
    AU = 'AU',
    UNC = 'UNC',
    PROOF = 'PRF',
    BU = 'BU',
}

export const enum Color {
    ANY = 1,
    __UNUSED_BLUE,
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
    __UNUSED_YELLOW,
    __UNUSED_MAGENTA,
}

export const enum Value {
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

export const enum FormValue {
    UNKNOWN,
    UNC,
    XF,
    VF,
    F,
    VG,
    G,
    PROOF,
}

export const enum SwapValue {
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

export const enum WishValue {
    ANY,
    UNC,
    XF,
    VF,
}

export type CondValue = SwapValue | WishValue;

export const ConditionColors: Partial<Record<Condition, Color>> = {
    [Condition.G]: Color.G,
    [Condition.VG]: Color.VG,
    [Condition.F]: Color.F,
    [Condition.VF]: Color.VF,
    [Condition.VF_]: Color.VF,
    [Condition.XF]: Color.XF,
    [Condition.XF_]: Color.XF,
    [Condition.UNC]: Color.UNC,
    [Condition.PROOF]: Color.PROOF,
    [Condition.BU]: Color.BU,
};

export const ConditionValues: Partial<Record<Condition, Value>> = {
    [Condition.G]: Value.G,
    [Condition.VG]: Value.VG,
    [Condition.F]: Value.F,
    [Condition.VF]: Value.VF,
    [Condition.XF]: Value.XF,
    [Condition.UNC]: Value.UNC,
    [Condition.PROOF]: Value.PROOF,
    [Condition.BU]: Value.BU,
};

export const ColorValues: Partial<Record<Color, Value>> = {
    [Color.G]: Value.G,
    [Color.VG]: Value.VG,
    [Color.F]: Value.F,
    [Color.VF]: Value.VF,
    [Color.XF]: Value.XF,
    [Color.UNC]: Value.UNC,
    [Color.PROOF]: Value.PROOF,
    [Color.BU]: Value.BU,
    [Color.ANY]: Value.ANY,
};

export const ConditionFormValues: Partial<Record<Condition, FormValue>> = {
    [Condition.G]: FormValue.G,
    [Condition.VG]: FormValue.VG,
    [Condition.F]: FormValue.F,
    [Condition.VF]: FormValue.VF,
    [Condition.XF]: FormValue.XF,
    [Condition.UNC]: FormValue.UNC,
    [Condition.PROOF]: FormValue.PROOF,
};

export const FormValueCondition: Partial<Record<FormValue, Condition>> = {
    [FormValue.G]: Condition.G,
    [FormValue.VG]: Condition.VG,
    [FormValue.F]: Condition.F,
    [FormValue.VF]: Condition.VF,
    [FormValue.XF]: Condition.XF,
    [FormValue.UNC]: Condition.UNC,
    [FormValue.PROOF]: Condition.PROOF,
};

export const FormValueColors: Partial<Record<FormValue, Color>> = {
    [FormValue.G]: Color.G,
    [FormValue.VG]: Color.VG,
    [FormValue.F]: Color.F,
    [FormValue.VF]: Color.VF,
    [FormValue.XF]: Color.XF,
    [FormValue.UNC]: Color.UNC,
    [FormValue.PROOF]: Color.PROOF,
};

export const FormColorValues: Partial<Record<Color, FormValue>> = {
    [Color.G]: FormValue.G,
    [Color.VG]: FormValue.VG,
    [Color.F]: FormValue.F,
    [Color.VF]: FormValue.VF,
    [Color.XF]: FormValue.XF,
    [Color.UNC]: FormValue.UNC,
    [Color.PROOF]: FormValue.PROOF,
};

export const ColorStyle: Partial<Record<Color, string>> = {
    [Color.G]: '#EC7000',
    [Color.VG]: '#B36D00',
    [Color.F]: '#AB8B00',
    [Color.VF]: '#636330',
    [Color.XF]: '#64992C',
    [Color.UNC]: '#006633',
    [Color.PROOF]: '#0000CC',
    [Color.BU]: '#5229A3',
    [Color.ANY]: '#5A6986',
    [Color.COPY]: '#854F61',
    [Color.UNKNOWN]: '#CC0000',
};
