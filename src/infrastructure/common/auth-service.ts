import { AuthConfig, Network } from "@/domain/common/auth-config"

const NETWORK_HOSTS: Record<Network, string> = {
  mainnet: "https://api.mavapay.co",
  signet: "https://staging.api.mavapay.co",
  regtest: "https://staging.api.mavapay.co",
}

let authConfig: AuthConfig | null = null

export const setAuthConfig = (config: AuthConfig) => {
  authConfig = config
}

export const getApiKey = (): string => {
  if (!authConfig) {
    throw new Error("AuthConfig not set. Please call setAuthConfig() first.")
  }
  return authConfig.apiKey
}

export const getHost = (): string => {
  if (!authConfig) {
    throw new Error("AuthConfig not set. Please call setAuthConfig() first.")
  }
  return NETWORK_HOSTS[authConfig.network]
}
