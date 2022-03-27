import axios, { AxiosResponse } from 'axios'
import { PublicAPIResponse } from 'network/types/response/common'
import Cookies from 'universal-cookie'
import { getAccessToken } from 'utils/TokenUtils'
const cookie = new Cookies()

const networkService = axios.create({
  method: 'POST',
  baseURL: 'http://20.213.123.172:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
})

networkService.interceptors.request.use(async request => {
  const token = await getAccessToken()

  request.headers = {
    ...request.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  return request
})

networkService.interceptors.response.use(
  (response): AxiosResponse<PublicAPIResponse<any>> => ({
    ...response.data,
    code: response.data?.code ?? response.status,
    success: response.data?.success ?? false,
    message: response.data?.message ?? '',
    data: response.data?.data ?? response?.data.result ?? response?.data,
  })
)
export default networkService
