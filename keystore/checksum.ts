import { concatBytes, equalBytes, Sha256ChecksumModule, toHex } from "./mod.ts";
import { hash } from "../utils/mod.ts";
import { toUtf8Bytes } from "ethers";

export const getChecksumModule = async (encryptionKey: Uint8Array, cipherText: Uint8Array): Promise<Sha256ChecksumModule> => {
    const checksum = await getChecksum(encryptionKey, cipherText);
    return {
        function: "sha256",
        params: {},
        message: toHex(checksum),
    };
};

const getChecksumData = (key: Uint8Array, cipherText: Uint8Array): Uint8Array => {
    return concatBytes(key.slice(16), cipherText);
};

export const getChecksum = async (key: Uint8Array, cipherText: Uint8Array): Promise<Uint8Array> => {
    return await hash(getChecksumData(key, cipherText));
};

export const verifyChecksum = async (mod: Sha256ChecksumModule, key: Uint8Array, cipherText: Uint8Array): Promise<boolean> => {
    const expectedChecksum = await hash(getChecksumData(key, cipherText));
    return equalBytes(toUtf8Bytes(mod.message), expectedChecksum);
};
