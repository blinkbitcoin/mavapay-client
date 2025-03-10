import { setAuthConfig } from "./infrastructure/common/auth-service"
import { mavapayBankRepository } from "./infrastructure/bank/mavapay-bank-repository"
import { mavapayValidBankAccount } from "./infrastructure/bank/mavapay-valid-bank-account"
import { getBanksByCountry } from "./application/bank/get-banks-by-country"
import { validBankAccount } from "./application/bank/valid-bank-account"

export const mavapayClient = {
  configureAuth: setAuthConfig,
  getBanksByCountry: getBanksByCountry(mavapayBankRepository),
  validBankAccount: validBankAccount(mavapayValidBankAccount)
}
