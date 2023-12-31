import { cipherDecrypt } from "./cipher.ts";
import {
    getAes128CtrCipherModule,
    getChecksumModule,
    getKdfKey,
    getPbkdf2Module,
    hexToBytes,
    Keystore,
    toHex,
    verifyChecksum,
} from "./mod.ts";
import { getNormalizedPassword } from "./password.ts";

export const createKeystore = async (
    password: string,
    secretKey: Uint8Array,
    publicKey: Uint8Array,
    path: string,
    description: string | null = null,
): Promise<Keystore> => {
    const kdfModule = getPbkdf2Module();
    const encryptionKey = await getKdfKey(kdfModule.params, getNormalizedPassword(password));
    const cipherModule = await getAes128CtrCipherModule(encryptionKey, secretKey);
    const checksumModule = await getChecksumModule(encryptionKey, hexToBytes(cipherModule.message));

    return {
        crypto: {
            kdf: kdfModule,
            checksum: checksumModule,
            cipher: cipherModule,
        },
        description: description || "",
        path: path,
        pubkey: toHex(publicKey),
        uuid: crypto.randomUUID(),
        version: 4,
    };
};

export const decryptKeystore = async (keystore: Keystore, password: string): Promise<Uint8Array> => {
    const decryptionKey = await getKdfKey(keystore.crypto.kdf.params, getNormalizedPassword(password));
    const cipherText = hexToBytes(keystore.crypto.cipher.message);

    if (!(await verifyChecksum(keystore.crypto.checksum, decryptionKey, cipherText))) {
        throw new Error("Invalid password");
    }

    return cipherDecrypt(decryptionKey.slice(0, 16), cipherText, hexToBytes(keystore.crypto.cipher.params.iv));
};
