import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  TextField,
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

const DocumentUpload = () => {
  // Formik initialization
  const formik = useFormik({
    initialValues: {
      gstinDocumentNumber: "",
      gstinDocumentImage: null,
      panCardDocumentNumber: "",
      panCardDocumentImage: null,
    },
    validationSchema: Yup.object({
      gstinDocumentNumber: Yup.string()
        .required("GSTIN Document Number is required")
        .matches(/^[A-Z0-9]{15}$/, "Invalid GSTIN format"),
      panCardDocumentNumber: Yup.string()
        .required("PAN Card Document Number is required")
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
      gstinDocumentImage: Yup.mixed().required("GSTIN document is required"),
      panCardDocumentImage: Yup.mixed().required("PAN card document is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("gstinDocumentImage", values.gstinDocumentImage);
      formData.append("panCardDocumentImage", values.panCardDocumentImage);
      formData.append("gstinDocumentNumber", values.gstinDocumentNumber);
      formData.append("panCardDocumentNumber", values.panCardDocumentNumber);

      try {
        const response = await axios.post("/api/upload-documents", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Documents uploaded successfully", response.data);
      } catch (error) {
        console.error("Error uploading documents", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        {/* GSTIN Document Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Upload GSTIN
          </Typography>
          <InputField
            fullWidth
            label="GSTIN Document Number"
            name="gstinDocumentNumber"
            value={formik.values.gstinDocumentNumber}
            onChange={formik.handleChange}
            error={!!formik.errors.gstinDocumentNumber && formik.touched.gstinDocumentNumber}
            helperText={formik.errors.gstinDocumentNumber}
          />
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <IconButton
              color="primary"
              component="label"
              aria-label="upload GSTIN Document"
            >
              <CloudUploadIcon />
              <input
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(event) => {
                  formik.setFieldValue("gstinDocumentImage", event.target.files[0]);
                }}
              />
            </IconButton>
            {formik.values.gstinDocumentImage && (
              <Typography variant="body2" sx={{ ml: 2 }}>
                Selected File: {formik.values.gstinDocumentImage.name}
              </Typography>
            )}
          </Box>
          {formik.values.gstinDocumentImage && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">Preview:</Typography>
              <img
                src={URL.createObjectURL(formik.values.gstinDocumentImage)}
                alt="GSTIN Preview"
                style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
              />
            </Box>
          )}
        </Box>

        {/* PAN Card Document Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Upload PAN Card
          </Typography>
          <InputField
            fullWidth
            label="PAN Card Document Number"
            name="panCardDocumentNumber"
            value={formik.values.panCardDocumentNumber}
            onChange={formik.handleChange}
            error={!!formik.errors.panCardDocumentNumber && formik.touched.panCardDocumentNumber}
            helperText={formik.errors.panCardDocumentNumber}
          />
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <IconButton
              color="primary"
              component="label"
              aria-label="upload PAN Document"
            >
              <CloudUploadIcon />
              <input
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(event) => {
                  formik.setFieldValue("panCardDocumentImage", event.target.files[0]);
                }}
              />
            </IconButton>
            {formik.values.panCardDocumentImage && (
              <Typography variant="body2" sx={{ ml: 2 }}>
                Selected File: {formik.values.panCardDocumentImage.name}
              </Typography>
            )}
          </Box>
          {formik.values.panCardDocumentImage && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">Preview:</Typography>
              <img
                src={URL.createObjectURL(formik.values.panCardDocumentImage)}
                alt="PAN Preview"
                style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
              />
            </Box>
          )}
        </Box>        
      </Stack>
    </form>
  );
};

export default DocumentUpload;
