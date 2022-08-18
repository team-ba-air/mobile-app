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
  const typeList = response.body ?? []
  const typeListOption = typeList.map(value => ({
    data: value,
    value: value,
  }))
  typeListOption.push({
    data: 'Other',
    value: 'Other',
  })
  return {
    ...response,
    body: typeListOption,
  }
}

const getVehicleType = async (request: GetVehicleTypeRequest) => {
  const query = QueryString.stringify(request)

  const response: PublicAPIResponse<GetVehicleTypeResponse> = await networkService.get(
    `${getVehicleTypeEndpoint}?${query}`
  )

  return mapResponseToOption(response)
}

export default getVehicleType