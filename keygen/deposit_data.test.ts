import { assertEquals } from "$std/assert/mod.ts";

import { DepositData, getDepositData } from "./mod.ts";
import { credentialsFixture } from "./fixtures/ts/mod.ts";

const depositDataFixture = JSON.parse(Deno.readTextFileSync("./keygen/fixtures/json/deposit_data.json")) as DepositData[];

Deno.test("DepositData", async (t) => {
    await t.step("Should be able to generate a valid deposit data", () => {
        assertEquals(getDepositData(credentialsFixture), depositDataFixture);
    });
});
