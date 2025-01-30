import React, { useState } from "react";
import { Box, Typography, Link, Button } from "@mui/material";
import { keyframes } from "@emotion/react";

// Animation for the background gradient
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
              "url('https://img.freepik.com/free-vector/access-control-system-abstract-concept-illustration-security-system-authorize-entry-login-credentials-electronic-access-password-pass-phrase-pin-verification_335657-3373.jpg?uid=R156367193&ga=GA1.1.1718526043.1722838254&semt=ais_hybrid')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" },
          }}
        ></Box>

        {/* Form Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            padding: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 2,
              color: "#2c3e50",
            }}
          >
            Reset Password
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              marginBottom: 4,
              color: "#7f8c8d",
            }}
          >
            Enter your new password below.
          </Typography>

          {/* New Password Input */}
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
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
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

          {/* Confirm Password Input */}
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
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
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

          {/* Reset Password Button */}
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
            Reset Password
          </Button>

          {/* Back to Login Link */}
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
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;