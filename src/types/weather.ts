export interface WeatherResponse {
  status: string;
  data: WeatherData;
}

export interface WeatherData {
  city: string;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  icon: string;
  precipitationChance: number;
  windSpeed: number;
}

export interface DailyForecast {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  icon: string;
  precipitationChance: number;
  windSpeed: number;
}

export interface CityLookupResponse {
  status: string;
  data: CityInfo[];
}

export interface CityInfo {
  name: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  displayName: string;
}

export interface UserSession {
  sessionId: string;
  city: string;
}

export interface MultiWeatherResponse {
  status: string;
  data: Record<string, CurrentWeather>;
}
