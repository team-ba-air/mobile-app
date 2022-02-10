import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { VehicleResponse } from "network/types/response/vehicle"
import { VehicleItem } from "../constants"


export type GetVehicleListRequest = {}

export type GetVehicleListResponse = VehicleResponse[]

export const getVehicleListEndpoint = 'vehicle'

export const mapVehicleListResponse = (response: PublicAPIResponse<GetVehicleListResponse>): PublicAPIResponse<VehicleItem[]> => {
  const vehicleList = response?.data ?? []
  return {
    ...response,
    data: vehicleList.map((vehicle) => ({
      brand: vehicle.brand,
      type: vehicle.type,
      year: vehicle.color,
      plat: vehicle.license_plate
    })),
  }
}

const getVehicleList = async (request?: GetVehicleListRequest) => {
  const response: PublicAPIResponse<GetVehicleListResponse> = await networkService.get(
    getVehicleListEndpoint
  )

  return mapVehicleListResponse(response)
}

export default getVehicleList
