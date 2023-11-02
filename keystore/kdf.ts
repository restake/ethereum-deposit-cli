import { randomBytes, toUtf8Bytes } from "ethers";
import { Pbkdf2Module, Pbkdf2Parameters, toHex } from "./mod.ts";

const PBKDF2_PARAMS = {
    dklen: 32,
    c: 262144,
    prf: "hmac-sha256",
} as const;

export const getPbkdf2Module = (): Pbkdf2Module => {
    return {
        function: "pbkdf2",
        params: {
            ...PBKDF2_PARAMS,
            salt: toHex(randomBytes(32)),
        },
        message: "",
    };
};

const getBaseKey = async (password: string): Promise<CryptoKey> => {
    return await crypto.subtle.importKey(
        "raw",
        toUtf8Bytes(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"],
    );
};

export const getEncryptionKey = async (params: Pbkdf2Parameters, password: string): Promise<Uint8Array> => {
    const baseKey = await getBaseKey(password);
    const encryptionKey = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: toUtf8Bytes(params.salt),
            iterations: params.c,
            hash: "SHA-256",
        },
        baseKey,
        params.dklen * 8, // 256 bits
    );

    return new Uint8Array(encryptionKey);
};
