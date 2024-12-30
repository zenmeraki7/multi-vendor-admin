
import React, { useState } from "react";
import {
  Box,
  Divider,
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
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";

function Navbox() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Configuration", icon: <SettingsIcon /> },
    { text: "Sellers", icon: <PeopleIcon /> },
    { text: "Products", icon: <WidgetsIcon />, path: "/products" },
    { text: "Add Products", icon: <AddShoppingCartIcon />, path: "/add-product" },
    { text: "Orders", icon: <AssignmentIcon /> },
    { text: "Commission", icon: <MonetizationOnIcon /> },
    { text: "Mail Configuration", icon: <EmailIcon /> },
    { text: "Translation", icon: <TranslateIcon /> },
  ];

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 240,
        backgroundColor: "#f0f4f8",
        height: "100vh",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        pt: 2,
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setActiveItem(item.text);
                  if (item.path) navigate(item.path);
                }}
                sx={{
                  backgroundColor:
                    activeItem === item.text ? "#c8d8e4" : "inherit",
                  "&:hover": {
                    backgroundColor: "#c8d8e4",
                  },
                  transition: "background-color 0.3s",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeItem === item.text ? "#3a4b58" : "#556b78",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: activeItem === item.text ? "bold" : "normal",
                    color: activeItem === item.text ? "#3a4b58" : "#556b78",
                  }}
                />
              </ListItemButton>
            </ListItem>
            {index === 1 || index === 4 ? <Divider sx={{ marginY: 1 }} /> : null}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default Navbox;
