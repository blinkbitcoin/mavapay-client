import { setAuthConfig } from "./infrastructure/common/auth-service"
import { mavapayBankRepository } from "./infrastructure/bank/mavapay-bank-repository"
import { getBanksByCountry } from "./application/bank/get-banks-by-country"

export const mavapayClient = {
  configureAuth: setAuthConfig,
  getBanksByCountry: getBanksByCountry(mavapayBankRepository),
}
