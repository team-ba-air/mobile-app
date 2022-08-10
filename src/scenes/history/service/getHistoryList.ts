import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { AdditionalComponentItem, ServiceInfo, ShopInfo, VehicleInfo } from "scenes/home/constants"
import { HistoryItem, ReviewItem } from "../constants"

export type GetHistoryListRequest = {}

export type GetHistoryListResponse = {
  id: string
  status: number
  car: VehicleInfo
  shop: ShopInfo
  service: ServiceInfo
  datetime: string
  additional_component: AdditionalComponentItem[]
  review: ReviewItem | null
}[]

export const getHistoryListEndpoint = '/history'

const mapResponse = (response: PublicAPIResponse<GetHistoryListResponse>): PublicAPIResponse<HistoryItem[]> => {
  const historyList = response.body ?? []
  return {
    ...response,
    body: historyList.map(history => ({
      ...history,
      additional_component: history.additional_component ?? [],
      datetime: new Date(history.datetime)
    }))
  }
}
const getHistoryList = async () => {
  const response: PublicAPIResponse<GetHistoryListResponse> = await networkService.get(getHistoryListEndpoint)

  return mapResponse(response)
}

export default getHistoryList