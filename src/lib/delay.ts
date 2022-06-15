type DelayDecorator = (time: number, decorateFrom: number) => void;

export function decorateDelay(time: number) {
    const id = 'display-delay';
    let el = document.getElementById(id);
    if (!el) {
        document.body.insertAdjacentHTML('beforeend', `<div id='${id}'/>`);
        el = document.getElementById(id);
    }
    if (el) {
        el.innerHTML = `<div style='animation-duration: ${time}ms'/>`;
    }
}

const DECORATE_FROM_DELAY = 1000;

export async function delay(
    time: number,
    decorator: DelayDecorator = decorateDelay,
    decorateFrom = DECORATE_FROM_DELAY
): Promise<void> {
    if (time > decorateFrom) {
        decorator(time, decorateFrom);
    }
    return new Promise((resolve) => setTimeout(() => resolve(), time));
}

const DEFAULT_RANDOM_DELAY = 1500;
const MIN_RANDOM_DELAY = 1500;

export async function randomDelay(
    rndDelay = DEFAULT_RANDOM_DELAY,
    minDelay = MIN_RANDOM_DELAY,
    decorator: DelayDecorator = decorateDelay,
    decorateFrom = DECORATE_FROM_DELAY
): Promise<void> {
    return delay(Math.round(minDelay + Math.random() * rndDelay), decorator, decorateFrom);
}
