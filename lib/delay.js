
export async function delay(time) {
    return () => {
        const ret = new Promise();
        setTimeout(() => {
            ret.resolve();
        }, time);
        return ret;
    };
}

const minDelay = 300; // ms
const rndDelay = 500; // ms

export function randomDelay() {
    return delay(Math.round(minDelay + Math.random() * rndDelay));
}
