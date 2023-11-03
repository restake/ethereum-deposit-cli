export const getNormalizedPassword = (password: string): Uint8Array => {
    const encoder = new TextEncoder();
    const normalized = password.normalize("NFKD").split("").filter((char) => getControlCodeFilter(char.charCodeAt(0))).join("");

    return encoder.encode(normalized);
};

const getControlCodeFilter = (char: number): boolean => {
    return (char > 0x1F) && !(char >= 0x7f && char <= 0x9F);
};
