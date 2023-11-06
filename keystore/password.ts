export const getNormalizedPassword = (password: string): Uint8Array => {
    // See https://eips.ethereum.org/EIPS/eip-2335#password-requirements for more information.
    const normalized = password.normalize("NFKD").split("").filter((char) => getControlCodeFilter(char.charCodeAt(0))).join("");
    return new TextEncoder().encode(normalized);
};

const getControlCodeFilter = (char: number): boolean => {
    // See https://eips.ethereum.org/EIPS/eip-2335#control-codes-removal for more information.
    return (char > 0x1F) && !(char >= 0x7f && char <= 0x9F);
};
