import { ComponentProps } from "react";

export interface CityNamePanelProps extends ComponentProps<"div"> {
  setCity: (city: string) => void;
}
