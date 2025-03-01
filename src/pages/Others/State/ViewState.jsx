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
  stateName: yup.string().required("State name is required"),
  countryName: yup.string().required("Country name is required"),
  stateCode: yup.string().required("State code is required"),
  status: yup.string().required("Status is required"),
});

const ViewState = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [state, setState] = useState({
    stateName: "",
    countryName: "",
    stateCode: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [editedState, setEditedState] = useState({ ...state });
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

  // Fetch state details
  useEffect(() => {
    const fetchStateDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/states/admin?id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data?.data) {
          const stateData = {
            stateName: response.data.data.name,
            countryName: response.data.data.country._id,
            stateCode: response.data.data.code,
            status: response.data.data.isActive ? "Active" : "Inactive",
          };
          setState(stateData);
          setEditedState(stateData);
        }
      } catch (error) {
        console.error(
          "Error fetching state details:",
          error.response ? error.response.data : error.message
        );
        setNotification({
          open: true,
          message: "Failed to load state details. Please try again.",
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
    fetchStateDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedState({ ...state });
    setErrors({});
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(editedState, { abortEarly: false });
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
      const updatedStateData = {
        name: editedState.stateName,
        country: editedState.countryName,
        code: editedState.stateCode,
        isActive: editedState.status === "Active",
      };
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/states/update/${id}`,
        updatedStateData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success || response.status === 200) {
        setState({ ...editedState });
        setIsEditing(false);
        setNotification({
          open: true,
          message: "State updated successfully",
          severity: "success"
        });
      }
    } catch (error) {
      console.error(
        "Error updating state details:",
        error.response ? error.response.data : error.message
      );
      setNotification({
        open: true,
        message: "Failed to update state. Please try again.",
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
    setEditedState({ ...state });
    setIsEditing(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedState((prevState) => ({
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
            {isEditing ? "Edit State" : "View State"}
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
                {/* First Row: State Name and State Code */}
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      color="textSecondary" 
                      gutterBottom
                      fontWeight="500"
                    >
                      State Name {isEditing && "*"}
                    </Typography>
                    {isEditing ? (
                      <>
                        <CustomInput
                          id="state-name"
                          name="stateName"
                          placeholder="Enter state name"
                          value={editedState.stateName}
                          onChange={handleInputChange}
                          fullWidth
                        />
                        {errors.stateName && (
                          <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                            {errors.stateName}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {state.stateName}
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
                      State Code {isEditing && "*"}
                    </Typography>
                    {isEditing ? (
                      <>
                        <CustomInput
                          id="state-code"
                          name="stateCode"
                          placeholder="Enter state code"
                          value={editedState.stateCode}
                          onChange={handleInputChange}
                          fullWidth
                        />
                        {errors.stateCode && (
                          <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                            {errors.stateCode}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {state.stateCode}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                
                {/* Second Row: Country and Status */}
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
                            id="country-name"
                            name="countryName"
                            value={editedState.countryName}
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
                        {errors.countryName && (
                          <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
                            {errors.countryName}
                          </Typography>
                        )}
                      </>
                    ) : (
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {countries.find((country) => country._id === state.countryName)
                          ?.name ||
                          "Not available"}
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
                          value={editedState.status}
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
                          color: state.status === "Active" ? "success.main" : "text.secondary"
                        }}
                      >
                        {state.status}
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

export default ViewState;