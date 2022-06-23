import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { ReservationDetailItem } from "../constants"

export type GetProgressServiceDetailRequest = {
  id: string
}

export type GetProgressServiceDetailResponse = ReservationDetailItem

export const getProgressServiceDetailEndpoint = 'progress-service'

const getProgressServiceDetail = async (request?: GetProgressServiceDetailRequest) => {
  const response: PublicAPIResponse<GetProgressServiceDetailResponse> = await networkService.get(
    `${getProgressServiceDetailEndpoint}/${request?.id}`
  )

  return response
}

export default getProgressServiceDetail
