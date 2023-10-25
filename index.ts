import { vault } from "./vault.ts";

console.log("Connecting to Vault...");
await vault.login();

addEventListener("unload", () => {
    console.log("Logging out from Vault...");
    vault.logout();
});
