import networkService from "network/api/networkService"
import QueryString from 'qs'
import { PublicAPIResponse } from "network/types"

export type GetShopDetailRequest = {
  id: string
}

export type GetShopDetailResponse = {
  id: string
  name: string
  rating?: string
  image?: string
  description: string
  is_authorized: boolean
  distance: number
  service_available: string[]
  available_for_car: string[]
  location: {
    latitude: number
    longitude: number
  }
}

export const getShopDetailEndpoint = '/shop'

const getShopDetail = async (request: GetShopDetailRequest) => {
  const response: PublicAPIResponse<GetShopDetailResponse> = await networkService.get(`${getShopDetailEndpoint}/${request.id}`)

  return response
}

export default getShopDetail
