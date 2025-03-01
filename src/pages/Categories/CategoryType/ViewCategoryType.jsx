import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Paper,
  Alert,
  Snackbar,
  Grid,
  Container,
  useTheme,
  Avatar
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import UploadIcon from "@mui/icons-material/Upload";
import * as yup from "yup";
import CustomInput from "../../../components/SharedComponents/CustomInput";
import CustomSelect from "../../../components/SharedComponents/CustomSelect";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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

const ViewCategoryType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [category, setCategory] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editedCategory, setEditedCategory] = useState({
    name: "",
    description: "",
    status: "Active",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });

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
      .get(`${BASE_URL}/api/category-type/all-admin?id=${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        if (!data) {
          console.error("No data found for this category");
          setNotification({
            open: true,
            message: "No category found with the provided ID.",
            severity: "error"
          });
        }
        if (data) {
          setCategory(data);
          setEditedCategory({
            id: data._id,
            name: data.name,
            description: data.description,
            status: data.isActive ? "Active" : "Inactive",
          });
          setImageUrl(data.icon || "");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching category:",
          error.response ? error.response.data : error.message
        );
        setNotification({
          open: true,
          message: "Failed to load category details. Please try again.",
          severity: "error"
        });
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 401)
        ) {
          logoutUser();
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

  const handleCancelClick = () => {
    setEditedCategory({
      id: category._id,
      name: category.name,
      description: category.description,
      status: category.isActive ? "Active" : "Inactive",
    });
    setImageUrl(category.icon || "");
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
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setEditedCategory((prevState) => ({
        ...prevState,
        icon: file,
      }));
    }
  };

  const handleSaveClick = async () => {
    const isValid = await validateForm();
    if (!isValid) return;
    
    setIsSaving(true);
    
    const isActive = editedCategory.status === "Active";
    const updatedData = new FormData();
    updatedData.append("name", editedCategory.name);
    updatedData.append("description", editedCategory.description);
    updatedData.append("isActive", isActive);

    // Append icon (File)
    if (editedCategory.icon instanceof File) {
      updatedData.append("image", editedCategory.icon);
    } else if (
      editedCategory.icon &&
      typeof editedCategory.icon === "string"
    ) {
      updatedData.append("iconUrl", editedCategory.icon);
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${BASE_URL}/api/category-type/update/${editedCategory.id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );
      setCategory(response.data.data);
      setIsEditing(false);
      setNotification({
        open: true,
        message: "Category updated successfully",
        severity: "success"
      });
    } catch (error) {
      console.error(
        "Error updating category:",
        error.response ? error.response.data : error.message
      );
      setNotification({
        open: true,
        message: "Failed to update category. Please try again.",
        severity: "error"
      });
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        logoutUser();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading) {
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
            {isEditing ? "Edit Category Type" : "View Category Type"}
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* Image Upload/Display Section */}
              <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                <Avatar
                  src={imageUrl || ""}
                  variant="rounded"
                  sx={{
                    width: 200,
                    height: 200,
                    mb: 2,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: 2
                  }}
                />
                
                {isEditing && (
                  <CustomButton
                    component="label"
                    variant="contained"
                    color="primary"
                    startIcon={<UploadIcon />}
                    sx={{ mt: 1 }}
                  >
                    Upload Image
                    <input 
                      type="file" 
                      accept="image/*" 
                      hidden 
                      onChange={handleImageUpload} 
                    />
                  </CustomButton>
                )}
              </Box>
              
              <Grid container spacing={3}>
                {/* First Row: Category Name and Status */}
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      color="textSecondary" 
                      gutterBottom
                      fontWeight="500"
                    >
                      Category Name {isEditing && "*"}
                    </Typography>
                    {isEditing ? (
                      <>
                        <CustomInput
                          id="name"
                          name="name"
                          placeholder="Enter category name"
                          value={editedCategory.name}
                          onChange={handleInputChange}
                          fullWidth
                        />
                        {errors.name && (
                          <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                            {errors.name}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {category.name}
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
                      Status {isEditing && "*"}
                    </Typography>
                    {isEditing ? (
                      <>
                        <CustomSelect
                          id="status"
                          name="status"
                          value={editedCategory.status}
                          onChange={handleInputChange}
                          MenuItems={[
                            { value: "Active", label: "Active" },
                            { value: "Inactive", label: "Inactive" },
                          ]}
                          fullWidth
                        />
                        {errors.status && (
                          <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                            {errors.status}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 500,
                          color: category.isActive ? "success.main" : "text.secondary"
                        }}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                
                {/* Second Row: Description */}
                <Grid item xs={12}>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      color="textSecondary" 
                      gutterBottom
                      fontWeight="500"
                    >
                      Description {isEditing && "*"}
                    </Typography>
                    {isEditing ? (
                      <>
                        <CustomInput
                          id="description"
                          name="description"
                          placeholder="Enter description"
                          value={editedCategory.description}
                          onChange={handleInputChange}
                          fullWidth
                          multiline
                          rows={4}
                        />
                        {errors.description && (
                          <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                            {errors.description}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {category.description}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" mt={6}>
            {isEditing ? (
              <>
                <CustomButton
                  onClick={handleSaveClick}
                  disabled={isSaving}
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 1,
                    fontWeight: 500,
                    mr: 2
                  }}
                >
                  {isSaving ? "Saving..." : "Save"}
                </CustomButton>
                <CustomButton
                  onClick={handleCancelClick}
                  disabled={isSaving}
                  variant="outlined"
                  size="large"
                  startIcon={<CancelIcon />}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 1,
                    fontWeight: 500
                  }}
                >
                  Cancel
                </CustomButton>
              </>
            ) : (
              <CustomButton 
                onClick={handleEditClick} 
                variant="contained"
                color="primary"
                size="large"
                startIcon={<EditIcon />}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  borderRadius: 1,
                  fontWeight: 500
                }}
              >
                Edit
              </CustomButton>
            )}
          </Box>
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
};

export default ViewCategoryType;