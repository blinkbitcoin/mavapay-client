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

To run the Mavapay Client locally, follow these steps:

### Prerequisites

- **1)** Install `nix` with flakes enabled
- **2)** Install `direnv` and configure it for your shell

All commands must be executed within the `nix` environment.

### Install Dependencies

Run the following command to install dependencies:

```bash
nix develop -c pnpm install
```

### Build

Build production (distribution) files in dist folder:

```bash
nix develop -c pnpm build
```

## Test

Run tests using Jest:

```bash
nix develop -c pnpm test
```
