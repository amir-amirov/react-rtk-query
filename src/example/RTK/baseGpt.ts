import { API_URL_GPT } from '@/constants/api'
import { axiosBaseQuery } from './baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseGpt = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL_GPT,
  }),
  reducerPath: 'baseGpt',
  tagTypes: ['mission_text', 'chat_first_message'],
  endpoints: (builder) => ({}),
})
