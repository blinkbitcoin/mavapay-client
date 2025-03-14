import { QuoteRequest, QuoteResponse, Currency } from "@/domain"
import { ApiError } from "@/domain/errors"
import { QuoteRepository } from "@/domain/repositories"

export const getQuote =
  <T extends Currency>(quoteRepository: QuoteRepository) =>
  async (quoteRequest: QuoteRequest<T>): Promise<QuoteResponse | ApiError> => {
    return quoteRepository.getQuote(quoteRequest)
  }
