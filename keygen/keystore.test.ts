import { assert } from "$std/assert/mod.ts";

import { createKeystores, saveSigningKeystores, verifySigningKeystores } from "./mod.ts";
import { verifyPassword } from "../keystore/mod.ts";

import { credentialsFixture } from "./fixtures/ts/mod.ts";

Deno.test("Keystore", async (t) => {
    await t.step("Should generate valid keystores", async () => {
        const keystorePassword = "testpassword123";
        const keystores = await createKeystores(credentialsFixture, keystorePassword);

        keystores.forEach((keystore) => {
            assert(verifyPassword(keystore, "testpassword123"));
        });
    });

    await t.step("Should save valid keystores", async () => {
        const keystorePassword = "testpassword123";
        const storagePath = "./storage";

        const keystores = await createKeystores(credentialsFixture, keystorePassword);
        saveSigningKeystores(keystores, storagePath);

        assert(await verifySigningKeystores(storagePath, keystorePassword));
    });
});
