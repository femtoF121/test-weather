import cacheReducer from "@/features/cache/cacheSlice";
import weatherReducer from "@/features/weather/weatherSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setCacheInLocalStorage } from "./middleware/setCacheInLocalStorage";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    cache: cacheReducer,
  },
  middleware: (getDefault) => getDefault().concat(setCacheInLocalStorage),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
