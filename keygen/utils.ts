import { Credential } from "ethereum-deposit";

// See EIP-2334 for more details.
// https://eips.ethereum.org/EIPS/eip-2334
const BASE_KEY_PATH = "m/12381/3600";

export const LAUNCHPAD_COMPATIBILITY_VERSION = "2.7.0";

export const getSigningKeyPath = (credential: Credential) => {
    return `${BASE_KEY_PATH}/${credential.index}/0/0`;
};
