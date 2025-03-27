# Mavapay-client

TypeScript client library for **Mavapay Money API**. This library can be used in front-end applications such as web and mobile wallets to transfer Bitcoin to Nigeria.

## Installation

You can install the package using yarn, npm or pnpm:

### using yarn:

```bash
yarn add @blinkbitcoin/mavapay-client
```

### using npm:

```bash
npm install @blinkbitcoin/mavapay-client
```

### using pnpm:

```bash
pnpm add @blinkbitcoin/mavapay-client
```

## Usage

### Authentication

Before calling any API, you need to configure authentication:

```ts
import { mavapayClient } from "@blinkbitcoin/mavapay-client"

mavapayClient.configureAuth({
  network: "signet", // Can be "mainnet" | "signet" | "regtest"
  apiKey: "<YOUR_MAVAPAY_API_KEY>",
})
```

### getBanksByCountry

Retrieve a list of banks available for a given country:

```ts
import { mavapayClient } from "@blinkbitcoin/mavapay-client"

mavapayClient.configureAuth({
  network: "signet",
  apiKey: "<YOUR_MAVAPAY_API_KEY>",
})

async function fetchBanks() {
  try {
    const banks = await mavapayClient.getBanksByCountry("NG") // "NG" = Nigeria

    if ("type" in banks) {
      console.error("Error retrieving banks:", banks.message)
      return
    }

    console.log("Banks retrieved:", banks) // Returns an array of bank objects
  } catch (error) {
    console.error("Unexpected error:", error)
  }
}

fetchBanks()
```

### getQuote

Retrieve a quote to send Bitcoin to a bank account:

```ts
import { mavapayClient } from "@blinkbitcoin/mavapay-client"

mavapayClient.configureAuth({
  network: "signet",
  apiKey: "<YOUR_MAVAPAY_API_KEY>",
})

async function fetchQuote() {
  try {
    const quote = await mavapayClient.getQuote({
      amount: 300000,
      sourceCurrency: "BTCSAT",
      targetCurrency: "NGNKOBO",
      paymentMethod: "LIGHTNING",
      paymentCurrency: "NGNKOBO",
      autopayout: true,
      beneficiary: {
        bankAccountNumber: "0123456789",
        bankAccountName: "olaolu olajide",
        bankCode: "090267",
        bankName: "GTBANK PLC",
      },
    })

    if ("type" in quote) {
      console.error("Error retrieving quote:", quote.message)
      return
    }

    console.log("Quote:", quote) // Return the Lightning payment details
  } catch (error) {
    console.error("Unexpected error:", error)
  }
}

fetchQuote()
```

## Currency Types

- `NGNKOBO`: Nigerian Naira in Kobo
- `ZARCENT`: South African Rand in Cents

## Type Definitions

```ts
type Network = "mainnet" | "signet" | "regtest"

type AuthConfig = {
  apiKey: string
  network: Network
}
```

## Local Development

### 1. Run the Mavapay Client Locally

To run and build the Mavapay Client locally, follow these steps:

#### Prerequisites

- Install `nix` with flakes enabled
- Install `direnv` and configure it for your shell

All commands must be executed within the `nix` environment.

#### Install Dependencies

```bash
nix develop -c pnpm install
```

#### Build

Build production (distribution) files in the `dist/` folder:

```bash
nix develop -c pnpm build
```

#### Test

Run tests using Jest:

```bash
nix develop -c pnpm test
```

---

### 2. Link the Library into Another Project

To test this library locally in a different project, you can use `npm link` or `yarn link`.

> Although the project uses `pnpm` internally, it can be consumed by other projects using `npm` or `yarn`.

#### Step 1: Build and Link the Library

In the root of the `mavapay-client` project:

#### Install Dependencies

```bash
nix develop -c pnpm install
```

#### Build

Build project (distribution) files in the `dist/` folder:

```bash
nix develop -c pnpm build
```

Creates a global symbolic link to the library so it can be used locally in other projects during development.

```bash
npm link
# or
yarn link
```

#### Step 2: Link it in your test project

In your test project folder:

```bash
npm link @blinkbitcoin/mavapay-client
# or
yarn link @blinkbitcoin/mavapay-client
```

Now you can import and use the library like this:

```ts
import { mavapayClient } from "@blinkbitcoin/mavapay-client"
```

#### Step 3: Rebuild on Changes

Every time you change the library, run:

```bash
nix develop -c pnpm build
```

Your test project will automatically use the updated build.

#### Step 4: Unlink (when done)

In your test project:

```bash
npm unlink @blinkbitcoin/mavapay-client
# or
yarn unlink @blinkbitcoin/mavapay-client
```

In the library folder:

```bash
npm unlink
# or
yarn unlink
```

See [npm link](https://docs.npmjs.com/cli/v6/commands/npm-link) or [yarn link](https://yarnpkg.com/cli/link) for more.

## References

This library was developed based on:

- [Mavapay API Documentation](https://docs.mavapay.co/api-reference) – Official RESTful API reference for Mavapay (used to send Bitcoin to Nigeria and other countries).
