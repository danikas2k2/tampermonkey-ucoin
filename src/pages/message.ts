export async function handleMessagePage(): Promise<void> {
    const userList = document.getElementById('user-list');
    const rows = userList?.querySelectorAll<HTMLTableRowElement>('table.user tr[onclick]');
    for (const user of rows || []) {
        const a = user.querySelector<HTMLAnchorElement>('td.user-container a');
        const m = user.attributes.getNamedItem('onclick')?.value.match(/href\s*=\s*'(.*?)'/);
        if (a && m) {
            a.href = m[1];
            a.onclick = (e) => e.stopPropagation();
        }
    }
}
