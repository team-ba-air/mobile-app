import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { ServiceItem } from "scenes/reservation/constants"

export type GetServicesListRequest = {}

export type GetServicesListResponse = {
  id: string
  image: string
  name: string
  description: string
}[]

export const getServicesListEndpoint = '/service'

const MAP_IMAGE_URL = new Map([
  ['Servis Umum', 'https://i.ibb.co/wpmjkjc/Servis-umum.png'],
  ['Servis Reguler', 'https://i.ibb.co/smKY4zB/Servis-reguler.png'],
  ['Servis AC', 'https://i.ibb.co/sPvS94m/Servis-ac.png'],
  ['Servis Clutch', 'https://i.ibb.co/JsHc5Fr/Servis-clutch.png'],
  ['Servis Oli', 'https://i.ibb.co/qFJGMvj/Servis-Oli.png'],
  ['Rem', 'https://i.ibb.co/6PybvTn/Rem.png'],
  ['Kaca', 'https://i.ibb.co/GQD0qfR/Kaca.png'],
  ['Roda/Ban', 'https://i.ibb.co/6BTpPt6/Roda-Ban.png'],
  ['Transmisi', 'https://i.ibb.co/jfNXKgV/Transmisi.png'],
  ['Inspeksi', 'https://i.ibb.co/LkvDxVQ/Inspeksi.png'],
  ['Lainnya', 'https://i.ibb.co/KwKTGgv/More.png'],
])

const mapResponse = (response: PublicAPIResponse<GetServicesListResponse>): PublicAPIResponse<ServiceItem[]> => {
  const serviceList = response.body ?? []
  return {
    ...response,
    body: serviceList.map((value, idx) => ({
      ...value,
      name: idx === 7 ? 'Lainnya' : value.name,
      image: (idx < 7 ? MAP_IMAGE_URL.get(value.name) : MAP_IMAGE_URL.get('Lainnya')) ?? '',
    })).filter((value, idx) => idx < 8)
  }
}

const getServicesList = async () => {
  const response: PublicAPIResponse<GetServicesListResponse> = await networkService.get(getServicesListEndpoint)

  return mapResponse(response)
}

export default getServicesList