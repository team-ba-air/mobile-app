import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import InfoLocation from "../components/InfoLocation"
import { ReservationItem, ServiceInfo, ShopInfo, VehicleInfo } from "../constants"

export type GetProgressServiceListRequest = {}

export type GetProgressServiceListResponse = {
  id: string
  info_booking: {
    car: VehicleInfo
    shop: ShopInfo
    service: ServiceInfo
    datetime: string
    notes: string
  }
  status: number
}[]

export const getProgressServiceListEndpoint = 'service-progress'

const mapResponse = (response: PublicAPIResponse<GetProgressServiceListResponse>): PublicAPIResponse<ReservationItem[]> => {
  const reservationList = response.body ?? []

  return {
    ...response,
    body: reservationList.map(value => ({
      id: value.id,
      info_booking: {
        car: value.info_booking.car,
        shop: value.info_booking.shop,
        service: value.info_booking.service,
        datetime: new Date(value.info_booking.datetime),
        notes: value.info_booking.notes
      },
      status: value.status,
    }))
  }
}

const getProgressServiceList = async (request?: GetProgressServiceListRequest) => {
  const response: PublicAPIResponse<GetProgressServiceListResponse> = await networkService.get(
    getProgressServiceListEndpoint
  )

  return mapResponse(response)
}

export default getProgressServiceList
