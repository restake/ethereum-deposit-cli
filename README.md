# ethereum-deposit-cli

High-performance command-line utility for generating Ethereum validator keys and PBKDF2 keystores, adhering to the EIP-2335 standard.

## Features

- **Key and Keystore Generation:** Simplifies Ethereum validator key and PBKDF2 keystore generation.
- **EIP-2335 Standard:** Strictly adheres to the EIP-2335 standard for key management.
- **PBKDF2 Keystores:** Supports PBKDF2 keystores for enhanced security.
- **High Performance:** Utilizes Deno's native webcrypto APIs for efficient keystore generation.
- **Ease of Use:** Provides a user-friendly command-line interface.

## Motivation

The Ethereum network, being a decentralized platform, relies on validators for proposing and attesting new blocks. To become a validator, one needs to generate a validator key and keystore. The original tool for this purpose was implemented in Python and, while functional, it has certain limitations. It is not as performant as desired and lacks support for PBKDF2 keystores, a widely-accepted standard for secure password hashing.

Recognizing these challenges, we saw an opportunity to create a tool that not only addressed these issues but also improved upon the existing functionality. The result is `ethereum-deposit-cli`, a command-line utility designed to generate Ethereum validator keys and keystores.

Our tool builds upon the foundational work done by Chainsafe and Ethereum Foundation, but with significant enhancements. We chose Deno as our runtime environment because of its emphasis on security and its support for TypeScript. More importantly, Deno provides native webcrypto APIs, which we leveraged for generating keystores. This decision has led to noticeable improvements in performance and security.

In addition, `ethereum-deposit-cli` supports PBKDF2 keystores, providing an additional layer of security for users. PBKDF2 (Password-Based Key Derivation Function 2) is a key stretching algorithm that is designed to make brute-force attacks more difficult.
