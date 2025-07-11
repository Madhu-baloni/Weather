import { useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Typography,
  Divider,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { fetchForecast } from "../Slices/forecastData";

const ForecastTable = ({ lat, lon }: { lat: number; lon: number }) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state) => state?.forecast || { data: [], loading: false, error: null }
  );

  useEffect(() => {
    dispatch(fetchForecast({ lat, lon }));
  }, [lat, lon, dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const dailyForecasts = data.filter(
    (_: any, index: number) => index % 8 === 0
  );

  return (
    <>
      <Typography className="heading" sx={{ m: 3, textAlign: "center" }}>
        Next 5 Days Forecast
      </Typography>

      <Divider />

      <Paper
        sx={{
          mt: 4,
          p: 2,
          width: { xs: "420px", md: "100%" },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="tablehead">Date</TableCell>
              <TableCell className="tablehead">Temp (°C)</TableCell>
              <TableCell className="tablehead">Humidity (%)</TableCell>
              <TableCell className="tablehead">Weather</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dailyForecasts.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="sub-heading">
                  {item.dt_txt.split(" ")[0]}
                </TableCell>
                <TableCell className="sub-heading">
                  {item.main.temp}°C
                </TableCell>
                <TableCell className="sub-heading">
                  {item.main.humidity}%
                </TableCell>
                <TableCell className="sub-heading">
                  {item.weather[0].description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default ForecastTable;
