import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  IconButton,
  Grid,
  Alert,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../components/SharedComponents/CustomInput"; // Import CustomInput
import CustomSelect from "../../../components/SharedComponents/CustomSelect";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BASE_URL } from "../../../utils/baseUrl";

function AddCategoryType() {
  const navigate = useNavigate();
  const [categoryType, setCategoryType] = useState({
    name: "",
    description: "",
    image: null, // Changed to store the file instead of base64
    isActive: " ", // default to Active (true)
  });
  const [alertVisible, setAlertVisible] = useState(false); // State to manage alert visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // For the 'isActive' field, map the string value ("Active"/"Inactive") to a boolean
    if (name === "isActive") {
      setCategoryType((prev) => ({
        ...prev,
        [name]: value === "Active", // 'Active' becomes true, 'Inactive' becomes false
      }));
    } else {
      setCategoryType((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCategoryType((prev) => ({
          ...prev,
          image: {
            file: file, // Store the actual file for submission
            preview: reader.result, // Store base64 for preview
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
  
    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      navigate("/login");
      return;
    }
  
    try {
      // Create FormData object to send the data
      const formData = new FormData();
      formData.append("name", categoryType.name);
      formData.append("description", categoryType.description);
      formData.append("isActive", categoryType.isActive ? "true" : "false"); // Convert boolean to string
      if (categoryType.image && categoryType.image.file) {
        formData.append("image", categoryType.image.file); // Use the actual file
      }
  
      // Make API request
      const response = await axios.post(
        `${BASE_URL}/api/category-type/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for sending files
            authorization: `Bearer ${token}`, // Add the token
          },
        }
      );
  
      console.log("Category Type Created Successfully:", response.data);
  
      // Show success alert
      setAlertVisible(true);
  
      // Hide the alert after 3 seconds
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
  
      // Reset form fields
      setCategoryType({
        name: "",
        description: "",
        image: null,
        isActive: true,
      });
    } catch (error) {
      if (error.response) {
        console.error("API Error Response:", error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error("Error creating category type:", error);
        alert("An unexpected error occurred.");
      }
    }
  };
  

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
          Add New Category Type
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

      {/* Show Success Alert if Category Type is Saved */}
      {alertVisible && (
        <Alert
          variant="filled"
          severity="success"
          mb={3}
          sx={{ width: "350px" }}
        >
          Category Type successfully added!
        </Alert>
      )}

      {/* Icon Upload and Category Name in Two Columns */}
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
            src={
              categoryType.image && categoryType.image.preview
                ? categoryType.image.preview
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0ydDiYMYriRcJDdqE8NZxnRisT4XZmc7AQ&s"
            }
            sx={{ width: 100, height: 150, borderRadius: "8px" }}
          />
          ;
          <IconButton color="primary" component="label">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
            <UploadIcon style={{ fontSize: "40px" }} />
          </IconButton>
        </Grid>

        {/* Category Name, Description, and Status Columns */}
        <Grid item xs={12} sm={6}>
          <Box display="flex" flexDirection="column" gap={2}>
            <CustomInput
              id="category-name"
              name="name"
              label="Category Name"
              placeholder="Enter category name"
              value={categoryType.name}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
            />
            <CustomInput
              id="category-description"
              name="description"
              label="Category Description"
              placeholder="Enter category description"
              value={categoryType.description}
              onChange={handleInputChange}
              type="text"
              sx={{ width: "100%" }}
            />
            <CustomSelect
              id="status"
              name="isActive"
              value={categoryType.isActive ? "Active" : "Inactive"} // Map boolean to string
              onChange={handleInputChange}
              label="Status"
              MenuItems={["Active", "Inactive"]}
              sx={{ width: "100%" }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          startIcon={<Save />}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default AddCategoryType;
