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

function AddState() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [countries, setCountries] = useState([]); // State to store fetched countries

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);  // Set loading to true when the page starts loading
      const token = localStorage.getItem("token"); // Get token from local storage
      if (!token) {
        console.error("No token found. Please log in.");
        return; // Exit if no token is available
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/countries/admin`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        });

        if (response.data && Array.isArray(response.data.data)) {
          setCountries(response.data.data); // Set countries if the response is in the expected format
        } else {
          console.error("Error: API response data is not in the expected format.");
        }
      } catch (error) {
        console.error("Error fetching countries:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false); // Set loading to false once the data has been fetched
      }
    };

    fetchCountries();
  }, []);

  const handleSave = async (values) => {
    setLoading(true);
    const { stateName, stateCode, countryName, status } = values;
    const token = localStorage.getItem("token");

    if (!stateName || !stateCode || !countryName || !status) {
      setErrorAlertVisible(true);
      setLoading(false);
      return;
    }

    const payload = {
      name: stateName,
      country: countryName, // Country ID
      code: stateCode,
      isActive: status === "Active",
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/states/create`, 
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        }
      );

      if (response.status === 201) { // Check if the state was created successfully
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          navigate(-1); // Navigate back after success
        }, 3000);
      } else {
        setErrorAlertVisible(true);
      }
    } catch (error) {
      console.error("Error during state creation:", error);
      setErrorAlertVisible(true);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const validationSchema = Yup.object({
    stateName: Yup.string().required("State name is required"),
    stateCode: Yup.string().required("State code is required"),
    countryName: Yup.string().required("Country is required"),
    status: Yup.string().required("Status is required"),
  });

  return (
    <Box padding={2}>
      {/* Loading indicator during page load */}
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress size={60} color="primary" />
        </Box>
      )}

      {!loading && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4" fontWeight="bold">
              Add New State
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
              State successfully added!
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
              There was an error adding the state.
            </Alert>
          )}

          <Formik
            initialValues={{
              stateName: "",
              stateCode: "",
              countryName: "",
              status: "Active",
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
                        id="state-name"
                        name="stateName"
                        label="State Name"
                        placeholder="Enter state name"
                        value={values.stateName}
                        onChange={(e) => setFieldValue("stateName", e.target.value)}
                        sx={{ width: "100%" }}
                      />
                      {touched.stateName && errors.stateName && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {errors.stateName}
                        </div>
                      )}

                      <CustomInput
                        id="state-code"
                        name="stateCode"
                        label="State Code"
                        placeholder="Enter state code"
                        value={values.stateCode}
                        onChange={(e) => setFieldValue("stateCode", e.target.value)}
                        sx={{ width: "100%" }}
                      />
                      {touched.stateCode && errors.stateCode && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {errors.stateCode}
                        </div>
                      )}

                      <CustomSelect
                        id="country-name"
                        name="countryName"
                        value={values.countryName}
                        onChange={(e) => setFieldValue("countryName", e.target.value)}
                        label="Country"
                        MenuItems={countries.map((country) => ({
                          value: country._id,  // Assuming '_id' is the country identifier
                          label: country.name, // Assuming 'name' is the country name
                        }))}
                        sx={{ width: "100%" }}
                      />
                      {touched.countryName && errors.countryName && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {errors.countryName}
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
        </>
      )}
    </Box>
  );
}

export default AddState;
