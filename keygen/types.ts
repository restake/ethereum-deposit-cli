import { EthereumDepositData } from "ethereum-deposit";
import { Keystore } from "../keystore/mod.ts";

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
    deposit_cli_version: string;
};

export type SavedDepositData = {
    depositData: DepositData[];
    fileName: string;
};

export type SavedKeystore = {
    keystore: Keystore;
    fileName: string;
};
