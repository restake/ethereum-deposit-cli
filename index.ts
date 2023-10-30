import { MnemonicStore } from "./types.ts";
import { getNewMnemonic } from "./utils/crypto.ts";
import { storeMnemonic } from "./utils/storage.ts";
import { vault } from "./vault.ts";

console.log("Connecting to Vault...");
await vault.login();

addEventListener("unload", () => {
    console.log("Logging out from Vault...");
    vault.logout();
});

const store: MnemonicStore = {
    mnemonic: getNewMnemonic().phrase,
    nValidators: 5,
    startIndex: 0,
};

try {
    storeMnemonic(store);
} catch (e) {
    throw new Error("Unable to save mnemonic", {
        cause: e,
    });
}
