import { Command } from "cliffy/command/command.ts";
import { ValidationError } from "cliffy/command/mod.ts";
import { Wallet } from "ethers";
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
    .option("--mnemonic <mnemonic:string>", "Mnemonic phrase")
    .option("--start-index <startIndex:number>", "Starting index for the validator keys")
    .arguments("<numValidators:number>")
    .action((opts, numValidators) => {
        if (opts.vaultEnabled && (!opts.vaultToken || !opts.vaultAddr || !opts.vaultKvMount || !opts.vaultNamespace)) {
            throw new ValidationError("Vault environment variables should be set when using Vault integration");
        }

        const vaultOptions: VaultOptions = {
            vaultAddr: opts.vaultAddr,
            vaultToken: opts.vaultToken,
            vaultKvMount: opts.vaultKvMount,
            vaultNamespace: opts.vaultNamespace,
        };

        if (opts.mnemonic) {
            validateMnemonic(opts.mnemonic);
        }

        const keygenOptions: KeygenOptions = {
            mnemonic: opts.mnemonic,
            startIndex: opts.startIndex ?? 0,
            storagePath: opts.storagePath,
            numValidators,
        };

        generate(keygenOptions, vaultOptions);
    });

const validateMnemonic = (mnemonic: string) => {
    try {
        Wallet.fromPhrase(mnemonic);
    } catch (_e) {
        throw new ValidationError("Invalid mnemonic");
    }
};
