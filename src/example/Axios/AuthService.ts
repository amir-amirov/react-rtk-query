import EncryptedStorage from 'react-native-encrypted-storage'
import { LOCAL_KEYS } from '@/constants/localStorage'
import { Endpoints } from '@/constants/endpoints'
import apiWithoutToken from './apiWithoutToken'
import { deviceId } from '@/constants/api'
import { getAsyncLocal } from '@/helpers/asyncStorage'
import { LOG_MODE } from '@/app/hooks/useDebug'

export class AuthService {
  static async refreshToken() {
    const refreshToken = await EncryptedStorage.getItem(LOCAL_KEYS.refreshToken)
    if (!refreshToken) {
      return
    }
    const location = await getAsyncLocal(LOCAL_KEYS.USER_LOCATION)

    let data = {
      success: false,
      type: 'Bearer',
      access_token: '',
      refresh_token: '',
    }

    if (LOG_MODE) {
      console.log('AuthService fingerprint', deviceId)
    }

    const refreshData: any = {
      refresh_token: refreshToken,
      fingerprint: deviceId,
    }

    if (location) {
      refreshData.longitude = location.longitude
      refreshData.latitude = location.latitude
    }

    await apiWithoutToken
      .post(`ru/${Endpoints.refresh}`, refreshData)
      .then((res) => {
        if (LOG_MODE) {
          console.log('saveTokens then', data)
        }

        if (res.success) {
          // dispatch(setIsLodingAC(true))
        } else {
          // dispatch(setIsLodingAC(false))
        }

        data = res.data
      })
      .catch((err) => {
        console.log('saveTokens err', err)
        return err
      })
    data.success &&
      AuthService.saveTokens(data.refresh_token, data.access_token)

    return data.success
  }

  private static async saveTokens(refreshToken: string, accessToken: string) {
    await EncryptedStorage.setItem(LOCAL_KEYS.accessToken, accessToken)
    await EncryptedStorage.setItem(LOCAL_KEYS.refreshToken, refreshToken)
  }
}
