import { TBankAccount } from "@/domain/bank/bank"
import { ApiError } from "@/domain/common/api-error"

export type BankAccount = {
  validBankAccount: (accountNumber: number, bankCode: number) => Promise<TBankAccount | ApiError>
}