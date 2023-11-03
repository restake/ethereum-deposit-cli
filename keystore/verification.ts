import { getEncryptionKey, getNormalizedPassword, hexToBytes, Keystore, verifyChecksum } from "./mod.ts";

export async function verifyPassword(keystore: Keystore, password: string): Promise<boolean> {
    const decryptionKey = await getEncryptionKey(keystore.crypto.kdf.params, getNormalizedPassword(password));
    const cipherText = hexToBytes(keystore.crypto.cipher.message);

    return verifyChecksum(keystore.crypto.checksum, decryptionKey, cipherText);
}
