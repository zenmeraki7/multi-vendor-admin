import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ backgroundColor: "#A45EE5" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 3 }}>
          Admin-Zen-Meraki
        </Typography>

        <Button color="inherit" sx={{ mr: 4, textTransform: "none" }}>
          Admin Dashboard
        </Button>

        <IconButton
          color="inherit"
          sx={{ mr: 3 }}
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </IconButton>

        <IconButton color="inherit" sx={{ mr: 3 }}>
          <NotificationsIcon />
        </IconButton>

       
        
        <Button
          color="inherit"
          sx={{ mr: 3, textTransform: "none" }}
          onClick={() => navigate("/login")}
        >
          <LoginIcon /> SignIn
        </Button>

        <Button
          color="inherit"
          sx={{ mr: 3, textTransform: "none" }}
          onClick={() => navigate("/")}
        >
          <LogoutIcon /> Logout
        </Button>

        <Button
          color="inherit"
          className="fs-1"
          sx={{ mr: 3 }}
          onClick={() => navigate("/admin")}
        >
          <PersonIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
