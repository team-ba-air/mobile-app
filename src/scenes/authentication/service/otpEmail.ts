import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"

export type OtpEmailRequest = {
  email: string
}

export type OtpEmailResponse = {

}

export const otpEmailEndpoint = '/email/otp'

const otpEmail = async (data: OtpEmailRequest) => {
  const response: PublicAPIResponse<OtpEmailResponse> = await networkService.post(otpEmailEndpoint, data)

  return response
}

export default otpEmail
