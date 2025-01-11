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
import CustomInput from "../../../components/SharedComponents/CustomInput";
import CustomSelect from "../../../components/SharedComponents/CustomSelect";
import { BASE_URL } from "../../../utils/baseUrl";

function ViewCategoryType() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [imageUrl, setImageUrl] = useState("default_image_url");
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState({
    id: "",
    name: "",
    description: "",
    status: "",
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

    axios
      .get(`${BASE_URL}/api/category-type/all-admin?id=${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        }
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
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log("Updated Category:", editedCategory);
  };

  const handleCancelClick = () => {
    // Reset the edited category to original values
    setEditedCategory({
      id: category._id,
      name: category.name,
      description: category.description,
      status: category.isActive ? "Active" : "Inactive",
    });
    setImageUrl(category.icon || "default_image_url");
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
    }
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setEditedCategory((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  if (!category) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Loading category data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box padding={4} maxWidth={800} margin="auto">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          View Category Type
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
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Box display="flex" flexDirection="column" gap={3}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar
            src={imageUrl}
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
              color="primary"
              component="label"
              sx={{
                background: "linear-gradient(45deg, #556cd6, #19857b)",
                color: "#fff",
              }}
            >
              <UploadIcon sx={{ fontSize: 40 }} />
              <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </IconButton>
          )}
        </Box>

        <Box sx={{ padding: 2 }}>
          <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: "bold", mb: 1 }}>
            Category Name:
          </Typography>
          {isEditing ? (
            <CustomInput
              value={editedCategory.name}
              name="name"
              onChange={handleInputChange}
            />
          ) : (
            <Typography variant="body1">{category.name}</Typography>
          )}
        </Box>

        <Box sx={{ padding: 2 }}>
          <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: "bold", mb: 1 }}>
            Description:
          </Typography>
          {isEditing ? (
            <CustomInput
              value={editedCategory.description}
              name="description"
              onChange={handleInputChange}
            />
          ) : (
            <Typography variant="body1">{category.description}</Typography>
          )}
        </Box>

        <Box sx={{ padding: 2 }}>
          <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: "bold", mb: 1 }}>
            Status:
          </Typography>
          {isEditing ? (
            <CustomSelect
              id="status"
              value={editedCategory.status}
              onChange={handleStatusChange}
              label="Status"
              MenuItems={["Active", "Inactive"]}
            />
          ) : (
            <Chip
              label={category.isActive ? "Active" : "Inactive"}
              color={category.isActive ? "success" : "error"}
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "1rem",
                padding: "0.5rem",
                borderRadius: "4px",
              }}
            />
          )}
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" mt={4} gap={2}>
        {isEditing ? (
          <>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSaveClick}
              startIcon={<SaveIcon />}
              sx={{
                background: "linear-gradient(45deg, #556cd6, #19857b)",
                color: "#fff",
              }}
            >
              Save 
            </Button>
            <Button
            sx={{  background: "linear-gradient(45deg, #FF0000, #FF7878)",
              color: "#fff",}}
              variant="contained"
              size="large"
              onClick={handleCancelClick}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleEditClick}
            startIcon={<EditIcon />}
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
  );
}

export default ViewCategoryType;