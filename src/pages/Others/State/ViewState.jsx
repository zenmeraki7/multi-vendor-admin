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
  stateName: yup.string().required("State Name is required"),
  countryName: yup.string().required("Country Name is required"),
  stateCode: yup.string().required("State Code is required"),
  status: yup.string().required("Status is required"),
});

const ViewState = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        console.error("Error fetching countries:", error.response ? error.response.data : error.message);
      }
    };
    fetchCountries();
  }, []);

  // Fetch state details
  useEffect(() => {
    const fetchStateDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/states/admin?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data?.data) {
          setState({
            stateName: response.data.data.name,
            countryName: response.data.data.country._id,
            stateCode: response.data.data.code,
            status: response.data.data.isActive ? "Active" : "Inactive",});
        }
      } catch (error) {
        console.error("Error fetching state details:", error.response ? error.response.data : error.message);
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
    const updatedStateData={
      name: editedState.stateName,
      country: editedState.countryName,
      code: editedState.stateCode,
      isActive: editedState.status === "Active",
    }
   const token = localStorage.getItem("token");
   const response = await axios.put(`${BASE_URL}/api/states/update/${id}`,updatedStateData,{
    headers: {
      authorization: `Bearer ${token}`,
    },
   });
console.log('Response: ' + response);

if (response.data?.success|| response.status===200) {
  setState({...editedState})
  setIsEditing(false);
  setIsSaving(false);
}
   } catch (error) {
    console.error("Error updating bank details:", error.response ? error.response.data : error.message);
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

  return (
    <Box padding={4} maxWidth={800} margin="auto">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          View State Details
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
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            State Name:
          </Typography>
          {isEditing ? (
            <>
              <CustomInput
                value={editedState.stateName}
                name="stateName"
                onChange={handleInputChange}
              />
              {errors.stateName && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.stateName}
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="body1">{state.stateName}</Typography>
          )}
        </Box>

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
      {countries.length > 0 ? (
        <CustomSelect
          id="country"
          name="countryName"
          value={editedState.countryName}
          onChange={handleInputChange}
          label="Country"
          MenuItems={countries.map((country) => ({
            value: country._id,
            label: country.name,
          }))}
        />
      ) : (
        <CircularProgress size={20} />
      )}
      {errors.countryName && (
        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
          {errors.countryName}
        </Typography>
      )}
    </>
  ) : (
    <Typography variant="body1">
      {countries.find((country) => country._id === state.countryName)?.name || state.countryName || "Not available"}
    </Typography>
  )}
</Box>


        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            State Code:
          </Typography>
          {isEditing ? (
            <>
              <CustomInput
                value={editedState.stateCode}
                name="stateCode"
                onChange={handleInputChange}
              />
              {errors.stateCode && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.stateCode}
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="body1">{state.stateCode}</Typography>
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
                value={editedState.status}
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
            <Typography variant="body1">{state.status}</Typography>
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
                endIcon={
                  isSaving ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SaveIcon />
                  )
                }
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
              variant="outlined"
              color="primary"
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
    </Box>
  );
};

export default ViewState;
