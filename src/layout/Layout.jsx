import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbox from "../components/Navbox";

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Navbox />
      <Stack sx={{ minHeight: "90vh", my: 3 }}>
        <Outlet />
      </Stack>
      <Footer />
    </>
  );
};

export default Layout;
