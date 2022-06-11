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
  bengkelName: string
  bengkelLocation: string
  serviceType: string
  carType: string
  plat: string
  currentStep: number
  totalStep: number
  date: number
}

export type ServiceItem = {
  img: string
  value: string
  label: string
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