import { VehicleItem } from "scenes/vehicle/constants"
import { Color } from "styles/colors"

export type PopularServiceItem = {
  img: string
  title: string
}

export type TipsTrickItem = {
  img: string
  title: string
  author: string
}

export type ReservationItem = {
  id: string
  info_booking: {
    car: VehicleInfo
    shop: ShopInfo
    service: ServiceInfo
    datetime: Date
    notes: string
  }
  status: number
}

export type ReservationDetailItem = {
  booking_number: string
  info_booking: {
    car: VehicleInfo
    shop: ShopInfo
    service: ServiceInfo
    datetime: Date
    notes: string
  }
  status: number
  progress: StepTime[]
  service_assistant: string
  additional_component: AdditionalComponentItem[]
  requested_additional_component: AdditionalComponentItem[]
  requested_additional_component_notes: string
}

export type AdditionalComponentItem = {
  id: string
  name: string
  priority: string
  price: number
}

export type VehicleInfo = {
  id: string
  brand: string
  type: string
  license_plate: string
}

export type ShopInfo = {
  id: string
  name: string
}

export type ServiceInfo = {
  id: string
  name: string
  description: string
  price: number
}

export type ServiceItem = {
  img: string
  value: string
  label: string
}

export type StepTime = {
  step: number
  time: Date | null
}

export type AdditionalComponentSelectionItem = {
  selected: boolean
  component: string
  price: number
  priority: string
}

export type ProgressTime = {
  step: number
  time: Date | null
}

export const PriorityMapItem = new Map()
  .set('IMPORTANT', 'Penting')
  .set('RECOMMENDED', 'Direkomendasikan')

export const PriorityMapColor = new Map()
  .set('IMPORTANT', Color.red[7])
  .set('RECOMMENDED', Color.red[5])

export const LABEL_STATUS = [
  'Mobil Sampai di Bengkel',
  'Dalam Antrian Servis',
  'Dalam Pengerjaan',
  'Inspeksi Akhir',
  'Mobil Siap Diambil',
]