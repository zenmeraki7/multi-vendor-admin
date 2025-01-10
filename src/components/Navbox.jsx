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
import { useNavigate } from "react-router-dom";

function Navbox() {
  const [activeItem, setActiveItem] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Sellers", icon: <PeopleIcon />, path: "/sellers" },
    { text: "Orders", icon: <AssignmentIcon />, path: "/orders" },
    { text: "User Details", icon: <PeopleIcon />, path: "/user" },
    { text: "Transactions", icon: <MonetizationOnIcon />, path: "/transactions" },
    { text: "Reviews", icon: <AssignmentIcon />, path: "/reviews" },
    { text: "Product Management", icon: <WidgetsIcon />, path: "/product-list" },
    {
      text: "Manage Categories",
      icon: <WidgetsIcon />,
      subItems: [
        { text: "Category-Type", path: "/category-type" },
        { text: "Category", path: "/category" },
        { text: "Subcategory", path: "/sub-category" },
      ],
    },
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
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            {item.subItems ? (
              <Accordion
                elevation={0}
                expanded={expanded === item.text}
                onChange={handleAccordionChange(item.text)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <Typography>{item.text}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem disablePadding key={subItem.text}>
                        <ListItemButton
                          onClick={() => navigate(subItem.path)}
                          sx={{
                            "&:hover": { backgroundColor: "#e0e7eb" },
                            transition: "background-color 0.3s",
                          }}
                        >
                          <ListItemText
                            primary={subItem.text}
                            primaryTypographyProps={{
                              fontWeight: "normal",
                              color: "#556b78",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ) : (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.path) navigate(item.path);
                  }}
                  sx={{
                    backgroundColor: activeItem === item.text ? "#c8d8e4" : "inherit",
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
            )}
            {item.text === "Configuration" || item.text === "Sellers" ? (
              <Divider sx={{ marginY: 1 }} />
            ) : null}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default Navbox;
