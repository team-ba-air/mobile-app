import { AdditionalComponentItem, ServiceInfo, ShopInfo, VehicleInfo } from "scenes/home/constants"

export type HistoryItem = {
  id: string
  car: VehicleInfo
  shop: ShopInfo
  service: ServiceInfo
  datetime: Date
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
  payment_method: string
  additional_component: AdditionalComponentItem[]
  requested_additional_component_notes: string
}

export type ReviewHistoryForm = {
  rating: number
  review: string
}