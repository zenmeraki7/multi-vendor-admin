import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ListIcon from "@mui/icons-material/List";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

function Navbox() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuOpen = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(menu);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#F7E7DC", color: "black" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Dashboard Dropdown */}
          <Button
            color="inherit"
            startIcon={<DashboardIcon />}
            onClick={(e) => handleMenuOpen(e, "dashboard")}
          >
            DASHBOARD
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === "dashboard"}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
              },
            }}
          >
            {/* Dashboard items */}
            <MenuItem onClick={handleMenuClose}>Dashboard Item 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dashboard Item 2</MenuItem>
          </Menu>

          {/* Configuration Dropdown */}
          <Button
            color="inherit"
            startIcon={<SettingsIcon />}
            onClick={(e) => handleMenuOpen(e, "configuration")}
          >
            CONFIGURATION
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === "configuration"}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              INSTRUCTIONS FOR MARKETPLACE
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>GENERAL CONFIGURATION</MenuItem>
            {/* Add other configuration items here */}
          </Menu>

          {/* Sellers Dropdown */}
          <Button
            color="inherit"
            startIcon={<GroupAddIcon />}
            onClick={(e) => handleMenuOpen(e, "sellers")}
          >
            SELLERS
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === "sellers"}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>SELLERS LISTING</MenuItem>
            <MenuItem onClick={handleMenuClose}>SELLER FORM SETTINGS</MenuItem>
          </Menu>

          {/* Products Dropdown */}
          <Button
            color="inherit"
            startIcon={<WidgetsIcon />}
            onClick={(e) => handleMenuOpen(e, "products")}
          >
            PRODUCTS
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === "products"}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>PRODUCTS ITEM 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>PRODUCTS ITEM 2</MenuItem>
          </Menu>

          {/* Orders Dropdown */}
          <Button
            color="inherit"
            startIcon={<AssignmentIcon />}
            onClick={(e) => handleMenuOpen(e, "orders")}
          >
            ORDERS
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === "orders"}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>ORDERS ITEM 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>ORDERS ITEM 2</MenuItem>
          </Menu>

          {/* Commission Dropdown */}
          <Button
            color="inherit"
            startIcon={<MoneyIcon />}
            onClick={(e) => handleMenuOpen(e, "commission")}
          >
            COMMISSION
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === "commission"}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>COMMISSION ITEM 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>COMMISSION ITEM 2</MenuItem>
          </Menu>

          {/* Payment Dropdown */}
          <Button
            color="inherit"
            startIcon={<AccountBalanceWalletIcon />}
            onClick={(e) => handleMenuOpen(e, "payment")}
          >
            PAYMENT
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === "payment"}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>PAYMENT ITEM 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>PAYMENT ITEM 2</MenuItem>
          </Menu>

          {/* Mail Configuration Dropdown */}
          <Button
            color="inherit"
            startIcon={<EmailIcon />}
            onClick={(e) => handleMenuOpen(e, "mail")}
          >
            MAIL CONFIGURATION
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === "mail"}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>MAIL ITEM 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>MAIL ITEM 2</MenuItem>
          </Menu>

          {/* Translation Dropdown */}
          <Button
            color="inherit"
            startIcon={<LanguageIcon />}
            onClick={(e) => handleMenuOpen(e, "translation")}
          >
            TRANSLATION
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === "translation"}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>TRANSLATION ITEM 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>TRANSLATION ITEM 2</MenuItem>
          </Menu>

          {/* Dots Menu Dropdown */}
          <IconButton
            color="inherit"
            onClick={(e) => handleMenuOpen(e, "more")}
          >
            <ListIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === "more"}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 200,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>More Item 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>More Item 2</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbox;
