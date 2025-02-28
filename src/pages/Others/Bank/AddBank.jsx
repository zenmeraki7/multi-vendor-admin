import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Alert,
  CircularProgress,
  Paper,
  Container,
  Snackbar,
  Divider,
  useTheme
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

function AddBank() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setNotification({
          open: true,
          message: "No token found. Please log in.",
          severity: "error"
        });
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/countries/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data.data)) {
          setCountries(response.data.data);
        } else {
          setNotification({
            open: true,
            message: "Error: API response data is not in the expected format.",
            severity: "error"
          });
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 401)
        ) {
          setNotification({
            open: true,
            message: "Authentication error. Please log in again.",
            severity: "error"
          });
          setTimeout(() => logoutUser(), 3000);
        } else {
          setNotification({
            open: true,
            message: "Failed to fetch countries. Please try again.",
            severity: "error"
          });
        }
      } finally {
        setCountriesLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSave = async (values) => {
    setLoading(true);
    const { bankName, country, status } = values;
    const token = localStorage.getItem("token");

    if (!bankName || !country || !status) {
      setNotification({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error"
      });
      setLoading(false);
      return;
    }

    const payload = {
      name: bankName,
      country: country,
      isActive: status === "Active",
    };

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

      if (response.status === 201) {
        setNotification({
          open: true,
          message: "Bank successfully added!",
          severity: "success"
        });
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        setNotification({
          open: true,
          message: "There was an error adding the bank.",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error during bank creation:", error);
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        setNotification({
          open: true,
          message: "Authentication error. Please log in again.",
          severity: "error"
        });
        setTimeout(() => logoutUser(), 3000);
      } else {
        setNotification({
          open: true,
          message: error.response?.data?.message || "Failed to add bank. Please try again.",
          severity: "error"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    bankName: Yup.string().required("Bank name is required"),
    country: Yup.string().required("Country is required"),
    status: Yup.string().required("Status is required"),
  });

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 2,
          overflow: "hidden"
        }}
      >
        <Box 
          py={2} 
          px={3} 
          bgcolor={theme.palette.primary.main} 
          color="white"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" fontWeight="500">
            Add New Bank
          </Typography>
          <CustomButton
            onClick={() => navigate(-1)}
            variant="contained"
            color="inherit"
            size="small"
            sx={{ 
              bgcolor: "rgba(255,255,255,0.2)",
              '&:hover': { bgcolor: "rgba(255,255,255,0.3)" }
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </CustomButton>
        </Box>
        
        <Divider />

        <Box px={4} py={4}>
          {countriesLoading ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress />
            </Box>
          ) : (
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
                  <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        {/* Bank Name */}
                        <Grid item xs={12} md={6}>
                          <Box>
                            <Typography 
                              variant="subtitle2" 
                              color="textSecondary" 
                              gutterBottom
                              fontWeight="500"
                            >
                              Bank Name *
                            </Typography>
                            <CustomInput
                              id="bank-name"
                              name="bankName"
                              placeholder="Enter bank name"
                              value={values.bankName}
                              onChange={(e) => setFieldValue("bankName", e.target.value)}
                              fullWidth
                            />
                            {touched.bankName && errors.bankName && (
                              <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                                {errors.bankName}
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                        
                        {/* Country */}
                        <Grid item xs={12} md={6}>
                          <Box>
                            <Typography 
                              variant="subtitle2" 
                              color="textSecondary" 
                              gutterBottom
                              fontWeight="500"
                            >
                              Country *
                            </Typography>
                            <CustomSelect
                              id="country"
                              name="country"
                              value={values.country}
                              onChange={(e) => setFieldValue("country", e.target.value)}
                              MenuItems={countries.map((country) => ({
                                value: country._id,
                                label: country.name,
                              }))}
                              fullWidth
                            />
                            {touched.country && errors.country && (
                              <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                                {errors.country}
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                        
                        {/* Status */}
                        <Grid item xs={12} md={6}>
                          <Box>
                            <Typography 
                              variant="subtitle2" 
                              color="textSecondary" 
                              gutterBottom
                              fontWeight="500"
                            >
                              Status *
                            </Typography>
                            <CustomSelect
                              id="status"
                              name="status"
                              value={values.status}
                              onChange={(e) => setFieldValue("status", e.target.value)}
                              MenuItems={[
                                { value: "Active", label: "Active" },
                                { value: "Inactive", label: "Inactive" },
                              ]}
                              fullWidth
                            />
                            {touched.status && errors.status && (
                              <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                                {errors.status}
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Box display="flex" justifyContent="center" mt={6}>
                    <CustomButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                      disabled={loading}
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        borderRadius: 1,
                        fontWeight: 500
                      }}
                    >
                      {loading ? "Saving..." : "Save"}
                    </CustomButton>
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Paper>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AddBank;