import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { PaymentMethodSelectionItem } from "scenes/checkout/constants"
import { ReservationData } from "scenes/checkout/service/createReservation"
import { AdditionalComponentItem, BookingInformationItem, ServiceInfo, ShopInfo, VehicleInfo } from "../constants"

export type UpdateProgressServiceRequest = {
  status: number
  id: string
}

export type UpdateProgressServiceResponse = {
  id: string
  booking_number: string
  payment_method: PaymentMethodSelectionItem | null
  info_booking: {
    car: VehicleInfo
    shop: ShopInfo
    service: ServiceInfo
    datetime: string
    notes: string
  }
  additional_component: AdditionalComponentItem[] | null
}

export const UpdateProgressServiceEndpoint = 'service-progress'

const mapResponseData = (response: PublicAPIResponse<UpdateProgressServiceResponse>): PublicAPIResponse<ReservationData> => {
  return {
    ...response,
    body: {
      id: response.body?.id ?? '',
      booking_number: response.body?.booking_number ?? '',
      payment_method: response.body?.payment_method ?? null,
      info_booking: {
        ...response.body?.info_booking,
        datetime: response.body?.info_booking.datetime ? new Date(response.body.info_booking.datetime) : new Date(),
        notes: response.body?.info_booking.notes ?? '',
      },
      additional_component: response.body?.additional_component ?? [],
    }
  }
}

const updateProgressService = async (request: UpdateProgressServiceRequest) => {
  const response: PublicAPIResponse<UpdateProgressServiceResponse> = await networkService.patch(
    `${UpdateProgressServiceEndpoint}/${request.id}`,
    {
      data: {
        status: request.status
      }
    }
  )

  return mapResponseData(response)
}

export default updateProgressService