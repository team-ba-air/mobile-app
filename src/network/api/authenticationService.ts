import axios, { AxiosResponse } from 'axios'
import { PublicAPIResponse } from 'network/types/response/common'
import Cookies from 'universal-cookie'
const cookie = new Cookies()

const authenticationService = axios.create({
  method: 'POST',
  baseURL: 'https://sst-kegiatan-be.informatika.site/',
  headers: {
    'Content-Type': 'application/json',
  },
})

authenticationService.interceptors.request.use(async request => {
  const token = cookie.get('accessToken')
  // console.log(token)

  request.headers = {
    ...request.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  return request
})

authenticationService.interceptors.response.use(
  (response): AxiosResponse<PublicAPIResponse<any>> => ({
    ...response.data,
    code: response.data?.code ?? response.status,
    success: response.data?.success ?? false,
    message: response.data?.message ?? '',
    data: response.data?.data ?? response?.data.result ?? response?.data,
  })
)
export default authenticationService
