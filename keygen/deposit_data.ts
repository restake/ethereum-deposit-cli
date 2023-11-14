import { CredentialList } from "ethereum-deposit";

import { DepositData, SavedDepositData } from "./mod.ts";
import { resolve } from "$std/path/mod.ts";

export const getDepositData = (credentials: CredentialList): DepositData[] => {
    return Array.from(credentials.map((credential) =>
        ({
            ...credential.depositData,
            amount: credential.amount,
        }) as DepositData
    ));
};

export const saveDepositData = async (credentials: CredentialList, storagePath: string): Promise<SavedDepositData> => {
    const depositData = getDepositData(credentials);
    const timestamp = Math.floor(Date.now() / 1000);
    const fileName = `deposit_data-${timestamp}.json`;
    try {
        await Deno.writeTextFile(
            `${resolve(storagePath)}/${fileName}`,
            JSON.stringify(
                depositData,
            ),
        );
    } catch (e) {
        throw new Error("Unable to save deposit data file", {
            cause: e,
        });
    }

    return {
        depositData,
        fileName,
    };
};

export const verifyDepositData = async (storagePath: string, fileName: string, depositData: DepositData[]): Promise<boolean> => {
    let rawDepositData: string;
    try {
        rawDepositData = await Deno.readTextFile(`${resolve(storagePath)}/${fileName}`);
    } catch (e) {
        throw new Error("Unable to read deposit data file", {
            cause: e,
        });
    }
    const parsedDepositData = JSON.parse(rawDepositData) as DepositData[];

    return parsedDepositData.every((depositDatum, index) => {
        return depositDatum.signature === depositData[index].signature;
    });
};
