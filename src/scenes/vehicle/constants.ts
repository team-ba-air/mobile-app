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

export type VehicleForm = Partial<{
  brand: string
  customBrand: string
  type: string
  customType: string
  year: string
  color: string
  plat: string
  vin: string
  expireDate: Date
}>

export type VehicleBrandItem = {
  id: string
  name: string
  image_url: string
}