import React from 'react';
import { Box, Stack, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/system';
import { TextField } from '@mui/material';

const InputField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "border 0.3s ease, background 0.3s ease",
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    backgroundColor: "#e3f2fd",
    borderColor: "#1e88e5",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#1e88e5",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#bbdefb",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1e88e5",
  },
});

const PersonalDetails = () => {
  // Formik initialization
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      companyName: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone Number is required'),
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zipcode: Yup.string().matches(/^\d{5}$/, 'Zipcode must be 5 digits').required('Zipcode is required'),
      country: Yup.string().required('Country is required'),
      companyName: Yup.string().required('Company Name is required'),
    }),
    onSubmit: async (values) => {
      try {
        console.log('Personal details submitted', values);
      } catch (error) {
        console.error('Error submitting personal details', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <InputField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={!!formik.errors.fullName && formik.touched.fullName}
            helperText={formik.errors.fullName}
          />
          <InputField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={!!formik.errors.email && formik.touched.email}
            helperText={formik.errors.email}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <InputField
            fullWidth
            label="New Password"
            name="newPassword"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={!!formik.errors.newPassword && formik.touched.newPassword}
            helperText={formik.errors.newPassword}
          />
          <InputField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
            helperText={formik.errors.confirmPassword}
          />
        </Box>
        <InputField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={!!formik.errors.phoneNumber && formik.touched.phoneNumber}
          helperText={formik.errors.phoneNumber}
        />
        <InputField
          fullWidth
          label="Address"
          name="address"
          multiline
          rows={2}
          value={formik.values.address}
          onChange={formik.handleChange}
          error={!!formik.errors.address && formik.touched.address}
          helperText={formik.errors.address}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <InputField
            fullWidth
            label="City"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={!!formik.errors.city && formik.touched.city}
            helperText={formik.errors.city}
          />
          <InputField
            fullWidth
            label="State"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={!!formik.errors.state && formik.touched.state}
            helperText={formik.errors.state}
          />
          <InputField
            fullWidth
            label="Zipcode"
            name="zipcode"
            value={formik.values.zipcode}
            onChange={formik.handleChange}
            error={!!formik.errors.zipcode && formik.touched.zipcode}
            helperText={formik.errors.zipcode}
          />
          <InputField
            fullWidth
            label="Country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={!!formik.errors.country && formik.touched.country}
            helperText={formik.errors.country}
          />
        </Box>
        <InputField
          fullWidth
          label="Company Name"
          name="companyName"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          error={!!formik.errors.companyName && formik.touched.companyName}
          helperText={formik.errors.companyName}
        />
      </Stack>
    </form>
  );
};

export default PersonalDetails;
