export type Currency = "NGNKOBO" | "ZARCENT"

export type NGNBeneficiary = {
  bankAccountNumber: string
  bankAccountName: string
  bankCode: string
  bankName: string
}

export type ZARBeneficiary = {
  name: string
  bankName: string
  bankAccountNumber: string
}

export type BeneficiaryByPaymentCurrency<T extends Currency> = T extends "NGNKOBO"
  ? NGNBeneficiary
  : T extends "ZARCENT"
    ? ZARBeneficiary
    : never

export type QuoteRequest<T extends Currency> = {
  amount: number
  sourceCurrency: "BTCSAT"
  targetCurrency: T
  paymentMethod: "LIGHTNING"
  paymentCurrency: T
  autopayout?: boolean
  beneficiary: BeneficiaryByPaymentCurrency<T>
}

export type QuoteResponse = {
  status: string
  data: {
    id: string
    exchangeRate: number
    usdToTargetCurrencyRate: number
    sourceCurrency: "BTCSAT"
    targetCurrency: Currency
    transactionFeesInSourceCurrency: number
    transactionFeesInTargetCurrency: string
    amountInSourceCurrency: number
    amountInTargetCurrency: string
    paymentMethod: "LIGHTNING"
    expiry: string
    isValid: boolean
    invoice: string
    hash: string
    totalAmountInSourceCurrency: number
    customerInternalFee: number
    createdAt: string
    updatedAt: string
  }
}
