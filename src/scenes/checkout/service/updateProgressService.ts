import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { AdditionalComponentItem, BookingInformationItem } from "scenes/home/constants"
import { PaymentMethodSelectionItem } from "../constants"

export type UpdateProgressServiceRequest = {
  status?: number
  additionalComponent: AdditionalComponentItem[]
  paymentMethod: PaymentMethodSelectionItem
  id: string
}

export type UpdateProgressServiceRequestData = {
  status?: number
  payment_id: string
  requested_id: string[]
}

export type UpdateProgressServiceResponse = {
  id: string
  booking_number: string
  additional_component: AdditionalComponentItem[]
  booking_information: BookingInformationItem
  payment_method: PaymentMethodSelectionItem
}

export const UpdateProgressServiceEndpoint = 'service-progress'

const mapRequestData = (request: UpdateProgressServiceRequest): UpdateProgressServiceRequestData => {
  return {
    status: request.status,
    payment_id: request.paymentMethod.id,
    requested_id: request.additionalComponent.map(value => value.id)
  }
}

const updateProgressService = async (request: UpdateProgressServiceRequest) => {
  const data = mapRequestData(request)

  const response: PublicAPIResponse<UpdateProgressServiceResponse> = await networkService.post(
    `${UpdateProgressServiceEndpoint}/${request.id}`,
    data
  )

  return response
}

export default updateProgressService