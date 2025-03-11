import { Bank } from "@/domain"
import { ApiError } from "@/domain/errors"
import { BankRepository } from "@/domain/repositories"
import { getHost } from "@/infrastructure/services"

export const bankRepository: BankRepository = {
  getBanksByCountry: async (country: string): Promise<Bank[] | ApiError> => {
    const host = getHost()

    try {
      const response = await fetch(`${host}/api/v1/bank/bankcode?country=${country}`)
      if (!response.ok) {
        return {
          type: "ApiResponseError",
          message: `Error fetching banks: ${response.status} ${response.statusText}`,
          details: await response.json().catch(() => null),
        }
      }
      const responseData = await response.json()
      return responseData.data
    } catch (error) {
      return {
        type: "NetworkError",
        message: "Network request failed",
        details: error instanceof Error ? error.message : error,
      }
    }
  },
}
