import { WeatherMain } from "@/types/api";
import { WhetherTheme } from "@/types/theme";

export const DefaultColors: WhetherTheme = {
  color1: "gray",
  color2: "gray",
  type: "radial",
};

export const WetherColors: Record<WeatherMain, WhetherTheme> = {
  Clear: {
    color1: "#FFBC70",
    color2: "#FFF6D3",
    type: "radial",
  },
  Clouds: {
    color1: "#6C6C6C",
    color2: "#FFFFFF",
    type: "linear",
    degree: "104deg",
  },
  Rain: {
    color1: "#1C404D",
    color2: "#C0D0DB",
    type: "linear",
    degree: "238deg",
  },
  Drizzle: {
    color1: "#1C404D",
    color2: "#7395AB",
    type: "linear",
    degree: "238deg",
  },
  Snow: {
    color1: "#FFFFFF",
    color2: "#D0D0D0",
    type: "linear",
    degree: "135deg",
  },
  Thunderstorm: {
    color1: "#152127",
    color2: "#D6CE98",
    type: "linear",
    degree: "238deg",
  },
  Mist: {
    color1: "#6C6C6C",
    color2: "#FFFFFF",
    type: "radial",
  },
  Fog: {
    color1: "#6C6C6C",
    color2: "#FFFFFF",
    type: "radial",
  },
  Haze: {
    color1: "#6C6C6C",
    color2: "#FFFFFF",
    type: "radial",
  },
};
