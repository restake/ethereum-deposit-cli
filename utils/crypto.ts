import { Mnemonic, randomBytes, Wallet } from "ethers";

/**
 * Generic hashing function.
 * Works with a list of hashing algorithms.
 * See: https://deno.land/std@0.204.0/crypto/crypto.ts
 * @param data
 * @param algo
 * @returns Uint8Array
 */
export const hash = async <T extends string | Uint8Array>(data: T, algo = "SHA-256"): Promise<Uint8Array> => {
    const dataBytes = data instanceof Uint8Array ? data : new TextEncoder().encode(data);
    const digest = await crypto.subtle.digest(
        algo,
        dataBytes.buffer,
    );

    return new Uint8Array(digest);
};

/**
 * Generates a new BIP-39 mnemonic.
 * @param bytes
 * @returns Mnemonic
 */
export const getNewMnemonic = (bytes = 32): Mnemonic => {
    try {
        const wallet = Wallet.fromPhrase(
            Mnemonic.fromEntropy(randomBytes(bytes)).phrase,
        );

        if (!wallet.mnemonic) {
            throw new Error("Unsupported wallet");
        }

        return wallet.mnemonic;
    } catch (e) {
        throw new Error("Unable to generate a mnemonic", {
            cause: e,
        });
    }
};
