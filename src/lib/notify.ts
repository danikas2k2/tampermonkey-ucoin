// import ERROR from '../../images/error.svg';
// import INFO from '../../images/info.svg';
// import WARNING from '../../images/minus.svg';
// import OK from '../../images/success.svg';

// function notify(title: string, body?: string, icon?: string): void {
//     const options: NotificationOptions = {};
//     if (body) {
//         options.body = body;
//     }
//     if (icon) {
//         options.icon = `data:image/svg+xml;charset=utf-8,${encodeURI(icon)}`;
//     }
//     // eslint-disable-next-line no-new
//     new Notification(title, options);
// }

// async function request(title: string, body?: string, icon?: string): Promise<void> {
//     if (!('Notification' in window)) {
//         // eslint-disable-next-line no-alert
//         alert(title);
//     } else if (Notification.permission === 'granted') {
//         notify(title, body, icon);
//     } else if (Notification.permission !== 'denied') {
//         const permission = await Notification.requestPermission();
//         if (permission === 'granted') {
//             notify(title, body, icon);
//         }
//     }
// }

// export async function info(title: string, body?: string): Promise<void> {
//     await request(title, body, INFO);
// }

// export async function err(title: string, body?: string): Promise<void> {
//     await request(title, body, ERROR);
// }

// export async function warn(title: string, body?: string): Promise<void> {
//     await request(title, body, WARNING);
// }

// export async function ok(title: string, body?: string): Promise<void> {
//     await request(title, body, OK);
// }
