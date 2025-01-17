import { axiosBaseQuery } from './baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from './api'

// порт 8150
export const baseApi3 = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: getBaseUrl('8150'),
  }),
  reducerPath: 'baseApi3',
  tagTypes: [
    'friends',
    'setGroupAvatar',
    'topic_files',
    'topic_links',
    'notification_settings',
    'topic_is_unique_link',
    'subscribers',
    'admins',
    'communities',
    'communitiy_discussions',
    'backgroundChat',
    'users_in_block',
    'users_request',
    'message_search',
    'news_list',
    'lang_topic',
    'send_message',
    'comments',
    'posts',
    'user_block_in_topic',
  ],
  endpoints: (builder) => ({}),
})
