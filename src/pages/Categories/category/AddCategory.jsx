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

function AddCategory() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [categoryTypes, setCategoryTypes] = useState([]);

  // Fetch category types from API
  useEffect(() => {
    const fetchCategoryTypes = async () => {
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
        const response = await axios.get(
          `${BASE_URL}/api/category-type/all-admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data.data)) {
          setCategoryTypes(response.data.data);
        } else {
          console.error("Error: API response data is not in the expected format.");
          setNotification({
            open: true,
            message: "Could not load category types. Please try again.",
            severity: "error"
          });
        }
      } catch (error) {
        console.error(
          "Error fetching category types:",
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
            message: "Failed to load category types. Please try again.",
            severity: "error"
          });
        }
      } finally {
        setPageLoading(false);
      }
    };

    fetchCategoryTypes();
  }, []);

  const handleSave = async (values) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Validate required fields
    if (!values.type || !values.name || !values.description || !values.image) {
      setNotification({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error"
      });
      setLoading(false);
      return;
    }

    // Append form data
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("categoryType", values.type);
    formData.append("isActive", values.status === "Active" ? "true" : "false");
    
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/category/create`,
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
          message: "Category successfully added!",
          severity: "success"
        });
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        setNotification({
          open: true,
          message: "There was an error adding the category.",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error during category creation:", error);
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
          message: error.response?.data?.message || "Failed to add category. Please try again.",
          severity: "error"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Category name is required")
      .min(3, "Category name must be at least 3 characters"),
    type: Yup.string().required("Category type is required"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    status: Yup.string().required("Status is required"),
    image: Yup.mixed()
      .required("Category icon is required")
      .test(
        "fileSize",
        "File too large",
        (value) => !value || (value && value.size <= 5000000)
      ),
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
            Add New Category
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
              type: "",
              name: "",
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

                      {/* Second Row: Category Type and Name */}
                      <Grid item xs={12} md={6}>
                        <Box>
                          <Typography 
                            variant="subtitle2" 
                            color="textSecondary" 
                            gutterBottom
                            fontWeight="500"
                          >
                            Category Type *
                          </Typography>
                          <CustomSelect
                            id="type"
                            name="type"
                            value={values.type}
                            onChange={(e) => setFieldValue("type", e.target.value)}
                            placeholder="Select category type"
                            MenuItems={categoryTypes.map((type) => ({
                              value: type._id,
                              label: type.name,
                            }))}
                            fullWidth
                          />
                          {touched.type && errors.type && (
                            <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                              {errors.type}
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
                            Category Name *
                          </Typography>
                          <CustomInput
                            id="name"
                            name="name"
                            placeholder="Enter category name"
                            value={values.name}
                            onChange={(e) => setFieldValue("name", e.target.value)}
                            fullWidth
                          />
                          {touched.name && errors.name && (
                            <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                              {errors.name}
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
                            placeholder="Enter category description"
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

export default AddCategory;