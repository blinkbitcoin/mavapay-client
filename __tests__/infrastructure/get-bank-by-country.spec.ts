import { getBanksByCountry } from "@/application"
import { BankRepository } from "@/domain/repositories"
import { ApiError, ApiErrorType } from "@/domain/errors"
import { Bank, BankAccount } from "@/domain"

type MockRepository = BankRepository

const mockGetBancksByCountrySuccess = [
  {
    bankName: "KUDA MICROFINANCE BANK",
    nipBankCode: "090267",
  },
]

const mockValidateBankAccountSuccess = {
  status: "ok",
  message: "",
  data: {
    accountName: "Customer Name",
    accountNumber: "1234567891",
    bankCode: "1000",
  },
}

const mockRepository: MockRepository = {
  getBanksByCountry: async (): Promise<Bank[]> => mockGetBancksByCountrySuccess,
  validateBankAccount: async (): Promise<BankAccount> => mockValidateBankAccountSuccess,
}

describe("getBanksByCountry (Application Layer)", () => {
  it("should return a list of banks for a given country", async () => {
    const useCase = getBanksByCountry(mockRepository)
    const banks = await useCase("NG")

    expect(banks).toEqual(mockGetBancksByCountrySuccess)
  })

  it("should handle API errors correctly", async () => {
    const errorMockRepository: MockRepository = {
      ...mockRepository,
      getBanksByCountry: async (): Promise<ApiError> => ({
        type: ApiErrorType.ApiResponseError,
        message: "Invalid country code",
      }),
    }

    const useCase = getBanksByCountry(errorMockRepository)
    const result = await useCase("XV")

    expect(result).toEqual({
      type: ApiErrorType.ApiResponseError,
      message: "Invalid country code",
    })
  })
})

describe("validateBankAccount (Repository Layer)", () => {
  it("should return a response for a valid bank account", async () => {
    const result = await mockRepository.validateBankAccount(1234567891, 1000)

    expect(result).toEqual(mockValidateBankAccountSuccess)
  })

  it("should handle API errors correctly", async () => {
    const errorMockRepository: MockRepository = {
      ...mockRepository,
      validateBankAccount: async (): Promise<ApiError> => ({
        type: ApiErrorType.ApiResponseError,
        message: "Error verifying account",
      }),
    }

    const result = await errorMockRepository.validateBankAccount(123456789, 1000)

    expect(result).toEqual({
      type: "ApiResponseError",
      message: "Error verifying account",
    })
  })
})
