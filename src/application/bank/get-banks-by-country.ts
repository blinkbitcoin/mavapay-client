import { Bank } from "@/domain/bank/bank"
import { ApiError } from "@/domain/common/api-error"
import { BankRepository } from "@/interfaces/bank/bank-repository"

export const getBanksByCountry =
  (bankRepository: BankRepository) =>
  async (country: string): Promise<Bank[] | ApiError> => {
    const result = await bankRepository.getBanksByCountry(country)
    if ("type" in result) {
      return result
    }
    return result
  }
