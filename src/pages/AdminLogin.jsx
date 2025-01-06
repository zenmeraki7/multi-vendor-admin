import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./AdminLogin.css";
import signinImage from "../assets/adminlogin.avif";
import { BASE_URL } from "../utils/baseUrl";

// Yup validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email address.")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
});

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && navigate("/");
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setValidationErrors({}); // Reset validation errors
  
    try {
      // Validate the form data
      await loginSchema.validate(formData, { abortEarly: false });
  
      setLoading(true);
  
      // Make the API call
      const { data } = await axios.post(`${BASE_URL}/api/auth/login`, formData);
  
      // Save token in localStorage
      localStorage.setItem("token", data.token);
  
      // Show success toast and navigate
      toast.success("Login successful!");
      navigate("/admin");
    } catch (error) {
      setLoading(false);
  
      if (error.name === "ValidationError") {
        // Handle Yup validation errors
        const errors = error.inner.reduce(
          (acc, err) => ({ ...acc, [err.path]: err.message }),
          {}
        );
        setValidationErrors(errors);
      } else if (error.response) {
        // Handle API errors
        const errorMessage =
          error.response.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMessage);
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forget-pwd");
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="auth-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="auth-left">
          <motion.img
            src={signinImage}
            alt="Sign In"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        <div className="auth-right">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Admin Sign In
          </motion.h2>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
              />
              {validationErrors.email && (
                <p className="error-text">{validationErrors.email}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                value={formData.password}
                onChange={handleInputChange}
              />
              {validationErrors.password && (
                <p className="error-text">{validationErrors.password}</p>
              )}
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              onClick={handleSignIn}
            >
              {loading ? "Signing In..." : "CONTINUE"}
            </motion.button>

            <div
              className="forgot-password"
              onClick={handleForgotPassword}
              style={{ cursor: "pointer", color: "#0072ff", marginTop: "10px" }}
            >
              Forget Password?
            </div>
          </motion.form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminLogin;
