
export function transformEvent(event, metadata) {
    const property = event.event; // Edit event name
    const allowlist = ["<VALUE>", "<OTHER_VALUE>"]; // Edit allowlist contents
    if (!property || !allowlist.includes(property)) return;
    return event;
}