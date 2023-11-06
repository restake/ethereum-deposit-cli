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
    if (hex.length % 2 !== 0) {
        throw new Error("Invalid hex string");
    }
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
    }
    return bytes;
};

/**
 * Generic hashing function.
 * Works with a list of hashing algorithms.
 * See: https://deno.land/std@0.204.0/crypto/crypto.ts
 * @param data
 * @param algo
 * @returns Uint8Array
 */
export const digest = async <T extends string | Uint8Array>(data: T, algo = "SHA-256"): Promise<Uint8Array> => {
    const dataBytes = data instanceof Uint8Array ? data : new TextEncoder().encode(data);
    const digest = await crypto.subtle.digest(
        algo,
        dataBytes.buffer,
    );

    return new Uint8Array(digest);
};
