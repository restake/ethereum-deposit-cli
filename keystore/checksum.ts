import { concatBytes, digest, equalBytes, hexToBytes, Sha256ChecksumModule, toHex } from "./mod.ts";

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
    return await digest(getChecksumData(key, cipherText));
};

export const verifyChecksum = async (mod: Sha256ChecksumModule, key: Uint8Array, cipherText: Uint8Array): Promise<boolean> => {
    const expectedChecksumAsHex = toHex(await digest(getChecksumData(key, cipherText)));

    return equalBytes(hexToBytes(mod.message), hexToBytes(expectedChecksumAsHex));
};
