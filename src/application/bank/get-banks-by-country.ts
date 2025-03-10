import { Bank } from "@/domain/bank/bank"
import { ApiError } from "@/domain/common/api-error"
import { BankRepository } from "@/interfaces/bank/bank-repository"

export const getBanksByCountry =
  (bankRepository: BankRepository) =>
  async (country: string): Promise<Bank[] | ApiError> => {
    return bankRepository.getBanksByCountry(country)
  }
