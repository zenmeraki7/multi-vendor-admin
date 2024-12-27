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
          {/* Sidebar */}
          <Box
            sx={{
              width: "250px",
              position: "sticky",
              top: "0px",
              alignSelf: "flex-start",
            }}
          >
            <Navbox />
          </Box>

          {/* Main Content */}
          <Box
            sx={{
              flexGrow: 1,
              height: "90vh",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none", // For Internet Explorer and Edge
              "scrollbar-width": "none", // For Firefox
            }}
          >
            <Outlet />
          </Box>
        </Stack>
      </Box>

      <Footer />
    </>
  );
};

export default Layout;
