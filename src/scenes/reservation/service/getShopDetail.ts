import networkService from "network/api/networkService"
import QueryString from 'qs'
import { PublicAPIResponse } from "network/types"
import { BengkelDetailItem } from "../constants"

export type GetShopDetailRequest = {
  id: string
}

export type GetShopDetailResponse = {
  id: string
  name: string
  rating?: number
  image?: string
  description: string
  is_authorized: boolean
  service_available: {
    id: string,
    name: string,
    description: string,
    price: number,
  }[]
  available_for_car: string[]
  open_time: string
  close_time: string
}

export const getShopDetailEndpoint = '/shop'

const mapResponseToBengkelDetailItem = (response: PublicAPIResponse<GetShopDetailResponse>): PublicAPIResponse<BengkelDetailItem> => {
  return {
    ...response,
    body: {
      id: response.body?.id ?? '',
      name: response.body?.name ?? '',
      rating: response.body?.rating ?? 0,
      img: response.body?.image ?? '',
      description: response.body?.description ?? '',
      isAuthorized: response.body?.is_authorized ?? false,
      serviceAvailable: response.body?.service_available ?? [],
      availableForCar: response.body?.available_for_car ?? [],
      openTime: response.body?.open_time ?? '',
      closeTime: response.body?.close_time ?? '',
    }
  }
}

const getShopDetail = async (request: GetShopDetailRequest) => {
  const response: PublicAPIResponse<GetShopDetailResponse> = await networkService.get(`${getShopDetailEndpoint}/${request.id}`)

  return mapResponseToBengkelDetailItem(response)
}

export default getShopDetail
