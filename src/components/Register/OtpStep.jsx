import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress, TextField } from "@mui/material";
import OtpInput from "react-otp-input";

// Assuming you're using axios for API calls
import axios from "axios";

export default function OtpStep({ email }) {
  const [otp, setOtp] = useState(""); // Store OTP value
  const [otpError, setOtpError] = useState(""); // OTP error state
  const [loading, setLoading] = useState(false); // Loading state

  const handleOtpChange = (otp) => {
    setOtp(otp);
    setOtpError(""); // Clear OTP error on new input
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      // Send OTP verification request to the backend
      const response = await axios.post("/api/verify-otp", { email, otp });

      if (response.status === 200) {
        alert("OTP verified successfully.");
        // Redirect or proceed with the next step
        // onVerify(); // If you have a callback to proceed
      }
    } catch (error) {
      setOtpError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Please enter the OTP sent to your email:
      </Typography>

      {/* OTP Input */}
      <OtpInput
        value={otp}
        onChange={handleOtpChange}
        numInputs={6}
        separator={<span>-</span>}
        inputStyle={{
          width: "40px",
          height: "40px",
          margin: "0 10px",
          fontSize: "20px",
          textAlign: "center",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
        containerStyle={{
          justifyContent: "center",
        }}
        isInputNum
        renderInput={(props) => <input {...props} />}
      />

      {/* OTP Error message */}
      {otpError && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {otpError}
        </Typography>
      )}

      {/* Verify OTP Button */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerifyOtp}
          disabled={loading || otp.length !== 6}
          sx={{ minWidth: 120 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
        </Button>
      </Box>
    </Box>
  );
}
