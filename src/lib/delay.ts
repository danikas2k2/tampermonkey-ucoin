export async function delay(time: number): Promise<void> {
    console.debug(`DELAY FOR ${time} MS`);
    if (time > 1000) {
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
    return await new Promise((resolve) => setTimeout(() => resolve(), time));
}

export async function randomDelay(rndDelay = 1500, minDelay = 1500): Promise<void> {
    const time = Math.round(minDelay + Math.random() * rndDelay);
    return await delay(time);
}
