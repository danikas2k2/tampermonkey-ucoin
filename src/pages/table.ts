import { addSortingOptions } from '../lib/list-sort';
import { loc } from '../lib/url';

export async function handleTablePage(): Promise<void> {
    const type = loc().searchParams.get('type');
    if (type && type !== '1') {
        addSortingOptions();
    }
}
