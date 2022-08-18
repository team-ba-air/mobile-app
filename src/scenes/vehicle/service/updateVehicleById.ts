import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { VehicleResponse } from "network/types/response/vehicle"
import { isOnlySpace } from "utils/TextUtils"
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
  certificate_expire_date?: string
}

export type UpdateVehicleByIdResponse = VehicleResponse[]

export const updateVehicleByIdEndpoint = 'vehicle'

export const mapCarToUpdateVehicleData = (data: VehicleItem): UpdateVehicleByIdData => {
  return {
    brand: data.brand,
    type: data.type,
    year: data.year,
    color: !isOnlySpace(data.color) ? data.color : ' ',
    license_plate: data.plat,
    vin: !isOnlySpace(data.vin) ? data.vin : ' ',
    certificate_expire_date: data.expiredDate?.toISOString(),
  }
}

const updateVehicleById = async (request: UpdateVehicleByIdRequest) => {
  const data = mapCarToUpdateVehicleData(request.car)
  console.log(data)
  const response: PublicAPIResponse<UpdateVehicleByIdResponse> = await networkService.patch(
    `${updateVehicleByIdEndpoint}/${request.car.id}`,
    data
  )

  return response
}

export default updateVehicleById
