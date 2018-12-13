// @ts-ignore
import OK from '../../images/success.svg';
// @ts-ignore
import ERROR from '../../images/error.svg';
// @ts-ignore
import INFO from '../../images/info.svg';
// @ts-ignore
import WARNING from '../../images/minus.svg';

function notify(title: string, body?: string, icon?: string): void {
    const options: NotificationOptions = {};
    if (body) {
        options.body = body;
    }
    if (icon) {
        options.icon = `data:image/svg+xml;charset=utf-8,${encodeURI(icon)}`;
    }
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

export function info(title: string, body?: string): void {
    request(title, body, INFO);
}

export function err(title: string, body?: string): void {
    request(title, body, ERROR);
}

export function warn(title: string, body?: string): void {
    request(title, body, WARNING);
}

export function ok(title: string, body?: string): void {
    request(title, body, OK);
}
