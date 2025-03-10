export type Network = "mainnet" | "signet" | "regtest"

export type AuthConfig = {
  apiKey: string
  network: Network
}
