import React, { useState } from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  const [activeItem, setActiveItem] = useState("");
  const [expanded, setExpanded] = useState(false);

  // Dummy variable for admin status, replace with actual logic
  const isAdmin = true; // Replace with actual logic to check user role

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Configuration", icon: <SettingsIcon />, path: "/configuration" },
    { text: "Sellers", icon: <PeopleIcon />, path: "/sellers" },
    { text: "Orders", icon: <AssignmentIcon />, path: "/orders" },
    { text: "Commission", icon: <MonetizationOnIcon />, path: "/commission" },
    {
      text: "Mail Configuration",
      icon: <EmailIcon />,
      path: "/mail-configuration",
    },
    { text: "Translation", icon: <TranslateIcon />, path: "/translation" },
  ];

  return (
    <Box
      sx={{
        width: 300,
        backgroundColor: "#f0f4f8",
        height: "100vh",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        pt: 2,
      }}
    >
      <List>
        {menuItems.map(
          (item) =>
            (!isAdmin || item.text !== "Products") && ( // Hide "Products" for non-admin
              <React.Fragment key={item.text}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
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
                {item.text === "Configuration" || item.text === "Sellers" ? (
                  <Divider sx={{ marginY: 1 }} />
                ) : null}
              </React.Fragment>
            )
        )}

        {/* Admin specific menu items */}
        {isAdmin && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/user")}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="User Details" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/transactions")}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Transactions" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/reviews")}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Reviews" />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ marginY: 1 }} />
          </>
        )}

        {/* Admin: Product Management (no accordion) */}
        {isAdmin && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/product-list")}>
              <ListItemIcon>
                <WidgetsIcon />
              </ListItemIcon>
              <ListItemText primary="Product Management" />
            </ListItemButton>
          </ListItem>
        )}

        {/* Accordion for non-admin users */}
        {!isAdmin && (
          <Accordion
            elevation={0}
            expanded={expanded === "products"}
            onChange={handleAccordionChange("products")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <WidgetsIcon sx={{ marginRight: 2 }} />
              <Typography>Products</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate("/add-product")}>
                    <ListItemIcon>
                      <AddShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Products" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate("/product-list")}>
                    <ListItemIcon>
                      <WidgetsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Product Manage" />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        )}
      </List>
    </Box>
  );
}

export default Navbox;
