import { getBanksByCountry } from "../../src/application/bank/get-banks-by-country"
import { BankRepository } from "../../src/interfaces/bank/bank-repository"
import { Bank } from "../../src/domain/bank/bank"
import { ApiError } from "../../src/domain/common/api-error"

type MockBankRepository = BankRepository

const mockBankRepository: MockBankRepository = {
  getBanksByCountry: async (): Promise<Bank[]> => [
    { bankName: "KUDA MICROFINANCE BANK", nipBankCode: "090267" },
  ],
}

describe("getBanksByCountry", () => {
  it("should return a list of banks for a given country", async () => {
    const useCase = getBanksByCountry(mockBankRepository)
    const banks = await useCase("NG")

    expect(banks).toEqual([{ bankName: "KUDA MICROFINANCE BANK", nipBankCode: "090267" }])
  })

  it("should handle API errors correctly", async () => {
    const errorMockRepository: MockBankRepository = {
      getBanksByCountry: async (): Promise<ApiError> => ({
        type: "ApiResponseError",
        message: "Invalid country code",
      }),
    }

    const useCase = getBanksByCountry(errorMockRepository)
    const result = await useCase("XV")

    expect(result).toEqual({ type: "ApiResponseError", message: "Invalid country code" })
  })
})
