export function getCurrentVarietyId() {
    const vid = new URL(document.location.href).searchParams.get('vid');
    if (vid) {
        return vid;
    }

    const form = document.querySelector<HTMLFormElement>('#edit-coin-form form');
    if (form) {
        const variety = new FormData(form).get('variety');
        if (variety) {
            return variety.toString();
        }
    }

    return null;
}
