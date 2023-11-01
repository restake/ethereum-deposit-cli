import { Command } from "cliffy/command/mod.ts";
import { mnemonicCommand } from "./commands/mnemonic/mod.ts";
import { validatorsCommand } from "./commands/validator/mod.ts";

new Command()
    .name("ethereum-deposit-cli")
    .description("Secure key generation for deposits")
    .version("0.0.1")
    .action(function () {
        this.showHelp();
    })
    .command("mnemonic", mnemonicCommand)
    .command("create-validators", validatorsCommand)
    .parse(Deno.args);
