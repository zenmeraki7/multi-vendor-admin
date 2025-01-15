import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  IconButton,
  Grid,
  Alert,
  FormControl,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../components/SharedComponents/CustomInput"; // Import CustomInput
import CustomSelect from "../../../components/SharedComponents/CustomSelect";
import { BASE_URL } from "../../../utils/baseUrl";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function AddSubCategory() {
  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState({
    category: "", // Added category field
    subcategory: "",
    description: "",
    image: "",
    status: true,
  });
  const [categoryOptions, setCategoryOptions] = useState([]); // Declare categoryOptions state
  const [alertVisible, setAlertVisible] = useState(false);

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/api/category/admin-all`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const categories = response.data.data || [];
      setCategoryOptions(categories); // Set the categories in state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubcategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size and type here if needed (e.g., max 5MB)
      setSubcategory((prev) => ({
        ...prev,
        image: file, // Set the file itself to the state
      }));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Append the subcategory data
    formData.append("name", subcategory.subcategory);
    formData.append("description", subcategory.description);
    formData.append("category", subcategory.category);

    if (subcategory.image) {
      formData.append("image", subcategory.image); // Append the file itself
    } else {
      alert("Please upload an image.");
      return;
    }

    formData.append("isActive", subcategory.status === true ? "true" : "false");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/subcategory/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      if (response.status === 200) {
        // Successfully created subcategory
        console.log("Subcategory Created Successfully:", data);
        {
          alertVisible && (
            <Alert variant="filled" severity="success">
              Subcategory successfully added!
            </Alert>
          );
        }
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
      } else {
        alert(data.message || "Error creating subcategory");
        console.error("Validation error details:", data.details);
      }
    } catch (error) {
      console.error("Error during category creation:", error);
      alert("An error occurred while creating the category.");
    }
  };

  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"), // Ensure category is selected
    subcategory: Yup.string()
      .required("Subcategory name is required")
      .min(3, "Subcategory name must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    status: Yup.boolean().required("Status is required"),
    image: Yup.mixed()
      .required("Category icon is required")
     
  });

  return (
    <Box padding={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Add New Subcategory
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          style={{
            marginRight: "80px",
            background: "linear-gradient(45deg, #556cd6, #19857b)",
            color: "#fff",
          }}
        >
          Back
        </Button>
      </Box>

      {alertVisible && (
        <Alert
          variant="filled"
          severity="success"
          mb={3}
          sx={{ width: "350px" }}
        >
          Subcategory successfully added!
        </Alert>
      )}
      <Formik
        initialValues={{
          category: "",
          subcategory: "",
          description: "",
          status: true,
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const token = localStorage.getItem("token");
          const formData = new FormData();

          formData.append("name", values.subcategory);
          formData.append("description", values.description);
          formData.append("category", values.category);

          if (values.image) {
            formData.append("image", values.image); // Append the file itself
          } else {
            alert("Please upload an image.");
            setSubmitting(false);
            return;
          }

          formData.append(
            "isActive",
            values.status === true ? "true" : "false"
          );

          try {
            const response = await axios.post(
              `${BASE_URL}/api/subcategory/create`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  authorization: `Bearer ${token}`,
                },
              }
            );

            const data = response.data;
            if (response.status === 200) {
              console.log("Subcategory Created Successfully:", data);
              setAlertVisible(true);
              setTimeout(() => {
                setAlertVisible(false);
              }, 3000);
            } else {
              alert(data.message || "Error creating subcategory");
              console.error("Validation error details:", data.details);
            }
          } catch (error) {
            console.error("Error during category creation:", error);
            alert("An error occurred while creating the category.");
          }
          setSubmitting(false);
        }}
      >
        {({ setFieldValue, values, touched, errors, isSubmitting }) => (
          <Form>
            <Grid container spacing={2} mb={3} mt={8} p={7}>
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="body1" mb={1}>
                  <b>Upload Icon</b>
                </Typography>
                <Avatar
                  variant="rounded"
                  src={
                    values.image
                      ? URL.createObjectURL(values.image)
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0ydDiYMYriRcJDdqE8NZxnRisT4XZmc7AQ&s"
                  }
                  sx={{ width: 100, height: 150, borderRadius: "8px" }}
                />
                <IconButton color="primary" component="label">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setFieldValue("image", e.target.files[0])}
                  />
                  <UploadIcon style={{ fontSize: "40px" }} />
                </IconButton>
                {touched.image && errors.image && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.image}
                  </div>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <CustomSelect
                    id="category"
                    name="category"
                    label="Category"
                    value={values.category}
                    onChange={(e) => setFieldValue("category", e.target.value)}
                    MenuItems={categoryOptions.map((category) => ({
                      label: category.name,
                      value: category._id,
                    }))}
                    sx={{ width: "100%" }}
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    style={{ color: "red", fontSize: "12px" }}
                  />

                  <Field
                    as={CustomInput}
                    id="subcategory"
                    name="subcategory"
                    label="Subcategory Name"
                    placeholder="Enter subcategory name"
                    sx={{ width: "100%" }}
                  />
                  <ErrorMessage
                    name="subcategory"
                    component="div"
                    style={{ color: "red", fontSize: "12px" }}
                  />

                  <Field
                    as={CustomInput}
                    id="subcategory-description"
                    name="description"
                    label="Subcategory Description"
                    placeholder="Enter subcategory description"
                    sx={{ width: "100%" }}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    style={{ color: "red", fontSize: "12px" }}
                  />

                  <CustomSelect
                    id="status"
                    name="status"
                    label="Status"
                    value={values.status.toString()} // Convert boolean to string
                    onChange={(e) =>
                      setFieldValue("status", e.target.value === "true")
                    } // Convert string back to boolean
                    MenuItems={[
                      { label: "Active", value: "true" }, // Use strings as values
                      { label: "Inactive", value: "false" },
                    ]}
                    sx={{ width: "100%" }}
                  />
                  <ErrorMessage
                    name="status"
                    component="div"
                    style={{ color: "red", fontSize: "12px" }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Save />}
                disabled={isSubmitting}
              >
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default AddSubCategory;
