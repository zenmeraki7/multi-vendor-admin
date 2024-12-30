import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { styled } from "@mui/system";

// Custom InputField styled component
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

const BankDetailsUpload = () => {
  // Formik initialization
  const formik = useFormik({
    initialValues: {
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      bankDocument: null,
    },
    validationSchema: Yup.object({
      accountHolderName: Yup.string().required(
        "Account Holder Name is required"
      ),
      accountNumber: Yup.string()
        .required("Account Number is required")
        .matches(/^\d{9,18}$/, "Invalid Account Number format"),
      ifscCode: Yup.string()
        .required("IFSC Code is required")
        .matches(/^[A-Za-z]{4}[0][A-Za-z0-9]{6}$/, "Invalid IFSC Code format"),
      bankName: Yup.string().required("Bank Name is required"),
      bankDocument: Yup.mixed().required("Bank document is required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission here
      const formData = new FormData();
      formData.append("accountHolderName", values.accountHolderName);
      formData.append("accountNumber", values.accountNumber);
      formData.append("ifscCode", values.ifscCode);
      formData.append("bankName", values.bankName);
      formData.append("bankDocument", values.bankDocument);

      try {
        const response = await axios.post(
          "/api/upload-bank-details",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Bank details uploaded successfully", response.data);
      } catch (error) {
        console.error("Error uploading bank details", error);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          {/* Account Holder Name */}
          <InputField
            fullWidth
            label="Account Holder Name"
            name="accountHolderName"
            value={formik.values.accountHolderName}
            onChange={formik.handleChange}
            error={
              !!formik.errors.accountHolderName &&
              formik.touched.accountHolderName
            }
            helperText={formik.errors.accountHolderName}
          />

          {/* Account Number */}
          <InputField
            fullWidth
            label="Account Number"
            name="accountNumber"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            error={
              !!formik.errors.accountNumber && formik.touched.accountNumber
            }
            helperText={formik.errors.accountNumber}
          />

          {/* IFSC Code */}
          <InputField
            fullWidth
            label="IFSC Code"
            name="ifscCode"
            value={formik.values.ifscCode}
            onChange={formik.handleChange}
            error={!!formik.errors.ifscCode && formik.touched.ifscCode}
            helperText={formik.errors.ifscCode}
          />

          {/* Bank Name */}
          <InputField
            fullWidth
            label="Bank Name"
            name="bankName"
            value={formik.values.bankName}
            onChange={formik.handleChange}
            error={!!formik.errors.bankName && formik.touched.bankName}
            helperText={formik.errors.bankName}
          />

          {/* Bank Document Upload */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Upload Bank Document
            </Typography>
            <IconButton
              color="primary"
              component="label"
              aria-label="upload bank document"
              sx={{ mt: 2 }}
            >
              <CloudUploadIcon />
              <input
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(event) => {
                  formik.setFieldValue("bankDocument", event.target.files[0]);
                }}
              />
            </IconButton>
            {formik.values.bankDocument && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected File: {formik.values.bankDocument.name}
              </Typography>
            )}
            {formik.values.bankDocument && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Preview:</Typography>
                <img
                  src={URL.createObjectURL(formik.values.bankDocument)}
                  alt="Bank Document Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
          </Box>
        </Stack>
      </form>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        {/* <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="contained"
                        color="inherit"
                      >
                        Back
                      </Button> */}
        <Button
          variant="contained"
          color="primary"
        //   onClick={handleApiCall}
          //   disabled={loading || otp.length !== 6}
        >
          Save Bank Details
        </Button>
      </Box>
    </>
  );
};

export default BankDetailsUpload;
