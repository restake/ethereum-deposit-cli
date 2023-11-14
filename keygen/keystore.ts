import { Credential, CredentialList } from "ethereum-deposit";
import { resolve } from "$std/path/mod.ts";

import { getSigningKeyPath, SavedKeystore } from "./mod.ts";
import { createKeystore, Keystore, verifyPassword } from "../keystore/mod.ts";

export const createKeystores = async (credentials: CredentialList, password: string) => {
    const keystores: Keystore[] = [];
    for (const credential of credentials) {
        const keystore = await getEncryptedSigningKeystore(credential, password);
        keystores.push(keystore);
    }

    return keystores;
};

const getEncryptedSigningKeystore = async (credential: Credential, password: string): Promise<Keystore> => {
    const keyPath = getSigningKeyPath(credential);
    return await createKeystore(
        password,
        credential.signingSecretKey.toBytes(),
        credential.signingPublicKey.toBytes(),
        keyPath,
    );
};

export const saveSigningKeystores = async (keystores: Keystore[], storagePath: string): Promise<SavedKeystore[]> => {
    const savedKeystores: SavedKeystore[] = [];
    const timestamp = Math.floor(Date.now() / 1000);

    try {
        await Promise.all(keystores.map(async (keystore) => {
            const fileName = `keystore-${keystore.path.replace(/\//g, "-")}-${timestamp}.json`;
            try {
                await Deno.writeTextFile(
                    `${resolve(storagePath)}/${fileName}`,
                    JSON.stringify(
                        keystore,
                    ),
                );
                savedKeystores.push({ fileName, keystore });
            } catch (e) {
                throw new Error(`Keystore saving failed: ${fileName}`, {
                    cause: e,
                });
            }
        }));

        return savedKeystores;
    } catch (e) {
        throw new Error("Unable to save signing keystores", {
            cause: e,
        });
    }
};

export const verifySigningKeystores = async (storagePath: string, savedKeystores: SavedKeystore[], password: string): Promise<boolean> => {
    for (const savedKeystore of savedKeystores) {
        let rawKeystoreData: string;
        try {
            rawKeystoreData = await Deno.readTextFile(`${resolve(storagePath)}/${savedKeystore.fileName}`);
        } catch (e) {
            throw new Error(`Unable to read signing keystore: ${savedKeystore.fileName}`, {
                cause: e,
            });
        }
        const parsedKeystoreData = JSON.parse(rawKeystoreData) as Keystore;
        if (!await verifyPassword(parsedKeystoreData, password)) {
            return false;
        }
    }

    return true;
};
