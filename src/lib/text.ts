export function queryTextOnly(node: Node | null | undefined): string | undefined {
    return [...(node?.childNodes ?? [])]
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent)
        .join('');
}

export function queryNumberOnly(node: Node | null | undefined, defaultValue = 0): number {
    const text = queryTextOnly(node);
    return text == null ? defaultValue : +text;
}
