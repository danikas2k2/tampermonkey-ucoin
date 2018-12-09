
export function delay(time: number): () => Promise<void> {
    return () => new Promise<void>(resolve => setTimeout(() => resolve(), time));
}

const minDelay = 300; // ms
const rndDelay = 500; // ms

export function randomDelay(): () => Promise<void> {
    return delay(Math.round(minDelay + Math.random() * rndDelay));
}
