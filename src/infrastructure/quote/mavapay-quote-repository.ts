import { QuoteRequest, QuoteResponse } from "@/domain/quote/quote"
import { ApiError } from "@/domain/common/api-error"
import { QuoteRepository } from "@/interfaces/quote/quote-repository"
import { getHost, getApiKey } from "@/infrastructure/common/auth-service"

export const mavapayQuoteRepository: QuoteRepository = {
  getQuote: async (quoteRequest: QuoteRequest): Promise<QuoteResponse | ApiError> => {
    const host = getHost()
    const apiKey = getApiKey()

    try {
      const response = await fetch(`${host}/api/v1/quote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify(quoteRequest),
      })

      if (!response.ok) {
        return {
          type: "ApiResponseError",
          message: `Error fetching quote: ${response.status} ${response.statusText}`,
          details: await response.json().catch(() => null),
        }
      }

      const responseData = await response.json()
      return responseData
    } catch (error) {
      return {
        type: "NetworkError",
        message: "Network request failed",
        details: error instanceof Error ? error.message : error,
      }
    }
  },
}
