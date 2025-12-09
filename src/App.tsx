import clsx from "clsx";
import { useEffect, useState } from "react";
import { fetchWeatherByCity } from "./api";
import CityNamePanel from "./components/CityNamePanel";
import ForecastInfo from "./components/ForecastInfo";
import SkeletonLoader from "./components/SkeletonLoader";
import { DefaultColors, WeatherColors } from "./constants/theme";
import { useCachedFetch } from "./hooks/useCachedFetch";
import { WeatherResponse } from "./types/api";
import { WeatherTheme } from "./types/theme";

const App = () => {
  const [city, setCity] = useState("");
  const [background, setBackground] = useState(DefaultColors.color1);

  const { data, loading, error } = useCachedFetch<WeatherResponse>(
    () => fetchWeatherByCity(city),
    city
  );

  console.log("first");

  useEffect(() => {
    const changeTheme = (theme: WeatherTheme) => {
      document.documentElement.style.setProperty("--color1", theme.color1);
      document.documentElement.style.setProperty("--color2", theme.color2);
      setBackground(
        `${theme.type}-gradient(${theme.degree ? theme.degree + ", " : ""}${
          theme.color1
        }, ${theme.color2})`
      );
    };

    if (data) changeTheme(WeatherColors[data.weather[0].main]);
    else changeTheme(DefaultColors);
  }, [data]);

  return (
    <div
      className="min-h-screen p-4 md:p-10"
      style={{
        background: background,
      }}
    >
      <div className="mx-auto max-w-[860px] bg-white p-8 px-10 rounded-xl shadow-md relative text-2xl">
        <CityNamePanel
          setCity={setCity}
          className={clsx(error || !city ? "mb-6" : "mb-10")}
        />
        {city === "" ? (
          <div className="text-center ">
            Please enter a city name to get forecast.
          </div>
        ) : error ? (
          <div className="text-center ">
            Error fetching weather data. Please try again.
          </div>
        ) : loading || !data ? (
          <SkeletonLoader />
        ) : (
          <ForecastInfo data={data} />
        )}
      </div>
    </div>
  );
};

export default App;
