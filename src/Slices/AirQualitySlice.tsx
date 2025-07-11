import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AirQualityData, WeatherState } from "../Types/Type";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchAirQuality = createAsyncThunk(
  "weather/fetchAirQuality",
  async (city: string) => {
    try {
      const wetherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const { coord, name, clouds, main } = wetherRes.data;

      const airRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}`
      );
      return {
        aqi: airRes.data.list[0].main.aqi,
        weather: {
          city: name,
          clouds: clouds.all + "%",
          temperature: main.temp,
          humidity: main.humidity,
        },
      };
    } catch (err: any) {
      return `something went wrong`;
    }
  }
);

const initialState: WeatherState = {
  data: [],
  airQuality: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchAirQuality.pending, (state: any) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchAirQuality.fulfilled,
      (state: any, action: PayloadAction<AirQualityData>) => {
        state.loading = false;
        state.airQuality = action.payload;
      }
    );
    builder.addCase(
      fetchAirQuality.rejected,
      (state: any, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default weatherSlice.reducer;
