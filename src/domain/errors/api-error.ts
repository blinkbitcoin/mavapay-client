export type ApiError = {
  type: "NetworkError" | "ApiResponseError"
  message: string
  details?: unknown
}
