import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  IconButton,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../components/SharedComponents/CustomInput"; // Import CustomInput
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BASE_URL } from "../../../utils/baseUrl";
import axios from "axios";
import CustomSelect from "../../../components/SharedComponents/CustomSelect";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function AddCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    type: "",
    description: "",
    image: "",
    status: true, // Ensure this is set to a valid value
  });

  const [alertVisible, setAlertVisible] = useState(false); // State to manage alert visibility
  const [categoryTypes, setCategoryTypes] = useState([]); // State to store category types

  // Fetch category types from API
  const fetchCategoryTypes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BASE_URL}/api/category-type/all-admin`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data || [];
      setCategoryTypes(data); // Set the fetched categories
    } catch (error) {
      console.error("Error fetching category types:", error);
      setCategoryTypes([]); // Handle error scenario
    }
  };

  useEffect(() => {
    fetchCategoryTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,  // Ensure the category.type is being updated correctly
    }));
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory((prev) => ({
        ...prev,
        image: file, // Store file instead of base64 string
      }));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token"); // Get token from local storage
    const formData = new FormData();
  
    // Append category data to formData
    formData.append("name", category.name);
    formData.append("description", category.description);
    formData.append("categoryType", category.type); // Pass selected category type
    if (category.image) {  // Ensure image is not empty
      formData.append("image", category.image); // Append the file itself
    }
    formData.append("isActive", category.status === "Active" ? "true" : "false");
  
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
  
      const data = response.data;
      console.log("Response Data:", data);
  
      if (response.status === 200) {
        // Successfully created category
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
      } else {
        // Handle error and display validation details
        alert(data.message || "Error creating category");
        console.error("Validation error details:", data.details);
      }
    } catch (error) {
      console.error("Error during category creation:", error);
      alert("An error occurred while creating the category.");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    type: Yup.string().required("Category type is required"),
    description: Yup.string().required("Category description is required"),
    status: Yup.string().required("Status is required"),
    image: Yup.mixed().required("Category icon is required").test(
      "fileSize",
      "File too large",
      (value) => !value || (value && value.size <= 5000000) // Example: File size limit to 5MB
    ),
  });

  return (
    <Box padding={2}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Add New Category
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

      {/* Show Success Alert if Category is Saved */}
      {alertVisible && (
        <Alert
          variant="filled"
          severity="success"
          mb={3}
          sx={{ width: "350px" }}
        >
          Category successfully added!
        </Alert>
      )}

      {/* Form Section */}
      <Formik
        initialValues={{
          name: "",
          type: "",
          description: "",
          status: "Active",
          image: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ setFieldValue, touched, errors }) => (
          <Form>
            <Grid container spacing={2} mb={3} mt={8} p={7}>
              {/* Image Column */}
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="body1" mb={1}>
                  <b>Upload Icon</b>
                </Typography>
                <Avatar
                  variant="rounded"
                  src={category.image ? URL.createObjectURL(category.image) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0ydDiYMYriRcJDdqE8NZxnRisT4XZmc7AQ&s"}
                  sx={{ width: 100, height: 150, borderRadius: "8px" }}
                />
                <IconButton color="primary" component="label">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFieldValue("image", file);
                    }}
                  />
                  <UploadIcon style={{ fontSize: "40px" }} />
                </IconButton>
                {touched.image && errors.image && (
                  <div style={{ color: "red", fontSize: "12px" }}>{errors.image}</div>
                )}
              </Grid>

              {/* Category Name, Type, Description, and Status Columns */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" flexDirection="column" gap={2}>
                  {/* Category Type Dropdown */}
                  <FormControl fullWidth variant="outlined" size="small" error={touched.type && errors.type}>
                    <CustomSelect
                      id="type"
                      name="type"
                      value={category.type}
                      onChange={handleInputChange}
                      label="Category Type"
                      MenuItems={categoryTypes.map((type) => ({
                        value: type._id, // Use categoryType ID as the value
                        label: type.name, // Use categoryType name as the label
                      }))}
                      sx={{ width: "100%" }}
                    />
                    {touched.type && errors.type && (
                      <FormHelperText>{errors.type}</FormHelperText>
                    )}
                  </FormControl>

                  <CustomInput
                    id="category-name"
                    name="name"
                    label="Category Name"
                    placeholder="Enter category name"
                    value={category.name}
                    onChange={handleInputChange}
                    sx={{ width: "100%" }}
                  />
                  {touched.name && errors.name && (
                    <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
                  )}

                  <CustomInput
                    id="category-description"
                    name="description"
                    label="Category Description"
                    placeholder="Enter category description"
                    value={category.description}
                    onChange={handleInputChange}
                    type="text"
                    sx={{ width: "100%" }}
                  />
                  {touched.description && errors.description && (
                    <div style={{ color: "red", fontSize: "12px" }}>{errors.description}</div>
                  )}

                  <CustomSelect
                    id="status"
                    name="status"
                    value={category.status}
                    onChange={handleInputChange}
                    label="Status"
                    MenuItems={[
                      { value: "Active", label: "Active" },
                      { value: "Inactive", label: "Inactive" },
                    ]}
                    sx={{ width: "100%" }}
                  />
                  {touched.status && errors.status && (
                    <div style={{ color: "red", fontSize: "12px" }}>{errors.status}</div>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
              mt={2}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ padding: "10px 20px" }}
                disabled={Object.keys(errors).length > 0}
                style={{                
                  background: "linear-gradient(45deg, #556cd6, #19857b)",
                  color: "#fff",}}
              >
                <Save  />
                Save 
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default AddCategory;
