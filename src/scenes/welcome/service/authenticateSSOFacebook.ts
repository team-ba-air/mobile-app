import networkService from "network/api/networkService"
import { LoginResponse, PublicAPIResponse } from "network/types"

export type AuthenticateSSOFacebookRequest = {
  token: string
}

export type AuthenticateSSOFacebookResponse = LoginResponse

export const authenticateSSOFacebookEndpoint = '/auth/facebook'

const authenticateSSOFacebook = async (data: AuthenticateSSOFacebookRequest) => {
  const response: PublicAPIResponse<AuthenticateSSOFacebookResponse> = await networkService.post(authenticateSSOFacebookEndpoint, data)

  return response
}

export default authenticateSSOFacebook
