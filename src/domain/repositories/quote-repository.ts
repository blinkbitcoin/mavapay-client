import { QuoteRequest, QuoteResponse } from "@/domain"
import { ApiError } from "@/domain/errors"

export type QuoteRepository = {
  getQuote: (quoteRequest: QuoteRequest) => Promise<QuoteResponse | ApiError>
}
