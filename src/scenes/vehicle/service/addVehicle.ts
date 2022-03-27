import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { VehicleResponse } from "network/types/response/vehicle"
import { VehicleItem } from "../constants"


export type AddVehicleRequest = { 
  car: VehicleItem
}

export type AddVehicleData = { 
  brand: string
  type: string
  year: string
  color: string
  license_plate: string
  vin: string
  certificate_expire_date?: string
}

export type AddVehicleResponse = VehicleResponse[]

export const addVehicleEndpoint = 'vehicle'

export const mapCarToAddVehicleData = (data: VehicleItem): AddVehicleData => {
  return {
    brand: data.brand,
    type: data.type,
    year: data.year,
    color: data.color,
    license_plate: data.plat,
    vin: data.vin,
    certificate_expire_date: data.expiredDate?.toISOString(),
  }
}

const addVehicle = async (request: AddVehicleRequest) => {
  const data = mapCarToAddVehicleData(request.car)
  const response: PublicAPIResponse<AddVehicleResponse> = await networkService.post(
    addVehicleEndpoint,
    data
  )

  return response
}

export default addVehicle
