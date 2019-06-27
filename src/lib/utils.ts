export function sp(str: string) {
    return `${str || ''}`.replace(/\u{00A0}+/gu, ' ').replace(/\s+/g, ' ').trim();
}

export function tt(str: string) {
    str = `${str || ''}`;
    return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
}
