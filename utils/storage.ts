import { encodeHex } from "$std/encoding/hex.ts";
import { resolve } from "$std/path/mod.ts";
import { digest } from "./crypto.ts";
// export const storeMnemonic = async (mnemonicStore: MnemonicStore): Promise<void> => {
//     const mnemonicHash = encodeHex(await digest(mnemonicStore.mnemonic));

//     Deno.writeTextFileSync(
//         `${resolve(config.STORAGE_PATH)}/${mnemonicHash}.json`,
//         JSON.stringify(
//             mnemonicStore,
//         ),
//     );
// };
