import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import CustomInput from "../../components/SharedComponents/CustomInput";
import CustomSelect from "../../components/SharedComponents/CustomSelect";
import CustomButton from "../../components/SharedComponents/CustomButton";
import { BASE_URL } from "../../utils/baseUrl";

// validation schema
const schema = yup.object().shape({
  sellerName: yup.string().required("Seller Name is required"),
  sellerShopName: yup.string().required("Shop Name is required"),
  sellerEmail: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  sellerContact: yup.string().required("Contact is required"),
  storeAddress: yup.string().required("Store Address is required"),
  sellerCity: yup.string().required("City is required"),
  sellerZipcode: yup.string().required("Zipcode is required"),
  country: yup.string().required("Country is required"),
  sellerState: yup.string().required("State is required"),
  businessType: yup.string().required("Business Type is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  storeDescription: yup.string(),
  sellerDescription: yup.string(),
  sellerPolicy: yup.string(),
});

const AddSeller = () => {
  // Form state
  const [formData, setFormData] = useState({
    sellerName: "",
    sellerShopName: "",
    sellerEmail: "",
    sellerContact: "",
    storeAddress: "",
    sellerCity: "",
    sellerZipcode: "",
    country: "",
    sellerState: "",
    businessType: "",
    password: "",
    confirmPassword: "",
    storeDescription: "",
    sellerDescription: "",
    sellerPolicy: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Other states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);

  console.log(formData);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch countries
        const countriesRes = await axios.get(
          `${BASE_URL}/api/countries`,
          config
        );
        setCountries(countriesRes.data);

        // Fetch business types
        const businessTypesRes = await axios.get(
          `${BASE_URL}/api/business-type/all`,
          config
        );
        setBusinessTypes(businessTypesRes?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (!formData.country || !countries.length) return;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/states?countryId=${formData.country}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, [formData.country, countries]);

  // Form validation function
  const validateForm = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      return {};
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      return validationErrors;
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle rich text editor changes
  const handleQuillChange = (content, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: content,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // API call to add seller
  const addSeller = async (sellerData, token) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/vendor/add-vendor`,
        sellerData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error adding seller:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.message || "Failed to add seller.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = await validateForm();
    setErrors(validationErrors);

    // Check if there are any errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login first");

      const submitData = {
        fullName: formData.sellerName,
        companyName: formData.sellerShopName,
        email: formData.sellerEmail,
        phoneNum: formData.sellerContact,
        address: formData.storeAddress,
        city: formData.sellerCity,
        zipCode: formData.sellerZipcode,
        country: formData.country,
        state: formData.sellerState,
        businessType: formData.businessType,
        password: formData.password,
        storeDescription: formData.storeDescription,
        sellerDescription: formData.sellerDescription,
        sellerPolicy: formData.sellerPolicy,
      };

      await addSeller(submitData, token);
      alert("Seller added successfully!");

      // Reset form
      setFormData({
        sellerName: "",
        sellerShopName: "",
        sellerEmail: "",
        sellerContact: "",
        storeAddress: "",
        sellerCity: "",
        sellerZipcode: "",
        country: "",
        sellerState: "",
        businessType: "",
        password: "",
        confirmPassword: "",
        storeDescription: "",
        sellerDescription: "",
        sellerPolicy: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message || error.message || "Failed to add seller"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add Seller</h2>
      <p>Here you can add Sellers to your Store.</p>
      <Form onSubmit={handleSubmit}>
        <fieldset className="border p-4 mb-4">
          <legend className="w-auto px-2">Seller Details</legend>
          <p>Enter Seller Details You Want To Add.</p>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerName">
              <Form.Label>Seller Name *</Form.Label>
              <CustomInput
                type="text"
                name="sellerName"
                onChange={handleChange}
                value={formData.sellerName}
                placeholder="Enter Seller Name Here"
              />
              {errors.sellerName && (
                <p style={{ color: "red" }}>{errors.sellerName}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerShopName">
              <Form.Label>Seller Shop Name *</Form.Label>
              <CustomInput
                type="text"
                name="sellerShopName"
                onChange={handleChange}
                value={formData.sellerShopName}
                placeholder="Enter Seller Shop Name Here"
              />
              {errors.sellerShopName && (
                <p style={{ color: "red" }}>{errors.sellerShopName}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerEmail">
              <Form.Label>Email *</Form.Label>
              <CustomInput
                type="email"
                name="sellerEmail"
                onChange={handleChange}
                value={formData.sellerEmail}
                placeholder="Enter Seller's Email"
              />
              {errors.sellerEmail && (
                <p style={{ color: "red" }}>{errors.sellerEmail}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="storeAddress">
              <Form.Label>Store Address *</Form.Label>
              <CustomInput
                type="text"
                name="storeAddress"
                onChange={handleChange}
                value={formData.storeAddress}
                placeholder="Enter Seller's Store Address"
              />
              {errors.storeAddress && (
                <p style={{ color: "red" }}>{errors.storeAddress}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerCity">
              <Form.Label>City *</Form.Label>
              <CustomInput
                type="text"
                name="sellerCity"
                onChange={handleChange}
                value={formData.sellerCity}
                placeholder="Enter Seller's City"
              />
              {errors.sellerCity && (
                <p style={{ color: "red" }}>{errors.sellerCity}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerCountry">
              <Form.Label>Country *</Form.Label>
              <CustomSelect
                label="Country"
                name="country"
                value={formData.country || ""}
                onChange={handleSelectChange}
                MenuItems={[
                  { value: "", label: "Select Country" },
                  ...countries.map((item) => ({
                    value: item._id,
                    label: item.name,
                  })),
                ]}
              />
              {errors.country && (
                <p style={{ color: "red" }}>{errors.country}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerState">
              <Form.Label>State *</Form.Label>
              <CustomSelect
                label="State"
                name="sellerState"
                value={formData.sellerState || ""}
                onChange={handleSelectChange}
                MenuItems={[
                  { value: "", label: "Select State" },
                  ...states.map((item) => ({
                    value: item._id,
                    label: item.name,
                  })),
                ]}
              />
              {errors.sellerState && (
                <p style={{ color: "red" }}>{errors.sellerState}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="businessType">
              <Form.Label>Business Type *</Form.Label>
              <CustomSelect
                label="Business Structure"
                name="businessType"
                value={formData.businessType || ""}
                onChange={handleSelectChange}
                MenuItems={[
                  { value: "", label: "Select Business Type" },
                  ...businessTypes.map((item) => ({
                    value: item._id,
                    label: item.name,
                  })),
                ]}
              />
              {errors.businessType && (
                <p style={{ color: "red" }}>{errors.businessType}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerZipcode">
              <Form.Label>Zipcode *</Form.Label>
              <CustomInput
                type="text"
                name="sellerZipcode"
                onChange={handleChange}
                value={formData.sellerZipcode}
                placeholder="Enter Seller's Zipcode"
              />
              {errors.sellerZipcode && (
                <p style={{ color: "red" }}>{errors.sellerZipcode}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerContact">
              <Form.Label>Contact *</Form.Label>
              <CustomInput
                type="text"
                name="sellerContact"
                onChange={handleChange}
                value={formData.sellerContact}
                placeholder="Enter Seller's Contact Number"
              />
              {errors.sellerContact && (
                <p style={{ color: "red" }}>{errors.sellerContact}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} controlId="storeDescription">
              <Form.Label>Store Description *</Form.Label>
              <ReactQuill
                style={{ height: "150px", marginBottom: "40px" }}
                theme="snow"
                value={formData.storeDescription}
                onChange={(content) =>
                  handleQuillChange(content, "storeDescription")
                }
                placeholder="Enter Store Description Here"
              />
              {errors.storeDescription && (
                <p style={{ color: "red" }}>{errors.storeDescription}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} controlId="sellerDescription">
              <Form.Label>Seller Description *</Form.Label>
              <ReactQuill
                style={{ height: "150px", marginBottom: "40px" }}
                theme="snow"
                value={formData.sellerDescription}
                onChange={(content) =>
                  handleQuillChange(content, "sellerDescription")
                }
                placeholder="Enter Seller Description Here"
              />
              {errors.sellerDescription && (
                <p style={{ color: "red" }}>{errors.sellerDescription}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} controlId="sellerPolicy">
              <Form.Label>Seller Policy *</Form.Label>
              <ReactQuill
                style={{ height: "150px", marginBottom: "40px" }}
                theme="snow"
                value={formData.sellerPolicy}
                onChange={(content) =>
                  handleQuillChange(content, "sellerPolicy")
                }
                placeholder="Enter Seller Policy Here"
              />
              {errors.sellerPolicy && (
                <p style={{ color: "red" }}>{errors.sellerPolicy}</p>
              )}
            </Form.Group>
          </Row>
        </fieldset>

        <fieldset className="border p-4 mb-4">
          <legend className="w-auto px-2">Security</legend>
          <p>Set Password for Seller.</p>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="password">
              <Form.Label>Password *</Form.Label>
              <CustomInput
                type={showPassword ? "text" : "password"}
                icon={showPassword ? "eye" : "eye-slash"}
                onIconClick={togglePasswordVisibility}
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Enter Password"
              />
              {errors.password && (
                <div className="invalid-feedback d-block">
                  {errors.password}
                </div>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="confirmPassword">
              <Form.Label>Confirm Password *</Form.Label>
              <CustomInput
                type={showPassword ? "text" : "password"}
                icon={showPassword ? "eye" : "eye-slash"}
                onIconClick={togglePasswordVisibility}
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback d-block">
                  {errors.confirmPassword}
                </div>
              )}
            </Form.Group>
          </Row>
        </fieldset>

        <CustomButton variant="contained" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </CustomButton>
      </Form>
    </Container>
  );
};

export default AddSeller;
