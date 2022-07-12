import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { AdditionalComponentItem, BookingInformationItem } from "scenes/home/constants"
import { PaymentMethodSelectionItem } from "../constants"

export type UpdateProgressServiceRequest = {
  status?: number
  additionalComponent: AdditionalComponentItem[]
  paymentMethod: PaymentMethodSelectionItem
}

export type UpdateProgressServiceRequestData = {
  status?: number
  payment_method: string
  additional_component: AdditionalComponentItem[]
}

export type UpdateProgressServiceResponse = {
  id: string
  booking_number: string
  additional_component: AdditionalComponentItem[]
  booking_information: BookingInformationItem
  payment_method: PaymentMethodSelectionItem
}

export const UpdateProgressServiceEndpoint = 'reserve'

const mapRequestData = (request: UpdateProgressServiceRequest): UpdateProgressServiceRequestData => {
  return {
    status: request.status,
    payment_method: request.paymentMethod.id,
    additional_component: request.additionalComponent
  }
}

const UpdateProgressService = async (request: UpdateProgressServiceRequest) => {
  const data = mapRequestData(request)

  const response: PublicAPIResponse<UpdateProgressServiceResponse> = await networkService.post(
    UpdateProgressServiceEndpoint,
    data
  )

  return response
}

export default UpdateProgressService