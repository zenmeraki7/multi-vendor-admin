import React, { useState, useEffect } from "react";
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
  useTheme
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
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
  countryName: yup.string().required("Country Name is required"),
  countryCode: yup.string().required("Country Code is required"),
  status: yup.string().required("Status is required"),
});

const ViewCountry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [country, setCountry] = useState({
    id: "",
    countryName: "",
    countryCode: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [editedCountry, setEditedCountry] = useState({ ...country });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/countries/admin?id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fetchedCountry = {
          id: response.data._id,
          countryName: response.data.data.name,
          countryCode: response.data.data.code,
          status: response.data.data.isActive ? "Active" : "Inactive",
        };

        setCountry(fetchedCountry);
        setEditedCountry(fetchedCountry);
      } catch (error) {
        console.error(
          "Error fetching country data:", 
          error.response ? error.response.data : error.message
        );
        setNotification({
          open: true,
          message: "Failed to load country details. Please try again.",
          severity: "error"
        });
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 401)
        ) {
          logoutUser();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedCountry({ ...country });
    setErrors({});
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(editedCountry, { abortEarly: false });
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

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/countries/update/${id}`,
        {
          name: editedCountry.countryName,
          code: editedCountry.countryCode,
          isActive: editedCountry.status === "Active",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setCountry({ ...editedCountry });
        setIsEditing(false);
        setNotification({
          open: true,
          message: "Country updated successfully",
          severity: "success"
        });
      }
    } catch (error) {
      console.error(
        "Error updating country:", 
        error.response ? error.response.data : error.message
      );
      setNotification({
        open: true,
        message: "Failed to update country. Please try again.",
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

  const handleCancelClick = () => {
    setEditedCountry({ ...country });
    setIsEditing(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCountry((prevState) => ({
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
            {isEditing ? "Edit Country" : "View Country"}
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
              <Grid container spacing={3}>
                {/* First Row: Country Name and Country Code */}
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      color="textSecondary" 
                      gutterBottom
                      fontWeight="500"
                    >
                      Country Name {isEditing && "*"}
                    </Typography>
                    {isEditing ? (
                      <>
                        <CustomInput
                          id="country-name"
                          name="countryName"
                          placeholder="Enter country name"
                          value={editedCountry.countryName}
                          onChange={handleInputChange}
                          fullWidth
                        />
                        {errors.countryName && (
                          <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                            {errors.countryName}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {country.countryName}
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
                      Country Code {isEditing && "*"}
                    </Typography>
                    {isEditing ? (
                      <>
                        <CustomInput
                          id="country-code"
                          name="countryCode"
                          placeholder="Enter country code"
                          value={editedCountry.countryCode}
                          onChange={handleInputChange}
                          fullWidth
                        />
                        {errors.countryCode && (
                          <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                            {errors.countryCode}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {country.countryCode}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                
                {/* Second Row: Status */}
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
                          value={editedCountry.status}
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
                          color: country.status === "Active" ? "success.main" : "text.secondary"
                        }}
                      >
                        {country.status}
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

export default ViewCountry;