import { Param } from '../common/params';
import { UNAME } from '../uid';
import { updateLocationHash } from '../url';

export const enum Tab {
    GET = 'get',
    GIVE = 'give',
    HISTORY = 'history',
}

export async function setActiveSwapTab(tab: string): Promise<void> {
    localStorage.setItem(Param.TAB, tab);
    await updateLocationHash((params) => params.set(Param.TAB, tab));
}

export function getSwapTab(element: Element): Tab {
    if (element.classList.contains('lgray-13')) {
        return Tab.HISTORY;
    }
    if (element.textContent.includes(UNAME)) {
        return Tab.GIVE;
    }
    return Tab.GET;
}
