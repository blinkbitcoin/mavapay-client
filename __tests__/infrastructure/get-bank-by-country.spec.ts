import { BankRepository } from "@/domain/repositories"
import { getBanksByCountry } from "@/application"
import { ApiError } from "@/domain/errors"
import { Bank } from "@/domain"

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
