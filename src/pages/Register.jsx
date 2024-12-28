import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const steps = ['Personal Details', 'GST Documents', 'Bank Details'];

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode:'',
    companyName: '',
    website: '',
    gstinDocumentNumber: '',
    gstinDocumentImage: null,
    panCardDocumentNumber: '',
    panCardDocumentImage: null,
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    bankDocument: null,
  });

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = () => {
    console.log(formData); // You can handle form submission logic here
    navigate('/login'); // Redirect to the login page
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} />
              <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="New Password" name="newPassword" type="password" value={formData.newPassword} onChange={handleInputChange} />
              <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} />
            </Box>
            <TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
            <TextField fullWidth label="Address" name="address" multiline rows={2} value={formData.address} onChange={handleInputChange} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleInputChange} />
              <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleInputChange} />
              <TextField fullWidth label="zipCode" name="zipcode" value={formData.zipcode} onChange={handleInputChange} />
              <TextField fullWidth label="Country" name="country" value={formData.country} onChange={handleInputChange} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="Company Name" name="companyName" value={formData.companyName} onChange={handleInputChange} />
              <TextField fullWidth label="Website" name="website" value={formData.website} onChange={handleInputChange} />
            </Box>
          </Stack>
        );
      case 1:
        return (
          <Stack spacing={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Upload GSTIN
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="GSTIN Document Number"
                  name="gstinDocumentNumber"
                  value={formData.gstinDocumentNumber || ''}
                  onChange={handleInputChange}
                />
                <Button
                  variant="outlined"
                  component="label"
                >
                  Upload GSTIN Image
                  <input
                    type="file"
                    name="gstinDocumentImage"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {formData.gstinDocumentImage && (
                  <Typography variant="body2" color="text.secondary">
                    File Uploaded: {formData.gstinDocumentImage.name}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Upload PAN Card
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="PAN Card Document Number"
                  name="panCardDocumentNumber"
                  value={formData.panCardDocumentNumber || ''}
                  onChange={handleInputChange}
                />
                <Button
                  variant="outlined"
                  component="label"
                >
                  Upload PAN Card Image
                  <input
                    type="file"
                    name="panCardDocumentImage"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {formData.panCardDocumentImage && (
                  <Typography variant="body2" color="text.secondary">
                    File Uploaded: {formData.panCardDocumentImage.name}
                  </Typography>
                )}
              </Box>
            </Box>
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="Account Holder Name" name="accountHolderName" value={formData.accountHolderName} onChange={handleInputChange} />
              <TextField fullWidth label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange} />
              <TextField fullWidth label="Bank Name" name="bankName" value={formData.bankName} onChange={handleInputChange} />
            </Box>
            <Button
              variant="outlined"
              component="label"
            >
              Upload Bank Document
              <input
                type="file"
                name="bankDocument"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {formData.bankDocument && (
              <Typography variant="body2" color="text.secondary">
                File Uploaded: {formData.bankDocument.name}
              </Typography>
            )}
          </Stack>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        backgroundColor:'black'
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom sx={{ marginBottom: 4 }}>
            Register Now
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 4 }}>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button disabled={activeStep === 0} onClick={handleBack} variant="contained" color="inherit">
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
