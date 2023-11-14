import { assert, assertEquals, assertRejects } from "$std/assert/mod.ts";

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
        const savedKeystores = await saveSigningKeystores(keystores, storagePath);

        assert(await verifySigningKeystores(storagePath, savedKeystores, keystorePassword));
    });

    await t.step("Should throw an error when unable to save signing keystores", async () => {
        const keystorePassword = "testpassword123";
        const storagePath = "/invalid/path/to/storage";

        const keystores = await createKeystores(credentialsFixture, keystorePassword);

        await assertRejects(
            () => saveSigningKeystores(keystores, storagePath),
            Error,
            "Unable to save signing keystores",
        );
    });

    await t.step("Should throw an error when unable to read a signing keystore", async () => {
        const keystorePassword = "testpassword123";
        const storagePath = "./storage";

        const keystores = await createKeystores(credentialsFixture, keystorePassword);
        const savedKeystores = await saveSigningKeystores(keystores, storagePath);

        await Deno.remove(`${storagePath}/${savedKeystores[0].fileName}`);

        await assertRejects(
            () => verifySigningKeystores(storagePath, savedKeystores, keystorePassword),
            Error,
            `Unable to read signing keystore: ${savedKeystores[0].fileName}`,
        );
    });

    await t.step("Should return false when a signing keystore password is invalid", async () => {
        const keystorePassword = "testpassword123";
        const storagePath = "./storage";

        const keystores = await createKeystores(credentialsFixture, keystorePassword);
        const savedKeystores = await saveSigningKeystores(keystores, storagePath);

        assertEquals(await verifySigningKeystores(storagePath, savedKeystores, "invalidpassword"), false);
    });
});
