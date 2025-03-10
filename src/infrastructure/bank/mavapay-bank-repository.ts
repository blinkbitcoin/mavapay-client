import { Bank } from "@/domain/bank/bank"
import { ApiError } from "@/domain/common/api-error"
import { BankRepository } from "@/interfaces/bank/bank-repository"

// TODO: Replace BASE_URL and BANKS_ENDPOINT with environment variables
const BASE_URL = "https://staging.api.mavapay.co"
const BANKS_ENDPOINT = "/api/v1/bank/bankcode"

export const mavapayBankRepository: BankRepository = {
  getBanksByCountry: async (country: string): Promise<Bank[] | ApiError> => {
    try {
      const response = await fetch(`${BASE_URL}${BANKS_ENDPOINT}?country=${country}`)
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
