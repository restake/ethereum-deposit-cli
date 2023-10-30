import { VAULT_AUTH_TYPE, VaultAuthentication, VaultClient, VaultTokenCredentials } from "vault";

import config from "../config.ts";

let authentication: VaultAuthentication;

if (config.VAULT_TOKEN) {
    authentication = <VaultTokenCredentials> {
        [VAULT_AUTH_TYPE]: "token",
        mountpoint: "auth/token",
        token: config.VAULT_TOKEN,
    };
} else {
    throw new Error("Vault token not available");
}

export const vault = new VaultClient({
    address: config.VAULT_ADDR,
    namespace: config.VAULT_NAMESPACE,
    authentication,
});
