import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "./Hooks";
import { fetchAirQuality } from "../Slices/AirQualitySlice";
import MajorGasPolluted from "./MajorGasPolluted";
import Weather from "./Weather";
import { getAQIDescription } from "../utils/data";
import Header from "./Header";
import ForecastTable from "./ForecastTable";
import { fetchMajorPollutants } from "../Slices/MajorPollutedSlice";
import { fetchForecast } from "../Slices/forecastData";

const AirQualityChecker: React.FC = () => {
  const [city, setCity] = useState("");
  const dispatch = useAppDispatch();
  const { airQuality, loading, error } = useAppSelector(
    (state) => state.weather
  );

  const handleSearch = async () => {
    const API_key = process.env.REACT_APP_API_KEY;

    if (city) {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_key}`
        );
        const data = await response.json();
        dispatch(fetchAirQuality(city));
        dispatch(fetchMajorPollutants({ lat: data[0].lat, lon: data[0].lon }));
        dispatch(fetchForecast({ lat: data[0].lat, lon: data[0].lon }));
      } catch (err) {
        console.error("Something went wrong:", err);
      }
    }
  };

  return (
    <>
      <Container>
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            m: { xs: 1, md: 3 },
          }}
        >
          <TextField
            type="text"
            label="Enter City"
            variant="filled"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ width: { xs: "50%", md: "70%" }, background: "white" }}
          />
          <Button
            onClick={handleSearch}
            sx={{
              width: { xs: "30%", md: "20%" },
              background: "#1f2f69",
              fontSize: { xs: "0.8rem", md: "1rem" },
              fontWeight: "bold",
              color: "white",
            }}
          >
            Check Air Quality
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }} mt={2}>
            <Stack
              direction="row"
              spacing={12}
              mt={2}
              sx={{ marginLeft: { xs: 2.9 } }}
            >
              <Card
                className="card1"
                elevation={3}
                sx={{
                  p: { xs: 4, md: 6 },
                  textAlign: "center",
                  borderRadius: 2,
                  m: 3,
                  width: { xs: "300px", md: "450px" },
                }}
              >
                <Typography className="heading">AQI</Typography>

                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}

                {airQuality && (
                  <Box>
                    <Typography className="sub-heading">
                      Air Quality Index: {airQuality.aqi}
                    </Typography>

                    {(() => {
                      const { label, icon, color, image } = getAQIDescription(
                        airQuality.aqi
                      );
                      return (
                        <>
                          <Typography className="sub-heading">
                            Condition: <span style={{ color }}>{label} </span>
                            {icon}
                          </Typography>
                          <Box>
                            <img
                              src={image}
                              alt={`Air Quality is ${label}`}
                              style={{
                                marginTop: "32px",
                                maxWidth: "250px",
                                maxHeight: "303px",
                                minWidth: "200px",
                                minHeight: "200px",
                              }}
                            />
                          </Box>
                        </>
                      );
                    })()}
                  </Box>
                )}
              </Card>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Weather />
          </Grid>
        </Grid>

        <Divider sx={{ mt: 3 }} />

        <MajorGasPolluted />

        <Divider sx={{ mt: 3 }} />

        <ForecastTable lat={28.6139} lon={77.209} />

        <Divider sx={{ mt: 3 }} />
      </Container>
    </>
  );
};

export default AirQualityChecker;
