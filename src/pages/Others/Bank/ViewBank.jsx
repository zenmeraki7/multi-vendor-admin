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
  bankName: yup.string().required("Bank Name is required"),
  country: yup.string().required("Country is required"),
  status: yup.string().required("Status is required"),
});

const ViewBank = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bank, setBank] = useState({
    bankName: "",
    country: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [editedBank, setEditedBank] = useState({ ...bank });
  const [countries, setCountries] = useState([]); // State to store fetched countries
  const [isLoading, setIsLoading] = useState(true); // Loading state for bank details

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/countries/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data?.data && Array.isArray(response.data.data)) {
          setCountries(response.data.data);  // Set countries list
        }
      } catch (error) {
        console.error("Error fetching countries:", error.response ? error.response.data : error.message);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    // Fetch bank details from API
    const fetchBankDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/banks/admin?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBank({
          bankName: response.data.data.name,
          country: response.data.data.country._id, // Use country._id here instead of country.name
          status: response.data.data.isActive ? "Active" : "Inactive",
        });
        setEditedBank(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching bank details", error);
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
        name: editedBank.bankName,  // Map bankName to name
        country: editedBank.country,  // Ensure this is the Country ObjectId (not name)
        isActive: editedBank.status === 'Active',  // Convert status to boolean isActive
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

      console.log('Response:', response);  // Log the full response to inspect it

      // Ensure the correct condition is used to check success
      if (response.data?.success || response.status === 200) {
        setBank({ ...editedBank }); // Update state with the new bank details
        setIsEditing(false);
        setIsSaving(false);
      } else {
        throw new Error("Failed to update bank details.");
      }
    } catch (error) {
      console.error("Error updating bank details:", error.response ? error.response.data : error.message);
      setIsSaving(false); // Stop saving state if error occurs
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

  return (
    <Box padding={4} maxWidth={800} margin="auto">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          View Bank Details
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
            Bank Name:
          </Typography>
          {isEditing ? (
            <>
              <CustomInput
                value={editedBank.bankName}
                name="bankName"
                onChange={handleInputChange}
              />
              {errors.bankName && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.bankName}
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="body1">{bank.bankName}</Typography>
          )}
        </Box>

        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Country:
          </Typography>
          {isLoading ? (
            <CircularProgress size={20} />
          ) : isEditing ? (
            <>
              {countries.length > 0 ? (
                <CustomSelect
                  id="country"
                  name="country"
                  value={editedBank.country} // This will be the country ID
                  onChange={handleInputChange}
                  label="Country"
                  MenuItems={countries.map((country) => ({
                    value: country._id, // The unique identifier for the country
                    label: country.name, // The country name to display in the dropdown
                  }))}
                />
              ) : (
                <CircularProgress size={20} />
              )}
              {errors.country && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {errors.country}
                </div>
              )}
            </>
          ) : (
            <Typography variant="body1">
              {countries.find((country) => country._id === bank.country)?.name || bank.country}
            </Typography>
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
                value={editedBank.status}
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
            <Typography variant="body1">{bank.status}</Typography>
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
                endIcon={<CancelIcon />}
                sx={{
                  color: "#f44336",
                  minWidth: "100px",
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
              endIcon={<EditIcon />}
              sx={{
                background: "linear-gradient(45deg, #556cd6, #19857b)",
                color: "#fff",
                minWidth: "100px",
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

export default ViewBank;
