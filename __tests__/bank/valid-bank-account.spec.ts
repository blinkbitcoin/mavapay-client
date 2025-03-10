import { validBankAccount } from "../../src/application/bank/valid-bank-account"
import { BankAccount } from "../../src/interfaces/bank/bank-account"
import { TBankAccount } from "../../src/domain/bank/bank"
import { ApiError } from "../../src/domain/common/api-error"

type MockBankAccount = BankAccount

const mockBankAccounty: MockBankAccount = {
  validBankAccount: async (): Promise<TBankAccount> =>
  ({
    status: "ok",
    message: "",
    data: {
      accountName: "Customer Name",
      accountNumber: "1234567891",
      bankCode: "1000"
    }
  }),
}

describe("validBankAccount", () => {
  it("should return a list of banks for a given country", async () => {
    const useCase = validBankAccount(mockBankAccounty)
    const banks = await useCase(1234567891, 1000)

    expect(banks).toEqual({
      status: "ok",
      message: "",
      data: {
        accountName: "Customer Name",
        accountNumber: "1234567891",
        bankCode: "1000"
      }
    })
  })

  it("should handle API errors correctly", async () => {
    const errorMockRepository: MockBankAccount = {
      validBankAccount: async (): Promise<ApiError> => ({
        type: "ApiResponseError",
        message: "Invalid country code",
      }),
    }

    const useCase = validBankAccount(errorMockRepository)
    const result = await useCase(123456789, 1000)

    expect(result).toEqual({ type: "ApiResponseError", message: "Error enquiring bank account name" })
  })
})
