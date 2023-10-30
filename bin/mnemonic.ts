import { getNewMnemonic } from "../utils/crypto.ts";

try {
    const mnemonic = getNewMnemonic();
    console.log(mnemonic.phrase);
} catch (e) {
    throw new Error("Unable to obtain a new mnemonic", {
        cause: e,
    });
}
