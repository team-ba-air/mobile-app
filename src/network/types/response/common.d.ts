interface APIResponseError {
  errorCode: number
  code: string
  message: string
}

interface APIResponseMeta {
  page: number
  perPage: number
  total: number
}

interface PublicAPIResponse<T> {
  message?: string
  data?: T
  error?: APIResponseError
  meta?: APIResponseMeta
}

export { APIResponseError, APIResponseMeta, PublicAPIResponse }
