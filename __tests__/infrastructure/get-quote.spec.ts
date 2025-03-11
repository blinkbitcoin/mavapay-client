import { QuoteRepository } from "@/domain/repositories"
import { getQuote } from "@/application"
import { ApiError } from "@/domain/errors"
import { QuoteRequest, QuoteResponse } from "@/domain"

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

describe("getQuote", () => {
  const mockRequest: QuoteRequest = {
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
    const useCase = getQuote(mockQuoteRepository)
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
        type: "ApiResponseError",
        message: "Invalid request data",
      }),
    }

    const useCase = getQuote(errorMockRepository)
    const result = await useCase(mockRequest)

    expect(result).toEqual({
      type: "ApiResponseError",
      message: "Invalid request data",
    })
  })
})
