import React, { useState } from 'react';
import axios from 'axios';
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
import * as Yup from 'yup';
import { useFormik } from 'formik';

const steps = ['Personal Details', 'GST Documents', 'Bank Details'];

const validationSchemas = [
  Yup.object({
    fullName: Yup.string().trim().required('Full name is required.'),
    email: Yup.string().email('Invalid email').required('Email is required.'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required.'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required.'),
    address: Yup.string().required('Address is required.'),
    city: Yup.string().required('City is required.'),
    state: Yup.string().required('State is required.'),
    zipcode: Yup.string()
      .matches(/^[0-9]+$/, 'Zip code must be a valid number')
      .required('Zip code is required.'),
    country: Yup.string().required('Country is required.'),
    companyName: Yup.string().trim().required('Company name is required.'),
  }),
  Yup.object({
    gstinDocumentNumber: Yup.string().required('GSTIN Document Number is required.'),
    panCardDocumentNumber: Yup.string().required('PAN Card Document Number is required.'),
  }),
  Yup.object({
    accountHolderName: Yup.string().required('Account holder name is required.'),
    accountNumber: Yup.string().required('Account number is required.'),
    ifscCode: Yup.string().required('IFSC code is required.'),
    bankName: Yup.string().required('Bank name is required.'),
  }),
];

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
      phoneNumber: '',
      address: '',
      city: '',
      zipcode: '',
      state: '',
      country: '',
      companyName: '',
      gstinDocumentNumber: '',
      gstinDocumentImage: null,
      panCardDocumentNumber: '',
      panCardDocumentImage: null,
      accountHolderName: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      bankDocument: null,
    },
    validationSchema: validationSchemas[activeStep],
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const payload = {
        fullName: values.fullName,
        email: values.email,
        password: values.newPassword,
        phoneNum: values.phoneNumber,
        address: values.address,
        city: values.city,
        state: values.state,
        country: values.country,
        zipCode: values.zipcode,
        companyName: values.companyName,
      };

      try {
        setLoading(true);
        setError('');

        const response = await axios.post('http://localhost:5000/api/vendor/register', payload);

        if (response.status === 201 || response.status === 200) {
          alert('Registration successful!');
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleNext = async () => {
    try {
      // Trigger validation and get the errors
      const errors = await formik.validateForm();
  
      // Mark all fields as touched
      await formik.setTouched(Object.keys(formik.values));
  
      // Check if there are errors
      if (Object.keys(errors).length > 0) {
        // If there are errors, stop the navigation
        return;
      }
  
      // If no errors, move to the next step
      setActiveStep((prev) => prev + 1);
    } catch (e) {
      console.error(e);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={!!formik.errors.fullName}
                helperText={formik.errors.fullName}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!formik.errors.email}
                helperText={formik.errors.email}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={!!formik.errors.newPassword}
                helperText={formik.errors.newPassword}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={!!formik.errors.confirmPassword}
                helperText={formik.errors.confirmPassword}
              />
            </Box>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={!!formik.errors.phoneNumber}
              helperText={formik.errors.phoneNumber}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={2}
              value={formik.values.address}
              onChange={formik.handleChange}
              error={!!formik.errors.address}
              helperText={formik.errors.address}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={!!formik.errors.city}
                helperText={formik.errors.city}
              />
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={!!formik.errors.state}
                helperText={formik.errors.state}
              />
              <TextField
                fullWidth
                label="ZipCode"
                name="zipcode"
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                error={!!formik.errors.zipcode}
                helperText={formik.errors.zipcode}
              />
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={!!formik.errors.country}
                helperText={formik.errors.country}
              />
            </Box>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              error={!!formik.errors.companyName}
              helperText={formik.errors.companyName}
            />
          </Stack>
        );
        case 1:
          return (
            <Stack spacing={4}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Upload GSTIN
                </Typography>
                <TextField
                  fullWidth
                  label="GSTIN Document Number"
                  name="gstinDocumentNumber"
                  value={formik.values.gstinDocumentNumber || ''}
                  onChange={formik.handleChange}
                  error={!!formik.errors.gstinDocumentNumber}
                  helperText={formik.errors.gstinDocumentNumber}
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Upload GSTIN Document
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(event) => {
                      formik.setFieldValue('gstinDocumentImage', event.target.files[0]);
                    }}
                  />
                </Button>
                {formik.values.gstinDocumentImage && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected File: {formik.values.gstinDocumentImage.name}
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Upload PAN Card
                </Typography>
                <TextField
                  fullWidth
                  label="PAN Card Document Number"
                  name="panCardDocumentNumber"
                  value={formik.values.panCardDocumentNumber || ''}
                  onChange={formik.handleChange}
                  error={!!formik.errors.panCardDocumentNumber}
                  helperText={formik.errors.panCardDocumentNumber}
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Upload PAN Document
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(event) => {
                      formik.setFieldValue('panCardDocumentImage', event.target.files[0]);
                    }}
                  />
                </Button>
                {formik.values.panCardDocumentImage && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected File: {formik.values.panCardDocumentImage.name}
                  </Typography>
                )}
              </Box>
            </Stack>
          );
        
        case 2:
          return (
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Account Holder Name"
                name="accountHolderName"
                value={formik.values.accountHolderName}
                onChange={formik.handleChange}
                error={!!formik.errors.accountHolderName}
                helperText={formik.errors.accountHolderName}
              />
              <TextField
                fullWidth
                label="Account Number"
                name="accountNumber"
                value={formik.values.accountNumber}
                onChange={formik.handleChange}
                error={!!formik.errors.accountNumber}
                helperText={formik.errors.accountNumber}
              />
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifscCode"
                value={formik.values.ifscCode}
                onChange={formik.handleChange}
                error={!!formik.errors.ifscCode}
                helperText={formik.errors.ifscCode}
              />
              <TextField
                fullWidth
                label="Bank Name"
                name="bankName"
                value={formik.values.bankName}
                onChange={formik.handleChange}
                error={!!formik.errors.bankName}
                helperText={formik.errors.bankName}
              />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Upload Bank Document
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Upload Bank Document
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(event) => {
                      formik.setFieldValue('bankDocument', event.target.files[0]);
                    }}
                  />
                </Button>
                {formik.values.bankDocument && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected File: {formik.values.bankDocument.name}
                  </Typography>
                )}
              </Box>
            </Stack>
          );
        
        
     
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
        backgroundColor: 'black',
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
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
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
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
