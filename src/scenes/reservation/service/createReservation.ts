import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"

export type CreateReservationRequest = {
  token: string
}

export type CreateReservationResponse = {
  access_token: string
}

export const createReservationEndpoint = '/auth/facebook'

const createReservation = async (data: CreateReservationRequest) => {
  const response: PublicAPIResponse<CreateReservationResponse> = await networkService.post(createReservationEndpoint, data)

  return response
}

export default createReservation