import { assertEquals } from "$std/assert/mod.ts";

import { createKeystore, verifyPassword } from "./mod.ts";

Deno.test("Keystore", async (t) => {
    await t.step("Should be able to verify keystore with a simple ASCII password", async () => {
        const password = "testpassword123";
        const keystore = await createKeystore(password, new Uint8Array(32), new Uint8Array(48), "m/12381/3600/0/0");

        assertEquals(await verifyPassword(keystore, password), true);
    });

    await t.step("Should be able to verify keystore with valid UTF-8 password", async () => {
        const password = "𝔱𝔢𝔰𝔱𝔭𝔞𝔰𝔰𝔴𝔬𝔯𝔡🔑";
        const keystore = await createKeystore(password, new Uint8Array(32), new Uint8Array(48), "m/12381/3600/0/0");

        assertEquals(await verifyPassword(keystore, password), true);
    });
});
