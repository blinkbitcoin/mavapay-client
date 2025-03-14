import { isApiError, ApiError, ApiErrorType } from "@/domain/errors/api-error"

describe("isApiError", () => {
  it("should return true for an ApiError", () => {
    const validErrorWithoutDetails: ApiError = {
      type: ApiErrorType.NetworkError,
      message: "Network request failed",
    }

    expect(isApiError(validErrorWithoutDetails)).toBe(true)
  })

  it("should return false for an object missing the 'type' property", () => {
    const invalidError = {
      message: "Missing type property",
      details: { info: "Something went wrong" },
    }

    expect(isApiError(invalidError)).toBe(false)
  })

  it("should return false for an object with an invalid 'type'", () => {
    const invalidError = {
      type: "InvalidErrorType",
      message: "Invalid error type",
      details: {},
    }

    expect(isApiError(invalidError)).toBe(false)
  })

  it("should return false for null or undefined values", () => {
    expect(isApiError(null)).toBe(false)
    expect(isApiError(undefined)).toBe(false)
  })

  it("should return false for non-object types", () => {
    expect(isApiError("This is a string")).toBe(false)
    expect(isApiError(42)).toBe(false)
    expect(isApiError(true)).toBe(false)
    expect(isApiError([])).toBe(false)
  })

  it("should return false for an empty object", () => {
    expect(isApiError({})).toBe(false)
  })
})
