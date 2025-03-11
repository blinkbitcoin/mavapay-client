import { QuoteRequest, QuoteResponse } from "@/domain/quote/quote"
import { ApiError } from "@/domain/common/api-error"
import { QuoteRepository } from "@/interfaces/quote/quote-repository"

export const getQuote =
  (quoteRepository: QuoteRepository) =>
  async (quoteRequest: QuoteRequest): Promise<QuoteResponse | ApiError> => {
    return quoteRepository.getQuote(quoteRequest)
  }
