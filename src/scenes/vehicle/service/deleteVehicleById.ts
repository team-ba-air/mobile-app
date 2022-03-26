import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"

export type DeleteVehicleByIdRequest = {
  id: string
}

export type DeleteVehicleByIdResponse = {}

export const deleteVehicleByIdEndpoint = 'vehicle'

const deleteVehicleById = async (request?: DeleteVehicleByIdRequest) => {
  const response: PublicAPIResponse<DeleteVehicleByIdResponse> = await networkService.delete(
    `${deleteVehicleByIdEndpoint}/${request?.id}`
  )

  return response
}

export default deleteVehicleById
