import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { PaymentMethodSelectionItem } from "scenes/checkout/constants"
import { AdditionalComponentItem, ServiceInfo, ShopInfo, VehicleInfo } from "scenes/home/constants"
import { HistoryDetailItem, ReviewItem } from "../constants"

export type GetHistoryDetailRequest = {
  id: string
}

export type GetHistoryDetailResponse = {
  id: string
  booking_number: string
  status: number
  car: VehicleInfo
  shop: ShopInfo
  service: ServiceInfo
  datetime: string
  notes: string
  payment_method: PaymentMethodSelectionItem | null
  additional_component: AdditionalComponentItem[]
  requested_additional_component_notes: string
  review: ReviewItem | null
}

export const getHistoryDetailEndpoint = '/history'

const mapResponse = (response: PublicAPIResponse<GetHistoryDetailResponse>): PublicAPIResponse<HistoryDetailItem> => {
  let datetime = new Date()
  if (response.body?.datetime) {
    datetime = new Date(response.body.datetime) 
    datetime.setHours(datetime.getHours() - 7)
  }
  return {
    ...response,
    body: {
      id: response.body?.id ?? '',
      booking_number: response.body?.booking_number ?? '',
      status: response.body?.status ?? -1,
      car: response.body?.car,
      shop: response.body?.shop,
      service: response.body?.service,
      datetime,
      notes: response.body?.notes ?? '',
      payment_method: response.body?.payment_method ?? null,
      additional_component: response.body?.additional_component ?? [],
      requested_additional_component_notes: response.body?.requested_additional_component_notes ?? '',
      review: response.body?.review ?? null,
    }
  }
}
const getHistoryDetail = async (request?: GetHistoryDetailRequest) => {
  const response: PublicAPIResponse<GetHistoryDetailResponse> = await networkService.get(`${getHistoryDetailEndpoint}/${request?.id}`)

  return mapResponse(response)
}

export default getHistoryDetail