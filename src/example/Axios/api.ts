import axios, { AxiosRequestConfig } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { AuthService } from './AuthService'
import EncryptedStorage from 'react-native-encrypted-storage'
import { LOCAL_KEYS } from '@/constants/localStorage'
import { getBaseUrl } from '../RTK/api'

const config: AxiosRequestConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: getBaseUrl('8180'),
}

const instanceAxios = axios.create(config)

// Подключаем плагин для обновления токена
createAuthRefreshInterceptor(instanceAxios, AuthService.refreshToken)

// Устанавливаем токен в заголовок при каждом запросе
instanceAxios.interceptors.request.use(async (request: any) => {
  const accessToken = await EncryptedStorage.getItem(LOCAL_KEYS.accessToken)

  // console.log(`Bearer ${accessToken}`)

  if (accessToken) request.headers['Authorization'] = `Bearer ${accessToken}`
  return request
})

export default instanceAxios
