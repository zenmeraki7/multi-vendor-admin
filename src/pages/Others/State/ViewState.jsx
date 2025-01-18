import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

// Validation schema
const validationSchema = yup.object().shape({
  stateName: yup.string().required("State Name is required"),
  countryName: yup.string().required("Country Name is required"),
  stateCode: yup.string().required("State Code is required"),
  status: yup.string().required("Status is required"),
});

const ViewState = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    id: "1",
    stateName: "Kerala",
    countryName: "India",
    stateCode: "KL",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [editedState, setEditedState] = useState({ ...state });

  const handleEditClick = () => {
    setIsEditing(true);
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
    setTimeout(() => {
      setState({ ...editedState });
      setIsEditing(false);
      setIsSaving(false);
    }, 1000);
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
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
              <CustomSelect
                id="countryName"
                name="countryName"
                value={editedState.countryName}
                onChange={handleInputChange}
                label="Country Name"
                MenuItems={[
                  { value: "India", label: "India" },
                  { value: "United States", label: "United States" },
                ]}
                sx={{ width: "100%" }}
              />
              {errors.countryName && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.countryName}
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="body1">{state.countryName}</Typography>
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
      </Box>
    </Box>
  );
};

export default ViewState;
