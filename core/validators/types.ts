export type MnemonicStore = {
    mnemonic: string;
    numValidators: number;
    startIndex: number;
};

export type KeygenOptions = {
    mnemonic: string | undefined;
    numValidators: number;
    network: string;
    withdrawalAddress: string;
    startIndex: number;
    storagePath: string;
};

export type VaultOptions = {
    vaultAddr: string | undefined;
    vaultToken: string | undefined;
    vaultKvMount: string | undefined;
    vaultNamespace: string | undefined;
};
