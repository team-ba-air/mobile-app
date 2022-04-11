export type PaymentMethodItem = {
  method: string
  item: PaymentMethodSelectionItem[]
}

export type PaymentMethodSelectionItem = {
  name: string
  imageUrl: string
}