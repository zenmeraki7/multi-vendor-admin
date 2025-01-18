import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../components/SharedComponents/CustomInput";
import CustomSelect from "../../../components/SharedComponents/CustomSelect";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../../utils/baseUrl";

function AddCountry() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

  const handleSave = async (values) => {
    setLoading(true);
    const token = localStorage.getItem("token"); // Get token from localStorage
  
    try {
      // Log the payload to check values being sent
      console.log("Payload:", {
        name: values.countryName,
        code: values.countryCode,
        isActive: values.status === "Active", // Convert status to boolean
      });
  
      // Sending a POST request to create a new country
      const response = await axios.post(
        `${BASE_URL}/api/countries/create`, // The API endpoint
        {
          name: values.countryName, // Align with 'name' from backend schema
          code: values.countryCode, // Align with 'code' from backend schema
          isActive: values.status === "Active", // Convert status to boolean
        },
        {
          headers: {
            "Content-Type": "application/json", // Content type for JSON data
            Authorization: `Bearer ${token}`, // Authorization header with token
          },
        }
      );
  
      // Check for success status (200 or 201)
      if (response.status === 200 || response.status === 201) {
        setAlertVisible(true); // Display success alert
        setTimeout(() => {
          setAlertVisible(false);
          navigate(-1); // Navigate back after success
        }, 3000);
      } else {
        console.error("Unexpected Response:", response.data);
        setErrorAlertVisible(true); // Display error alert
      }
    } catch (error) {
      console.error("Error during country creation:", error);
      setErrorAlertVisible(true); // Display error alert if API call fails
    } finally {
      setLoading(false); // Stop the loading spinner after API call completes
    }
  };
  

  const validationSchema = Yup.object({
    countryName: Yup.string().required("Country name is required"),
    countryCode: Yup.string().required("Country code is required"),
    status: Yup.string().required("Status is required"),
  });

  return (
    <Box padding={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Add New Country
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          style={{
            marginRight: "80px",
            background: "linear-gradient(45deg, #556cd6, #19857b)",
            color: "#fff",
          }}
        >
          <ArrowBackIcon />
        </Button>
      </Box>

      {alertVisible && (
        <Alert
          variant="filled"
          severity="success"
          sx={{
            width: "350px",
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 9999,
          }}
        >
          Country successfully added!
        </Alert>
      )}

      {errorAlertVisible && (
        <Alert
          variant="filled"
          severity="error"
          sx={{
            width: "350px",
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 9999,
          }}
        >
          There was an error adding the country.
        </Alert>
      )}

      <Formik
        initialValues={{
          countryName: "",
          countryCode: "",
          status: "Active", // Default to Active
        }}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ setFieldValue, touched, errors, values }) => (
          <Form>
            <Grid container spacing={2} justifyContent="center" alignItems="center" mb={3} mt={8} p={7}>
              <Grid item xs={12} sm={8} md={6}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <CustomInput
                    id="country-name"
                    name="countryName"
                    label="Country Name"
                    placeholder="Enter country name"
                    value={values.countryName}
                    onChange={(e) => setFieldValue("countryName", e.target.value)}
                    sx={{ width: "100%" }}
                  />
                  {touched.countryName && errors.countryName && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.countryName}
                    </div>
                  )}

                  <CustomInput
                    id="country-code"
                    name="countryCode"
                    label="Country Code"
                    placeholder="Enter country code"
                    value={values.countryCode}
                    onChange={(e) => setFieldValue("countryCode", e.target.value)}
                    sx={{ width: "100%" }}
                  />
                  {touched.countryCode && errors.countryCode && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.countryCode}
                    </div>
                  )}

                  <CustomSelect
                    id="status"
                    name="status"
                    value={values.status}
                    onChange={(e) => setFieldValue("status", e.target.value)}
                    label="Status"
                    MenuItems={[
                      { value: "Active", label: "Active" },
                      { value: "Inactive", label: "Inactive" },
                    ]}
                    sx={{ width: "100%" }}
                  />
                  {touched.status && errors.status && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.status}
                    </div>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mb={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                style={{
                  background: "linear-gradient(45deg, #556cd6, #19857b)",
                  color: "#fff",
                }}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default AddCountry;
