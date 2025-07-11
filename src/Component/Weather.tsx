import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { useAppSelector } from "./Hooks";
import { getCloudImage } from "../utils/data";

const Weather: React.FC = () => {
  const { airQuality } = useAppSelector((state) => state.weather);

  return (
    <>
      <Card
        className="card1"
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          textAlign: "center",
          borderRadius: 2,
          m: 4,
          width: { xs: "300px", md: "450px" },
        }}
      >
        <Typography className="heading">Weather </Typography>

        {airQuality && airQuality.weather && (
          <>
            <Box sx={{ textAlign: "center" }}>
              <Typography className="sub-heading">
                City: {airQuality.weather.city}
              </Typography>

              <Typography className="sub-heading">
                Clouds: {airQuality.weather.clouds}
              </Typography>

              <Typography className="sub-heading">
                Temperature:{" "}
                {(airQuality.weather.temperature - 273.15).toFixed(1)} °C
              </Typography>

              <Typography className="sub-heading">
                Humidity: {airQuality.weather.humidity}%
              </Typography>
            </Box>

            <Box mt={2}>
              <img
                src={getCloudImage(airQuality.weather.clouds)}
                alt="cloud condition"
                style={{ width: "250px", height: "250px" }}
              />
            </Box>
          </>
        )}
      </Card>
    </>
  );
};

export default Weather;
