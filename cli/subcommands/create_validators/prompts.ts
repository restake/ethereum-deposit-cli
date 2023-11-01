import { Confirm, Input, prompt, Secret } from "cliffy/prompt/mod.ts";
import { Mnemonic, randomBytes, wordlists } from "ethers";

export const promptPassword = async (): Promise<string> => {
    const { password } = await prompt([{
        name: "password",
        message: "Enter a password for your keystore",
        type: Secret,
        minLength: 8,
    }, {
        name: "passwordConfirm",
        message: "Confirm your keystore password",
        type: Secret,
        after: async ({ password, passwordConfirm }, next) => {
            if (password !== passwordConfirm) {
                await next("passwordConfirm");
            }
        },
    }]);

    return password as string;
};

export const promptConfirm = async (): Promise<void> => {
    const confirm = await Confirm.prompt({
        message: "Proceed with key generation?",
        default: true,
    });

    if (!confirm) {
        Deno.exit(0);
    }
};

export const promptMnemonic = async (existingMnemonic: boolean, language: string): Promise<string> => {
    if (existingMnemonic) {
        return await promptExistingMnemonic(language);
    }

    return Mnemonic.fromEntropy(randomBytes(32), null, wordlists[language]).phrase;
};

const promptExistingMnemonic = async (language: string): Promise<string> => {
    const { mnemonic } = await prompt([{
        name: "mnemonic",
        message: "Enter your existing mnemonic phrase",
        type: Input,
        validate: (phrase) => {
            try {
                return !!Mnemonic.fromPhrase(phrase, null, wordlists[language]);
            } catch (_e) {
                return "Invalid mnemonic phrase";
            }
        },
    }]);

    return mnemonic as string;
};
