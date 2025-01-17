type ApiPorts = '8180' | '8140' | '8150' | '8130'

export const getBaseUrl = (ports: ApiPorts) => {
  return `http://195.201.60.76:${ports}/`
}
