import { tagMaxLength } from "../config/dbMaxLengths";

export function checkArrayLengths(tags: string[], toShort: boolean) {
    let error = false;

    for (let i = 0; i < tags.length; i++) {
        const tagSection = tags[i];
        if (tagSection.length > tagMaxLength && !toShort) {
            error = true;
        }
        if (tagSection.length <= 0 && toShort) {
            error = true;
        }
    }

    return !error;
}
