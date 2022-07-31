import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { AdditionalComponentItem, BookingInformationItem, ServiceInfo, ShopInfo, VehicleInfo } from "scenes/home/constants"
import { ReservationForm } from "scenes/reservation/constants"
import { PaymentMethodSelectionItem } from "../constants"


export type CreateReservationRequest = {
  data: ReservationForm
}

export type CreateReservationRequestData = {
  shop_id: string
  shop_service_id: string
  datetime: string
  car_id: string
  notes: string
}

export type CreateReservationResponse = {
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

export type ReservationData = {
  id: string
  booking_number: string
  payment_method: PaymentMethodSelectionItem | null
  info_booking: BookingInformationItem
  additional_component: AdditionalComponentItem[]
}

export const createReservationEndpoint = 'reserve'

const mapRequestData = (request: CreateReservationRequest): CreateReservationRequestData => {
  const data = request.data
  const datetime = new Date(data.date ?? 0)
  const hourValue = data.hour?.split(':') ?? []
  datetime.setHours(parseInt(hourValue[0]) + 7)
  datetime.setMinutes(parseInt(hourValue[1]))
  datetime.setSeconds(0)
  return {
    shop_id: data.shop?.id ?? '',
    shop_service_id: data.service?.split('|')?.[0] ?? '',
    datetime: datetime.toISOString(),
    car_id: data.car?.split('|')?.[0] ?? '',
    notes: data.notes ?? '',
  }
}

const mapResponseData = (response: PublicAPIResponse<CreateReservationResponse>): PublicAPIResponse<ReservationData> => {
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

const createReservation = async (request: CreateReservationRequest) => {
  const data = mapRequestData(request)
  console.log(data)
  const response: PublicAPIResponse<CreateReservationResponse> = await networkService.post(
    createReservationEndpoint,
    data
  )

  return mapResponseData(response)
}

export default createReservation
