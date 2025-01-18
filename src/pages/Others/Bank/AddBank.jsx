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

function AddBank() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [countries, setCountries] = useState([]); // State to store fetched countries

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
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
          setCountries(response.data.data);
        } else {
          console.error("Error: API response data is not in the expected format.");
        }
      } catch (error) {
        console.error("Error fetching countries:", error.response ? error.response.data : error.message);
      }
    };

    fetchCountries();
  }, []);

  const handleSave = async (values) => {
    setLoading(true);
    const { bankName, country, status } = values; // Get values from Formik state
    const token = localStorage.getItem("token");

    if (!bankName || !country) {
      setErrorAlertVisible(true);
      setLoading(false);
      return;
    }

    const payload = {
      name: bankName, // Bank name
      country: country, // Country ID
      isActive: status === "Active" ? true : false, // Ensure status maps to isActive
    };
  
    console.log("Payload:", payload);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/banks/create`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response);  // Log full response to check status and data

      if (response.status === 201) {  // Check for '201 Created' instead of '200'
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          navigate(-1); // Navigate back after success
        }, 3000);
      } else {
        console.error("Unexpected response:", response.data);
        setErrorAlertVisible(true);
      }
    } catch (error) {
      console.error("Error during bank creation:", error.response ? error.response.data : error.message);
      setErrorAlertVisible(true);
    } finally {
      setLoading(false); // Stop the loading spinner
    }
};


  const validationSchema = Yup.object({
    bankName: Yup.string().required("Bank name is required"),
    country: Yup.string().required("Country is required"),
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
          Add New Bank
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
          Bank successfully added!
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
          There was an error adding the bank.
        </Alert>
      )}

      <Formik
        initialValues={{
          bankName: "",
          country: "",
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
                    id="bank-name"
                    name="bankName"
                    label="Bank Name"
                    placeholder="Enter bank name"
                    value={values.bankName}
                    onChange={(e) => setFieldValue("bankName", e.target.value)}
                    sx={{ width: "100%" }}
                  />
                  {touched.bankName && errors.bankName && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.bankName}
                    </div>
                  )}

                  <CustomSelect
                    id="country"
                    name="country"
                    value={values.country}
                    onChange={(e) => setFieldValue("country", e.target.value)}
                    label="Country"
                    MenuItems={countries.map((country) => ({
                      value: country._id,
                      label: country.name,
                    }))}
                    sx={{ width: "100%" }}
                  />
                  {touched.country && errors.country && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.country}
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

export default AddBank;
