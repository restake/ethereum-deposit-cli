import { assert } from "$std/assert/assert.ts";

import { generateCredentials } from "./mod.ts";
import { keygenOptionsFixture } from "./fixtures/ts/keygen_options.ts";

Deno.test("Credentials", async (t) => {
    await t.step("Should generate credentials with valid signing keys", () => {
        const credentials = generateCredentials(keygenOptionsFixture);
        const expectedSigningPublicKeys = [
            "0xad69839490342fc034416474e5b249bb52cd39c5ee7ee65a249f86b3674f1dd7e4d23a3201e414aa11180af46449cef5",
            "0x996cf319007837edfdaf594a16ded423b1c80d46ea33e963a34131f5b4af0e8cb486c674d00d4f38fa9c0c5d5e5e3769",
            "0x80c7b6724bfb879fc51535fd569ce47e6952e492b888d65d0acac5807715f5c84b6a103d33ae4fe7c221ed1accd339cc",
        ];
        credentials.forEach((credential, index) => {
            assert(credential.signingPublicKey.toHex() === expectedSigningPublicKeys[index]);
        });
    });
});
