export interface ClimaDiario {
    cod?: string
    message?: number
    cnt?: string
    list?: List[]
    city?: string
    country?: string
    main?: Main[]
    weather?: Weather[]
    wind?: Wind[]
    sys?: Sys
    coord?: Coord[]
    name?: string  
    timezone?: Date
}

export interface List {  
    main: Main
    weather: Weather[]
    clouds: Clouds
    wind: Wind
    snow: Snow
    sys: Sys
    dt_txt: string
    dt: any
}

export interface Main {
    temp: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
}

export interface Weather {
    id: number
    main: string
    description: string
    icon: string
}

export interface Clouds {
    all: number
}

export interface Wind {
    speed: number
    deg: number
    gust: number
}

export interface Snow {
    "3h"?: number
}

export interface Sys {
    pod: string
  
}


export interface Coord {
    lat: number
    lon: number
}
