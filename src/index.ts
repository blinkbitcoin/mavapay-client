import { setAuthConfig } from "@/infrastructure/common/auth-service"
import { mavapayBankRepository } from "@/infrastructure/bank/mavapay-bank-repository"
import { getBanksByCountry } from "@/application/bank/get-banks-by-country"
import { mavapayQuoteRepository } from "@/infrastructure/quote/mavapay-quote-repository"
import { getQuote } from "@/application/quote/get-quote"

export const mavapayClient = {
  configureAuth: setAuthConfig,
  getBanksByCountry: getBanksByCountry(mavapayBankRepository),
  getQuote: getQuote(mavapayQuoteRepository),
}
