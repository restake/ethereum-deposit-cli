import { CredentialList } from "ethereum-deposit";

import { DepositData } from "./mod.ts";

export const getDepositData = (credentials: CredentialList): DepositData[] => {
    const depositData: DepositData[] = Array.from(credentials.map((credential) =>
        ({
            ...credential.depositData,
            amount: credential.amount,
        }) as DepositData
    ));

    return depositData;
};
