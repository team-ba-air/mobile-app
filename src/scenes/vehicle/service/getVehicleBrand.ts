import { OptionItem } from "components/Dropdown"
import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { VehicleBrandItem } from "../constants"

export type GetVehicleBrandRequest = {}

export type GetVehicleBrandResponse = VehicleBrandItem[]

export const getVehicleBrandEndpoint = 'vehicle/brand'

const mapResponseToOption = (response: PublicAPIResponse<GetVehicleBrandResponse>): PublicAPIResponse<OptionItem[]> => {
  const brandList = response.body ?? []
  const brandListOption = brandList.map(value => ({
    data: value,
    value: value.name,
  }))

  brandListOption.push({
    data: {
      id: 'Other',
      name: 'Other',
      image_url: 'https://i.ibb.co/zF5gcyc/ic-logo.webp',
    },
    value: 'Other',
  })
  return {
    ...response,
    body: brandListOption
  }
}

const getVehicleBrand = async (request?: GetVehicleBrandRequest) => {
  const response: PublicAPIResponse<GetVehicleBrandResponse> = await networkService.get(
    getVehicleBrandEndpoint
  )

  return mapResponseToOption(response)
}

export default getVehicleBrand