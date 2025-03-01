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
  bankName: yup.string().required("Bank Name is required"),
  country: yup.string().required("Country is required"),
  status: yup.string().required("Status is required"),
});

const ViewBank = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [bank, setBank] = useState({
    bankName: "",
    country: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [editedBank, setEditedBank] = useState({ ...bank });
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/countries/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data?.data && Array.isArray(response.data.data)) {
          setCountries(response.data.data);
        }
      } catch (error) {
        console.error(
          "Error fetching countries:",
          error.response ? error.response.data : error.message
        );
        setNotification({
          open: true,
          message: "Failed to load countries. Please try again.",
          severity: "error"
        });
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 401)
        ) {
          logoutUser();
        }
      }
    };
    fetchCountries();
  }, []);

  // Fetch bank details
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/banks/admin?id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data?.data) {
          const bankData = {
            bankName: response.data.data.name,
            country: response.data.data.country._id,
            status: response.data.data.isActive ? "Active" : "Inactive",
          };
          setBank(bankData);
          setEditedBank(bankData);
        }
      } catch (error) {
        console.error(
          "Error fetching bank details:",
          error.response ? error.response.data : error.message
        );
        setNotification({
          open: true,
          message: "Failed to load bank details. Please try again.",
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
    fetchBankDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedBank({ ...bank });
    setErrors({});
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(editedBank, { abortEarly: false });
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
      const updatedBankData = {
        name: editedBank.bankName,
        country: editedBank.country,
        isActive: editedBank.status === "Active",
      };
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/banks/update/${id}`,
        updatedBankData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success || response.status === 200) {
        setBank({ ...editedBank });
        setIsEditing(false);
        setNotification({
          open: true,
          message: "Bank updated successfully",
          severity: "success"
        });
      }
    } catch (error) {
      console.error(
        "Error updating bank details:",
        error.response ? error.response.data : error.message
      );
      setNotification({
        open: true,
        message: "Failed to update bank. Please try again.",
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
    setEditedBank({ ...bank });
    setIsEditing(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBank((prevState) => ({
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
            {isEditing ? "Edit Bank" : "View Bank"}
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
                {/* Bank Name */}
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      color="textSecondary" 
                      gutterBottom
                      fontWeight="500"
                    >
                      Bank Name {isEditing && "*"}
                    </Typography>
                    {isEditing ? (
                      <>
                        <CustomInput
                          id="bank-name"
                          name="bankName"
                          placeholder="Enter bank name"
                          value={editedBank.bankName}
                          onChange={handleInputChange}
                          fullWidth
                        />
                        {errors.bankName && (
                          <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                            {errors.bankName}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {bank.bankName}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                
                {/* Country */}
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      color="textSecondary" 
                      gutterBottom
                      fontWeight="500"
                    >
                      Country {isEditing && "*"}
                    </Typography>
                    {isEditing ? (
                      <>
                        {countries.length > 0 ? (
                          <CustomSelect
                            id="country"
                            name="country"
                            value={editedBank.country}
                            onChange={handleInputChange}
                            placeholder="Select country"
                            MenuItems={countries.map((country) => ({
                              value: country._id,
                              label: country.name,
                            }))}
                            fullWidth
                          />
                        ) : (
                          <CircularProgress size={20} />
                        )}
                        {errors.country && (
                          <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                            {errors.country}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {countries.find((country) => country._id === bank.country)
                          ?.name ||
                          "Not available"}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                
                {/* Status */}
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
                          value={editedBank.status}
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
                          color: bank.status === "Active" ? "success.main" : "text.secondary"
                        }}
                      >
                        {bank.status}
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

export default ViewBank;