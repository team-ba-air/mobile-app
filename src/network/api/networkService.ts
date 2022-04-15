import axios, { AxiosResponse } from 'axios'
import refreshToken from 'network/service/refreshToken'
import { PublicAPIResponse } from 'network/types/response/common'
import { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken } from 'utils/TokenUtils'

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
  (response): AxiosResponse<PublicAPIResponse<any>> => {
    if (response.status === 401) {
      getRefreshToken().then(token => {
        refreshToken({ token }).then((newTokenResponse) => {
          if (newTokenResponse.body) {
            saveAccessToken(newTokenResponse.body.access_token)
            saveRefreshToken(newTokenResponse.body.refresh_token)
          }
        })
      })
    }
    return response
  }
)
export default networkService
