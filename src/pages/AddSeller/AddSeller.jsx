import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomInput from "../../components/SharedComponents/CustomInput";
import CustomSelect from "../../components/SharedComponents/CustomSelect";
import CustomButton from "../../components/SharedComponents/CustomButton";

const BASE_URL = "http://localhost:5000";

const AddSeller = () => {
  const [storeDescription, setStoreDescription] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");
  const [sellerPolicy, setSellerPolicy] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [formValues, setFormValues] = useState({
    country: "",
    sellerState: "",
    businessType: "",
  });
  console.log(formValues);
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
      if (formValues.country) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${BASE_URL}/api/states?countryId=${formValues.country}`,
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
      }
    };

    fetchStates();
  }, [formValues.country]);

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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (
      !storeDescription ||
      !sellerDescription ||
      !sellerPolicy ||
      !formValues.country ||
      !formValues.sellerState ||
      !formValues.businessType
    ) {
      alert("Please fill all required fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    // Get authentication token
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token not found. Please log in.");
      setLoading(false);
      return;
    }

    // Prepare formData
    const formData = {
      fullName: e.target.sellerName.value,
      companyName: e.target.sellerShopName.value,
      email: e.target.sellerEmail.value,
      phoneNum: e.target.sellerContact.value,
      address: e.target.storeAddress.value,
      city: e.target.sellerCity.value,
      zipCode: e.target.sellerZipcode.value,
      country: formValues.country,
      state: formValues.sellerState,
      businessType: formValues.businessType,
      password,
      confirmPassword,
      storeDescription,
      sellerDescription,
      sellerPolicy,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/vendor/add-vendor`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Seller added successfully!");

      // Reset form
      e.target.reset();
      setStoreDescription("");
      setSellerDescription("");
      setSellerPolicy("");
      setPassword("");
      setConfirmPassword("");
      setFormValues({ country: "", sellerState: "", businessType: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add seller.");
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
                placeholder="Enter Seller Name Here"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerShopName">
              <Form.Label>Seller Shop Name *</Form.Label>
              <CustomInput
                type="text"
                name="sellerShopName"
                placeholder="Enter Seller Shop Name Here"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerEmail">
              <Form.Label>Email *</Form.Label>
              <CustomInput
                type="email"
                name="sellerEmail"
                placeholder="Enter Seller's Email"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="storeAddress">
              <Form.Label>Store Address *</Form.Label>
              <CustomInput
                type="text"
                name="storeAddress"
                placeholder="Enter Seller's Store Address"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerCity">
              <Form.Label>City *</Form.Label>
              <CustomInput
                type="text"
                name="sellerCity"
                placeholder="Enter Seller's City"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerCountry">
              <Form.Label>Country *</Form.Label>
              <CustomSelect
                label="Country"
                name="country"
                value={formValues.country}
                onChange={handleChange}
                required
                MenuItems={countries.map((item) => ({
                  value: item._id,
                  label: item.name,
                }))}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </CustomSelect>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerState">
              <Form.Label>State *</Form.Label>
              <CustomSelect
                label="State"
                name="sellerState"
                value={formValues.sellerState}
                onChange={handleChange}
                required
                MenuItems={states.map((item) => ({
                  value: item._id,
                  label: item.name,
                }))}
              ></CustomSelect>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="businessType">
              <Form.Label>Business Type *</Form.Label>
              <CustomSelect
                label="Business Structure"
                name="businessType"
                value={formValues.businessType}
                onChange={handleChange}
                required
                MenuItems={businessTypes.map((item) => ({
                  value: item._id,
                  label: item.name,
                }))}
              ></CustomSelect>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerZipcode">
              <Form.Label>Zipcode *</Form.Label>
              <CustomInput
                type="text"
                name="sellerZipcode"
                placeholder="Enter Seller's Zipcode"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="sellerContact">
              <Form.Label>Contact *</Form.Label>
              <CustomInput
                type="text"
                name="sellerContact"
                placeholder="Enter Seller's Contact Number"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} controlId="storeDescription">
              <Form.Label>Store Description *</Form.Label>
              <ReactQuill
                style={{ height: "150px", marginBottom: "40px" }}
                theme="snow"
                value={storeDescription}
                onChange={setStoreDescription}
                placeholder="Enter Store Description Here"
              />
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} controlId="sellerDescription">
              <Form.Label>Seller Description *</Form.Label>
              <ReactQuill
                style={{ height: "150px", marginBottom: "40px" }}
                theme="snow"
                value={sellerDescription}
                onChange={setSellerDescription}
                placeholder="Enter Seller Description Here"
              />
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} controlId="sellerPolicy">
              <Form.Label>Seller Policy *</Form.Label>
              <ReactQuill
                style={{ height: "150px", marginBottom: "40px" }}
                theme="snow"
                value={sellerPolicy}
                onChange={setSellerPolicy}
                placeholder="Enter Seller Policy Here"
              />
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
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
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
