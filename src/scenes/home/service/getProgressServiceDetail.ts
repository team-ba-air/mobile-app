import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { PaymentMethodSelectionItem } from "scenes/checkout/constants"
import { AdditionalComponentItem, ReservationDetailItem, ServiceInfo, ShopInfo, StepTime, VehicleInfo } from "../constants"

export type GetProgressServiceDetailRequest = {
  id: string
}

export type GetProgressServiceDetailResponse = {
  id: string
  booking_number: string
  info_booking: {
    car: VehicleInfo
    shop: ShopInfo
    service: ServiceInfo
    datetime: string
    notes: string
  }
  status: number
  progress: {
    step: number
    time: string
  }[]
  service_assistant: string
  additional_component: AdditionalComponentItem[]
  requested_additional_component: AdditionalComponentItem[]
  requested_additional_component_notes: string
  payment_method: PaymentMethodSelectionItem | null
}

export const getProgressServiceDetailEndpoint = 'service-progress'

const mapResponse = (response: PublicAPIResponse<GetProgressServiceDetailResponse>): PublicAPIResponse<ReservationDetailItem> => {
  const progressList = response.body?.progress ?? []
  return {
    ...response,
    body: {
      id: response.body?.id ?? '',
      booking_number: response.body?.id ?? '',
      service_assistant: response.body?.service_assistant ?? '',
      info_booking: {
        car: response.body?.info_booking.car,
        shop: response.body?.info_booking.shop,
        service: response.body?.info_booking.service,
        datetime: response.body?.info_booking.datetime ? new Date(response.body.info_booking.datetime) : new Date(),
        notes: response.body?.info_booking.notes ?? ''
      },
      payment_method: response.body?.payment_method ?? null,
      status: response.body?.status ?? 0,
      progress: Array(5).fill(0).map((_, idx) => ({
        step: idx,
        time: (idx < (progressList.length + 1)) ? new Date(progressList[idx].time) : null,
      })),
      additional_component: response.body?.additional_component ?? [],
      requested_additional_component: response.body?.requested_additional_component ?? [],
      requested_additional_component_notes: response.body?.requested_additional_component_notes ?? '',
    }
  }
}

const getProgressServiceDetail = async (request?: GetProgressServiceDetailRequest) => {
  const response: PublicAPIResponse<GetProgressServiceDetailResponse> = await networkService.get(
    `${getProgressServiceDetailEndpoint}/${request?.id}`
  )

  return mapResponse(response)
}

export default getProgressServiceDetail
