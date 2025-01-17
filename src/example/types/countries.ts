import { ICountry } from '@/types/item'

interface ICountryLink {
  first: string
  last: string
  prev: string
  next: string
}

interface ILanguageLinkMeta {
  active: boolean
  label: string
  url: null | string
}

interface ILanguageLink {
  first: string
  last: string
  next: null
  prev: null
}

interface IMetaLink {
  url: string
  label: string
  active: boolean
}

export interface ICountriesData {
  data: ICountry[]
  links: ICountryLink[]
  meta: {
    current_page: number
    from: number
    to: number
    last_page: number
    links: IMetaLink[]
    path: string
    per_page: number
    total: number
  }
}

export interface ILanguage {
  country?: ICountry
  full_name: string
  id: number
  short_name: string
}

export interface ILanguagesData {
  data: ILanguage[]
  links: ILanguageLink[]
  meta: {
    current_page: number
    from: number
    last_page: number
    links: ILanguageLinkMeta[]
    path: string
    per_page: number
    to: number
    total: number
  }
}
