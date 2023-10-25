import { Mnemonic, randomBytes, Wallet } from "ethers";

try {
    const wallet = Wallet.fromPhrase(
        Mnemonic.fromEntropy(randomBytes(32)).phrase,
    );
    console.log(wallet.mnemonic?.phrase);
} catch (e) {
    throw new Error("Unable to generate a mnemonic", {
        cause: e,
    });
}
