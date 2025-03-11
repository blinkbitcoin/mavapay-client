import { QuoteRequest, QuoteResponse } from "@/domain/quote/quote"
import { ApiError } from "@/domain/common/api-error"

export type QuoteRepository = {
  getQuote: (quoteRequest: QuoteRequest) => Promise<QuoteResponse | ApiError>
}
