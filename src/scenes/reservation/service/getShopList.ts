import networkService from "network/api/networkService"
import QueryString from 'qs'
import { PublicAPIResponse } from "network/types"
import { BengkelItem } from "../constants"

export type GetShopListRequest = {
  type?: string
  typeCar?: string
  lat: number
  long: number
}

export type GetShopListResponse = {
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
}[]

export const getShopListEndpoint = '/shop'

const mapResponseToBengkelItem = (response: PublicAPIResponse<GetShopListResponse>): PublicAPIResponse<BengkelItem[]> => {
  const bengkelList = response.body ?? []
  return {
    ...response,
    body: bengkelList.map(bengkel => ({
      id: bengkel.id,
      img: bengkel.image ?? '',
      isAuthorized: bengkel.is_authorized,
      isAlmostClosed: false,
      name: bengkel.name,
      location: '',
      description: bengkel.description,
      distance: bengkel.distance,
      rating: Number(bengkel.rating ?? '0'),
      serviceAvailable: bengkel.service_available ?? [],
      availableForCar: bengkel.available_for_car ?? [],
    }))
  }
}

const getShopList = async (data: GetShopListRequest) => {
  const request = QueryString.stringify(data)
  console.log(`${getShopListEndpoint}/${request}`)
  const response: PublicAPIResponse<GetShopListResponse> = await networkService.get(`${getShopListEndpoint}/?${request}`)

  return mapResponseToBengkelItem(response)
}

export default getShopList
