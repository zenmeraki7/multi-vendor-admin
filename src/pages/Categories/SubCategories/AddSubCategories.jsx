import React, { useState } from "react";
import { Box, Button, Typography, Avatar, IconButton, Grid, Alert, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Save } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../components/SharedComponents/CustomInput"; // Import CustomInput

function AddSubCategory() {
  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState({
    name: "",
    category: "",  // Added category field
    subcategory: "",
    description: "",
    iconUrl: "",
    status: true, 
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubcategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSubcategory((prev) => ({
          ...prev,
          iconUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save the subcategory (connect to API or manage state here)
    console.log("Saved Subcategory:", subcategory);

    // Show success alert after saving
    setAlertVisible(true);

    setTimeout(() => {
      setAlertVisible(false);
    }, 3000); 
  };

  return (
    <Box padding={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Add New Subcategory</Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          style={{ marginRight: "80px", background: "linear-gradient(45deg, #556cd6, #19857b)", color: "#fff" }}
        >
          Back
        </Button>
      </Box>

      {alertVisible && (
        <Alert variant="filled" severity="success" mb={3} sx={{ width: "350px" }}>
          Subcategory successfully added!
        </Alert>
      )}

      <Grid container spacing={2} mb={3} mt={8} p={7}>
        <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body1" mb={1}><b>Upload Icon</b></Typography>
          <Avatar
            variant="rounded"
            src={subcategory.iconUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0ydDiYMYriRcJDdqE8NZxnRisT4XZmc7AQ&s"}
            sx={{ width: 100, height: 150, borderRadius: "8px" }}
          />
          <IconButton color="primary" component="label">
            <input type="file" accept="image/*" hidden onChange={handleIconUpload} />
            <UploadIcon style={{ fontSize: "40px" }} />
          </IconButton>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box display="flex" flexDirection="column" gap={2}>
            <CustomInput
              id="category-name"
              name="name"
              label="Category Type"
              placeholder="Enter category type"
              value={subcategory.name}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
            />
            <CustomInput
              id="category"
              name="category"
              label="Category" 
              placeholder="Enter category"
              value={subcategory.category}  
              onChange={handleInputChange} 
              sx={{ width: "100%" }}
            />
            <CustomInput
              id="subcategory"
              name="subcategory"
              label="Subcategory Name"
              placeholder="Enter subcategory name"
              value={subcategory.subcategory}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
            />
            <CustomInput
              id="subcategory-description"
              name="description"
              label="Subcategory Description"
              placeholder="Enter subcategory description"
              value={subcategory.description}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={subcategory.status}
                onChange={handleInputChange}
                label="Status"
                name="status"
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" color="primary" onClick={handleSave} startIcon={<Save />}>
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default AddSubCategory;
