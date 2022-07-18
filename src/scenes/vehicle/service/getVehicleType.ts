import { OptionItem } from "components/Dropdown"
import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import QueryString from "qs"
import { VehicleBrandItem } from "../constants"

export type GetVehicleTypeRequest = {
  brand: string
}

export type GetVehicleTypeResponse = string[]

export const getVehicleTypeEndpoint = 'vehicle/type'

const mapResponseToOption = (response: PublicAPIResponse<GetVehicleTypeResponse>): PublicAPIResponse<OptionItem[]> => {
  const brandList = response.body ?? []
  return {
    ...response,
    body: brandList.map(value => ({
      data: value,
      value: value,
    }))
  }
}

const getVehicleType = async (request: GetVehicleTypeRequest) => {
  const query = QueryString.stringify(request)
  const response: PublicAPIResponse<GetVehicleTypeResponse> = await networkService.get(
    `${getVehicleTypeEndpoint}/?${query}`
  )

  return mapResponseToOption(response)
}

export default getVehicleType