import { PaymentMethodSelectionItem } from "scenes/checkout/constants"
import { AdditionalComponentItem, ServiceInfo, ShopInfo, VehicleInfo } from "scenes/home/constants"

export type HistoryItem = {
  id: string
  status: number
  car: VehicleInfo
  shop: ShopInfo
  service: ServiceInfo
  datetime: Date
  additional_component: AdditionalComponentItem[]
  review: ReviewItem | null
}

export type HistoryDetailItem = {
  id: string
  booking_number: string
  status: number
  car: VehicleInfo
  shop: ShopInfo
  service: ServiceInfo
  datetime: Date
  notes: string
  payment_method: PaymentMethodSelectionItem | null
  additional_component: AdditionalComponentItem[]
  requested_additional_component_notes: string
  review: ReviewItem | null
}

export type ReviewItem = {
  date: Date
  rating: number
  review: string
}

export type ReviewHistoryForm = {
  rating: number
  review: string
}