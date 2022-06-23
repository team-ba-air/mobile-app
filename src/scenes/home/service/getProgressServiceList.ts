import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { ReservationItem } from "../constants"

export type GetProgressServiceListRequest = {}

export type GetProgressServiceListResponse = ReservationItem[]

export const getProgressServiceListEndpoint = 'progress-service'

const getProgressServiceList = async (request?: GetProgressServiceListRequest) => {
  const response: PublicAPIResponse<GetProgressServiceListResponse> = await networkService.get(
    getProgressServiceListEndpoint
  )

  return response
}

export default getProgressServiceList
