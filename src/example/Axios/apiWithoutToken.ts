import axios, { AxiosRequestConfig } from 'axios'
import { getBaseUrl } from '../RTK/api'

const config: AxiosRequestConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: getBaseUrl('8180'),
}

const apiWithoutToken = axios.create(config)

export default apiWithoutToken
