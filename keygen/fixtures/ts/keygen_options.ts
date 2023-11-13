import { KeygenOptions } from "../../mod.ts";

export const keygenOptionsFixture: KeygenOptions = {
    language: "en",
    mnemonic: "congress inform satisfy fox joy girl sunny search year fame panel culture alien lamp rich",
    network: "mainnet",
    numValidators: 3,
    password: "testpassword123",
    startIndex: 0,
    storagePath: "./storage",
    withdrawalAddress: "0x05474dD4248E67EcCA048E44a500ACa44D434f95",
} as const;
