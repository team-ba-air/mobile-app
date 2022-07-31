import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { PaymentMethodSelectionItem } from "scenes/checkout/constants"
import { AdditionalComponentItem, BookingInformationItem } from "../constants"

export type UpdateProgressServiceRequest = {
  status: number
  id: string
}

export type UpdateProgressServiceResponse = {
  booking_number: string
  additional_component: AdditionalComponentItem[]
  booking_information: BookingInformationItem
  payment_method: PaymentMethodSelectionItem
}

export const UpdateProgressServiceEndpoint = 'service-progress'

const updateProgressService = async (request: UpdateProgressServiceRequest) => {
  const response: PublicAPIResponse<UpdateProgressServiceResponse> = await networkService.put(
    `${UpdateProgressServiceEndpoint}/${request.id}`,
    request
  )

  return response
}

export default updateProgressService