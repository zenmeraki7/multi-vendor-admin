import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#405D72" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 3 }}>
          Demo-Zen-Meraki
        </Typography>

        <Button color="inherit" sx={{ mr: 4, textTransform: "none" }}>
          Seller Dashboard
        </Button>

        <IconButton color="inherit" sx={{ mr: 3 }}>
          <HomeIcon />
        </IconButton>

        <IconButton color="inherit" sx={{ mr: 3 }}>
          <NotificationsIcon />
        </IconButton>

        <Button color="inherit" sx={{ mr: 3, textTransform: "none" }}>
          FAQ
        </Button>

        <Button color="inherit" sx={{ mr: 3, textTransform: "none" }}>
          Need Help?
        </Button>

        <Button color="inherit" sx={{ mr: 3, textTransform: "none" }}>
          <LogoutIcon /> Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
