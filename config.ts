interface Config {
    VAULT_KV_MOUNT: string;
    VAULT_ADDR: string;
    VAULT_TOKEN: string;
    VAULT_NAMESPACE: string;
    STORAGE_PATH: string;
}

export default <Config> {
    VAULT_KV_MOUNT: Deno.env.get("VAULT_KV_MOUNT") ?? "kv",
    VAULT_ADDR: Deno.env.get("VAULT_ADDR") ?? "http://127.0.0.1:8200",
    VAULT_TOKEN: Deno.env.get("VAULT_TOKEN"),
    VAULT_NAMESPACE: Deno.env.get("VAULT_NAMESPACE"),
    STORAGE_PATH: Deno.env.get("STORAGE_PATH"),
};