import { toUtf8Bytes } from "ethers";

export const getNormalizedPassword = (password: string): Uint8Array => {
    const normalized = password.normalize("NFKD").split("").filter(char => getControlCodeFilter(char.charCodeAt(0))).join("");
    return toUtf8Bytes(normalized);
};

const getControlCodeFilter = (char: number): boolean => {
    return (char > 0x1F) && !(char >= 0x7f && char <= 0x9F);
};
