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
import CustomInput from "../../../components/SharedComponents/CustomInput";
import CustomSelect from "../../../components/SharedComponents/CustomSelect";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BASE_URL } from "../../../utils/baseUrl";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Category Name is required"),
  description: yup.string().required("Description is required"),
  isActive: yup
  .string()
  .required("Status is required"),
  image: yup.mixed().required("Icon is required"),
});

function AddCategoryType() {
  const navigate = useNavigate();
  const [categoryType, setCategoryType] = useState({
    name: "",
    description: "",
    image: null,
    isActive: true, // Or `null` or `false`, depending on your needs
  });

  const [errors, setErrors] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Change detected", name, value);

    if (name === "isActive") {
      const newIsActive = value === "Active"; // Correctly set boolean value
      console.log("New isActive value:", newIsActive); // This should log `true` or `false`
      setCategoryType((prev) => ({
        ...prev,
        isActive: newIsActive, // Update state with the correct boolean value
      }));
    } else {
      setCategoryType((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Rest of your component code remains the same...
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCategoryType((prev) => ({
          ...prev,
          image: {
            file: file,
            preview: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(categoryType, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSave = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", categoryType.name);
      formData.append("description", categoryType.description);
      formData.append("isActive", categoryType.isActive ? "true" : "false");
      if (categoryType.image && categoryType.image.file) {
        formData.append("image", categoryType.image.file);
      }

      const response = await axios.post(
        `${BASE_URL}/api/category-type/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Category Type Created Successfully:", response.data);
      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);

      setCategoryType({
        name: "",
        description: "",
        image: null,
        isActive: null,
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

      <Grid container spacing={2} mb={3} mt={8} p={7}>
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
          <IconButton color="primary" component="label">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
            <UploadIcon style={{ fontSize: "40px" }} />
          </IconButton>
          {errors.image && (
            <Typography color="error">{errors.image}</Typography>
          )}
        </Grid>

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
            {errors.name && (
              <Typography color="error">{errors.name}</Typography>
            )}
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
            {errors.description && (
              <Typography color="error">{errors.description}</Typography>
            )}
            <CustomSelect
              id="status"
              name="isActive"
              value={categoryType.isActive ? "Active" : "Inactive"} // Convert boolean to string
              onChange={handleInputChange}
              label="Status"
              MenuItems={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
            />

            {errors.isActive && (
              <Typography color="error">{errors.isActive}</Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          startIcon={<Save />}
          style={{
            background: "linear-gradient(45deg, #556cd6, #19857b)",
            color: "#fff",
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default AddCategoryType;
