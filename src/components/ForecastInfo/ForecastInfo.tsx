import { getIconUrl } from "@/api";
import clsx from "clsx";
import { FC, useMemo } from "react";
import { FaDroplet, FaWind } from "react-icons/fa6";
import { ForecastInfoProps } from "./ForecastInfo.type";

const ForecastInfo: FC<ForecastInfoProps> = ({ data, className, ...rest }) => {
  const weatherVm = useMemo(() => {
    if (!data) return null;

    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      wind: Math.round(data.wind.speed),
      humidity: data.main.humidity,
      city: data.name,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  }, [data]);

  if (!weatherVm) return null;

  return (
    <div
      {...rest}
      className={clsx(
        "flex flex-col md:flex-row gap-10 justify-between",
        className
      )}
    >
      <div className="space-y-8">
        <h2 className="text-3xl">{weatherVm.city}</h2>
        <h2 className="text-6xl">{weatherVm.temp}°C</h2>
        <div className="flex flex-col gap-4 items-center justify-start [&>]:space-y-3 text-3xl">
          <div className="flex flex-wrap gap-x-10 gap-y-3 justify-between w-full">
            <h4 className="capitalize">{weatherVm.description}</h4>
            <p>Feels like: {weatherVm.feelsLike}°C</p>
          </div>
          <div className="w-full flex justify-between *:flex *:items-center *:gap-3">
            <p>
              <FaDroplet size={20} className="text-blue-500" />{" "}
              {weatherVm.humidity}%
            </p>
            <p>
              <FaWind size={20} className="text-slate-400" /> {weatherVm.wind}{" "}
              m/s
            </p>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-center">
        <img
          src={getIconUrl(weatherVm.icon, 4)}
          className="drop-shadow-[5px_5px_20px_#7a7a7a] scale-[130%]"
        />
      </div>
    </div>
  );
};

export default ForecastInfo;
