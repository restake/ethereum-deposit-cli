export type Keystore = {
    version: number;
    uuid: string;
    description?: string;
    path: string;
    pubkey: string;
    crypto: {
        kdf: Pbkdf2Module;
        checksum: Sha256ChecksumModule;
        cipher: Aes128CtrCipherModule;
    };
};

export type Sha256ChecksumModule = {
    function: "sha256";
    params: Record<string | number | symbol, unknown>;
    message: string;
};

export type Pbkdf2Module = {
    function: "pbkdf2";
    params: {
        dklen: number;
        c: number;
        prf: "hmac-sha256";
        salt: string;
    };
    message: "";
};

export type Pbkdf2Parameters = Pbkdf2Module["params"];

export type Aes128CtrCipherModule = {
    function: "aes-128-ctr";
    params: {
        iv: string;
    };
    message: string;
};
