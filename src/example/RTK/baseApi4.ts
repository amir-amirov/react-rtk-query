import { axiosBaseQuery } from './baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from './api'

// порт 8130
export const baseApi4 = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: getBaseUrl('8130'),
  }),
  reducerPath: 'baseApi4',
  tagTypes: [
    'faq',
    'user_products',
    'product',
    'categories',
    'map_region_data_products',
    'products_count_list_by_country',
  ],
  endpoints: (builder) => ({}),
})
