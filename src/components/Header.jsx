import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #3a4b58, #556b78)",
        color: "#FFFFFF",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        paddingX: { xs: 2, sm: 4 },
      }}
    >
      <Toolbar>
        {/* Logo or Title */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            ml: { xs: 0, sm: 3 },
          }}
        >
          Demo-Zen-Meraki
        </Typography>

        {/* Center Buttons */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Button
            color="inherit"
            sx={{
              textTransform: "none",
              marginRight: 2,
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            Seller Dashboard
          </Button>
          <Tooltip title="Go to Home">
            <IconButton color="inherit" sx={{ marginRight: 2 }}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton color="inherit" sx={{ marginRight: 2 }}>
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Right Side Buttons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            color="inherit"
            sx={{
              textTransform: "none",
              marginRight: 2,
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              display: { xs: "none", sm: "inline-flex" },
            }}
          >
            FAQ
          </Button>
          <Button
            color="inherit"
            sx={{
              textTransform: "none",
              marginRight: 2,
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              display: { xs: "none", sm: "inline-flex" },
            }}
          >
            <HelpOutlineIcon sx={{ marginRight: 1 }} /> Need Help?
          </Button>
          <Button
            color="inherit"
            sx={{
              textTransform: "none",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              display: "flex",
              alignItems: "center",
            }}
          >
            <LogoutIcon sx={{ marginRight: 1 }} /> Logout
          </Button>
        </Box>
        <IconButton color="inherit" sx={{ mr: 3 }}onClick={() => navigate('/')}>
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
        <Button color="inherit" sx={{ mr: 3, textTransform: "none" }}   onClick={() => navigate('/register')}>
          <HowToRegIcon /> SignUp
        </Button>
        <Button color="inherit" sx={{ mr: 3, textTransform: "none" }} onClick={() => navigate('/login')}>
          <LoginIcon /> SignIn
        </Button>

        <Button color="inherit" sx={{ mr: 3, textTransform: "none" }} onClick={() => navigate('/')}>
          <LogoutIcon /> Logout 
        </Button>

        <Button color="inherit"  className='fs-1' sx={{ mr: 3 }} onClick={() => navigate('/seller-profile')}>
          <PersonIcon /> 
        </Button>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
