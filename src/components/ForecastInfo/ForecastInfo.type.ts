import { WeatherResponse } from "@/types/api";
import { ComponentProps } from "react";

export interface ForecastInfoProps extends ComponentProps<"div"> {
  data: WeatherResponse;
}
