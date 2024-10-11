import React from "react";
import { isAuthenticated } from "../utils/auth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component }) => {
  return isAuthenticated() ? component : <Navigate to={"/login"} />;
};

export default PrivateRoute;
