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
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import PeopleIcon from "@mui/icons-material/People";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PublicIcon from '@mui/icons-material/Public';
import ApartmentIcon from '@mui/icons-material/Apartment';
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
    {
      text: "Transactions",
      icon: <MonetizationOnIcon />,
      path: "/transactions",
    },
    { text: "Reviews", icon: <AssignmentIcon />, path: "/reviews" },
    {
      text: "Product Management",
      icon: <WidgetsIcon />,
      path: "/product-list",
    },
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
            )}
          </React.Fragment>
        ))}
        {/* "Manage Categories" extra menu items like Bank, Country, State Management */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            mt: 1,
          }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate("/bank-management")}
              sx={{
                backgroundColor:
                  activeItem === "Bank Management" ? "#c8d8e4" : "inherit",
                "&:hover": {
                  backgroundColor: "#c8d8e4",
                },
                transition: "background-color 0.3s",
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    activeItem === "Bank Management" ? "#3a4b58" : "#556b78",
                }}
              >
                <AssuredWorkloadIcon />{" "}
              </ListItemIcon>
              <ListItemText
                primary="Bank Management"
                primaryTypographyProps={{
                  fontWeight:
                    activeItem === "Bank Management" ? "bold" : "normal",
                  color:
                    activeItem === "Bank Management" ? "#3a4b58" : "#556b78",
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate("/country-management")}
              sx={{
                backgroundColor:
                  activeItem === "Country Management" ? "#c8d8e4" : "inherit",
                "&:hover": {
                  backgroundColor: "#c8d8e4",
                },
                transition: "background-color 0.3s",
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    activeItem === "Country Management" ? "#3a4b58" : "#556b78",
                }}
              >
                <PublicIcon />
              </ListItemIcon>
              <ListItemText
                primary="Country Management"
                primaryTypographyProps={{
                  fontWeight:
                    activeItem === "Country Management" ? "bold" : "normal",
                  color:
                    activeItem === "Country Management" ? "#3a4b58" : "#556b78",
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate("/state-management")}
              sx={{
                backgroundColor:
                  activeItem === "State Management" ? "#c8d8e4" : "inherit",
                "&:hover": {
                  backgroundColor: "#c8d8e4",
                },
                transition: "background-color 0.3s",
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    activeItem === "State Management" ? "#3a4b58" : "#556b78",
                }}
              >
                <ApartmentIcon />
              </ListItemIcon>
              <ListItemText
                primary="State Management"
                primaryTypographyProps={{
                  fontWeight:
                    activeItem === "State Management" ? "bold" : "normal",
                  color:
                    activeItem === "State Management" ? "#3a4b58" : "#556b78",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </List>
    </Box>
  );
}

export default Navbox;
