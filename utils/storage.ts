import { encodeHex } from "$std/encoding/hex.ts";
import { resolve } from "$std/path/mod.ts";

import { MnemonicStore } from "../types.ts";
import { hash } from "./crypto.ts";

import config from "../config.ts";

export const storeMnemonic = async (mnemonicStore: MnemonicStore): Promise<void> => {
    const mnemonicHash = encodeHex(await hash(mnemonicStore.mnemonic));

    Deno.writeTextFileSync(
        `${resolve(config.STORAGE_PATH)}/${mnemonicHash}.json`,
        JSON.stringify(
            mnemonicStore,
        ),
    );
};
