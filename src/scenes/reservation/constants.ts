import { PaymentMethodSelectionItem } from "scenes/checkout/constants"

export type ServiceItem = {
  id: string
  image: string
  description: string
  name: string
}

export type BengkelItem = {
  id: string
  img: string
  isAuthorized: boolean
  isAlmostClosed: boolean
  name: string
  location: {
    latitude: number
    longitude: number
  }
  description: string
  distance: number
  rating: number
  serviceAvailable: string[]
  availableForCar: string[]
}

export type BengkelDetailItem = {
  id: string
  img: string
  isAuthorized: boolean
  name: string
  description: string
  rating: number
  serviceAvailable: {
    id: string
    name: string
    description: string
    price: number
  }[]
  availableForCar: string[]
  openTime: Date
  closeTime: Date
}

export type AvailableHourItem = {
  hour: string
  available: boolean
}

export type ReservationForm = Partial<{
  shop: BengkelDetailItem
  car: string
  service: string
  payment: PaymentMethodSelectionItem
  date: Date
  hour: string
  notes: string
}>

export type ShopReview = {
  total_count: number
  average_rating: number
  reviews: ReviewItem[]
}

export type ReviewItem = {
  name: string
  rating: number
  date: Date
  car: string
  service: string
  description: string
}
