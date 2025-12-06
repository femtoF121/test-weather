import { getIconUrl } from "@/api";
import { WeatherResponse } from "@/types/api";
import clsx from "clsx";
import { ComponentProps, FC } from "react";
import { FaDroplet, FaWind } from "react-icons/fa6";

interface ForecastInfoProps extends ComponentProps<"div"> {
  data: WeatherResponse;
}

const ForecastInfo: FC<ForecastInfoProps> = ({ data, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={clsx(
        "flex flex-col md:flex-row gap-10 justify-between",
        className
      )}
    >
      <div className="space-y-8">
        <h2 className="text-3xl">{data.name}</h2>
        <h2 className="text-6xl">{Math.round(data.main.temp)}°C</h2>
        <div className="flex flex-col gap-4 items-center justify-start [&>]:space-y-3 text-3xl">
          <div className="flex flex-wrap gap-x-10 gap-y-3 justify-between w-full">
            <h4 className="capitalize">{data.weather[0].description}</h4>
            <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
          </div>
          <div className="w-full flex justify-between *:flex *:items-center *:gap-3">
            <p>
              <FaDroplet size={20} className="text-blue-500" />{" "}
              {data.main.humidity}%
            </p>
            <p>
              <FaWind size={20} className="text-slate-400" /> {data.wind.speed}{" "}
              m/s
            </p>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-center">
        <img
          src={getIconUrl(data.weather[0].icon, 4)}
          className="drop-shadow-[5px_5px_20px_#7a7a7a] scale-[130%]"
        />
      </div>
    </div>
  );
};

export default ForecastInfo;
