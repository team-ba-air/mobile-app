import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { AdditionalComponentItem } from "scenes/home/constants"
import { PaymentMethodSelectionItem } from "../constants"

export type UpdateProgressServiceRequest = {
  additionalComponent: AdditionalComponentItem[]
  paymentMethod: PaymentMethodSelectionItem
}

export type UpdateProgressServiceRequestData = {
  payment_method: string
  additional_component: AdditionalComponentItem[]
}

export type UpdateProgressServiceResponse = {
  reservation_id: string
}

export const UpdateProgressServiceEndpoint = 'reserve'

const mapRequestData = (request: UpdateProgressServiceRequest): UpdateProgressServiceRequestData => {
  return {
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