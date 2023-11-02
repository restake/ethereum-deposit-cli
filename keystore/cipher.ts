import { randomBytes } from "ethers";
import { Aes128CtrCipherModule, toHex } from "./mod.ts";

export const getAes128CtrCipherModule = async (encryptionKey: Uint8Array, secretKey: Uint8Array): Promise<Aes128CtrCipherModule> => {
    return {
        function: "aes-128-ctr",
        params: {
            iv: toHex(randomBytes(16)),
        },
        message: toHex(await cipherEncrypt(encryptionKey, secretKey, randomBytes(16))),
    };
};

export const cipherEncrypt = async (key: Uint8Array, data: Uint8Array, iv: Uint8Array): Promise<Uint8Array> => {
    const cipherKey = await crypto.subtle.importKey(
        "raw",
        key,
        { name: "AES-CTR", length: 128 },
        false,
        ["encrypt"],
    );

    const encrypted = await crypto.subtle.encrypt(
        {
            name: "AES-CTR",
            counter: iv,
            length: 128,
        },
        cipherKey,
        data,
    );

    return new Uint8Array(encrypted);
};

// TODO: implement decrypt
