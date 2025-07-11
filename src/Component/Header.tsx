import { Box, Divider, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box m={8} sx={{ textAlign: "center" }}>
      <Divider sx={{ mt: 3, mb: 2 }} />

      <Typography className="heading">
        Real-time Air Quality Index or Weather Details
      </Typography>

      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};

export default Header;
