import { TBankAccount } from "@/domain/bank/bank"
import { ApiError } from "@/domain/common/api-error"
import { BankAccount } from "@/interfaces/bank/bank-account"

export const validBankAccount =
  (BankAccount: BankAccount) =>
    async (accountNumber: number, bankCode: number): Promise<TBankAccount | ApiError> => {
      return BankAccount.validBankAccount(accountNumber, bankCode)
    }
