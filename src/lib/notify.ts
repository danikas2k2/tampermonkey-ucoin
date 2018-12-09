
const OK = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="#25ae88"/><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M38 15L22 33l-10-8"/></svg>';

const ERROR = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="#d75a4a"/><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M16 34l9-9 9-9m-18 0l9 9 9 9"/></svg>';

const INFO = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="#48a0dc"/><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M25 37v2m-7-23a7 7 0 0 1 7.1-7 7.1 7.1 0 0 1 6.9 6.9 7 7 0 0 1-3.21 5.99A8.6 8.6 0 0 0 25 29.16V32"/></svg>';

const WARNING = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="#ed8a19"/><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M38 25H12"/></svg>';

const FLOWER = 'data:image/svg+xml;charset=utf-8<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.01 58.01"><path d="M17.57 29a8.9 8.9 0 0 1-3.4-2.11L8.5 21.23a8.87 8.87 0 0 1-.92-1.1A9.02 9.02 0 0 0 0 29.01c0 4.95 4.05 9 9 9h8a9.03 9.03 0 0 0 8.9-10.28c-.75.56-1.56.98-2.42 1.28-1.9-.66-4-.66-5.9 0z" fill="#bf4d90"/><path d="M37.89 7.58C37.19 3.3 33.48.01 29 .01s-8.18 3.3-8.87 7.57c.38.28.75.58 1.1.92l5.65 5.66a9.08 9.08 0 0 1 .84 11.75 8.93 8.93 0 0 0 2.57 0A9.08 9.08 0 0 0 38 17V9c0-.49-.05-.96-.12-1.43z" fill="#ed8a19"/><path d="M36.8 49.51l-5.67-5.65a9.08 9.08 0 0 1-.84-11.75 8.93 8.93 0 0 0-2.56 0 9.08 9.08 0 0 0-7.71 8.9v8a9.03 9.03 0 0 0 9 9c4.46 0 8.18-3.3 8.87-7.58a9.05 9.05 0 0 1-1.1-.92z" fill="#7fabda"/><path d="M50.44 20.13a8.8 8.8 0 0 1-.92 1.1l-5.66 5.66a9.08 9.08 0 0 1-11.75.84 8.93 8.93 0 0 0 0 2.56 9.08 9.08 0 0 0 8.9 7.72h8a9.03 9.03 0 0 0 9-9c0-4.47-3.3-8.19-7.57-8.88z" fill="#a4e869"/><path d="M49.52 8.5a9.03 9.03 0 0 0-11.63-.92c.07.47.12.94.12 1.43v8a9.08 9.08 0 0 1-7.71 8.9 8.97 8.97 0 0 0 1.82 1.81 9.08 9.08 0 0 0 11.75-.84l5.65-5.65a9.03 9.03 0 0 0 0-12.73z" fill="#efce4a"/><path d="M50.44 37.88c-.47.08-.94.13-1.43.13h-8a9.08 9.08 0 0 1-8.9-7.71 8.97 8.97 0 0 0-1.81 1.81 9.08 9.08 0 0 0 .84 11.75l5.65 5.65a9.03 9.03 0 0 0 12.73 0 9.03 9.03 0 0 0 .92-11.63z" fill="#61b872"/><path d="M29.01 17.57a8.9 8.9 0 0 0-2.12-3.41L21.23 8.5a9.03 9.03 0 0 0-12.73 0 9.02 9.02 0 0 0-.91 11.63c.46-.07.93-.12 1.41-.12h8a9.03 9.03 0 0 1 8.9 7.72h.01a8.97 8.97 0 0 0 1.82-1.83 9.08 9.08 0 0 0 1.29-8.33z" fill="#ed7161"/><path d="M17 20H9a8.91 8.91 0 0 0-1.41.13c.27.39.57.76.92 1.1l5.65 5.66a9 9 0 0 0 3.42 2.12c1.9-.66 4-.66 5.9 0a8.9 8.9 0 0 0 2.42-1.28A9.03 9.03 0 0 0 17 20z" fill="#bf4d90"/><path d="M26.9 31.13A8.97 8.97 0 0 0 23.47 29a9.08 9.08 0 0 0-9.32 2.12L8.5 36.78a9.03 9.03 0 0 0 0 12.73 9.03 9.03 0 0 0 11.63.91A8.95 8.95 0 0 1 20 49v-8a9.08 9.08 0 0 1 7.71-8.9 8.97 8.97 0 0 0-.83-.98z" fill="#9777a8"/></svg>';


function notify(title: string, body?: string, icon?: string): void {
    const options = {body, icon};
    new Notification(title, options);
}

function request(title: string, body?: string, icon?: string): void {
    if (!("Notification" in window)) {
        alert(title);
    } else if (Notification.permission === 'granted') {
        notify(title, body, icon);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                notify(title, body, icon);
            }
        });
    }
}




export function info(title: string): void {
    request(title, null, INFO);
}

export function err(title: string): void {
    request(title, null, ERROR);
}

export function warn(title: string): void {
    request(title, null, WARNING);
}

export function ok(title: string): void {
    request(title, null, OK);
}
