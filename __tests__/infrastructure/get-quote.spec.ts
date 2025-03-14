import { BankRepository, QuoteRepository } from "@/domain/repositories"
import { getQuote } from "@/application"
import { ApiError, ApiErrorType } from "@/domain/errors"
import { QuoteRequest, QuoteResponse, BankAccount } from "@/domain"

type MockQuoteRepository = QuoteRepository

const mockQuoteRepository: MockQuoteRepository = {
  getQuote: async (): Promise<QuoteResponse> => ({
    status: "success",
    data: {
      id: "d1614a76-9c7f-4111-98a7-43199f307e5b",
      exchangeRate: 5000000.23,
      usdToTargetCurrencyRate: 1500.65,
      sourceCurrency: "BTCSAT",
      targetCurrency: "NGNKOBO",
      transactionFeesInSourceCurrency: 13.23,
      transactionFeesInTargetCurrency: "3750.00",
      amountInSourceCurrency: 1499,
      amountInTargetCurrency: "50000.00",
      paymentMethod: "LIGHTNING",
      expiry: "2021-07-01T12:00:00Z",
      isValid: true,
      invoice: "lntbs36020n1pnehfzcpp5zc8g9tfpwnmaevh62ak2...",
      hash: "189727ef2e0f35921af7858b96e27cbad960b0ec2...",
      totalAmountInSourceCurrency: 1499,
      customerInternalFee: 0,
      createdAt: "2021-07-01T12:00:00Z",
      updatedAt: "2021-07-01T12:00:00Z",
    },
  }),
}

const mockBankRepository = {
  validateBankAccount: async (): Promise<BankAccount | ApiError> => ({
    status: "ok",
    message: "",
    data: {
      accountName: "Customer Name",
      accountNumber: "1234567891",
      bankCode: "1000",
    },
  }),
  getBanksByCountry: jest.fn(),
}

describe("getQuote", () => {
  const mockRequest: QuoteRequest<"NGNKOBO"> = {
    amount: 1000,
    sourceCurrency: "BTCSAT",
    targetCurrency: "NGNKOBO",
    paymentMethod: "LIGHTNING",
    paymentCurrency: "NGNKOBO",
    autopayout: true,
    beneficiary: {
      bankAccountNumber: "0149203789",
      bankAccountName: "Lolaolu Olajide",
      bankCode: "000013",
      bankName: "GTBANK PLC",
    },
  }

  it("should return a quote response for a valid request", async () => {
    const useCase = getQuote(mockQuoteRepository, mockBankRepository)
    const response = await useCase(mockRequest)

    expect(response).toEqual({
      status: "success",
      data: expect.objectContaining({
        id: expect.any(String),
        exchangeRate: expect.any(Number),
        usdToTargetCurrencyRate: expect.any(Number),
        sourceCurrency: "BTCSAT",
        targetCurrency: "NGNKOBO",
        transactionFeesInSourceCurrency: expect.any(Number),
        transactionFeesInTargetCurrency: expect.any(String),
        amountInSourceCurrency: expect.any(Number),
        amountInTargetCurrency: expect.any(String),
        paymentMethod: "LIGHTNING",
        expiry: expect.any(String),
        isValid: expect.any(Boolean),
        invoice: expect.any(String),
        hash: expect.any(String),
        totalAmountInSourceCurrency: expect.any(Number),
        customerInternalFee: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    })
  })

  it("should handle API errors correctly", async () => {
    const errorMockRepository: MockQuoteRepository = {
      getQuote: async (): Promise<ApiError> => ({
        type: ApiErrorType.ApiResponseError,
        message: "Invalid request data",
      }),
    }

    const useCase = getQuote(errorMockRepository, mockBankRepository)
    const result = await useCase(mockRequest)

    expect(result).toEqual({
      type: ApiErrorType.ApiResponseError,
      message: "Invalid request data",
    })
  })

  it("should return an error if bank account validation fails", async () => {
    const failingBankRepository = {
      validateBankAccount: async (): Promise<ApiError> => ({
        type: ApiErrorType.ApiResponseError,
        message: "Invalid bank account",
      }),
    } as unknown as BankRepository

    const useCase = getQuote(mockQuoteRepository, failingBankRepository)
    const result = await useCase(mockRequest)

    expect(result).toEqual(
      expect.objectContaining({
        type: ApiErrorType.ApiResponseError,
        message: "Invalid bank account for NGNKOBO currency",
      }),
    )
  })
})
