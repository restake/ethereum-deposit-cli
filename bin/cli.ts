import { Command } from "cliffy/command/mod.ts";
import { command as createMnemonicCommand } from "./commands/mnemonic.ts";
import { command as createValidatorsCommand } from "./commands/validators.ts";

new Command()
    .name("ethereum-onboarding")
    .description("CLI tool for rapidly generating Ethereum validator keys")
    .version("0.0.1")
    .action(function () {
        this.showHelp();
    })
    .command("mnemonic", createMnemonicCommand)
    .command("create-validators", createValidatorsCommand)
    .parse(Deno.args);
