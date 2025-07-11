import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          lat,
          lon,
          units: "metric",
          appid: API_KEY,
        },
      }
    );
    return response.data.list;
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState: {
    data: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch forecast data";
      });
  },
});

export default forecastSlice.reducer;
