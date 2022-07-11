import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { ServiceItem } from "../constants"

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
  ['Transmisi', 'https://i.ibb.co/S3ph3Nd/Transmisi.png'],
  ['Inspeksi', 'https://i.ibb.co/0tKvWMX/Inspeksi.png']
])


const mapResponse = (response: PublicAPIResponse<GetServicesListResponse>): PublicAPIResponse<ServiceItem[]> => {
  const serviceList = response.body ?? []
  return {
    ...response,
    body: serviceList.map(value => ({
      ...value,
      image: MAP_IMAGE_URL.get(value.name) ?? ''
    }))
  }
}

const getServicesList = async () => {
  const response: PublicAPIResponse<GetServicesListResponse> = await networkService.get(getServicesListEndpoint)

  return mapResponse(response)
}

export default getServicesList
