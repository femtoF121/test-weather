import { useCallback, useEffect, useState } from "react";

import clsx from "clsx";
import { FC } from "react";
import AutoComplete from "../AutoComplete/AutoComplete";
import { CityNamePanelProps } from "./CityNamePanel.type";

const CityNamePanel: FC<CityNamePanelProps> = ({
  setCity,
  className,
  ...rest
}) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  const handleSetCity = useCallback(
    (city: string) => {
      setValue("");
      setDebouncedValue("");
      setCity(city);
    },
    [setCity]
  );

  return (
    <div
      {...rest}
      className={clsx("mx-auto flex gap-4 w-full text-2xl", className)}
    >
      <div className="flex-1 bg-white rounded-lg relative">
        <input
          type="text"
          placeholder="Enter city name"
          value={value}
          className="w-full px-4 py-3"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSetCity(value);
          }}
        />
        <AutoComplete
          value={debouncedValue}
          onItemClick={(city: string) => handleSetCity(city)}
        />
      </div>
      <button className="min-w-24" onClick={() => handleSetCity(value)}>
        Enter
      </button>
    </div>
  );
};

export default CityNamePanel;
