import { resolvePlugin } from '@babel/core'
import axios, { AxiosResponse, Method } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { APIResponseError, PublicAPIResponse } from './types/response/common'

const getApiFullEndpoint = (endpoint: string) => {
  return 'http://localhost:3000'
}

interface IFetch {
  error: APIResponseError | undefined
  isLoading: boolean
}

interface IUseGet<TResponse> extends IFetch {
  data: TResponse | undefined
}

const convertErrorToAPIError = (err: Error): APIResponseError => {
  return {
    errorCode: 500,
    code: err.name,
    message: err.message,
  }
}

const useGet = <TResponse, TRequest>(
  endpoint: string,
  params?: TRequest,
): IUseGet<TResponse> => {
  const [data, setData] = useState<TResponse>()
  const [error, setError] = useState<APIResponseError>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    axios.get(getApiFullEndpoint(endpoint), { params })
      .then((res: AxiosResponse<PublicAPIResponse<TResponse>>) => {
        if(!!res.data.data) {
          setData(res.data.data)
        } else {
          setError(res.data.error)
        }
      })
      .catch((err: Error) => {
        setError(convertErrorToAPIError(err))
      }) 
      .finally(() => {
        setLoading(false)
      })
  }, [endpoint, params])

  return {
    data,
    error,
    isLoading: loading,
  }
}

interface IUsePost<TResponse, TRequest> extends IFetch {
  doFetch: (param: TRequest) => Promise<TResponse | undefined>
}

const usePost = <TResponse, TRequest>(
  endpoint: string,
  method?: Method,
): IUsePost<TResponse, TRequest> => {
  const [error, setError] = useState<APIResponseError>()
  const [loading, setLoading] = useState<boolean>(false)

  const doFetch = useCallback(
    (param: TRequest): Promise<TResponse | undefined> => {
      setLoading(true)
      return new Promise(resolve => {
        axios(getApiFullEndpoint(endpoint), {
          method: method || 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: param,
        })
          .then((res: AxiosResponse<PublicAPIResponse<TResponse>>) => {
            if(!!res.data.data) {
              resolve(res.data.data)
            } else {
              setError(res.data.error)
              resolve(undefined)
            }
          })
          .catch((err: Error) => {
            setError(convertErrorToAPIError(err))
          })
          .finally(() => {
            setLoading(false)
          })
      })
    },
    [endpoint, method]
  )

  return {
    isLoading: loading,
    error,
    doFetch,
  }
}

export { useGet, usePost }
