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
