import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { PaymentMethodItem, PaymentMethodSelectionItem } from "../constants"


export type GetPaymentMethodRequest = {}

export type GetPaymentMethodResponse = {
  method: string
  name: PaymentMethodSelectionItem[]
}[]

export const getPaymentMethodEndpoint = 'payment-method'

const mapResponse = (response: PublicAPIResponse<GetPaymentMethodResponse>): PublicAPIResponse<PaymentMethodItem[]> => {
  const paymentMethodList = response.body ?? []
  return {
    ...response,
    body: paymentMethodList.map(value => ({
      method: value.method,
      item: value.name.map(item => ({
        ...item,
        active: value.method !== 'Transfer Virtual Account'
      }))
    }))
  }
}

const getPaymentMethod = async () => {
  const response: PublicAPIResponse<GetPaymentMethodResponse> = await networkService.get(
    getPaymentMethodEndpoint
  )

  return mapResponse(response)
}

export default getPaymentMethod
