import { fetchCities, getFlagUrl } from "@/api";
import { CitiesResponse } from "@/types/api";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { AutoCompleteProps } from "./AutoComplete.type";

const AutoComplete: FC<AutoCompleteProps> = ({
  value,
  className,
  onItemClick,
  ...rest
}) => {
  const [data, setData] = useState<CitiesResponse | null>(null);

  useEffect(() => {
    if (!value) return;

    let isMounted = true;
    const controller = new AbortController();

    fetchCities(value, controller.signal)
      .then((res) => {
        if (!isMounted) return;
        setData(res);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to fetch cities", err);
        setData(null);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [value]);

  if (!value || !data || data.length <= 0) return null;

  return (
    <div
      {...rest}
      className={clsx(
        className,
        "absolute bg-white w-full z-10 top-[calc(100%+8px)] border border-gray-300 rounded-lg shadow-md py-4"
      )}
    >
      {data?.map(({ name, lat, lon, state, country }) => (
        <div
          className="px-4 py-2 flex items-center justify-between cursor-pointer transition-colors bg-white hover:bg-gray-100 active:bg-gray-100"
          role="button"
          tabIndex={0}
          key={`${name}-${lat}-${lon}`}
          onClick={() => onItemClick(name)}
        >
          <span>
            {name}
            {state && `, ${state}`}
          </span>
          <img src={getFlagUrl(country)} />
        </div>
      ))}
    </div>
  );
};

export default AutoComplete;
