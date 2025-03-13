import { Currency, QuoteRequest, QuoteResponse } from "@/domain"
import { ApiError } from "@/domain/errors"

export type QuoteRepository = {
  getQuote: <T extends Currency>(
    quoteRequest: QuoteRequest<T>,
  ) => Promise<QuoteResponse | ApiError>
}
