import { CredentialList } from "ethereum-deposit";

import { keygenOptionsFixture } from "./keygen_options.ts";

export const credentialsFixture = new CredentialList(
    keygenOptionsFixture.mnemonic,
    keygenOptionsFixture.numValidators,
    keygenOptionsFixture.network,
    32 * 1e9,
    keygenOptionsFixture.withdrawalAddress,
    keygenOptionsFixture.startIndex,
);
