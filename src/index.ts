import { getBanksByCountry } from "@/application/bank/get-banks-by-country"
import { mavapayBankRepository } from "@/infrastructure/bank/mavapay-bank-repository"

export const mavapayClient = {
  getBanksByCountry: getBanksByCountry(mavapayBankRepository),
}
