import { Mnemonic, randomBytes, wordlists } from "ethers";
import { Command, ValidationError } from "cliffy/command/mod.ts";

import { ALLOWED_BYTES, ALLOWED_LANGUAGES } from "./mod.ts";

export const command = new Command()
    .description("Generate a new mnemonic")
    .option("-b, --bytes <bytes:number>", `Number of bytes to use for obtaining entropy (${ALLOWED_BYTES.join(", ")})`, { default: 32 })
    .option("-l, --language <language:string>", `Language to use for mnemonic generation (${ALLOWED_LANGUAGES.join(", ")})`, {
        default: "en",
    })
    .action(({ bytes, language }) => {
        if (ALLOWED_BYTES.indexOf(bytes) === -1) {
            throw new ValidationError("Invalid number of bytes");
        }
        if (ALLOWED_LANGUAGES.indexOf(language) === -1) {
            throw new ValidationError("Invalid language");
        }
        console.log(Mnemonic.fromEntropy(randomBytes(bytes), null, wordlists[language]).phrase);
    });
