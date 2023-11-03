export const concatBytes = (a: Uint8Array, b: Uint8Array): Uint8Array => {
    const result = new Uint8Array(a.length + b.length);
    result.set(a);
    result.set(b, a.length);
    return result;
};

export const equalBytes = (a: Uint8Array, b: Uint8Array): boolean => {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
};

export const toHex = (bytes: Uint8Array): string => {
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const randomBytes = (count: number): Uint8Array => {
    return crypto.getRandomValues(new Uint8Array(count));
};

export const hexToBytes = (hex: string): Uint8Array => {
    const bytes = new Uint8Array(Math.ceil(hex.length / 2));
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
    }
    return bytes;
};
