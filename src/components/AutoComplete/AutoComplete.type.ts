import { ComponentProps } from "react";

export interface AutoCompleteProps extends ComponentProps<"div"> {
  value: string;
  onItemClick: (city: string) => void;
}
