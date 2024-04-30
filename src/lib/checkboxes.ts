function syncMainCheckbox(): void {
    const checkboxes = Array.from(
        document.querySelectorAll<HTMLInputElement>('h2 input[type="checkbox"]')
    );
    const checked = checkboxes.every((sibling) => sibling.checked);
    const mainCheckbox = document.querySelector<HTMLInputElement>('#main-checkbox');
    if (mainCheckbox) {
        mainCheckbox.checked = checked;
    }
}

export function improveHeadingCheckboxes(): void {
    const checkboxes = Array.from(
        document.querySelectorAll<HTMLInputElement>('h2 input[type="checkbox"]') || []
    );
    for (const checkbox of checkboxes) {
        checkbox.addEventListener('click', syncMainCheckbox);
    }
}

export function syncHeadingCheckbox(checkbox: HTMLInputElement): void {
    const table = checkbox.closest<HTMLTableElement>('table.swap-coin');
    if (table) {
        const checkboxes = Array.from(
            table.querySelectorAll<HTMLInputElement>('input[type="checkbox"]') || []
        );
        const checked = checkboxes.every((sibling) => sibling.checked);
        const headingCheckbox =
            table.previousElementSibling?.querySelector<HTMLInputElement>('input[type="checkbox"]');
        if (headingCheckbox) {
            headingCheckbox.checked = checked;
        }
    }
    syncMainCheckbox();
}

export function improveCheckboxSelection(
    specificSelector = '',
    onCheck?: (c: HTMLInputElement) => void
): void {
    const checkboxes = Array.from(
        document.querySelectorAll<HTMLInputElement>(`input[type="checkbox"]${specificSelector}`) ||
            []
    );
    let lastTouched = checkboxes[0];
    const checkboxClickHandler = (e: MouseEvent): void => {
        const checkbox = e.currentTarget as HTMLInputElement | null;
        if (checkbox) {
            if (e.shiftKey && lastTouched) {
                const start = checkboxes.indexOf(lastTouched);
                const end = checkboxes.indexOf(checkbox);
                const [from, to] = start < end ? [start, end] : [end, start];
                const { checked } = checkbox;
                for (let i = from; i <= to; i++) {
                    if (checkboxes[i].checked !== checked) {
                        checkboxes[i].click();
                    }
                    onCheck?.(checkboxes[i]);
                }
            } else {
                lastTouched = checkbox;
                onCheck?.(checkbox);
            }
        }
    };
    for (const checkbox of checkboxes) {
        checkbox.addEventListener('click', checkboxClickHandler);
    }
}
