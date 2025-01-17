import { ICountry } from '@/types/item'
import { IInterest, Ihelp } from './app'

export interface IGender {
  [key: string]: string
}

export interface IUserIamge {
  extension: string
  file_name: string
  id: number
  name: string
  original_url: string
  preview_url: string
  size: number
  uuid: string
}

export interface IUserProfileData {
  countries: []
  description: null
  friends: []
  id: number
  image: IUserIamge | null
  isFriend: boolean
  language: null | string // ru
  location: ICountry
  login: null | string
  name: null | string
  lang_to_translate: null | string // ru,en
  online: boolean
  date_of_birth: string
  interests: IInterest[]
  helps: Ihelp[]
  place: null | { longitude: number; latitude: number }
  homeland: string // '1'
  gender: {
    id: number
    name: string
  }
}

export interface IUserProfile {
  success: boolean
  data: IUserProfileData
}

export interface IOnboardingItem {
  id: number
  title: string
  text: string
  image_url: string
}

export type ResponseGenders = {
  success: boolean
  data: IGender
}

export type ResponseOnboarding = {
  success: boolean
  data: IOnboardingItem[]
}
