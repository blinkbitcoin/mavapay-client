import { Bank } from "../../domain/bank/bank"
import { ApiError } from "../../domain/common/api-error"

export type BankRepository = {
  getBanksByCountry: (country: string) => Promise<Bank[] | ApiError>
}
