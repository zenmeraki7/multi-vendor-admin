import React, { useState } from "react";
import { Box, Typography, Link, Button } from "@mui/material";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";

// Animation for the background gradient
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(-45deg, #e0eafc, #cfdef3, #e0eafc, #cfdef3)",
        backgroundSize: "400% 400%",
        animation: `${gradientAnimation} 10s ease infinite`,
      }}
    >
      <Box
        component={motion.div}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          display: "flex",
          width: { xs: "90%", md: "60%" },
          height: { xs: "80%", md: "70%" },
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
          overflow: "hidden",
          backdropFilter: "blur(15px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            width: { xs: "0%", md: "50%" },
            backgroundImage:
              "url('https://img.freepik.com/free-vector/intellectual-property-concept_23-2148720291.jpg?uid=R156367193&ga=GA1.1.1718526043.1722838254&semt=ais_hybrid')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Form Section */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            width: { xs: "100%", md: "50%" },
            padding: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 2,
                color: "#2c3e50",
              }}
            >
              Forgot Password
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                marginBottom: 4,
                color: "#7f8c8d",
              }}
            >
              Enter your email to receive password reset instructions.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants} style={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                marginBottom: "24px",
                "& input:focus": {
                  border: "2px solid transparent",
                  backgroundImage: "linear-gradient(45deg, #6a11cb, #2575fc)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  boxShadow: "0 0 0 2px #fff, 0 0 0 4px #6a11cb",
                },
              }}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                style={{
                  width: "100%",
                  padding: "1rem",
                  fontSize: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  background: "#f9f9f9",
                  outline: "none",
                  transition: "all 0.3s ease",
                  color: "#333",
                }}
                required
              />
            </Box>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
            style={{ width: "100%" }}
          >
            <Button
              variant="contained"
              sx={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
                marginBottom: "50px",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                  background: "linear-gradient(45deg, #2575fc, #6a11cb)",
                },
              }}
            >
              Send Reset Link
            </Button>
          </motion.div>

          {/* Back to Login Link */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: "center", marginTop: 3 }}>
              <Link
                href="/login"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  color: "#6a11cb",
                  fontWeight: "600",
                  "&:hover": {
                    color: "#2575fc",
                  },
                }}
              >
                Back to Login
              </Link>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgetPassword;