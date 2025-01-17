import { axiosBaseQuery } from './baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from './api'

// порт 8140
export const baseApi2 = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: getBaseUrl('8140'),
  }),
  reducerPath: 'baseApi2',
  tagTypes: ['onboarding'],
  endpoints: (builder) => ({}),
})
