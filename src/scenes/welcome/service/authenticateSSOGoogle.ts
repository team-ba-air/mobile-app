import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"

export type AuthenticateSSOGoogleRequest = {
  token: string
}

export type AuthenticateSSOGoogleResponse = {

}

export const authenticateSSOGoogleEndpoint = '/auth/google'

const authenticateSSOGoogle = async (data: AuthenticateSSOGoogleRequest) => {
  const response: PublicAPIResponse<AuthenticateSSOGoogleResponse> = await networkService.post(authenticateSSOGoogleEndpoint, data)

  console.log(response)
  return response
}

export default authenticateSSOGoogle
