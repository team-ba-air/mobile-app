import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { PaymentMethodSelectionItem } from "scenes/checkout/constants"
import { AdditionalComponentItem, BookingInformationItem } from "../constants"

export type UpdateProgressServiceRequest = {
  status: number
}

export type UpdateProgressServiceResponse = {
  booking_number: string
  additional_component: AdditionalComponentItem[]
  booking_information: BookingInformationItem
  payment_method: PaymentMethodSelectionItem
}

export const UpdateProgressServiceEndpoint = 'reserve'

const UpdateProgressService = async (request: UpdateProgressServiceRequest) => {
  const response: PublicAPIResponse<UpdateProgressServiceResponse> = await networkService.post(
    UpdateProgressServiceEndpoint,
    request
  )

  return response
}

export default UpdateProgressService