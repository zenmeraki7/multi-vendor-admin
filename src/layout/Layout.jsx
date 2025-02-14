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

      <Box sx={{}}>
        <Stack direction="row" spacing={2}>
          {/* Sidebar */}
          <Box
            sx={{
              // width: 300,
              position: "sticky",
              top: "0px",
              alignSelf: "flex-start",
            }}
          >
            <Navbox />
          </Box>

          {/* Main Content */}
          <Stack
            width="100%"
            sx={{
              flexGrow: 1,
              height: "90vh",
              overflowY: "auto",
              overflow: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none", // For Internet Explorer and Edge
              "scrollbar-width": "none", // For Firefox
            }}
            pt={2}
          >
            <Box mb={2}>
              <Outlet />
            </Box>
            <Footer />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Layout;
