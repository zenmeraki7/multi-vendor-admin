import React, { useState } from "react";
import { Box, Button, Typography, Avatar, IconButton, Grid, Alert } from "@mui/material";
import { Save } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../components/SharedComponents/CustomInput"; // Import CustomInput
import CustomSelect from "../../../components/SharedComponents/CustomSelect";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AddCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    type: "", // Added category type field
    description: "",
    iconUrl: "",
    status: true, // default to Active (true)
  });
  const [alertVisible, setAlertVisible] = useState(false); // State to manage alert visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategory((prev) => ({
          ...prev,
          iconUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save the category (you can connect to an API or manage state here)
    console.log("Saved Category:", category);

    // Show success alert after saving
    setAlertVisible(true);

    // Optionally, you can hide the alert after a few seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000); // Hides the alert after 3 seconds
  };

  return (
    <Box padding={2}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
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
        <Alert variant="filled" severity="success" mb={3} sx={{ width: "350px" }}>
          Category successfully added!
        </Alert>
      )}

      {/* Icon Upload and Category Fields in Two Columns */}
      <Grid container spacing={2} mb={3} mt={8} p={7}>
        {/* Image Column */}
        <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body1" mb={1}>
            <b>Upload Icon</b>
          </Typography> {/* Text for upload */}
          <Avatar
            variant="rounded"
            src={
              category.iconUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0ydDiYMYriRcJDdqE8NZxnRisT4XZmc7AQ&s"
            }
            sx={{ width: 100, height: 150, borderRadius: "8px" }}
          />
          <IconButton color="primary" component="label">
            <input type="file" accept="image/*" hidden onChange={handleIconUpload} />
            <UploadIcon style={{ fontSize: "40px" }} />
          </IconButton>
        </Grid>

        {/* Category Name, Type, Description, and Status Columns */}
        <Grid item xs={12} sm={6}>
          <Box display="flex" flexDirection="column" gap={2}>
          <CustomInput
              id="category-type"
              name="type"
              label="Category Type"
              placeholder="Enter category type"
              value={category.type}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
            />
            <CustomInput
              id="category-name"
              name="name"
              label="Category Name"
              placeholder="Enter category name"
              value={category.name}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
            />
         
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
            <CustomSelect
              id="status"
              value={category.status}
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

export default AddCategory;
