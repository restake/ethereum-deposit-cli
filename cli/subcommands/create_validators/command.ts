import { isAddress } from "ethers";
import { Command, ValidationError } from "cliffy/command/mod.ts";

import { getOverviewTable, promptConfirm, promptMnemonic, promptPassword, ALLOWED_NETWORKS } from "./mod.ts";
import { ALLOWED_LANGUAGES } from "../mnemonic/mod.ts";

import { generate } from "../../../keygen/mod.ts";

export const command = new Command()
    .description("Create new Ethereum validator keys and deposit data")
    .option("--storage-path <storagePath:string>", "Path used for storing mnemonics and deposit data", { default: "./storage" })
    .option("--existing-mnemonic [existingMnemonic:boolean]", "Use an exisiting mnemonic phrase", { default: false })
    .option("--language <language:string>", `Language to use for the mnemonic (${ALLOWED_LANGUAGES.join(", ")})`, { default: "en" })
    .option("--network <network:string>", `Ethereum network to use ${ALLOWED_NETWORKS.join(", ")}`, { default: "mainnet" })
    .option("--start-index <startIndex:number>", "Starting index for the validator keys", { default: 0 })
    .arguments("<numValidators:number> <withdrawalAddress:string>")
    .action(async (options, numValidators, withdrawalAddress) => {
        if (numValidators < 1) {
            throw new ValidationError("You must create at least one validator");
        }
        if (!isAddress(withdrawalAddress)) {
            throw new ValidationError("Invalid withdrawal address");
        }
        if (ALLOWED_LANGUAGES.indexOf(options.language) === -1) {
            throw new ValidationError(`Invalid language. Language must be one of ${ALLOWED_LANGUAGES.join(", ")}`);
        }
        if (ALLOWED_NETWORKS.indexOf(options.network) === -1) {
            throw new ValidationError(`Invalid network. Network must be one of ${ALLOWED_NETWORKS.join(", ")}`);
        }

        const mnemonic = await promptMnemonic(options.existingMnemonic, options.language);
        const password = await promptPassword();
        const keygenOptions = {
            mnemonic,
            password,
            numValidators,
            withdrawalAddress,
            ...options,
        };
        // Clear the screen and show an overview for the user to confirm.
        getOverviewTable(keygenOptions).then(promptConfirm).then(() => {
            generate(keygenOptions);
        });
    });