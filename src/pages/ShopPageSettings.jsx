import React from "react";
import { 
  Box, 
  Typography, 
  Button, 
  FormHelperText, 
  Grid, 
  Paper,
  Container,
  Divider
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import CustomInput from "../components/SharedComponents/CustomInput";

const ShopPageSettings = () => {
  const validationSchema = Yup.object({
    shopPage: Yup.string().required("Shop page is required"),
    shopName: Yup.string().required("Shop name is required"),
    description: Yup.string().required("Shop description is required"),
    storePolicy: Yup.string().required("Store policy is required"),
    returnPolicy: Yup.string().required("Return policy is required"),
  });

  const handleSave = (values) => {
    // Implement save logic here
    console.log("Form values:", values);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <Box sx={{ p: 4 }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              gutterBottom
              sx={{ color: 'black', mb: 4 }}
            >
              Shop Page Settings
            </Typography>

            <Formik
              initialValues={{
                shopPage: "",
                shopName: "",
                description: "",
                storePolicy: "",
                returnPolicy: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSave}
            >
              {({ values, setFieldValue, touched, errors }) => (
                <Form>
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                      <CustomInput
                        id="shopPage"
                        name="shopPage"
                        label="Shop Page"
                        placeholder="Enter shop page"
                        value={values.shopPage}
                        onChange={(e) => setFieldValue("shopPage", e.target.value)}
                        error={touched.shopPage && Boolean(errors.shopPage)}
                        helperText={touched.shopPage && errors.shopPage}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <CustomInput
                        id="shopName"
                        name="shopName"
                        label="Shop Name"
                        placeholder="Enter shop name"
                        value={values.shopName}
                        onChange={(e) => setFieldValue("shopName", e.target.value)}
                        error={touched.shopName && Boolean(errors.shopName)}
                        helperText={touched.shopName && errors.shopName}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                        Shop Description
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <JoditEditor
                        value={values.description}
                        onChange={(newContent) => setFieldValue("description", newContent)}
                        config={{
                          readonly: false,
                          toolbarButtonSize: "small",
                          height: 200,
                          theme: "default",
                        }}
                      />
                      {touched.description && errors.description && (
                        <FormHelperText error>{errors.description}</FormHelperText>
                      )}
                    </Paper>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                        Store Policy
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <JoditEditor
                        value={values.storePolicy}
                        onChange={(newContent) => setFieldValue("storePolicy", newContent)}
                        config={{
                          readonly: false,
                          toolbarButtonSize: "small",
                          height: 200,
                          theme: "default",
                        }}
                      />
                      {touched.storePolicy && errors.storePolicy && (
                        <FormHelperText error>{errors.storePolicy}</FormHelperText>
                      )}
                    </Paper>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                        Return Policy
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <JoditEditor
                        value={values.returnPolicy}
                        onChange={(newContent) => setFieldValue("returnPolicy", newContent)}
                        config={{
                          readonly: false,
                          toolbarButtonSize: "small",
                          height: 200,
                          theme: "default",
                        }}
                      />
                      {touched.returnPolicy && errors.returnPolicy && (
                        <FormHelperText error>{errors.returnPolicy}</FormHelperText>
                      )}
                    </Paper>
                  </Box>

                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        boxShadow: 2,
                        '&:hover': {
                          boxShadow: 4,
                        },
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ShopPageSettings;