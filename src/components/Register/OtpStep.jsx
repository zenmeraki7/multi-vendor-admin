import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import OtpInput from "react-otp-input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../redux/slices/userSlice";

export default function OtpStep({ email, handleNext }) {
  const [otp, setOtp] = useState(""); // Store OTP value
  const dispatch = useDispatch();
  const { loading, error, user, token } = useSelector((state) => state.user);
  console.log(token);
  console.log(user);
  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleVerifyOtp = () => {
    dispatch(verifyOtp({ email, otp }))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "OTP verified successfully!");
        // Proceed to the next step
        handleNext(); // Proceed to the next step
      })
      .catch((err) => {
        toast.error(err || "Failed to verify OTP");
      });
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
