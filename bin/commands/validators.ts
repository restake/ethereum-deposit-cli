import { Command } from "cliffy/command/command.ts";
import { ValidationError } from "cliffy/command/mod.ts";
import { Confirm, Input, prompt } from "cliffy/prompt/mod.ts";
import { Table } from "cliffy/table/mod.ts";
import { Tty, tty } from "cliffy/ansi/tty.ts";
import { isAddress, Wallet } from "ethers";

import { generate } from "../../core/validators/mod.ts";
import { KeygenOptions } from "../../core/validators/types.ts";

export const command = new Command()
    .description("Create new Ethereum validator keys and deposit data")
    .env("STORAGE_PATH=<value:string>", "Set the storage path")
    .option("--storage-path [storagePath:string]", "Path used for storing mnemonics and deposit data", { default: "./storage" })
    .option("--existing-mnemonic [existingMnemonic:boolean]", "Use an exisiting mnemonic phrase", { default: false })
    .option("--language <language:string>", "Language to use for mnemonic generation", { default: "english" })
    .option("--network <network:string>", "Ethereum network to use", { default: "mainnet" })
    .option("--start-index <startIndex:number>", "Starting index for the validator keys", { default: 0 })
    .arguments("<numValidators:number> <withdrawalAddress:string>")
    .action(async (opts, numValidators, withdrawalAddress) => {
        if (!isAddress(withdrawalAddress.toLowerCase())) {
            throw new ValidationError("Invalid withdrawal address");
        }
        const mnemonic = opts.existingMnemonic ? (await promptMnemonic()) : undefined;
        const keygenOptions = {
            mnemonic: mnemonic,
            startIndex: opts.startIndex,
            storagePath: opts.storagePath,
            language: opts.language,
            network: opts.network,
            numValidators,
            withdrawalAddress,
        };
        // Clear the screen and show an overview for the user to confirm.
        getTty().cursorSave.cursorHide.cursorTo(0, 0).eraseScreen();
        printOverview(keygenOptions);
        const confirm = await Confirm.prompt({
            message: "Proceed with key generation?",
            default: true,
        });
        if (!confirm) {
            Deno.exit(0);
        }
        generate(keygenOptions);
    });

const printOverview = (keygenOptions: KeygenOptions): void => {
    const table = new Table(
        ["Mnemonic", keygenOptions.mnemonic],
        ["Mnemonic Language", keygenOptions.language],
        ["Network", keygenOptions.network],
        ["Number of Validators", keygenOptions.numValidators],
        ["Starting Index", keygenOptions.startIndex],
        ["Withdrawal Address", keygenOptions.withdrawalAddress],
        ["Storage Path", keygenOptions.storagePath],
    ).border(true);
    console.log(table.toString());
};

const getTty = (): Tty => {
    return tty({
        writer: Deno.stdout,
        reader: Deno.stdin,
    });
};

const promptMnemonic = async (): Promise<string> => {
    const { mnemonic } = await prompt([{
        name: "mnemonic",
        message: "Enter your existing mnemonic phrase",
        type: Input,
        validate: (phrase) => {
            try {
                return !!Wallet.fromPhrase(phrase);
            } catch (_e) {
                return "Invalid mnemonic phrase";
            }
        },
    }]);
    // In our case, mnemonic can never be anything other than a string.
    // Type casting should be fine here.
    return mnemonic as string;
};
