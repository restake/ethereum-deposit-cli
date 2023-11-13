import { assert, assertEquals } from "$std/assert/mod.ts";
import { resolve } from "$std/path/mod.ts";

import { hexToBytes, verifyPassword } from "./mod.ts";
import { decryptKeystore } from "./store.ts";

Deno.test("PBKDF2", async (t) => {
    await t.step("Should be able to encrypt and decrypt PBKDF2 keystores", async () => {
        const keystores = [
            JSON.parse(await Deno.readTextFile(resolve("./keystore/test_vectors/pbkdf2_keystore.json"))),
        ];

        for (const keystore of keystores) {
            const password = keystore.password;
            const secret = hexToBytes(keystore.secret.slice(2));

            assert(await verifyPassword(keystore, password));
            assertEquals(await decryptKeystore(keystore, password), secret);
        }
    });
});
