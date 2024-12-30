import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import OtpInput from "react-otp-input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/baseUrl";

export default function OtpStep({ email, handleNext }) {
  const [otp, setOtp] = useState(""); // Store OTP value
  const [loading, setLoading] = useState(false); // Loading state

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      // Call the verifyVendor API
      const response = await axios.post(
        `${BASE_URL}/api/vendor/verify-vendor`,
        {
          email,
          otp,
        }
      );

      if (response.status === 200) {
        const { token, user, message } = response.data;

        // Save token and user data in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(user));

        toast.success(message || "OTP verified successfully!");
        handleNext(); // Proceed to the next step
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage); // Show error message using Hot Toast
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

      {/* Verify OTP Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerifyOtp}
          disabled={loading || otp.length !== 6} // Disable button if loading or OTP is incomplete
        >
          {loading ? <CircularProgress size={24} /> : "Verify OTP"}
        </Button>
      </Box>
    </Box>
  );
}
