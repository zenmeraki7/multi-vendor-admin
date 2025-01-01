import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './AdminLogin.css'
import signinImage from '../assets/adminlogin.avif'
function AdminLogin() {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/admin");
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
            Sign In
          </motion.h2>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignIn}
            >
              CONTINUE
            </motion.button>

            <div
              className="forgot-password"
              onClick={handleForgotPassword}
              style={{ cursor: "pointer", color: "#0072ff", marginTop: "10px" }}
            >
              Forget Password?
            </div>
          </motion.form>

          <motion.div
            className="auth-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
           
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminLogin;
