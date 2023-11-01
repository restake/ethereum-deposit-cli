export type MnemonicStore = {
    mnemonic: string;
    numValidators: number;
    startIndex: number;
};

export type KeygenOptions = {
    mnemonic: string | undefined;
    password: string;
    numValidators: number;
    language: string;
    network: string;
    withdrawalAddress: string;
    startIndex: number;
    storagePath: string;
};
