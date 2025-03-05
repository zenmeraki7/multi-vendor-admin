import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "../../components/SharedComponents/CustomInput";
import CustomSelect from "../../components/SharedComponents/CustomSelect";
import CustomButton from "../../components/SharedComponents/CustomButton";

const BASE_URL = "http://localhost:5000";

// validation schema
const schema = yup.object().shape({
    sellerName: yup.string().required("Seller Name is required"),
    sellerShopName: yup.string().required("Shop Name is required"),
    sellerEmail: yup.string().email().required("Email is required"),
    sellerContact: yup.string().required("Contact is required"),
    storeAddress: yup.string().required("Store Address is required"),
    sellerCity: yup.string().required("City is required"),
    sellerZipcode: yup.string().required("Zipcode is required"),
    country: yup.string().required("Country is required"),
    sellerState: yup.string().required("State is required"),
    businessType: yup.string().required("Business Type is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
    storeDescription: yup.string().required("Store Description is required"),
    sellerDescription: yup.string().required("Seller Description is required"),
    sellerPolicy: yup.string().required("Seller Policy is required"),
});

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

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            country: "",
            sellerState: "",
            businessType: ""
        }
    });

    // Watch form values
    const formValues = watch(["country", "sellerState", "businessType"]);
    const [country, sellerState, businessType] = formValues;

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
            if (!country || !countries.length) return;
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${BASE_URL}/api/states?countryId=${country}`,
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
    }, [country, countries]);

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setValue(name, value, { shouldValidate: true });
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

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue(name, value);
    };

    const onSubmit = async (data) => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Please login first");

            const formData = {
                fullName: data.sellerName,
                companyName: data.sellerShopName,
                email: data.sellerEmail,
                phoneNum: data.sellerContact,
                address: data.storeAddress,
                city: data.sellerCity,
                zipCode: data.sellerZipcode,
                country: data.country,
                state: data.sellerState,
                businessType: data.businessType,
                password: data.password,
                storeDescription,
                sellerDescription,
                sellerPolicy,
            };

            await axios.post(`${BASE_URL}/api/vendor/add-vendor`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const response = await addSeller(formData, token);
            alert("Seller added successfully!");

            // Reset form
            setValue("country", "");
            setValue("sellerState", "");
            setValue("businessType", "");
            setStoreDescription("");
            setSellerDescription("");
            setSellerPolicy("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            alert(error.response?.data?.message || error.message || "Failed to add seller");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Add Seller</h2>
            <p>Here you can add Sellers to your Store.</p>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                                {...register("sellerName")}
                            />
                            {errors.sellerName && (
                                <p style={{ color: "red" }}>{errors.sellerName.message}</p>
                            )}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerShopName">
                            <Form.Label>Seller Shop Name *</Form.Label>
                            <CustomInput
                                type="text"
                                name="sellerShopName"
                                placeholder="Enter Seller Shop Name Here"
                                {...register("sellerShopName")}
                            />
                            {errors.sellerShopName && (
                                <p style={{ color: "red" }}>{errors.sellerShopName.message}</p>
                            )}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerEmail">
                            <Form.Label>Email *</Form.Label>
                            <CustomInput
                                type="email"
                                name="sellerEmail"
                                placeholder="Enter Seller's Email"
                                {...register("sellerEmail")}
                            />
                            {errors.sellerEmail && (
                                <p style={{ color: "red" }}>{errors.sellerEmail.message}</p>
                            )}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="storeAddress">
                            <Form.Label>Store Address *</Form.Label>
                            <CustomInput
                                type="text"
                                name="storeAddress"
                                placeholder="Enter Seller's Store Address"
                                {...register("storeAddress")}
                            />
                            {errors.storeAddress && (
                                <p style={{ color: "red" }}>{errors.storeAddress.message}</p>
                            )}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerCity">
                            <Form.Label>City *</Form.Label>
                            <CustomInput
                            
                                type="text"
                                name="sellerCity"
                                placeholder="Enter Seller's City"
                                {...register("sellerCity")}
                            />
                            {errors.sellerCity && (
                                <p style={{ color: "red" }}>{errors.sellerCity.message}</p>
                            )}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerCountry">
                            <Form.Label>Country *</Form.Label>
                            <CustomSelect
                                label="Country"
                                name="country"
                                value={country || ""}
                                onChange={handleSelectChange}
                                {...register("country")}
                                MenuItems={[
                                    { value: "", label: "Select Country" },
                                    ...countries.map((item) => ({
                                        value: item._id,
                                        label: item.name,
                                    }))
                                ]}
                            />
                            {errors.country && (
                                <p style={{ color: "red" }}>{errors.country.message}</p>
                            )}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerState">
                            <Form.Label>State *</Form.Label>
                            <CustomSelect
                                label="State"
                                name="sellerState"
                                value={sellerState || ""}
                                onChange={handleSelectChange}
                                {...register("sellerState")}
                                MenuItems={[
                                    { value: "", label: "Select State" },
                                    ...states.map((item) => ({
                                        value: item._id,
                                        label: item.name,
                                    }))
                                ]}
                            />
                            {errors.sellerState && (
                                <p style={{ color: "red" }}>{errors.sellerState.message}</p>
                            )}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="businessType">
                            <Form.Label>Business Type *</Form.Label>
                            <CustomSelect
                                label="Business Structure"
                                name="businessType"
                                value={businessType || ""}
                                onChange={handleSelectChange}
                                {...register("businessType")}
                                MenuItems={[
                                    { value: "", label: "Select Business Type" },
                                    ...businessTypes.map((item) => ({
                                        value: item._id,
                                        label: item.name,
                                    }))
                                ]}
                            />
                            {errors.businessType && (
                                <p style={{ color: "red" }}>{errors.businessType.message}</p>
                            )}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerZipcode">
                            <Form.Label>Zipcode *</Form.Label>
                            <CustomInput
                                type="text"
                                name="sellerZipcode"
                                placeholder="Enter Seller's Zipcode"
                                {...register("sellerZipcode")}
                            />
                            {errors.sellerZipcode && (
                                <p style={{ color: "red" }}>{errors.sellerZipcode.message}</p>
                            )}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerContact">
                            <Form.Label>Contact *</Form.Label>
                            <CustomInput
                                type="text"
                                name="sellerContact"
                                placeholder="Enter Seller's Contact Number"
                                {...register("sellerContact")}
                            />
                            {errors.sellerContact && (
                                <p style={{ color: "red" }}>{errors.sellerContact.message}</p>
                            )}
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
                                {...register("storeDescription")}
                            />
                            {errors.storeDescription && (
                                <p style={{ color: "red" }}>{errors.storeDescription.message}</p>
                            )}
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
                                {...register("sellerDescription")}
                            />
                            {errors.sellerDescription && (
                                <p style={{ color: "red" }}>{errors.sellerDescription.message}</p>
                            )}
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
                                {...register("sellerPolicy")}
                            />
                            {errors.sellerPolicy && (
                                <p style={{ color: "red" }}>{errors.sellerPolicy.message}</p>
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
                                value={password}
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                                {...register("password")}
                            />
                            {errors.password && (
                                <div className="invalid-feedback d-block">
                                    {errors.password.message}
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
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <div className="invalid-feedback d-block">
                                    {errors.confirmPassword.message}
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