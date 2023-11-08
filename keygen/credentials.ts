import { CredentialList } from "ethereum-deposit";
import { KeygenOptions } from "./mod.ts";

export const generateCredentials = (keygenOptions: KeygenOptions): CredentialList => {
    return new CredentialList(
        keygenOptions.mnemonic,
        keygenOptions.numValidators,
        keygenOptions.network,
        32 * 1e9, // 32 ETH in Gwei
        keygenOptions.withdrawalAddress,
        keygenOptions.startIndex,
    );
};
