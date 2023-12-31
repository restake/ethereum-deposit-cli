import { Table } from "cliffy/table/table.ts";

import { KeygenOptions } from "../../../keygen/mod.ts";
import { eraseScreen } from "../../utils/mod.ts";

export const getOverviewTable = (keygenOptions: KeygenOptions): Promise<void> => {
    const table = new Table(
        ["Mnemonic", keygenOptions.mnemonic],
        ["Mnemonic Language", keygenOptions.language],
        ["Network", keygenOptions.network],
        ["Number of Validators", keygenOptions.numValidators],
        ["Starting Index", keygenOptions.startIndex],
        ["Withdrawal Address", keygenOptions.withdrawalAddress],
        ["Storage Path", keygenOptions.storagePath],
    ).border();

    return new Promise((resolve) => {
        eraseScreen();
        console.log(table.toString());
        resolve();
    });
};
