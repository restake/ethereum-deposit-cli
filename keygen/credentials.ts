import { Credential, CredentialList } from "ethereum-deposit";

import { createKeystore, Keystore } from "../keystore/mod.ts";
import { getSigningKeyPath, KeygenOptions } from "./mod.ts";

export const generate = async (keygenOptions: KeygenOptions): Promise<void> => {
    const credentials = getCredentialList(keygenOptions);
    const keystores: Keystore[] = [];

    for (const credential of credentials) {
        const keystore = await getEncryptedSigningKeystore(credential, keygenOptions.password);
        keystores.push(keystore);
    }

    console.log(JSON.stringify(keystores));
};

const getCredentialList = (keygenOptions: KeygenOptions): CredentialList => {
    return new CredentialList(
        keygenOptions.mnemonic,
        keygenOptions.numValidators,
        keygenOptions.network,
        32 * 1e9, // 32 ETH in Gwei
        keygenOptions.withdrawalAddress,
        keygenOptions.startIndex,
    );
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
