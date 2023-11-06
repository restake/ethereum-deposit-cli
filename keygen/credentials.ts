import { Credential, CredentialList } from "ethereum-deposit";

import { createKeystore, Keystore, verifyPassword } from "../keystore/mod.ts";
import { getSigningKeyPath, KeygenOptions } from "./mod.ts";
import { resolve } from "$std/path/mod.ts";

export const generateCredentials = async (keygenOptions: KeygenOptions): Promise<Keystore[]> => {
    const keystores: Keystore[] = [];
    const credentials = new CredentialList(
        keygenOptions.mnemonic,
        keygenOptions.numValidators,
        keygenOptions.network,
        32 * 1e9, // 32 ETH in Gwei
        keygenOptions.withdrawalAddress,
        keygenOptions.startIndex,
    );

    for (const credential of credentials) {
        const keystore = await getEncryptedSigningKeystore(credential, keygenOptions.password);
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

export const saveSigningKeystores = (keystores: Keystore[], storagePath: string): void => {
    const timestamp = Math.floor(Date.now() / 1000);
    for (const keystore of keystores) {
        const filename = `keystore-${keystore.path.replace(/\//g, "-")}-${timestamp}.json`;
        Deno.writeTextFileSync(
            `${resolve(storagePath)}/${filename}`,
            JSON.stringify(
                keystore,
            ),
        );
    }
};

export const verifySigningKeystores = async (storagePath: string, password: string): Promise<boolean> => {
    const resolvedPath = resolve(storagePath);
    const keystoreFiles = Deno.readDir(resolvedPath);

    for await (const keystoreFile of keystoreFiles) {
        if (keystoreFile.isFile && keystoreFile.name.endsWith(".json")) {
            const keystore = JSON.parse(Deno.readTextFileSync(`${resolvedPath}/${keystoreFile.name}`));
            if (!await verifyPassword(keystore, password)) {
                return false;
            }
        }
    }

    return true;
};
