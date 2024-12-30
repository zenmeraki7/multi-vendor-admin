import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonalDetails from "../components/Register/PersonalDetails";
import DocumentUpload from "../components/Register/DocumentUpload";
import BankDetailsUpload from "../components/Register/BankDetailsUpload";
import OtpStep from "../components/Register/OtpStep";
import Header from "../components/AuthPageHeader";

const steps = [
  "Personal Details",
  "Verify Email", // New step for OTP verification
  "GST Documents",
  "Bank Details",
];

export default function Register() {
  const [activeStep, setActiveStep] = useState(2);
  const [error, setError] = useState(null); // To manage error state
  const [loading, setLoading] = useState(false); // To manage loading state
  const [otp, setOtp] = useState(""); // Store OTP value entered by the user
  const [otpError, setOtpError] = useState(""); // Manage OTP error

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalDetails />;
      case 1:
        return <OtpStep />;
      case 2:
        return <DocumentUpload />;
      case 3:
        return <BankDetailsUpload />;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when submitting

    // Simulate form submission delay
    setTimeout(() => {
      setLoading(false); // Stop loading after a delay (simulating successful submission)
      // setError("Registration successful!"); // Set success message (you can replace with success message if needed)
      // Optionally, navigate to another page after successful submission
      // navigate("/success");
    }, 2000); // Simulating a delay of 2 seconds for submission
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      // Simulating OTP verification (you can replace with actual verification logic)
      setOtpError("");
      handleNext(); // Proceed to the next step if OTP is correct
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          // alignItems: "center",
          justifyContent: "center",
          padding: 3,
          // backgroundColor: "#f4f6f9", // Light background to make the card pop
        }}
      >
        <Card
          elevation={0}
          sx={{
            maxWidth: 800,
            width: "100%",
            // backgroundColor: "white",
            borderRadius: "16px",
            // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ marginBottom: 4, fontWeight: "bold" }}
            >
              Vendor Registration for Our E-Commerce Platform
            </Typography>

            {/* Stepper for showing progress */}
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step Description */}
            <Box sx={{ mt: 3, mb: 3 }}>
              <Typography variant="body1" align="center" color="textSecondary">
                {activeStep === 0
                  ? "Enter your personal details to get started as a vendor."
                  : activeStep === 1
                  ? "Verify your email with the OTP sent to your inbox."
                  : activeStep === 2
                  ? "Upload the necessary GST documents to complete registration."
                  : "Upload your bank details to receive payments."}
              </Typography>
            </Box>

            {/* Error Message */}
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            {/* Form Content */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
              {getStepContent(activeStep)}

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="contained"
                  color="inherit"
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                ) : activeStep === 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleVerifyOtp}
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Next"
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
