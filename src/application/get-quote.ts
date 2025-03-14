import { QuoteRequest, QuoteResponse, Currency, NGNBeneficiary } from "@/domain"
import { ApiError, ApiErrorType, isApiError } from "@/domain/errors"
import { QuoteRepository, BankRepository } from "@/domain/repositories"

export const getQuote =
  (quoteRepository: QuoteRepository, bankRepository: BankRepository) =>
  async <T extends Currency>(
    quoteRequest: QuoteRequest<T>,
  ): Promise<QuoteResponse | ApiError> => {
    if (quoteRequest.paymentCurrency === "NGNKOBO") {
      const beneficiary = quoteRequest.beneficiary as NGNBeneficiary
      const validationResult = await bankRepository.validateBankAccount(
        beneficiary.bankAccountNumber,
        beneficiary.bankCode,
      )

      if (isApiError(validationResult)) {
        return {
          type: ApiErrorType.ApiResponseError,
          message: "Invalid bank account for NGNKOBO currency",
          details: validationResult,
        }
      }
    }

    return quoteRepository.getQuote(quoteRequest)
  }
