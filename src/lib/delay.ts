type DelayDecorator = (time: number, decorateFrom: number) => void;

const DECORATE_FROM_DELAY = 1000;

export async function delay(
    time: number,
    decorator?: DelayDecorator,
    decorateFrom = DECORATE_FROM_DELAY
): Promise<void> {
    if (time > decorateFrom) {
        decorator?.(time, decorateFrom);
    }
    return new Promise((resolve) => setTimeout(() => resolve(), time));
}

const DEFAULT_RANDOM_DELAY = 1500;
const MIN_RANDOM_DELAY = 1500;

export function getDelay(minDelay: number, rndDelay: number): number {
    return Math.round(minDelay + Math.random() * rndDelay);
}

export async function randomDelay(
    rndDelay = DEFAULT_RANDOM_DELAY,
    minDelay = MIN_RANDOM_DELAY,
    decorator?: DelayDecorator,
    decorateFrom = DECORATE_FROM_DELAY
): Promise<void> {
    return delay(getDelay(minDelay, rndDelay), decorator, decorateFrom);
}

export function decorateDelay(time: number): void {
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

export async function decoratedDelay(
    time: number,
    decorator: DelayDecorator = decorateDelay,
    decorateFrom = DECORATE_FROM_DELAY
): Promise<void> {
    return delay(time, decorator, decorateFrom);
}

export async function randomDecoratedDelay(
    rndDelay = DEFAULT_RANDOM_DELAY,
    minDelay = MIN_RANDOM_DELAY,
    decorator: DelayDecorator = decorateDelay,
    decorateFrom = DECORATE_FROM_DELAY
): Promise<void> {
    return randomDelay(rndDelay, minDelay, decorator, decorateFrom);
}
