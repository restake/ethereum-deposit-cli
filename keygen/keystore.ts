import { Credential, CredentialList } from "ethereum-deposit";
import { resolve } from "$std/path/mod.ts";

import { getSigningKeyPath } from "./mod.ts";
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

export const saveSigningKeystores = async (keystores: Keystore[], storagePath: string): Promise<void> => {
    const timestamp = Math.floor(Date.now() / 1000);

    await Promise.all(keystores.map(async (keystore) => {
        const filename = `keystore-${keystore.path.replace(/\//g, "-")}-${timestamp}.json`;
        return await Deno.writeTextFile(
            `${resolve(storagePath)}/${filename}`,
            JSON.stringify(
                keystore,
            ),
        );
    }));
};

export const verifySigningKeystores = async (storagePath: string, password: string): Promise<boolean> => {
    const resolvedPath = resolve(storagePath);
    const keystoreFiles = Deno.readDir(resolvedPath);

    for await (const keystoreFile of keystoreFiles) {
        if (keystoreFile.isFile && keystoreFile.name.startsWith("keystore-m-") && keystoreFile.name.endsWith(".json")) {
            const keystore = JSON.parse(await Deno.readTextFile(`${resolvedPath}/${keystoreFile.name}`));
            if (!await verifyPassword(keystore, password)) {
                return false;
            }
        }
    }

    return true;
};
