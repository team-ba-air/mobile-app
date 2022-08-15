import networkService from "network/api/networkService"
import { PublicAPIResponse } from "network/types"
import { HistoryItem, ReviewHistoryForm } from "../constants"

export type SubmitReviewRequest = {
  history: HistoryItem
  review: ReviewHistoryForm
}

type SubmitReviewDataRequest = {
  transaction_id: string
  shop_service_id: string
  rating: number
  review: String
}

export type SubmitReviewResponse = any

export const submitReviewEndpoint = (id: string) => `shop/${id}/review`

const mapSubmitReviewData = (request: SubmitReviewRequest): SubmitReviewDataRequest => {
  return {
    transaction_id: request.history.transaction_id,
    shop_service_id: request.history.service?.id ?? '',
    rating: request.review.rating,
    review: request.review.review,
  }
}

const submitReview = async (request: SubmitReviewRequest) => {
  const data = mapSubmitReviewData(request)
  const response: PublicAPIResponse<SubmitReviewResponse> = await networkService.post(
    submitReviewEndpoint(request.history.shop?.id ?? ''),
    data
  )
  
  return response
}

export default submitReview