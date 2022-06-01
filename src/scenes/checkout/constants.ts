export type PaymentMethodItem = {
  method: string
  item: PaymentMethodSelectionItem[]
}

export type PaymentMethodSelectionItem = {
  id: string
  name: string
  image: string
  notes: string[]
  target?: string
}