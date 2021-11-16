export async function delay(time: number): Promise<void> {
    return await new Promise((resolve) => setTimeout(() => resolve(), time));
}

export async function randomDelay(rndDelay = 1500, minDelay = 1500): Promise<void> {
    const time = Math.round(minDelay + Math.random() * rndDelay);
    // console.debug(`DELAY FOR ${time} MS`);
    return await delay(time);
}
