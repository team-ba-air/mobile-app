import networkService from "network/api/networkService"
import QueryString from 'qs'
import { PublicAPIResponse } from "network/types"
import { BengkelItem, ShopReview } from "../constants"

export type GetShopReviewRequest = {
  id: string
}

export type GetShopReviewResponse = {
  total_count: number
  average_rating: number
  reviews: {
    name: string
    car: string
    service: string
    date: string
    rating: number
    description: string
  }[]
}

export const getShopReviewEndpoint = '/shop'

const mapResponse = (response: PublicAPIResponse<GetShopReviewResponse>): PublicAPIResponse<ShopReview> => {
  const reviewList = response.body?.reviews ?? []
  return {
    ...response,
    body: {
      total_count: response.body?.total_count ?? 0,
      average_rating: response.body?.average_rating ?? 0,
      reviews: reviewList.map(review => ({
        name: review.name,
        car: review.car,
        service: review.service,
        rating: review.rating,
        description: review.description,
        date: new Date(review.date),
      }))
    }
  }
}

const getShopReview = async (request: GetShopReviewRequest) => {
  const response: PublicAPIResponse<GetShopReviewResponse> = await networkService.get(`${getShopReviewEndpoint}/${request.id}/review`)

  return mapResponse(response)
}

export default getShopReview
