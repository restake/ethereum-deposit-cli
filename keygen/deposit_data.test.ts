import { assertEquals } from "$std/assert/mod.ts";

import { DepositData, getDepositData, saveDepositData, verifyDepositData } from "./mod.ts";
import { credentialsFixture, keygenOptionsFixture } from "./fixtures/ts/mod.ts";

const depositDataFixture = JSON.parse(await Deno.readTextFile("./keygen/fixtures/json/deposit_data.json")) as DepositData[];

Deno.test("DepositData", async (t) => {
    await t.step("Should be able to generate a valid deposit data", () => {
        assertEquals(getDepositData(credentialsFixture), depositDataFixture);
    });

    await t.step("Should be able to save and verify deposit data files", async () => {
        const fileName = await saveDepositData(depositDataFixture, keygenOptionsFixture.storagePath);

        assertEquals(await verifyDepositData(keygenOptionsFixture.storagePath, fileName, depositDataFixture), true);
    })
});
