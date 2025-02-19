import React, { useState } from "react";
import {
  Box,
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
import PublicIcon from "@mui/icons-material/Public";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmailIcon from "@mui/icons-material/Email";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CategoryIcon from "@mui/icons-material/Category";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PolicyIcon from "@mui/icons-material/Policy";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { useNavigate, useLocation } from "react-router-dom";

function Navbox() {
  const [expanded, setExpanded] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };

  const menuItems = [
    { text: "Overview", icon: <DashboardIcon />, path: "/" },
    {
      text: "Sellers",
      icon: <PeopleIcon />,
      subItems: [
        { text: "Sellers Listing", icon: <ListAltIcon />, path: "/sellers" },
        {
          text: "Seller Form Settings",
          icon: <SettingsSuggestIcon />,
          path: "/seller-form-settings",
        },
        {
          text: "Shop Page Settings",
          icon: <AddBusinessIcon />,
          path: "/shop-page-settings",
        },
        // {
        //   text: "Seller Profile Page Settings",
        //   icon: <PersonIcon />,
        //   path: "/seller-profile-settings",
        // },
        // {
        //   text: "Customize Seller Page",
        //   icon: <WidgetsIcon />,
        //   path: "/customize-seller-page",
        // },
        // {
        //   text: "Seller Feedback",
        //   icon: <FeedbackIcon />,
        //   path: "/seller-feedback",
        // },
        // {
        //   text: "Seller Feedback Option",
        //   icon: <FeedbackIcon />,
        //   path: "/seller-feedback-option",
        // },
        // { text: "Seller Policy", icon: <PolicyIcon />, path: "/seller-policy" },
      ],
    },
    { text: "Orders", icon: <AssignmentIcon />, path: "/orders" },
    { text: "User Details", icon: <PeopleIcon />, path: "/user" },
    {
      text: "Transactions",
      icon: <MonetizationOnIcon />,
      path: "/",
    },
    { text: "Reviews", icon: <AssignmentIcon />, path: "/reviews" },
    {
      text: "Product Management",
      icon: <WidgetsIcon />,
      subItems: [
        { text: "Product List", icon: <ListAltIcon />, path: "/product-list" },
        // {
        //   text: "Product Option",
        //   icon: <SettingsIcon />,
        //   path: "/product-option",
        // },
        // { text: "Product Tags", icon: <CategoryIcon />, path: "/product-tags" },
        // {
        //   text: "Product Types",
        //   icon: <CategoryIcon />,
        //   path: "/product-types",
        // },
        // { text: "Collections", icon: <CategoryIcon />, path: "/collections" },
        // {
        //   text: "Import Products",
        //   icon: <ImportExportIcon />,
        //   path: "/import-products",
        // },
        // {
        //   text: "Product Form Customization",
        //   icon: <SettingsSuggestIcon />,
        //   path: "/product-form-customization",
        // },
      ],
    },
    {
      text: "Manage Categories",
      icon: <CategoryIcon />,
      subItems: [
        {
          text: "Category-Type",
          icon: <CategoryIcon />,
          path: "/category-type",
        },
        { text: "Category", icon: <CategoryIcon />, path: "/category" },
        { text: "Subcategory", icon: <CategoryIcon />, path: "/sub-category" },
      ],
    },
    {
      text: "Bank Management",
      icon: <AssuredWorkloadIcon />,
      path: "/bank-management",
    },
    {
      text: "Country Management",
      icon: <PublicIcon />,
      path: "/country-management",
    },
    {
      text: "State Management",
      icon: <ApartmentIcon />,
      path: "/state-management",
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      subItems: [
        {
          text: "General Settings",
          icon: <SettingsSuggestIcon />,
          path: "/",
        },
        // {
        //   text: "Merchant Settings",
        //   icon: <BusinessCenterIcon />,
        //   subItems: [
        //     {
        //       text: "Company Details",
        //       icon: <BusinessCenterIcon />,
        //       path: "/company-details",
        //     },
        //     {
        //       text: "Billing & Invoice",
        //       icon: <MonetizationOnIcon />,
        //       path: "/billing-invoice",
        //     },
        //     {
        //       text: "Warehouses",
        //       icon: <ApartmentIcon />,
        //       path: "/warehouses",
        //     },
        //     {
        //       text: "Shipping Partners",
        //       icon: <CardTravelIcon />,
        //       path: "/shipping-partners",
        //     },
        //     {
        //       text: "Users & Permissions",
        //       icon: <PeopleIcon />,
        //       path: "/users-permissions",
        //     },
        //   ],
        // },
        // {
        //   text: "Message Integrations",
        //   icon: <EmailIcon />,
        //   subItems: [
        //     {
        //       text: "Email Configuration",
        //       icon: <EmailIcon />,
        //       path: "/email-configuration",
        //     },
        //   ],
        // },
        // {
        //   text: "Multi Vendor Settings",
        //   icon: <SettingsIcon />,
        //   path: "/settings/multi-vendor",
        // },
        // {
        //   text: "Shop Settings",
        //   icon: <AddBusinessIcon />,
        //   path: "/settings/shop",
        // },
        // {
        //   text: "Subscription and Billing",
        //   icon: <CardTravelIcon />,
        //   path: "/settings/billing",
        // },
      ],
    },
  ];

  const renderMenuItems = (items, depth = 0) =>
    items.map((item) => (
      <React.Fragment key={item.text}>
        {item.subItems ? (
          <Accordion
            elevation={0}
            expanded={expanded === item.text}
            onChange={handleAccordionChange(item.text)}
            sx={{
              boxShadow: "none",
              "&:before": { display: "none" }, // Remove the default border
              color: "#000",
              background: "#e0e0e0",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#000" }} />}
              sx={{
                "&:hover": { backgroundColor: "#e0e0e0" }, // Hover effect
                borderRadius: 1, // Rounded corners
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>{item.icon}</ListItemIcon>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.text}
              </Typography>
            </AccordionSummary>
            <AccordionDetails >
              <List
                disablePadding
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                {renderMenuItems(item.subItems, depth + 1)}
              </List>
            </AccordionDetails>
          </Accordion>
        ) : (
          <ListItem disablePadding sx={{}}>
            <ListItemButton
              onClick={() => item.path && navigate(item.path)}
              sx={{
                borderRadius: 1, // Rounded corners
                background:
                  location.pathname === item.path
                    ? "linear-gradient(45deg, #556cd6, #19857b)"
                    : "#e0e0e0", // Active item background
                "&:hover": { backgroundColor: "#e0e0e0" }, // Hover effect
                transition: "background-color 0.2s",
                color: location.pathname === item.path ? "#fff" : "#000",
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 500, // Bold for active item
                }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </React.Fragment>
    ));

  return (
    <Box
      sx={{
        width: 300,
        backgroundColor: "#f5f5f5",
        height: "91vh",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        p: 0.5,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f5f5f5",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#bdbdbd",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "#9e9e9e",
          },
        },
      }}
    >
      <List sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {renderMenuItems(menuItems)}
      </List>
    </Box>
  );
}

export default Navbox;
