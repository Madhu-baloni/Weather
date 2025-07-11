import React from "react";
import { Outlet } from "@mui/icons-material";
import { Box } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <>
      <Box sx={{ m: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
