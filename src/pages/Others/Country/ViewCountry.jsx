import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
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

// Validation schema
const validationSchema = yup.object().shape({
  countryName: yup.string().required("Country Name is required"),
  countryCode: yup.string().required("Country Code is required"),
  status: yup.string().required("Status is required"),
});

const ViewCountry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(true);  // Loading state for API request

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch countries from the correct endpoint
        const countryResponse = await axios.get(`${BASE_URL}/api/countries/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCountries(countryResponse.data); // Store the list of countries
  
        // Fetch state data
        const stateResponse = await axios.get(`${BASE_URL}/api/states/admin?id=${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (stateResponse.data.success) {
          setState(stateResponse.data.data); // Set state data
          setEditedState(stateResponse.data.data); // Set initial editedState
        } else {
          console.error("API error: ", stateResponse.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error.response || error.message);
      }
    };
    
    fetchData();
  }, [id]);
  
  useEffect(() => {
    console.log(id);  // Check if the correct ID is passed from URL params
    const fetchCountryData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/countries/admin?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log(response.data);  // Check the response structure and data
  
        const fetchedCountry = {
          id: response.data._id,
          countryName: response.data.data.name,  // Mapping the 'name' from the API response
          countryCode: response.data.data.code,  // Mapping the 'code' from the API response
          status: response.data.data.isActive ? "Active" : "Inactive",
        };
  
        setCountry(fetchedCountry);
        setEditedCountry(fetchedCountry);
      } catch (error) {
        console.error("Error fetching country data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchCountryData();
  }, [id]);
  
  
  

  const handleEditClick = () => {
    setIsEditing(true);
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
          name: editedCountry.countryName,  // Mapping from frontend field to backend field
          code: editedCountry.countryCode,  // Mapping from frontend field to backend field
          isActive: editedCountry.status === "Active",  // Mapping the status to isActive boolean
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
  
      if (response.status === 200) {
        // Successfully updated, update the local state and stop editing
        setCountry({ ...editedCountry });
        setIsEditing(false);
        setIsSaving(false);
      }
    } catch (error) {
      console.error("Error updating country:", error);
      // Handle the error appropriately (e.g., display a notification)
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

  return (
    <Box padding={4} maxWidth={800} margin="auto">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          View Country Details
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
          Back
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Box display="flex" flexDirection="column" gap={3}>
        {isLoading ? (  // Display a loading spinner while data is being fetched
          <CircularProgress size={50} color="primary" />
        ) : (
          <>
            <Box sx={{ padding: 2 }}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Country Name:
              </Typography>
              {isEditing ? (
                <>
                  <CustomInput
                    value={editedCountry.countryName}
                    name="countryName"
                    onChange={handleInputChange}
                  />
                  {errors.countryName && (
                    <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                      {errors.countryName}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography variant="body1">{country.countryName}</Typography>
              )}
            </Box>

            <Box sx={{ padding: 2 }}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Country Code:
              </Typography>
              {isEditing ? (
                <>
                  <CustomInput
                    value={editedCountry.countryCode}
                    name="countryCode"
                    onChange={handleInputChange}
                  />
                  {errors.countryCode && (
                    <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                      {errors.countryCode}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography variant="body1">{country.countryCode}</Typography>
              )}
            </Box>

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
                    value={editedCountry.status}
                    onChange={handleInputChange}
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
                <Typography variant="body1">{country.status}</Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSaveClick}
                    disabled={isSaving}
                    endIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    sx={{
                      background: "linear-gradient(45deg, #556cd6, #19857b)",
                      color: "#fff",
                      minWidth: "100px",
                    }}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancelClick}
                    disabled={isSaving}
                    endIcon={<CancelIcon />}
                    sx={{
                      background: "linear-gradient(45deg, #FF0000, #FF7878)",
                      color: "#fff",
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditClick}
                  endIcon={<EditIcon />}
                  sx={{
                    background: "linear-gradient(45deg, #556cd6, #19857b)",
                    color: "#fff",
                  }}
                >
                  Edit
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ViewCountry;