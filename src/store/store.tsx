import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../Slices/AirQualitySlice";
import majorPollutantsReducer from "../Slices/MajorPollutedSlice";
import forecastReducer from "../Slices/forecastData";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    majorPollutants: majorPollutantsReducer,
    forecast: forecastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
