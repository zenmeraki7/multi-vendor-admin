import React, { useEffect, useState } from "react";
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
  useTheme,
  Avatar
} from "@mui/material";
import { Save, Upload as UploadIcon } from "@mui/icons-material";
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

function AddSubCategory() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [categoryOptions, setCategoryOptions] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        setNotification({
          open: true,
          message: "Authentication required. Please log in.",
          severity: "error"
        });
        setTimeout(() => logoutUser(), 3000);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/category/admin-all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data.data)) {
          setCategoryOptions(response.data.data);
        } else {
          console.error("Error: API response data is not in the expected format.");
          setNotification({
            open: true,
            message: "Could not load categories data. Please try again.",
            severity: "error"
          });
        }
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error.response ? error.response.data : error.message
        );
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
            message: "Failed to load categories. Please try again.",
            severity: "error"
          });
        }
      } finally {
        setPageLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSave = async (values) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Validate required fields
    if (!values.category || !values.subcategory || !values.description || !values.image) {
      setNotification({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error"
      });
      setLoading(false);
      return;
    }

    // Append form data
    formData.append("name", values.subcategory);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("isActive", values.status === "Active" ? "true" : "false");
    
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/subcategory/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setNotification({
          open: true,
          message: "Subcategory successfully added!",
          severity: "success"
        });
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        setNotification({
          open: true,
          message: "There was an error adding the subcategory.",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error during subcategory creation:", error);
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
          message: error.response?.data?.message || "Failed to add subcategory. Please try again.",
          severity: "error"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
    subcategory: Yup.string()
      .required("Subcategory name is required")
      .min(3, "Subcategory name must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    status: Yup.string().required("Status is required"),
  });

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (pageLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

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
            Add New Subcategory
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
              category: "",
              subcategory: "",
              description: "",
              status: "Active",
              image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSave}
          >
            {({ setFieldValue, touched, errors, values }) => (
              <Form>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      {/* First Row: Image Upload */}
                      <Grid item xs={12} display="flex" justifyContent="center" mb={2}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                          <Typography 
                            variant="subtitle2" 
                            color="textSecondary" 
                            gutterBottom
                            fontWeight="500"
                            mb={1}
                          >
                            Upload Icon *
                          </Typography>
                          <Avatar
                            variant="rounded"
                            src={values.image ? URL.createObjectURL(values.image) : ""}
                            sx={{ 
                              width: 100, 
                              height: 100, 
                              borderRadius: 2,
                              mb: 1,
                              bgcolor: theme.palette.grey[200]
                            }}
                          />
                          <CustomButton
                            component="label"
                            variant="outlined"
                            color="primary"
                            size="small"
                            startIcon={<UploadIcon />}
                            sx={{ mt: 1 }}
                          >
                            Upload Image
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={(e) => setFieldValue("image", e.target.files[0])}
                            />
                          </CustomButton>
                          {touched.image && errors.image && (
                            <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                              {errors.image}
                            </Typography>
                          )}
                        </Box>
                      </Grid>

                      {/* Second Row: Category and Subcategory */}
                      <Grid item xs={12} md={6}>
                        <Box>
                          <Typography 
                            variant="subtitle2" 
                            color="textSecondary" 
                            gutterBottom
                            fontWeight="500"
                          >
                            Category *
                          </Typography>
                          <CustomSelect
                            id="category"
                            name="category"
                            value={values.category}
                            onChange={(e) => setFieldValue("category", e.target.value)}
                            placeholder="Select category"
                            MenuItems={categoryOptions.map((category) => ({
                              value: category._id,
                              label: category.name,
                            }))}
                            fullWidth
                          />
                          {touched.category && errors.category && (
                            <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                              {errors.category}
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
                            Subcategory Name *
                          </Typography>
                          <CustomInput
                            id="subcategory"
                            name="subcategory"
                            placeholder="Enter subcategory name"
                            value={values.subcategory}
                            onChange={(e) => setFieldValue("subcategory", e.target.value)}
                            fullWidth
                          />
                          {touched.subcategory && errors.subcategory && (
                            <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                              {errors.subcategory}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      
                      {/* Third Row: Description and Status */}
                      <Grid item xs={12} md={6}>
                        <Box>
                          <Typography 
                            variant="subtitle2" 
                            color="textSecondary" 
                            gutterBottom
                            fontWeight="500"
                          >
                            Description *
                          </Typography>
                          <CustomInput
                            id="description"
                            name="description"
                            placeholder="Enter subcategory description"
                            value={values.description}
                            onChange={(e) => setFieldValue("description", e.target.value)}
                            multiline
                            rows={4}
                            fullWidth
                          />
                          {touched.description && errors.description && (
                            <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                              {errors.description}
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
                    {loading ? "Saving..." : "Save"}
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

export default AddSubCategory;