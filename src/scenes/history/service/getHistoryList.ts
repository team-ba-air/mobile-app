import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { HistoryItem } from "../constants"

export type GetHistoryListRequest = {}

export type GetHistoryListResponse = HistoryItem[]

export const getHistoryListEndpoint = '/history'

const getHistoryList = async () => {
  const response: PublicAPIResponse<GetHistoryListResponse> = await networkService.get(getHistoryListEndpoint)

  return response
}

export default getHistoryList