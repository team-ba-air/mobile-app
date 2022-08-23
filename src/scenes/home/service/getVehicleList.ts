import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { VehicleResponse } from "network/types/response/vehicle"
import { VehicleItem } from "scenes/vehicle/constants"

export type GetVehicleListRequest = {}

export type GetVehicleListResponse = VehicleResponse[]

export const getVehicleListEndpoint = 'vehicle'

export const mapVehicleListResponse = (response: PublicAPIResponse<GetVehicleListResponse>): PublicAPIResponse<VehicleItem[]> => {
  const vehicleList = response?.body ?? []
  return {
    ...response,
    body: vehicleList.map((vehicle) => ({
      id: vehicle.id,
      brand: vehicle.brand,
      type: vehicle.type,
      year: vehicle.year,
      color: vehicle.color,
      plat: vehicle.license_plate ?? '',
      vin: vehicle.vin ?? '',
      expiredDate: new Date(vehicle.certificate_expire_date),
      lastService: vehicle.last_service,
      imageUrl: (vehicle.car_image_url ?? '') !== '' ? vehicle.car_image_url : 'https://i.ibb.co/rfnXkfF/empty-car.png',
    })),
  }
}

const getVehicleList = async (request?: GetVehicleListRequest) => {
  const response: PublicAPIResponse<GetVehicleListResponse> = await networkService.get(
    getVehicleListEndpoint
  )
  
  console.log('DARI HOME')
  return mapVehicleListResponse(response)
}

export default getVehicleList
