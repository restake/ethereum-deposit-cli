import { getKdfKey, getNormalizedPassword, hexToBytes, Keystore, verifyChecksum } from "./mod.ts";

export async function verifyPassword(keystore: Keystore, password: string): Promise<boolean> {
    const decryptionKey = await getKdfKey(keystore.crypto.kdf.params, getNormalizedPassword(password));
    const cipherText = hexToBytes(keystore.crypto.cipher.message);

    return verifyChecksum(keystore.crypto.checksum, decryptionKey, cipherText);
}
