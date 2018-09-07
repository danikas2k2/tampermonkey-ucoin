function sp(str) {
    return `${str || ''}`.replace(/\u{00A0}+/gu, ' ').replace(/\s+/g, ' ').trim();
}
