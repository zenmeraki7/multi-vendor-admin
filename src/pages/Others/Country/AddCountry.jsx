import React, { useState } from "react";
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

function AddCountry() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const handleSave = async (values) => {
    setLoading(true);
    const { countryName, countryCode, status } = values;
    const token = localStorage.getItem("token");

    if (!countryName || !countryCode || !status) {
      setNotification({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error"
      });
      setLoading(false);
      return;
    }

    const payload = {
      name: countryName,
      code: countryCode,
      isActive: status === "Active",
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/countries/create`,
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
          message: "Country successfully added!",
          severity: "success"
        });
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        setNotification({
          open: true,
          message: "There was an error adding the country.",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error during country creation:", error);
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
          message: error.response?.data?.message || "Failed to add country. Please try again.",
          severity: "error"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    countryName: Yup.string().required("Country name is required"),
    countryCode: Yup.string().required("Country code is required"),
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
            Add New Country
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
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      {/* First Row: Country Name and Country Code */}
                      <Grid item xs={12} md={6}>
                        <Box>
                          <Typography 
                            variant="subtitle2" 
                            color="textSecondary" 
                            gutterBottom
                            fontWeight="500"
                          >
                            Country Name *
                          </Typography>
                          <CustomInput
                            id="country-name"
                            name="countryName"
                            placeholder="Enter country name"
                            value={values.countryName}
                            onChange={(e) => setFieldValue("countryName", e.target.value)}
                            fullWidth
                          />
                          {touched.countryName && errors.countryName && (
                            <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                              {errors.countryName}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Box>
                          <Typography 
                            variant="subtitle2" 
                            color="textSecondary" 
                            gutterBottom
                            fontWeight="500"
                          >
                            Country Code *
                          </Typography>
                          <CustomInput
                            id="country-code"
                            name="countryCode"
                            placeholder="Enter country code"
                            value={values.countryCode}
                            onChange={(e) => setFieldValue("countryCode", e.target.value)}
                            fullWidth
                          />
                          {touched.countryCode && errors.countryCode && (
                            <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                              {errors.countryCode}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      
                   
                      
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
                    {loading ? "Saving..." : "Save "}
                  </CustomButton>
                </Box>
              </Form>
            )}
          </Formik>
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

export default AddCountry;