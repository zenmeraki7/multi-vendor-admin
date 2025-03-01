import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import CustomInput from "../../../components/SharedComponents/CustomInput";
import CustomSelect from "../../../components/SharedComponents/CustomSelect";
import axios from "axios";
import { BASE_URL } from "../../../utils/baseUrl";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import UploadIcon from "@mui/icons-material/Upload";
import EditIcon from "@mui/icons-material/Edit";
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
        color: "#1976d2", // Material UI's primary blue
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

function ViewSubCategories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subcategory, setSubCategory] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editedSubCategory, setEditedSubCategory] = useState({
    name: "",
    description: "",
    status: "",
  });
  console.log("Category ID:", id);

  useEffect(() => {
    if (!id) {
      console.error("Invalid subcategory ID.");
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
      .get(`${BASE_URL}/api/subcategory/all-admin?id=${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        if (!data) {
          console.error("No data found for this category/subcategory");
        }
        if (data) {
          setSubCategory(data);
          setEditedSubCategory({
            id: data._id,
            name: data.name,
            description: data.description,
            status: data.isActive ? "Active" : "Inactive",
          });
          setImageUrl(data.icon || "default_image_url");
        } else {
          console.error("No subcategory found with the provided ID.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching subcategory:",
          error.response ? error.response.data : error.message
        );
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 401)
        ) {
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
      await validationSchema.validate(editedSubCategory, { abortEarly: false });
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

  const handleCancelClick = () => {
    setEditedSubCategory({
      id: subcategory._id,
      name: subcategory.name,
      description: subcategory.description,
      status: subcategory.isActive ? "Active" : "Inactive",
    });
    setImageUrl(subcategory.icon || "default_image_url");
    setIsEditing(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSubCategory((prevState) => ({
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
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setEditedSubCategory((prevState) => ({
        ...prevState,
        icon: file, // This should be the file object, not a URL
      }));
      console.log("Uploaded file:", file); // Debug the file upload
    }
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setEditedSubCategory((prevState) => ({
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

  const handleSaveClick = async () => {
    const isValid = await validateForm();
    if (!isValid) return;
    setIsSaving(true);

    console.log("Edited Subcategory Data:", editedSubCategory);

    const isActive = editedSubCategory.status === "Active";
    const updatedData = new FormData();
    updatedData.append("name", editedSubCategory.name);
    updatedData.append("description", editedSubCategory.description);
    updatedData.append("isActive", isActive);

    // Append icon (File)
    if (editedSubCategory.icon instanceof File) {
      updatedData.append("image", editedSubCategory.icon);
    } else if (
      editedSubCategory.icon &&
      typeof editedSubCategory.icon === "string"
    ) {
      updatedData.append("iconUrl", editedSubCategory.icon);
    }

    // Log FormData entries to debug
    for (let [key, value] of updatedData.entries()) {
      console.log(key, value);
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${BASE_URL}/api/subcategory/update/${editedSubCategory.id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Subcategory updated successfully", response.data);
      setSubCategory(response.data.data);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      console.error("Error updating subcategory", error);
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        logoutUser(); // Call logoutUser if 404 or 401 status code
      }
    }
  };

  if (loading || !subcategory) {
    return <LoadingSpinner />;
  }
  return (
    <Box padding={4} maxWidth={800} margin="auto">
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          View Subcategory Details
        </Typography>
        <CustomButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </CustomButton>
      </Box>
      <Divider sx={{ mb: 3 }} />

      {/* Content */}
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Subcategory Icon */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar
            src={imageUrl || subcategory.icon || "default_image_url"} // Use imageUrl for the preview, or the default image
            variant="rounded"
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
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "#1E40AF",
            },
          }}
        >
          <UploadIcon sx={{ fontSize: 40 }} />
          <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
        </IconButton>
        
          )}
        </Box>

        {/* Subcategory Name */}
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Subcategory Name:
          </Typography>
          {isEditing ? (
            <>
              <CustomInput
                value={editedSubCategory.name}
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
            <Typography>{subcategory.name}</Typography>
          )}
        </Box>

        {/* Description */}
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
                value={editedSubCategory.description}
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
            <Typography>{subcategory.description}</Typography>
          )}
        </Box>

        {/* Status */}
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
                value={editedSubCategory.status}
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
            <Typography>
              {subcategory.isActive ? "Active" : "Inactive"}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          {isEditing ? (
            <>
              <CustomButton
               
                onClick={handleSaveClick}
                endIcon={<SaveIcon />}
              
              >
                Save
              </CustomButton>
              <CustomButton
              variant="outlined"
                onClick={handleCancelClick}
                endIcon={<CancelIcon />}
            
              >
                Cancel
              </CustomButton>
            </>
          ) : (
            <CustomButton
              
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

export default ViewSubCategories;
