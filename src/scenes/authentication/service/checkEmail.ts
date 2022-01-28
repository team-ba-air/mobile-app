import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"

export type CheckEmailRequest = {
  email: string
}

export type CheckEmailResponse = {

}

export const checkEmailEndpoint = '/email'

const checkEmail = async (data: CheckEmailRequest) => {
  const response: PublicAPIResponse<CheckEmailResponse> = await networkService.post(checkEmailEndpoint, data)

  return response
}

export default checkEmail
