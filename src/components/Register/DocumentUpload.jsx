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
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/baseUrl";

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

const DocumentUpload = ({ handleNext }) => {
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
      gstinDocumentImage: Yup.mixed()
        .required("GSTIN document is required")
        .test(
          "fileSize",
          "File size is too large. Max 5MB",
          (value) => !value || value.size <= 5242880
        ) // Max file size 5MB
        .test(
          "fileFormat",
          "Invalid file format. Only jpg, jpeg, png, pdf are allowed",
          (value) =>
            !value ||
            ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
        ),
      panCardDocumentImage: Yup.mixed()
        .required("PAN card document is required")
        .test(
          "fileSize",
          "File size is too large. Max 5MB",
          (value) => !value || value.size <= 5242880
        )
        .test(
          "fileFormat",
          "Invalid file format. Only jpg, jpeg, png, pdf are allowed",
          (value) =>
            !value ||
            ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
        ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("GSTIN", values.gstinDocumentImage);
      formData.append("PAN", values.panCardDocumentImage);
      formData.append("gstinNumber", values.gstinDocumentNumber);
      formData.append("panNumber", values.panCardDocumentNumber);

      toast.loading("Uploading documents...");
      const vendorId = JSON.parse(localStorage.getItem("userData"))._id;
      console.log(vendorId);
      try {
        const response = await axios.put(
          `${BASE_URL}/api/vendor/add-document/${vendorId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.dismiss();
        toast.success("Documents uploaded successfully!");
        handleNext(); // Proceed to the next step after successful upload
      } catch (error) {
        toast.dismiss();
        toast.error("Failed to upload documents. Please try again.");
        console.error("Error uploading documents", error);
      }
    },
  });

  return (
    <>
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
              error={
                !!formik.errors.gstinDocumentNumber &&
                formik.touched.gstinDocumentNumber
              }
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
                    formik.setFieldValue(
                      "gstinDocumentImage",
                      event.target.files[0]
                    );
                  }}
                />
              </IconButton>
              {formik.values.gstinDocumentImage && (
                <Typography variant="body2" sx={{ ml: 2 }}>
                  Selected File: {formik.values.gstinDocumentImage.name}
                </Typography>
              )}
            </Box>
            {formik.errors.gstinDocumentImage &&
              formik.touched.gstinDocumentImage && (
                <Typography variant="body2" color="error">
                  {formik.errors.gstinDocumentImage}
                </Typography>
              )}
            {formik.values.gstinDocumentImage && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Preview:</Typography>
                <img
                  src={URL.createObjectURL(formik.values.gstinDocumentImage)}
                  alt="GSTIN Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
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
              error={
                !!formik.errors.panCardDocumentNumber &&
                formik.touched.panCardDocumentNumber
              }
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
                    formik.setFieldValue(
                      "panCardDocumentImage",
                      event.target.files[0]
                    );
                  }}
                />
              </IconButton>
              {formik.values.panCardDocumentImage && (
                <Typography variant="body2" sx={{ ml: 2 }}>
                  Selected File: {formik.values.panCardDocumentImage.name}
                </Typography>
              )}
            </Box>
            {formik.errors.panCardDocumentImage &&
              formik.touched.panCardDocumentImage && (
                <Typography variant="body2" color="error">
                  {formik.errors.panCardDocumentImage}
                </Typography>
              )}
            {formik.values.panCardDocumentImage && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Preview:</Typography>
                <img
                  src={URL.createObjectURL(formik.values.panCardDocumentImage)}
                  alt="PAN Preview"
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
        <Button
          variant="contained"
          color="primary"
          onClick={formik.handleSubmit} // Trigger Formik's submit
        >
          Save Documents
        </Button>
      </Box>
    </>
  );
};

export default DocumentUpload;
