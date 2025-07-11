import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "./Hooks";
import { fetchMajorPollutants } from "../Slices/MajorPollutedSlice";
import { MajorPollutants } from "../Types/Type";

const MajorGasPolluted: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pollutants, loading, error } = useAppSelector(
    (
      state
    ): {
      pollutants: MajorPollutants | null;
      loading: boolean;
      error: string | null;
    } => state.majorPollutants
  );

  useEffect(() => {
    dispatch(fetchMajorPollutants({ lat: 28.67, lon: 77.22 }));
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography className="heading" sx={{ m: 3, textAlign: "center" }}>
        Major Air Pollutants
      </Typography>

      <Divider />

      <Grid container spacing={3} mt={2}>
        {pollutants &&
          Object.entries(pollutants).map(([key, value]) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
              <Card elevation={3} className="card">
                <CardContent>
                  <Typography variant="h6">{key.toUpperCase()}</Typography>

                  <Typography variant="body2">
                    Concentration: {value} µg/m³
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default MajorGasPolluted;
