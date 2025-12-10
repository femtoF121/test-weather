import clsx from "clsx";
import { useState } from "react";
import { fetchWeatherByCity } from "./api";
import CityNamePanel from "./components/CityNamePanel/CityNamePanel";
import ForecastInfo from "./components/ForecastInfo/ForecastInfo";
import EmptyState from "./components/HomePageStates/EmptyState/EmptyState";
import ErrorState from "./components/HomePageStates/ErrorState/ErrorState";
import LoadingState from "./components/HomePageStates/LoadingState/LoadingState";
import { useCachedFetch } from "./hooks/useCachedFetch/useCachedFetch";
import { useTheme } from "./hooks/useTheme/useTheme";
import { WeatherResponse } from "./types/api";

const App = () => {
  const [city, setCity] = useState("");

  const { data, loading, error } = useCachedFetch<WeatherResponse>({
    queryFn: (signal) => fetchWeatherByCity(city, signal),
    key: city,
    enabled: !!city,
  });

  const { background } = useTheme(data?.weather[0].main || null);

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
          <EmptyState />
        ) : error ? (
          <ErrorState />
        ) : loading || !data ? (
          <LoadingState />
        ) : (
          <ForecastInfo data={data} />
        )}
      </div>
    </div>
  );
};

export default App;
