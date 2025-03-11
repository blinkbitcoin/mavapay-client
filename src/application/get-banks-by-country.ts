import { Bank } from "@/domain"
import { ApiError } from "@/domain/errors"
import { BankRepository } from "@/domain/repositories"

export const getBanksByCountry =
  (bankRepository: BankRepository) =>
  async (country: string): Promise<Bank[] | ApiError> => {
    return bankRepository.getBanksByCountry(country)
  }
