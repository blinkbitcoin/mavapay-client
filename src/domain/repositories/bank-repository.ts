import { Bank, BankAccount } from "@/domain"
import { ApiError } from "@/domain/errors"

export type BankRepository = {
  getBanksByCountry: (country: string) => Promise<Bank[] | ApiError>
  validateBankAccount: (
    accountNumber: string,
    bankCode: string,
  ) => Promise<BankAccount | ApiError>
}
