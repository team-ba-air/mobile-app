import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { PaymentMethodItem } from "../constants"


export type GetPaymentMethodRequest = {}

export type GetPaymentMethodResponse = PaymentMethodItem[]

export const getPaymentMethodEndpoint = 'payment-method'

const getPaymentMethod = async (request?: GetPaymentMethodRequest) => {
  const response: PublicAPIResponse<GetPaymentMethodResponse> = await networkService.get(
    getPaymentMethodEndpoint
  )

  return response
}

export default getPaymentMethod
