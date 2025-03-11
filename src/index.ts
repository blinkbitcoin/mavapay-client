import { bankRepository, quoteRepository } from "@/infrastructure/repositories"
import { setAuthConfig } from "@/infrastructure/services"
import { getBanksByCountry, getQuote } from "@/application"

export const mavapayClient = {
  configureAuth: setAuthConfig,
  getBanksByCountry: getBanksByCountry(bankRepository),
  getQuote: getQuote(quoteRepository),
}
