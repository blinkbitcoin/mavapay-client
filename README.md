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

### getBanksByCountry

```js
import { mavapayClient } from "@mavapay/client"

async function fetchBanks() {
 try {
    const banks = await mavapayClient.getBanksByCountry("NG") // The parameter is a country code

    if ("type" in banks) {
        console.error("Error retrieving banks:", banks.message)
    } else {
        console.log("Banks retrieved:", banks) // Returns an array of bank objects
    }
 } catch (error) {
    console.error("Unexpected error: ", error)
 }
}

fetchBanks()
```

## Test

Run tests using the Jest:

```bash
yarn test
```

Make sure that Jest is configured in your environment.

## Local Development

To run the Mavapay Client locally,follow these steps:

### Prerequisites
**1)** Install `nix` with flakes enabled
**2)** Install `direnv` and configure it for your shell

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
