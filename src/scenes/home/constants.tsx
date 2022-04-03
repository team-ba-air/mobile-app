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

export type BengkelItem = {
  img: string
  isAuthorized: boolean
  isAlmostClosed: boolean
  name: string
  location: string
  description: string
  estimatedPickUp: number
  distance: number
  rating: number
}

export type ServiceItem = {
  img: string
  value: string
  label: string
}