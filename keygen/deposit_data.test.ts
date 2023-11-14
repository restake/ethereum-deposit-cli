import { assertEquals, assertRejects } from "$std/assert/mod.ts";
import { resolve } from "$std/path/mod.ts";

import { DepositData, getDepositData, saveDepositData, verifyDepositData } from "./mod.ts";
import { credentialsFixture, keygenOptionsFixture } from "./fixtures/ts/mod.ts";

const depositDataFixture = JSON.parse(await Deno.readTextFile("./keygen/fixtures/json/deposit_data.json")) as DepositData[];

Deno.test("DepositData", async (t) => {
    await t.step("Should be able to generate a valid deposit data", () => {
        assertEquals(getDepositData(credentialsFixture), depositDataFixture);
    });

    await t.step("Should be able to save and verify deposit data files", async () => {
        const { depositData, fileName } = await saveDepositData(credentialsFixture, keygenOptionsFixture.storagePath);

        assertEquals(await verifyDepositData(keygenOptionsFixture.storagePath, fileName, depositData), true);
    });

    await t.step("Should throw an error when unable to save deposit data file", async () => {
        await assertRejects(
            () => saveDepositData(credentialsFixture, "/invalid/path/to/storage"),
            Error,
            "Unable to save deposit data file",
        );
    });

    await t.step("Should throw an error when unable to verify deposit data file", async () => {
        const { depositData, fileName } = await saveDepositData(credentialsFixture, keygenOptionsFixture.storagePath);
        await Deno.remove(`${resolve(keygenOptionsFixture.storagePath)}/${fileName}`);

        await assertRejects(
            () => verifyDepositData(keygenOptionsFixture.storagePath, fileName, depositData),
            Error,
            "Unable to read deposit data file",
        );
    });
});
