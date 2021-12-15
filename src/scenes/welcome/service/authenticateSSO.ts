import authenticationService from "network/api/authenticationService"
import { PublicAPIResponse } from "network/types"

export type AuthenticateSSORequest = {
  token: string
}

export type AuthenticateSSOResponse = {

}

export const authenticateSSOEndpoint = '/auth'

const authenticateSSO = async (data: AuthenticateSSORequest) => {
  const response: PublicAPIResponse<AuthenticateSSOResponse> = await authenticationService.post(authenticateSSOEndpoint, data)

  return response
}

export default authenticateSSO
