import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Chip,
  Button,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save"; // Import SaveIcon
import { useLocation, useNavigate } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import IconButton from "@mui/material/IconButton"; // Correct import
import CustomInput from "../../../components/SharedComponents/CustomInput"; // Import CustomInput

function ViewCategoryType() {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state; // Receive the category data via state

  const [imageUrl, setImageUrl] = useState(category.iconUrl); // Store the image URL
  const [isImageSelected, setIsImageSelected] = useState(false); // To track if image is selected

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file); // Create a URL for the uploaded image
      setImageUrl(newImageUrl); // Update the avatar with the new image
      setIsImageSelected(true); // Mark the image as selected
    }
  };

  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [editedCategory, setEditedCategory] = useState({
    id: category.id,
    name: category.name,
    description: category.description,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Logic to save changes (e.g., send the updated data to the server)
    setIsEditing(false);
    console.log("Updated Category:", editedCategory);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!category) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          No category data found.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          <ArrowBackIcon />
        </Button>
      </Box>
    );
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
          View Category Type
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          style={{
            background: "linear-gradient(45deg, #556cd6, #19857b)",
            color: "#fff",
          }}
        >
          <ArrowBackIcon />
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />

      {/* Document Content */}
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Category Icon */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar
            src={imageUrl}
            variant="rounded"
            sx={{
              width: 400,
              height: 450,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              borderRadius: "15px", // Soft rounded corners
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for hover effects
            }}
          />
          <IconButton
            color="primary"
            component="label"
            sx={{
              background: "linear-gradient(45deg, #556cd6, #19857b)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "4px",
              height: "40px",
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
        </Box>

        {/* Category ID */}
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Category ID:
          </Typography>
          <CustomInput
            value={editedCategory.id}
            name="id"
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </Box>

        {/* Category Name */}
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Category Name:
          </Typography>
          <CustomInput
            value={editedCategory.name}
            name="name"
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
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
          <CustomInput
            value={editedCategory.description}
            name="description"
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
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
          <Chip
            label={category.status ? "Active" : "Inactive"}
            color={category.status ? "success" : "error"}
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "1rem",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          />
        </Box>
      </Box>

      {/* Actions */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={isEditing ? handleSaveClick : handleEditClick}
          startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          sx={{
            background: "linear-gradient(45deg, #556cd6, #19857b)",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            padding: "10px 20px",
            fontSize: "1rem",
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </Box>
    </Box>
  );
}

export default ViewCategoryType;
