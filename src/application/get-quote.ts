import { QuoteRequest, QuoteResponse } from "@/domain"
import { ApiError } from "@/domain/errors"
import { QuoteRepository } from "@/domain/repositories"

export const getQuote =
  (quoteRepository: QuoteRepository) =>
  async (quoteRequest: QuoteRequest): Promise<QuoteResponse | ApiError> => {
    return quoteRepository.getQuote(quoteRequest)
  }
