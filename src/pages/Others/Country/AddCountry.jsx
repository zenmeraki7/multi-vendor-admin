import React, { useState, useEffect } from "react";
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
import { logoutUser } from "../../../utils/authUtils";
import CustomButton from "../../../components/SharedComponents/CustomButton";

function AddCountry() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true); // New state to control page load

  // Simulate fetching or page loading tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate async operation (e.g., fetching data)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay for demonstration
        setIsPageLoading(false); // Page loaded
      } catch (error) {
        console.error("Error during page load:", error);
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 401)
        ) {
          logoutUser(); // Call logoutUser if 404 or 401 status code
        }
        setIsPageLoading(false); // Ensure loader is removed even if there's an error
      }
    };

    fetchData();
  }, []);

  const handleSave = async (values) => {
    setLoading(true);
    const token = localStorage.getItem("token"); // Get token from localStorage

    try {
      console.log("Payload:", {
        name: values.countryName,
        code: values.countryCode,
        isActive: values.status === "Active",
      });

      const response = await axios.post(
        `${BASE_URL}/api/countries/create`,
        {
          name: values.countryName,
          code: values.countryCode,
          isActive: values.status === "Active",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          navigate(-1);
        }, 3000);
      } else {
        console.error("Unexpected Response:", response.data);
        setErrorAlertVisible(true);
      }
    } catch (error) {
      console.error("Error during country creation:", error);
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        logoutUser(); // Call logoutUser if 404 or 401 status code
      }
      setErrorAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    countryName: Yup.string().required("Country name is required"),
    countryCode: Yup.string().required("Country code is required"),
    status: Yup.string().required("Status is required"),
  });

  if (isPageLoading) {
    // Display loading spinner while the page is being loaded
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

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
        <CustomButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </CustomButton>
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
          status: "Active",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ setFieldValue, touched, errors, values }) => (
          <Form>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              mb={3}
              mt={8}
              p={7}
            >
              <Grid item xs={12} sm={8} md={6}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <CustomInput
                    id="country-name"
                    name="countryName"
                    label="Country Name"
                    placeholder="Enter country name"
                    value={values.countryName}
                    onChange={(e) =>
                      setFieldValue("countryName", e.target.value)
                    }
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
                    onChange={(e) =>
                      setFieldValue("countryCode", e.target.value)
                    }
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
              <CustomButton
                type="submit"
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Save />
                  )
                }
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </CustomButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default AddCountry;
