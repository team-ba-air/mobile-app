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
  location: string
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
  openTime: string
  closeTime: string
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
