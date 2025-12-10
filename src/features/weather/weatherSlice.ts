import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WeatherStatus = "idle" | "loading" | "succeeded" | "failed";

export interface WeatherState {
  city: string;
}

const initialState: WeatherState = {
  city: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
  },
});

export const { setCity } = weatherSlice.actions;

export default weatherSlice.reducer;
