import {
  bankRepository,
  quoteRepository,
  validateAccountRepository,
} from "@/infrastructure/repositories"
import { setAuthConfig } from "@/infrastructure/services"
import { getBanksByCountry, getQuote, validateBankAccount } from "@/application"

export const mavapayClient = {
  configureAuth: setAuthConfig,
  getBanksByCountry: getBanksByCountry(bankRepository),
  getQuote: getQuote(quoteRepository),
  validateBankAccount: validateBankAccount(validateAccountRepository),
}
