import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"

export type RefreshTokenRequest = {
  token: string
}

export type RefreshTokenResponse = {
  access_token: string
  refresh_token: string
}

export const refreshTokenEndpoint = '/token/refresh'

const refreshToken = async (data: RefreshTokenRequest) => {
  const response: PublicAPIResponse<RefreshTokenResponse> = await networkService.post(refreshTokenEndpoint, data)

  return response
}

export default refreshToken
