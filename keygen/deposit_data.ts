import { CredentialList } from "ethereum-deposit";

import { DepositData } from "./mod.ts";
import { resolve } from "$std/path/mod.ts";

export const getDepositData = (credentials: CredentialList): DepositData[] => {
    return Array.from(credentials.map((credential) =>
        ({
            ...credential.depositData,
            amount: credential.amount,
        }) as DepositData
    ));
};

export const saveDepositData = async (depositData: DepositData[], storagePath: string): Promise<string> => {
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

    return fileName;
};

export const verifyDepositData = async (storagePath: string, fileName: string, depositData: DepositData[]): Promise<boolean> => {
    let depositDataFile: Uint8Array;
    try {
        depositDataFile = await Deno.readFile(`${resolve(storagePath)}/${fileName}`);
    } catch (e) {
        throw new Error("Unable to read deposit data file", {
            cause: e,
        });
    }
    const parsedDepositData = JSON.parse(new TextDecoder().decode(depositDataFile)) as DepositData[];

    return parsedDepositData.every((depositDatum, index) => {
        return depositDatum.signature === depositData[index].signature;
    });
};
