import { Bank } from "@/domain"
import { ApiError } from "@/domain/errors"

export type BankRepository = {
  getBanksByCountry: (country: string) => Promise<Bank[] | ApiError>
}
