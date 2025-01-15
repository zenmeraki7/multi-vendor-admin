import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  IconButton,
  Grid,
  Alert,
  FormControl,
 
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../components/SharedComponents/CustomInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BASE_URL } from "../../../utils/baseUrl";
import axios from "axios";
import CustomSelect from "../../../components/SharedComponents/CustomSelect";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function AddCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    type: "",
    description: "",
    image: "",
    status: "Active",
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false); // New state for error alert
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch category types from API
  const fetchCategoryTypes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BASE_URL}/api/category-type/all-admin`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data || [];
      setCategoryTypes(data);
    } catch (error) {
      console.error("Error fetching category types:", error);
      setCategoryTypes([]);
    }
  };

  useEffect(() => {
    fetchCategoryTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      setCategory((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSave = async (values) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Use values from Formik instead of category state
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("categoryType", values.type);
    if (values.image) {
      formData.append("image", values.image);
    }
    formData.append("isActive", values.status === "Active");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/category/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log("Response Data:", data);

      if (response.status === 200) {
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          navigate(-1); // Navigate back after successful creation
        }, 3000);
      } else {
        setErrorAlertVisible(true); // Display error alert if something goes wrong
        setTimeout(() => {
          setErrorAlertVisible(false);
        }, 3000);
        console.error("Validation error details:", data.details);
      }
    } catch (error) {
      console.error("Error during category creation:", error);
      setErrorAlertVisible(true); // Display error alert if request fails
      alert("An error occurred while creating the category.");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    type: Yup.string().required("Category type is required"),
    description: Yup.string().required("Category description is required"),
    status: Yup.string().required("Status is required"),
    image: Yup.mixed()
      .required("Category icon is required")
      .test(
        "fileSize",
        "File too large",
        (value) => !value || (value && value.size <= 5000000)
      ),
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
          Add New Category
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
          <ArrowBackIcon />
        </Button>
      </Box>

      {alertVisible && (
        <Alert
          variant="filled"
          severity="success"
          mb={3}
          sx={{ width: "350px" }}
        >
          Category successfully added!
        </Alert>
      )}

      {errorAlertVisible && (
        <Alert
          variant="filled"
          severity="error"
          mb={3}
          sx={{ width: "350px" }}
        >
          There was an error adding the category.
        </Alert>
      )}

      <Formik
        initialValues={{
          name: "",
          type: "",
          description: "",
          status: "Active",
          image: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSave} // This will now receive the form values
      >
        {({ setFieldValue, touched, errors, values }) => (
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
                    previewImage
                      ? previewImage
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0ydDiYMYriRcJDdqE8NZxnRisT4XZmc7AQ&s"
                  }
                  sx={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                  }}
                />

                <IconButton color="primary" component="label">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFieldValue("image", file);
                        setCategory(prev => ({ ...prev, image: file }));
                        setPreviewImage(URL.createObjectURL(file));
                      }
                    }}
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
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={touched.type && errors.type}
                >
                  <CustomSelect
                    id="type"
                    name="type"
                    value={values.type} // Use Formik values
                    onChange={(e) => {
                      setFieldValue("type", e.target.value);
                      handleInputChange(e); // Keep local state in sync
                    }}
                    label="Category Type"
                    MenuItems={categoryTypes.map((type) => ({
                      value: type._id,
                      label: type.name,
                    }))}
                    sx={{ width: "100%" }}
                  />
                  {touched.type && errors.type && (
                    <FormHelperText>{errors.type}</FormHelperText>
                  )}
                </FormControl>

                <CustomInput
                  id="category-name"
                  name="name"
                  label="Category Name"
                  placeholder="Enter category name"
                  value={values.name} // Use Formik values
                  onChange={(e) => {
                    setFieldValue("name", e.target.value);
                    handleInputChange(e); // Keep local state in sync
                  }}
                  sx={{ width: "100%" }}
                />
                {touched.name && errors.name && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.name}
                  </div>
                )}

                <CustomInput
                  id="category-description"
                  name="description"
                  label="Category Description"
                  placeholder="Enter category description"
                  value={values.description} // Use Formik values
                  onChange={(e) => {
                    setFieldValue("description", e.target.value);
                    handleInputChange(e); // Keep local state in sync
                  }}
                  type="text"
                  sx={{ width: "100%" }}
                />
                {touched.description && errors.description && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.description}
                  </div>
                )}

                <CustomSelect
                  id="status"
                  name="status"
                  value={values.status} // Use Formik values
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                    handleInputChange(e); // Keep local state in sync
                  }}
                  label="Status"
                  MenuItems={[
                    { value: "Active", label: "Active" },
                    { value: "Inactive", label: "Inactive" },
                  ]}
                  sx={{ width: "100%" }}
                />
                {touched.status && errors.status && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.status}
                  </div>
                )}
                </Box>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mb={3}>
              <Button
                       variant="contained"
                       color="primary"
                       onClick={handleSave}
                       startIcon={<Save />}
                       style={{
                         background: "linear-gradient(45deg, #556cd6, #19857b)",
                         color: "#fff",
                       }}
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


export default AddCategory;