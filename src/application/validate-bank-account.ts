import { TBankAccount } from "@/domain"
import { ApiError } from "@/domain/errors"
import { ValidateAccountRepository } from "@/domain/repositories"

export const validateBankAccount =
  (BankAccount: ValidateAccountRepository) =>
  async (accountNumber: number, bankCode: number): Promise<TBankAccount | ApiError> => {
    return BankAccount.validateBankAccount(accountNumber, bankCode)
  }
