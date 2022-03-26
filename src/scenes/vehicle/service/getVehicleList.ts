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
      id: vehicle.id,
      brand: vehicle.brand,
      type: vehicle.type,
      year: vehicle.color,
      color: vehicle.color,
      plat: vehicle.license_plate ?? '',
      vin: vehicle.vin ?? '',
      expiredDate: vehicle.certificate_expire_date ?? '',
      lastService: '-',
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