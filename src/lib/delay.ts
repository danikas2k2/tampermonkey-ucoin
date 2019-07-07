export async function delay(time: number) {
    return await new Promise(resolve => setTimeout(() => resolve(), time));
}

export async function randomDelay(rndDelay = 1000, minDelay = 500) {
    const time = Math.round(minDelay + Math.random() * rndDelay);
    console.debug(`DELAY FOR ${time} MS`);
    return await delay(time);
}
