import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Chip,
  Button,
  IconButton,
  CircularProgress,
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
import { logoutUser } from "../../../utils/authUtils";
import CustomButton from "../../../components/SharedComponents/CustomButton";
// Validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Category Name is required"),
  description: yup.string().required("Description is required"),
  status: yup
    .string()
    .oneOf(["Active", "Inactive"])
    .required("Status is required"),
});

const LoadingSpinner = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <CircularProgress
      size={60}
      thickness={4}
      sx={{
        color: "#1976d2",
        animation: "spin 1s linear infinite",
        "@keyframes spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      }}
    />
  </Box>
);

function ViewCategories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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
    setLoading(true);

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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
          if (error.response && (error.response.status === 404 || error.response.status === 401)) {
                logoutUser(); // Call logoutUser if 404 or 401 status code
              }
        setLoading(false);
      });
  }, [id, navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
    setErrors({});
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
    setIsSaving(true);

    console.log("Saving category with status:", editedCategory.status);

    const updatedData = new FormData();
    updatedData.append("name", editedCategory.name);
    updatedData.append("description", editedCategory.description);
    updatedData.append(
      "isActive",
      editedCategory.status === "Active" ? true : false
    );

    if (imageUrl && imageUrl instanceof File) {
      updatedData.append("image", imageUrl);
    }

    console.log(updatedData);

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
      setIsSaving(false);
    } catch (error) {
      console.error("Error updating category:", error);
        if (error.response && (error.response.status === 404 || error.response.status === 401)) {
              logoutUser(); // Call logoutUser if 404 or 401 status code
            }
      setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    setEditedCategory({
      id: category._id,
      name: category.name,
      description: category.description,
      status: category.isActive ? "Active" : "Inactive",
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

  if (loading || !category) {
    return <LoadingSpinner />;
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
        <CustomButton
          color="primary"
          onClick={() => navigate(-1)}
          
        >
          <ArrowBackIcon />
          {/* Back */}
        </CustomButton>
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
        component="label"
        sx={{
          backgroundColor: "#2563EB",
          color: "#ffffff",
          borderRadius: "10px",
          padding: "10px",
          minWidth: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#1E40AF",
          },
        }}
      >
        <UploadIcon sx={{ fontSize: "24px" }} />
        <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
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
            <Typography variant="body1">
              {category.isActive ? "Active" : "Inactive"}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          {isEditing ? (
            <>
              <CustomButton
                variant="contained"
                color="success"
                onClick={handleSaveClick}
                disabled={isSaving}
                endIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                
              >
                {isSaving ? 'Saving...' : 'Save'}
              </CustomButton>
              <CustomButton
                variant="outlined"
               
                onClick={handleCancelClick}
                disabled={isSaving}
                endIcon={<CancelIcon />}
              
              >
                Cancel
              </CustomButton>
            </>
          ) : (
            <CustomButton
              variant="contained"
              color="primary"
              onClick={handleEditClick}
              endIcon={<EditIcon />}
            
            >
              Edit
            </CustomButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ViewCategories;