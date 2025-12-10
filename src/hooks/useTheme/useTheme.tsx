import { DefaultColors, WeatherColors } from "@/constants/theme";
import { WeatherMain } from "@/types/api";
import { WeatherTheme } from "@/types/theme";
import { useEffect, useState } from "react";

export const useTheme = (weatherKey: WeatherMain | null) => {
  const [background, setBackground] = useState(DefaultColors.color1);

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

    if (!weatherKey) changeTheme(DefaultColors);
    else changeTheme(WeatherColors[weatherKey]);
  }, [weatherKey]);

  return { background };
};
