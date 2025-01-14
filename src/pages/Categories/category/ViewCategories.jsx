import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import UploadIcon from "@mui/icons-material/Upload";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import CustomInput from "../../../components/SharedComponents/CustomInput";
import CustomSelect from "../../../components/SharedComponents/CustomSelect";
import { BASE_URL } from "../../../utils/baseUrl";

// Validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Category Name is required"),
  description: yup.string().required("Description is required"),
  status: yup
    .string()
    .oneOf(["Active", "Inactive"])
    .required("Status is required"),
});

function ViewCategories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [editedCategory, setEditedCategory] = useState({
    id: "",
    name: "",
    description: "",
    status: "",
  });
  console.log("Category ID:", id);
  useEffect(() => {
    if (!id) {
      console.error("Invalid category ID.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found. Please log in.");
      navigate("/login");
      return;
    }

    axios
      .get(`${BASE_URL}/api/category/admin-all?id=${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        if (data) {
          setCategory(data);
          setEditedCategory({
            id: data._id,
            name: data.name,
            description: data.description,
            status: data.isActive ? "Active" : "Inactive", 
          });
          setImageUrl(data.icon || "default_image_url");
        } else {
          console.error("No category found with the provided ID.");
        }
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, [id, navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
    setErrors({}); // Clear any existing errors
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(editedCategory, { abortEarly: false });
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

  const handleSaveClick = async () => {
    const isValid = await validateForm();
    if (!isValid) return;
  
    console.log("Saving category with status:", editedCategory.status); // Debugging
    
    const updatedData = new FormData();
    updatedData.append("name", editedCategory.name);
    updatedData.append("description", editedCategory.description);
  
    // Ensure status is correctly converted to boolean
    updatedData.append("isActive", editedCategory.status === "Active" ? true : false); 
  
    if (imageUrl && imageUrl instanceof File) {
      updatedData.append("image", imageUrl);
    }
  
    console.log(updatedData); // Log FormData to check its contents
    
    const token = localStorage.getItem("token");
    
    try {
      const response = await axios.put(
        `${BASE_URL}/api/category/update/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Category updated successfully:", response.data);
      setCategory(response.data.data);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  
  

  const handleCancelClick = () => {
    setEditedCategory({
      id: category._id,
      name: category.name,
      description: category.description,
      status: data.isActive ? "Active" : "Inactive",
    });
    setImageUrl(category.icon || "default_image_url");
    setIsEditing(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageUrl(file);
    }
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setEditedCategory((prevState) => ({
      ...prevState,
      status: value,
    }));
    if (errors.status) {
      setErrors((prev) => ({
        ...prev,
        status: undefined, 
      }));
    }
  };
  

  if (!category) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          Loading category data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box padding={4} maxWidth={800} margin="auto">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          View Category Details
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{
            background: "linear-gradient(45deg, #556cd6, #19857b)",
            color: "#fff",
          }}
        >
          <ArrowBackIcon />
          Back
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Box display="flex" flexDirection="column" gap={3}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar
            src={
              imageUrl instanceof File
                ? URL.createObjectURL(imageUrl)
                : category.icon || "default_image_url"
            }
            variant="rounded"
            key={`${imageUrl}-${isEditing}`}
            sx={{
              width: 400,
              height: 450,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              borderRadius: "15px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          />
          {isEditing && (
            <IconButton
              color="primary"
              component="label"
              sx={{
                background: "linear-gradient(45deg, #556cd6, #19857b)",
                color: "#fff",
              }}
            >
              <UploadIcon sx={{ fontSize: 40 }} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </IconButton>
          )}
        </Box>

        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Category Name:
          </Typography>
          {isEditing ? (
            <>
              <CustomInput
                value={editedCategory.name}
                name="name"
                onChange={handleInputChange}
              />
              {errors.name && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.name}
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="body1">{category.name}</Typography>
          )}
        </Box>

        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Description:
          </Typography>
          {isEditing ? (
            <>
              <CustomInput
                value={editedCategory.description}
                name="description"
                onChange={handleInputChange}
              />
              {errors.description && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.description}
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="body1">{category.description}</Typography>
          )}
        </Box>

<Box sx={{ padding: 2 }}>
  <Typography
    variant="subtitle1"
    color="textSecondary"
    sx={{ fontWeight: "bold", mb: 1 }}
  >
    Status:
  </Typography>
  {isEditing ? (
    <>
      <CustomSelect
        id="status"
        name="status"
        value={editedCategory.status}
        onChange={handleStatusChange}
        label="Status"
        MenuItems={[
          { value: "Active", label: "Active" },
          { value: "Inactive", label: "Inactive" },
        ]}
        sx={{ width: "100%" }}
      />
      {errors.status && (
        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
          {errors.status}
        </Typography>
      )}
    </>
  ) : (
    // Fix: Ensure status is checked properly when not in editing mode
    <Typography variant="body1">
      {category.isActive ? "Active" : "Inactive"}
    </Typography>
  )}
</Box>


        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={handleSaveClick}
                endIcon={<SaveIcon />}
                sx={{
                  background: "linear-gradient(45deg, #556cd6, #19857b)",
                  color: "#fff",
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleCancelClick}
                endIcon={<CancelIcon />}
                sx={{
                  background: "linear-gradient(45deg, #FF0000, #FF7878)",
                  color: "#fff",
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
              endIcon={<EditIcon />}
              sx={{
                background: "linear-gradient(45deg, #556cd6, #19857b)",
                color: "#fff",
              }}
            >
              Edit
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ViewCategories;
