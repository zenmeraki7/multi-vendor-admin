import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import { BASE_URL } from "../../utils/baseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

const CustomSelect = styled(Select)(({ theme }) => ({
  marginBottom: "10px",
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
  "& .MuiSelect-icon": {
    color: "#1e88e5", // Change the dropdown icon color
  },
}));

const BankDetailsUpload = () => {
  const [banks, setBanks] = useState([]); // State to hold the fetched banks
  const navigate = useNavigate();

  // Fetch the banks on component mount
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/banks`);
        setBanks(response.data); // Set the fetched banks to state
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

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
      bankDocument: Yup.mixed()
        .required("Bank document is required")
        .test(
          "fileType",
          "Only .pdf, .jpg, .jpeg, and .png files are allowed",
          (value) =>
            value &&
            ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
        ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("accountHolderName", values.accountHolderName);
      formData.append("accountNumber", values.accountNumber);
      formData.append("ifscCode", values.ifscCode);
      formData.append("bankName", values.bankName);
      formData.append("image", values.bankDocument);

      toast.loading("Uploading bank details...", {
        id: "uploading",
      }); // Loading toast during the upload

      try {
        const vendorId = JSON.parse(localStorage.getItem("userData"))._id;
        const response = await axios.put(
          `${BASE_URL}/api/vendor/add-bank/${vendorId}`, // Make sure to replace vendorId with actual vendor ID from state or props
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success(
          "Bank details uploaded and Your accout created successfully!"
        ); // Success notification
        navigate("/"); // Redirect to home or other page
      } catch (error) {
        toast.error("Error uploading bank details. Please try again."); // Error notification
        console.error("Error uploading bank details", error);
      } finally {
        toast.dismiss("uploading"); // Dismiss loading toast
      }
    },
  });

  return (
    <>
      <form>
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

          {/* Bank Name Dropdown */}
          <FormControl fullWidth>
            <InputLabel>Bank Name</InputLabel>
            <CustomSelect
              label="Bank Name"
              name="bankName"
              value={formik.values.bankName}
              onChange={formik.handleChange}
              error={!!formik.errors.bankName && formik.touched.bankName}
            >
              {banks.map((bank) => (
                <MenuItem key={bank._id} value={bank._id}>
                  {bank.name}
                </MenuItem>
              ))}
            </CustomSelect>
            {formik.errors.bankName && formik.touched.bankName && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {formik.errors.bankName}
              </Typography>
            )}
          </FormControl>

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
            {formik.errors.bankDocument && formik.touched.bankDocument && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {formik.errors.bankDocument}
              </Typography>
            )}
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            onClick={formik.handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Save Bank Details
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BankDetailsUpload;
