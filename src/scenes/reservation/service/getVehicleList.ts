import { OptionItem } from "components/Dropdown"
import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { VehicleResponse } from "network/types/response/vehicle"

export type GetVehicleListRequest = {}

export type GetVehicleListResponse = VehicleResponse[]

export const getVehicleListEndpoint = 'vehicle'

export const mapVehicleListResponse = (response: PublicAPIResponse<GetVehicleListResponse>): PublicAPIResponse<OptionItem[]> => {
  const vehicleList = response?.body ?? []
  return {
    ...response,
    body: vehicleList.map((vehicle) => ({
      value: `${vehicle.id}|${vehicle.brand}|${vehicle.type}|${vehicle.license_plate}`,
      data: vehicle
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
