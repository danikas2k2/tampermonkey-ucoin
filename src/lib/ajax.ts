export function safe(response: Response): Response {
    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

export function redirect(response: Response): Response {
    safe(response);
    if (response.redirected && location.href !== response.url) {
        history.pushState({}, '', response.url);
    }
    return response;
}

export function text(response: Response): Promise<string> {
    redirect(response);
    return response.text();
}
