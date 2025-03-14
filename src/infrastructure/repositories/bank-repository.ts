import { Bank, BankAccount } from "@/domain"
import { ApiError, ApiErrorType } from "@/domain/errors"
import { BankRepository } from "@/domain/repositories"
import { getHost, getApiKey } from "@/infrastructure/services"

export const bankRepository: BankRepository = {
  getBanksByCountry: async (country: string): Promise<Bank[] | ApiError> => {
    const host = getHost()

    try {
      const response = await fetch(`${host}/api/v1/bank/bankcode?country=${country}`)
      if (!response.ok) {
        return {
          type: ApiErrorType.ApiResponseError,
          message: `Error fetching banks: ${response.status} ${response.statusText}`,
          details: await response.json().catch(() => null),
        }
      }
      const responseData = await response.json()
      return responseData.data
    } catch (error) {
      return {
        type: ApiErrorType.NetworkError,
        message: "Network request failed",
        details: error instanceof Error ? error.message : error,
      }
    }
  },

  validateBankAccount: async (
    accountNumber: string,
    bankCode: string,
  ): Promise<BankAccount | ApiError> => {
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
          type: ApiErrorType.ApiResponseError,
          message: `Error verifying account: ${response.status} ${response.statusText}`,
          details: await response.json().catch(() => null),
        }
      }
      const responseData = await response.json()
      return responseData.data
    } catch (error) {
      return {
        type: ApiErrorType.NetworkError,
        message: "Network request failed",
        details: error instanceof Error ? error.message : error,
      }
    }
  },
}
