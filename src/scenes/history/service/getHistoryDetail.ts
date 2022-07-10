import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { HistoryDetailItem } from "../constants"

export type GetHistoryDetailRequest = {
  id: string
}

export type GetHistoryDetailResponse = HistoryDetailItem

export const getHistoryDetailEndpoint = '/history'

const getHistoryDetail = async (request?: GetHistoryDetailRequest) => {
  const response: PublicAPIResponse<GetHistoryDetailResponse> = await networkService.get(`${getHistoryDetailEndpoint}/${request?.id}`)

  return response
}

export default getHistoryDetail