export enum InterestTypes {
  SMALL_SHAPE = 'SMALL_SHAPE',
  MIDDLE_SHAPE = 'MIDDLE_SHAPE',
  BIG_SHAPE = 'BIG_SHAPE',
}

export interface IInterest {
  id: number
  name: string
  icon: string // '⚽️'
  type: InterestTypes
}

export type ResponseInterests = {
  success: boolean
  data: IInterest[]
}

export interface Ihelp {
  id: number
  name: string
  icon: string // '⚽️'
  type: null
}

export type ResponseHelps = {
  success: boolean
  data: Ihelp[]
}

export type ResponseHelpsCreate = {
  success: boolean
  data: Ihelp
}

export type ResponseHelpsSelect = {
  success: boolean
  result: {
    attached: number[]
    datached: number[]
  }
}
