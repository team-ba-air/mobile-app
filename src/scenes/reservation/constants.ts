export type ServiceItem = {
  img: string
  value: string
  label: string
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

export type AvailableHourItem = {
  hour: string
  available: boolean
}

export type ReservationForm = Partial<{
  car: string
  service: string
  date: Date
  hour: string
  notes: string
}>

export type ReviewItem = {
  rating: number
  date: Date
  serviceType: string
  review: string
}
