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
    <AppBar position="static" sx={{ backgroundColor: "#405D72" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 3 }}>
          Demo-Zen-Meraki
        </Typography>

        <Button color="inherit" sx={{ mr: 4, textTransform: "none" }}>
          Seller Dashboard
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

        <Button color="inherit" sx={{ mr: 3, textTransform: "none" }}>
          FAQ
        </Button>

        <Button color="inherit" sx={{ mr: 3, textTransform: "none" }}>
          Need Help?
        </Button>
        <Button
          color="inherit"
          sx={{ mr: 3, textTransform: "none" }}
          onClick={() => navigate("/register")}
        >
          <HowToRegIcon /> SignUp
        </Button>
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
          onClick={() => navigate("/seller-profile")}
        >
          <PersonIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
