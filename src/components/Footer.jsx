import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#405D72",
        padding: "10px 0",
        mt: "auto",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Demo-Zen-Meraki. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
