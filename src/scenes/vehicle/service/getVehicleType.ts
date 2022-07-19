import { OptionItem } from "components/Dropdown"
import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import QueryString from "qs"

export type GetVehicleTypeRequest = {
  brand: string
}

export type GetVehicleTypeResponse = string[]

export const getVehicleTypeEndpoint = 'vehicle/type'

const mapResponseToOption = (response: PublicAPIResponse<GetVehicleTypeResponse>): PublicAPIResponse<OptionItem[]> => {
  const brandList = response.body ?? []
  console.log(response)
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
  console.log(query)
  const response: PublicAPIResponse<GetVehicleTypeResponse> = await networkService.get(
    `${getVehicleTypeEndpoint}?${query}`
  )

  return mapResponseToOption(response)
}

export default getVehicleType