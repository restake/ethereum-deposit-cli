import { MnemonicStore } from "./core/validators/mod.ts";
import { getNewMnemonic } from "./utils/crypto.ts";
import { storeMnemonic } from "./utils/storage.ts";
import { vault } from "./utils/vault.ts";

console.log("Connecting to Vault...");
await vault.login();

addEventListener("unload", () => {
    console.log("Logging out from Vault...");
    vault.logout();
});

const store: MnemonicStore = {
    mnemonic: getNewMnemonic().phrase,
    numValidators: 5,
    startIndex: 0,
};

try {
    storeMnemonic(store);
} catch (e) {
    throw new Error("Unable to save mnemonic", {
        cause: e,
    });
}
