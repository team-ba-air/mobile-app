export type VehicleItem = {
  id: string
  brand: string
  type: string
  year: string
  color: string
  plat: string
  vin: string
  expiredDate?: Date
  lastService: string
  imageUrl: string
}

export type VehicleBrandItem = {
  id: string
  name: string
  image_url: string
}