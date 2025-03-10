export type Bank = {
  bankName: string
  nipBankCode: string
}

export type TBankAccount = {
  status: string
  message: string
  data: {
    _id?: string
    accountNumber: string
    accountName: string
    bankCode: string
  }
}
