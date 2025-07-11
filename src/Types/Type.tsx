export interface serachProps {
  onSearch: (city: string) => void;
}

export interface AirQualityData {
  aqi: number;
  weather: weatherData;
  coord?: {
    lat: number;
    lon: number;
  };
}

export interface WeatherState {
  airQuality: AirQualityData | null;
  loading: boolean;
  error: string | null;
}

export interface Coords {
  lat: number;
  lon: number;
}

export interface weatherData {
  city: string;
  clouds: string;
  temperature: number;
  humidity: number;
}
//for major pollutants
export interface MajorPollutants {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

export interface MajorPollutantsState {
  pollutants: MajorPollutants | null;
  loading: boolean;
  error: string | null;
}

//For Hisorical data
export interface AQIDataPoint {
  dt: number;
  aqi: number;
}
export interface AQIHistoryState {
  history: AQIDataPoint[];
  loading: boolean;
  error: string | null;
}

//WeatherTypes
export interface WeatherDataPoint {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
}

export interface WeatherState {
  data: WeatherDataPoint[];
  loading: boolean;
  error: string | null;
  forecast?: {
    data: any[];
    loading: boolean;
    error: string | null;
  };
}
