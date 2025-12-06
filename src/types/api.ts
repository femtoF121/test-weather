export type WeatherResponse = {
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: WeatherMain;
    description: string;
    icon: string;
  }[];
  timezone: number;
  wind: { speed: number; deg: number };
  dt: number;
  sys: { country: string; sunrise: number; sunset: number };
};

export type WeatherMain =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Drizzle"
  | "Snow"
  | "Thunderstorm"
  | "Mist"
  | "Fog"
  | "Haze";

export type CitiesResponse = {
  name: string;
  lon: number;
  lat: number;
  country: string;
  state: string;
}[];
