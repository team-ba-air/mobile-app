export type ServiceItem = {
  id: string
  image: string
  description: string
  name: string
}

export type BengkelItem = {
  img: string
  isAuthorized: boolean
  isAlmostClosed: boolean
  name: string
  location: string
  description: string
  distance: number
  rating: number
  serviceAvailable: string[]
  availableForCar: string[]
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
  name: string
  rating: number
  date: Date
  serviceType: string
  review: string
}
