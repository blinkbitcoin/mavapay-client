import { Currency, QuoteRequest, QuoteResponse } from "@/domain"
import { ApiError } from "@/domain/errors"
import { QuoteRepository } from "@/domain/repositories"
import { getHost, getApiKey } from "@/infrastructure/services"

export const quoteRepository: QuoteRepository = {
  getQuote: async <T extends Currency>(
    quoteRequest: QuoteRequest<T>,
  ): Promise<QuoteResponse | ApiError> => {
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
