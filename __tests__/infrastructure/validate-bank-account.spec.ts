import { ValidateAccountRepository } from "@/domain/repositories"
import { validateBankAccount } from "@/application"
import { ApiError } from "@/domain/errors"
import { TBankAccount } from "@/domain"

type MockBankAccount = ValidateAccountRepository

const mockBankAccounty: MockBankAccount = {
  validateBankAccount: async (): Promise<TBankAccount> => ({
    status: "ok",
    message: "",
    data: {
      accountName: "Customer Name",
      accountNumber: "1234567891",
      bankCode: "1000",
    },
  }),
}

describe("validateBankAccount", () => {
  it("should return a response for a valid bank account", async () => {
    const useCase = validateBankAccount(mockBankAccounty)
    const banks = await useCase(1234567891, 1000)

    expect(banks).toEqual({
      status: "ok",
      message: "",
      data: {
        accountName: "Customer Name",
        accountNumber: "1234567891",
        bankCode: "1000",
      },
    })
  })

  it("should handle API errors correctly", async () => {
    const errorMockRepository: MockBankAccount = {
      validateBankAccount: async (): Promise<ApiError> => ({
        type: "ApiResponseError",
        message: "Error verifying account",
      }),
    }

    const useCase = validateBankAccount(errorMockRepository)
    const result = await useCase(123456789, 1000)

    expect(result).toEqual({
      type: "ApiResponseError",
      message: "Error verifying account",
    })
  })
})
