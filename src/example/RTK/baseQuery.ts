import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react'
import { AxiosError, AxiosRequestConfig } from 'axios'
import instanceAxios from '../Axios/api'
import { LOG_MODE } from '@/app/hooks/useDebug'

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await instanceAxios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })

      // console.log('axiosresult', result)

      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError

      if (LOG_MODE) {
        console.log('axiosError', err)
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
          meta: {
            // дополнительная информация об ошибке, если необходимо
          },
        },
      }
    }
  }
