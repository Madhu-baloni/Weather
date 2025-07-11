import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MajorPollutantsState } from "../Types/Type";

const API_KEY = process.env.REACT_APP_API_KEY;

const initialState: MajorPollutantsState = {
  pollutants: null,
  loading: false,
  error: null,
};

export const fetchMajorPollutants = createAsyncThunk(
  "majorPollutants/fetchMajorPollutants",
  async (coords: { lat: number; lon: number }) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      );
      return res.data.list[0].components;
    } catch (err) {
      return `Failed to fetch pollutants data`;
    }
  }
);

const majorPollutantsSlice = createSlice({
  name: "majorPollutants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMajorPollutants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMajorPollutants.fulfilled, (state, action) => {
        state.loading = false;
        state.pollutants = action.payload;
      })
      .addCase(fetchMajorPollutants.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch MojorPolluants data";
      });
  },
});

export default majorPollutantsSlice.reducer;
