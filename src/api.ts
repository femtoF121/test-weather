import { CitiesResponse, WeatherResponse } from "./types/api";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchCities = async (city: string): Promise<CitiesResponse> => {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
  );

  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};

export const fetchWeatherByCity = async (
  city: string
): Promise<WeatherResponse> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
};

export const getIconUrl = (icon: string, scale?: number) => {
  return `https://openweathermap.org/img/wn/${icon}${
    scale ? "@" + scale + "x" : ""
  }.png`;
};

export const getFlagUrl = (country: string) => {
  return `https://flagsapi.com/${country}/flat/32.png`;
};
