export type ResponseVerifyCode = {
  message: string
  retry: number
  success: boolean
  error?: string
}

export type ResponseConfirmPhone = {
  access_token: string
  refresh_token: string
  success: boolean
  type: string
}
