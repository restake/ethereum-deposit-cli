import { EthereumDepositData } from "ethereum-deposit";

export type KeygenOptions = {
    mnemonic: string;
    password: string;
    numValidators: number;
    language: string;
    network: string;
    withdrawalAddress: string;
    startIndex: number;
    storagePath: string;
};

export type DepositData = EthereumDepositData & {
    amount: number;
};

export type SavedDepositData = {
    depositData: DepositData[];
    fileName: string;
};
