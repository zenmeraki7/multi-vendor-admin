import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomInput from "../../components/SharedComponents/CustomInput";
import TableSelect from "../../components/SharedComponents/TableSelect";
import CustomSelect from "../../components/SharedComponents/CustomSelect";
import CustomButton from "../../components/SharedComponents/CustomButton";

const AddSeller = () => {
    const [storeDescription, setStoreDescription] = React.useState("");
    const [sellerDescription, setSellerDescription] = React.useState("");
    const [sellerPolicy, setSellerPolicy] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const [country, setCountry] = useState("all");

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!storeDescription || !sellerDescription || !sellerPolicy) {
            alert("Please fill all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const formData = {
            sellerName: e.target.sellerName.value,
            sellerShopName: e.target.sellerShopName.value,
            sellerEmail: e.target.sellerEmail.value,
            storeAddress: e.target.storeAddress.value,
            sellerCity: e.target.sellerCity.value,
            sellerCountry: e.target.sellerCountry.value,
            sellerZipcode: e.target.sellerZipcode.value,
            sellerContact: e.target.sellerContact.value,
            storeDescription,
            sellerDescription,
            sellerPolicy,
            password,
        };

        console.log("Form Submitted:", formData);
        alert("Seller added successfully!");
    };
    const handleFilterChange = (setter) => (event) => {
        setter(event.target.value);
        setPage(1); // Reset to first page on filter change
    };

    return (
        <Container className="mt-4 " >
            <h2>Add Seller</h2>
            <p>Here you can add Sellers to your Store.</p>
            <Form onSubmit={handleSubmit}>
                <fieldset className="border p-4 mb-4">
                    <legend className="w-auto px-2">Seller Details</legend>
                    <p>Enter Seller Details You Want To Add.</p>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerName">

                            <Form.Label>Seller Name *</Form.Label>
                            <CustomInput type="text" name="sellerName" placeholder="Enter Seller Name Here" required />

                            {/* <Form.Control type="text" placeholder="Enter Seller Name Here" required /> */}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerShopName">
                            <Form.Label>Seller Shop Name *</Form.Label>
                            <CustomInput type="text" name="sellershopName" placeholder="Enter Seller Shop Name Here" required />
                            {/* <Form.Control type="text" placeholder="Enter Seller Shop Name Here" required /> */}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerEmail">
                            <Form.Label>Email *</Form.Label>
                            <CustomInput type="email" name="sellerEmail" placeholder="Enter Seller's Email" required />
                            {/* <Form.Control type="email" placeholder="Enter Seller's Email" required /> */}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="storeAddress">
                            <Form.Label>Store Address *</Form.Label>
                            <CustomInput type="text" name="storeAddress" placeholder="Enter Seller's Store Address" required />
                            {/* <Form.Control as="textarea" rows={3} placeholder="Enter Seller's Store Address" required /> */}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerCity">
                            <Form.Label>City *</Form.Label>
                            <CustomInput type="text" name="sellerCity" placeholder="Enter Seller's City" required />
                            {/* <Form.Control type="text" placeholder="Enter Seller's City" required /> */}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerCountry">

                            <Form.Label>Country *</Form.Label>
                            <CustomSelect
                                style={{ width: "100%" }}
                                id="country-filter"
                                name="country"
                                value={country}
                                onChange={handleFilterChange(setCountry)}
                                // label="Country"
                                MenuItems={[
                                    { value: "all", label: "All" },
                                    { value: "USA", label: "USA" },
                                    { value: "India", label: "India" },
                                    { value: "Canada", label: "Canada" },
                                    { value: "UK", label: "UK" },

                                ]}
                            />

                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerZipcode">
                            <Form.Label>Zipcode *</Form.Label>
                            <CustomInput type="text" name="sellerZipcode" placeholder="Enter Seller's Zipcode" required />
                            {/* <Form.Control type="text" placeholder="Enter Seller's Zipcode" required /> */}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sellerContact">
                            <Form.Label>Contact *</Form.Label>
                            <CustomInput type="text" name="sellerContact" placeholder="Enter Seller's Contact Number" required />
                            {/* <Form.Control type="text" placeholder="Enter Seller's Contact Number" required /> */}
                        </Form.Group>
                    </Row>
                    <Row className="mb-5">
                        <Form.Group as={Col} controlId="storeDescription">
                            <Form.Label>Store Description *</Form.Label>
                            <ReactQuill
                                style={{ height: "150px" }}
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
                                style={{ height: "150px" }}
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
                                style={{ height: "150px" }}
                                theme="snow"
                                value={sellerPolicy}
                                onChange={setSellerPolicy}
                                placeholder="Enter Seller Policy Here"
                            />
                        </Form.Group>
                    </Row>
                </fieldset>

                {/* Security Section */}
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
                                name="confirm-password"
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />

                        </Form.Group>
                    </Row>
                </fieldset>

                <CustomButton variant="contained" type="submit" >
                    Submit
                </CustomButton>


            </Form>
        </Container>
    );
};

export default AddSeller;
