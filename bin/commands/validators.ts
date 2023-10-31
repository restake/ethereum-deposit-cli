import { Command } from "cliffy/command/command.ts";
import { ValidationError } from "cliffy/command/mod.ts";
import { isAddress, Wallet } from "ethers";
import { generate, KeygenOptions, VaultOptions } from "../../core/validators/mod.ts";

export const command = new Command()
    .description("Create new Ethereum validator keys and deposit data")
    .env("VAULT_KV_MOUNT=<value:string>", "Set the Vault KV mount path")
    .env("VAULT_ADDR=<value:string>", "Set the Vault URL")
    .env("VAULT_TOKEN=<value:string>", "Set the Vault token")
    .env("VAULT_NAMESPACE=<value:string>", "Set the Vault namespace")
    .env("STORAGE_PATH=<value:string>", "Set the storage path")
    .option("--storage-path [storagePath:string]", "Path used for storing mnemonics and deposit data", { default: "./storage" })
    .option("--vault-enabled [vaultEnabled:boolean]", "Enable Vault integration", { default: false })
    .option("--mnemonic <mnemonic:string>", "Use an exisiting mnemonic phrase")
    .option("--start-index <startIndex:number>", "Starting index for the validator keys", { default: 0 })
    .arguments("<numValidators:number> <withdrawalAddress:string>")
    .action((opts, numValidators, withdrawalAddress) => {
        if (opts.vaultEnabled && (!opts.vaultToken || !opts.vaultAddr || !opts.vaultKvMount || !opts.vaultNamespace)) {
            throw new ValidationError("Vault environment variables should be set when using Vault integration");
        }
        if (opts.mnemonic) {
            try {
                Wallet.fromPhrase(opts.mnemonic);
            } catch (_e) {
                throw new ValidationError("Invalid mnemonic");
            }
        }
        if (!isAddress(withdrawalAddress)) {
            throw new ValidationError("Invalid withdrawal address");
        }

        generate({
            mnemonic: opts.mnemonic,
            startIndex: opts.startIndex,
            storagePath: opts.storagePath,
            numValidators,
            withdrawalAddress,
        }, {
            vaultAddr: opts.vaultAddr,
            vaultToken: opts.vaultToken,
            vaultKvMount: opts.vaultKvMount,
            vaultNamespace: opts.vaultNamespace,
        });
    });
