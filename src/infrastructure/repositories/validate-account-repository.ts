import { TBankAccount } from "@/domain"
import { ApiError } from "@/domain/errors"
import { ValidateAccountRepository } from "@/domain/repositories"
import { getHost, getApiKey } from "@/infrastructure/services"

export const validateAccountRepository: ValidateAccountRepository = {
  validateBankAccount: async (
    accountNumber: number,
    bankCode: number,
  ): Promise<TBankAccount | ApiError> => {
    const host = getHost()
    const apiKey = getApiKey()

    try {
      const response = await fetch(
        `${host}/api/v1/bank/name-enquiry?accountNumber=${accountNumber}&bankCode=${bankCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
          },
        },
      )
      if (!response.ok) {
        return {
          type: "ApiResponseError",
          message: `Error verifying account: ${response.status} ${response.statusText}`,
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
