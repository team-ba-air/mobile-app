import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { ReservationForm } from "scenes/reservation/constants"


export type CreateReservationRequest = {
  data: ReservationForm
}

export type CreateReservationRequestData = {
  shop_id: string
  service_id: string
  // payment_id: string
  datetime: Date
  car_id: string
  notes: string
}

export type CreateReservationResponse = {
  reservation_id: string
}

export const createReservationEndpoint = 'reserve'

const mapRequestData = (request: CreateReservationRequest): CreateReservationRequestData => {
  const data = request.data
  return {
    shop_id: '',
    service_id: data.service ?? '',
    // payment_id: data.payment?.id ?? '',
    datetime: new Date(),
    car_id: data.car?.split('|')?.[0] ?? '',
    notes: data.notes ?? '',
  }
}

const createReservation = async (request: CreateReservationRequest) => {
  const data = mapRequestData(request)

  const response: PublicAPIResponse<CreateReservationResponse> = await networkService.post(
    createReservationEndpoint,
    data
  )

  return response
}

export default createReservation
