import networkService from "network/api/networkService"
import QueryString from 'qs'
import { PublicAPIResponse } from "network/types"
import { BengkelItem, ServiceItem } from "../constants"

export type GetServicesListRequest = {}

export type GetServicesListResponse = {
  id: string
  image: string
  username: string
  full_name: string
}[]

export const getServicesListEndpoint = '/service'

const getServicesList = async () => {
  const response: PublicAPIResponse<GetServicesListResponse> = await networkService.get(getServicesListEndpoint)

  return response
}

export default getServicesList
