import { TBankAccount } from "@/domain"
import { ApiError } from "@/domain/errors"

export type ValidateAccountRepository = {
  validateBankAccount: (
    accountNumber: number,
    bankCode: number,
  ) => Promise<TBankAccount | ApiError>
}
