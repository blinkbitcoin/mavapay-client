export type QuoteRequest = {
  amount: number
  sourceCurrency: "BTCSAT"
  targetCurrency: "NGNKOBO" | "KESCENT" | "ZARCENT"
  paymentMethod: "LIGHTNING"
  paymentCurrency: "NGNKOBO" | "KESCENT" | "ZARCENT"
  autopayout?: boolean
  beneficiary: {
    bankAccountNumber: string
    bankAccountName: string
    bankCode: string
    bankName: string
  }
}

export type QuoteResponse = {
  status: string
  data: {
    id: string
    exchangeRate: number
    usdToTargetCurrencyRate: number
    sourceCurrency: "BTCSAT"
    targetCurrency: "NGNKOBO" | "KESCENT" | "ZARCENT"
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
