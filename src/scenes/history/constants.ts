export type HistoryItem = {
  serviceType: string
  price: number
  brand: string
  carType: string
  plat: string
  date: Date
  location: string
}

export type ReviewHistoryForm = {
  rating: number
  review: string
}