import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"

export type GetServicesListRequest = {}

export type GetServicesListResponse = {
  id: string
  image: string
  username: string
  description: string
}[]

export const getServicesListEndpoint = '/service'

const getServicesList = async () => {
  const response: PublicAPIResponse<GetServicesListResponse> = await networkService.get(getServicesListEndpoint)

  return response
}

export default getServicesList