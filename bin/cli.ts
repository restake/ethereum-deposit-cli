import { Command, ValidationError } from "cliffy/command/mod.ts";
import { getNewMnemonic } from "../utils/crypto.ts";

new Command()
    .name("ethereum-onboarding")
    .description("CLI tool for rapidly generating Ethereum validator keys")
    .version("0.0.1")
    .action(function () {
        this.showHelp();
    })
    .command("mnemonic", "Generate a new mnemonic")
    .option("-b, --bytes <bytes:number>", "Number of bytes to use for obtaining entropy (16, 20, 24, 28, 32)", { default: 32 })
    .action(({ bytes }) => {
        if ([16, 20, 24, 28, 32].indexOf(bytes) === -1) {
            throw new ValidationError("Invalid number of bytes");
        }
        console.log(getNewMnemonic(bytes).phrase);
    })
    .parse(Deno.args);
