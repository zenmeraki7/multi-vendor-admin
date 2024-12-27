import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Divider,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import {
  Dashboard ,
  AddShoppingCart ,
  Assignment,
  Settings,
  Logout,
} from "@mui/icons-material";

const SellerPro = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    companyName: "",
    website: "",
    panNumber: "",
    gstinNumber: "",
    gstinDocument: null,
    panDocument: null,
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    bankDocument: null,
    companyLogo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = () => {
    console.log("Form Submitted: ", formData);
    alert("Details Saved Successfully");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" , margin:'20px' }}>
      {/* Sidebar */}
      
      <Box
        sx={{
          width: "250px",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List>
        <ListItem button>
  <ListItemIcon>
    <Dashboard />
  </ListItemIcon>
  <ListItemText primary="DashBoard" />
</ListItem>
          <ListItem button>
  <ListItemIcon>
    <AddShoppingCart />
  </ListItemIcon>
  <ListItemText primary="AddProduct" />
</ListItem>
<ListItem button>
  <ListItemIcon>
    <Assignment />
  </ListItemIcon>
  <ListItemText primary="Orders" />
</ListItem>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Seller Profile
        </Typography>

        <Box sx={{ display: "flex", gap: 3, marginBottom: "30px" }}>
          {/* Company Logo Section */}
          <Paper sx={{ 
            padding: "20px", 
            width: "300px", 
            height: "fit-content",
            border: "2px solid black",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Company Logo
            </Typography>
            <Divider sx={{ marginBottom: "20px" }} />
            <Avatar
              src={formData.companyLogo ? URL.createObjectURL(formData.companyLogo) : ""}
              alt="Company Logo"
              sx={{ 
                width: 150, 
                height: 150, 
                margin: "0 auto 20px",
                bgcolor: "#f5f5f5"
              }}
            />
            <Button 
              variant="contained" 
              component="label" 
              fullWidth
              sx={{ 
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "#333"
                }
              }}
            >
              Choose Logo
              <input
                hidden
                type="file"
                name="companyLogo"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Button>
            {formData.companyLogo && (
              <Typography variant="body2" sx={{ mt: 2, color: "green" }}>
                Logo selected: {formData.companyLogo.name}
              </Typography>
            )}
          </Paper>

          {/* Personal Details */}
          <Box sx={{ flexGrow: 1, padding: "20px",  border: "2px solid black",
            borderRadius: "8px",}}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Personal Details
            </Typography>
            <Divider sx={{ marginBottom: "20px" }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Document Details */}
        <Box sx={{ marginBottom: "30px", padding: "20px", border: "2px solid black", borderRadius: "8px" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Documents
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="PAN Number"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" component="label" style={{ backgroundColor: "black" }}>
                Upload PAN Document
                <input hidden type="file" name="panDocument" onChange={handleFileChange} />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GSTIN Number"
                name="gstinNumber"
                value={formData.gstinNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" component="label" style={{ backgroundColor: "black" }}>
                Upload GSTIN Document
                <input hidden type="file" name="gstinDocument" onChange={handleFileChange} />
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Bank Details */}
        <Box sx={{ marginBottom: "30px", padding: "20px", border: "2px solid black", borderRadius: "8px" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Bank Details
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Holder Name"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Number"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Name"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" style={{ backgroundColor: "black" }}>
                Upload Bank Document
                <input hidden type="file" name="bankDocument" onChange={handleFileChange} />
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Save Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ backgroundColor: "black" , marginBottom: "20px"}}
          >
            Save Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SellerPro;