import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { styled } from "@mui/system";
import { TextField } from "@mui/material";
import { BASE_URL } from "../../utils/baseUrl";
import { toast } from "react-hot-toast";

// Custom InputField styled component
const InputField = styled(TextField)({
  marginBottom: "10px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "border 0.3s ease, background 0.3s ease",
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    backgroundColor: "#e3f2fd",
    borderColor: "#1e88e5",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#1e88e5",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#bbdefb",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1e88e5",
  },
});

const CustomSelect = styled(Select)(({ theme }) => ({
  marginBottom: "10px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "border 0.3s ease, background 0.3s ease",
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    backgroundColor: "#e3f2fd",
    borderColor: "#1e88e5",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#1e88e5",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#bbdefb",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1e88e5",
  },
  "& .MuiSelect-icon": {
    color: "#1e88e5", // Change the dropdown icon color
  },
}));

const PersonalDetails = ({ handleNext, setEmail }) => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNum: "",
    address: "",
    zipCode: null,
    city: "",
    state: "",
    country: "India",
    companyName: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch countries
    axios
      .get(`${BASE_URL}/api/countries`)
      .then((response) => setCountries(response.data))
      .catch((err) => console.error("Error fetching countries:", err));

    // Fetch states based on the default country (India)
    axios
      .get(`${BASE_URL}/api/states?country=India`)
      .then((response) => setStates(response.data))
      .catch((err) => console.error("Error fetching states:", err));
  }, []);
  console.log(formValues);
  const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("Full name is required."),
    email: Yup.string()
      .email("Please provide a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Password is required."),
    phoneNum: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
      .required("Phone number is required."),
    address: Yup.string().required("Address is required."),
    zipCode: Yup.number()
      .positive("Zip code must be a valid number.")
      .required("Zip code is required."),
    city: Yup.string().required("City is required."),
    state: Yup.string().required("State is required."),
    country: Yup.string().required("Country is required."),
    companyName: Yup.string().trim().required("Company name is required."),
  });

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message

    try {
      // Validation inside submit
      await validationSchema.validate(formValues, { abortEarly: false });
      setFormErrors({}); // Reset form errors

      // If validation passes, make the API call
      const response = await axios.post(
        "http://localhost:5000/api/vendor/register",
        formValues
      ); // Replace with your backend API
      console.log(response.data.message);

      // Show success toast
      toast.success(response.data.message);
      setEmail(formValues.email);
      handleNext(); // Proceed to next step after successful registration
    } catch (err) {
      if (err.name === "ValidationError") {
        const errorMessages = err.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setFormErrors(errorMessages);
      } else {
        setError(err.response?.data?.message || "An error occurred.");
        // Show error toast
        toast.error(err.response?.data?.message || "An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <InputField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.fullName}
            helperText={formErrors.fullName}
          />
          <InputField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.email}
            helperText={formErrors.email}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <InputField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.password}
            helperText={formErrors.password}
          />
          <InputField
            fullWidth
            label="Phone Number"
            name="phoneNum"
            value={formValues.phoneNum}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.phoneNum}
            helperText={formErrors.phoneNum}
          />
        </Box>
        <InputField
          fullWidth
          label="Address"
          name="address"
          value={formValues.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formErrors.address}
          helperText={formErrors.address}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <InputField
            fullWidth
            type="number"
            label="Zip Code"
            name="zipCode"
            value={formValues.zipCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.zipCode}
            helperText={formErrors.zipCode}
          />
          <InputField
            fullWidth
            label="City"
            name="city"
            value={formValues.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formErrors.city}
            helperText={formErrors.city}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth error={!!formErrors.state}>
            <InputLabel>State</InputLabel>
            <CustomSelect
              label="State"
              name="state"
              value={formValues.state}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {states.map((state) => (
                <MenuItem key={state._id} value={state._id}>
                  {state.name}
                </MenuItem>
              ))}
            </CustomSelect>
          </FormControl>
          <FormControl fullWidth error={!!formErrors.country}>
            <InputLabel>Country</InputLabel>
            <CustomSelect
              label="Country"
              name="country"
              value={formValues.country}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {countries.map((country) => (
                <MenuItem key={country._id} value={country._id}>
                  {country.name}
                </MenuItem>
              ))}
            </CustomSelect>
          </FormControl>
        </Box>
        <InputField
          fullWidth
          label="Company Name"
          name="companyName"
          value={formValues.companyName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formErrors.companyName}
          helperText={formErrors.companyName}
        />
      </Stack>
      {error && <Box sx={{ color: "red", mt: 2 }}>{error}</Box>}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </Box>
    </form>
  );
};

export default PersonalDetails;
