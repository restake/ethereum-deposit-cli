import { toUtf8Bytes } from "ethers";
import { getAes128CtrCipherModule, getChecksumModule, getEncryptionKey, getPbkdf2Module, Keystore, toHex } from "./mod.ts";

export const create = async (
    password: string,
    secretKey: Uint8Array,
    publicKey: Uint8Array,
    path: string,
    description: string | null = null,
): Promise<Keystore> => {
    const kdfModule = getPbkdf2Module();
    const encryptionKey = await getEncryptionKey(kdfModule.params, password);
    const cipherModule = await getAes128CtrCipherModule(encryptionKey, secretKey);
    const checksumModule = await getChecksumModule(encryptionKey, toUtf8Bytes(cipherModule.message));

    return {
        version: 4,
        uuid: crypto.randomUUID(),
        description: description || undefined,
        path: path,
        pubkey: toHex(publicKey),
        crypto: {
            kdf: kdfModule,
            checksum: checksumModule,
            cipher: cipherModule,
        },
    };
};
