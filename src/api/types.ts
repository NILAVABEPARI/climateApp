export interface Coordinates {
    lat: number;
    lon: number
}

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string
}

export interface WeatherData {
    coord: Coordinates;
    weather: WeatherCondition[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number
    };
    clouds: {
        all: number
    };
    rain: {
        '1h': number
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number
    };
    timezone: number;
    id: number;
    name: string;
    cod: number
}

export interface List {
    dt: number;
    main: WeatherData["main"];
    weather: WeatherCondition[];
    clouds: {
        all: number
    };
    wind: WeatherData["wind"];
    visibility: number;
    pop: number;
    rain: {
        "3h": number
    };
    sys: {
        pod: string
    };
    dt_txt: string
}

export interface ForecastData {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
    city: {
        id: number;
        name: string;
        coord: Coordinates;
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number
    }
}

export interface GeoCodingResponse {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string
}