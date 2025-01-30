import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [open, setOpen] = useState(false);

  // Handle logout confirmation modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // Handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    setOpen(false);
    navigate("/login"); // Navigate to the login page
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#A45EE5" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 3 }}>
            Admin-Zen-Meraki
          </Typography>

          <IconButton color="inherit" sx={{ mr: 3 }}>
            <NotificationsIcon />
          </IconButton>

          {/* Logout Button */}
          <Button
            color="inherit"
            sx={{ mr: 3, textTransform: "none" }}
            onClick={handleOpen}
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

      {/* Logout Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;
