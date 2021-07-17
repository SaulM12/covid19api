export interface Datos {
    country: string
    provinces: Province[]
    latitude: number
    longitude: number
    date: string
}
export interface Province {
    province: string
    confirmed: number
    recovered: number
    deaths: number
    active: number
  }
export interface Country {
    code:string,
    name:string
}
export interface Total {
    country: string
    code: string
    confirmed: number
    recovered: number
    critical: number
    deaths: number
    latitude: number
    longitude: number
    lastChange: string
    lastUpdate: string
  }
  