import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Stack, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbox from "../components/Navbox";

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Box sx={{ marginTop: "24px" }}> 
        <Stack direction="row" spacing={2}>
          <Box sx={{ width: '250px' }}>
            <Navbox />
          </Box>
          <Box sx={{ flexGrow: 1, height: '90vh', overflow: 'scroll' }}>
            <Outlet />
          </Box>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
