import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"

export type OtpPhoneRequest = {
  phone_number: string
}

export type OtpPhoneResponse = {

}

export const otpPhoneEndpoint = '/phone/otp'

const otpPhone = async (data: OtpPhoneRequest) => {
  const response: PublicAPIResponse<OtpPhoneResponse> = await networkService.post(otpPhoneEndpoint, data)

  return response
}

export default otpPhone
