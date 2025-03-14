export enum ApiErrorType {
  NetworkError = "NetworkError",
  ApiResponseError = "ApiResponseError",
}

export type ApiError = {
  type: ApiErrorType
  message: string
  details?: unknown
}

export const isApiError = (obj: unknown): obj is ApiError => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "type" in obj &&
    Object.values(ApiErrorType).includes((obj as ApiError).type)
  )
}
