import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { VehicleResponse } from "network/types/response/vehicle"
import { VehicleItem } from "../constants"


export type UpdateVehicleByIdRequest = { 
  car: VehicleItem
}

export type UpdateVehicleByIdData = { 
  brand: string
  type: string
  year: string
  color: string
  license_plate: string
  vin: string
  certificate_expire_date: string
}

export type UpdateVehicleByIdResponse = VehicleResponse[]

export const updateVehicleByIdEndpoint = 'vehicle'

export const mapCarToUpdateVehicleData = (data: VehicleItem): UpdateVehicleByIdData => {
  return {
    brand: data.brand,
    type: data.type,
    year: data.year,
    color: data.color,
    license_plate: data.plat,
    vin: data.vin,
    certificate_expire_date: data.expiredDate,
  }
}

const UpdateVehicleById = async (request: UpdateVehicleByIdRequest) => {
  const data = mapCarToUpdateVehicleData(request.car)
  const response: PublicAPIResponse<UpdateVehicleByIdResponse> = await networkService.put(
    `${updateVehicleByIdEndpoint}/${request.car.id}`,
    data
  )

  return response
}

export default UpdateVehicleById
