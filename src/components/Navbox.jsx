import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmailIcon from "@mui/icons-material/Email";
import TranslateIcon from "@mui/icons-material/Translate";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";

function Navbox() {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 195,
          boxSizing: "border-box",
          marginTop: "64px", // Adjust this to the height of your header
        },
      }}
    >
      <List>
        {/* Dashboard */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* Configuration */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configuration" />
          </ListItemButton>
        </ListItem>

        {/* Sellers */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Sellers" />
          </ListItemButton>
        </ListItem>

        {/* Products */}
       <ListItem disablePadding>
       <ListItemButton >
       <ListItemIcon>
            <WidgetsIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
        <ListItemButton onClick={() => navigate('/add-product')}>
        <ListItemIcon>
        <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Add Products" />
        </ListItemButton>
        </ListItem>
       

        {/* Orders */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>

        {/* Commission */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Commission" />
          </ListItemButton>
        </ListItem>

        {/* Mail Configuration */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Mail Configuration" />
          </ListItemButton>
        </ListItem>

        {/* Translation */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TranslateIcon />
            </ListItemIcon>
            <ListItemText primary="Translation" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Navbox;
