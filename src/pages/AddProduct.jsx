import React, { useState, useRef } from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import JoditEditor from "jodit-react";

function AddProduct() {
  const [description, setDescription] = useState("");
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: 400,
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box mt={4} mb={3} textAlign="center">
          <Typography variant="h4">Add Product</Typography>
          <Typography variant="body1">
            Here you can add products to your store.
          </Typography>
        </Box>

        <Grid container spacing={2} justifyContent="center">
          {/* Product Details */}
          <Grid item xs={12} md={7}>
            <Card elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">PRODUCT DETAILS</Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Add product details here
              </Typography>

              <form>
                <TextField
                  fullWidth
                  label="CHOOSE PRODUCT"
                  select
                  required
                  margin="normal"
                  defaultValue="Normal Product"
                >
                  <MenuItem value="Normal Product">Normal Product</MenuItem>
                  <MenuItem value="Another Product">Another Product</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  label="SELLER EMAIL"
                  required
                  placeholder="Enter Seller Email Here"
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="PRODUCT NAME"
                  required
                  placeholder="Enter Product Name Here"
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="PRODUCT TYPE"
                  placeholder="Enter Product Type Here"
                  margin="normal"
                />

                {/* Jodit Editor for Product Description */}
                <Box mt={2}>
                  <Typography variant="body2" mb={1}>
                    DESCRIPTION
                  </Typography>
                  <JoditEditor
                    ref={editor}
                    value={description}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setDescription(newContent)} // preferred to use only this option to update the value for performance reasons
                    onChange={(newContent) => {}}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="PRODUCT TAGS"
                  placeholder="Enter Product Tags Here"
                  margin="normal"
                />
              </form>
            </Card>
          </Grid>

          {/* Product Image */}
          <Grid item xs={12} md={5}>
            <Card elevation={3} sx={{ p: 3, height: 470 }}>
              <Typography variant="h6">PRODUCT IMAGE</Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Here you can upload images of product. You are allowed to upload
                10 images only.
              </Typography>

              <Box sx={{ textAlign: "center", mb: 2 }}>
                <img
                  src="https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg"
                  alt="Product"
                  style={{ maxHeight: "150px" }}
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "block", marginTop: "1rem" }}
                />
                <Button
                  variant="contained"
                  startIcon={<PhotoCamera />}
                  sx={{ mt: 1 }}
                >
                  Upload Image
                </Button>
              </Box>

              <Box sx={{ backgroundColor: "aliceblue", p: 2 }}>
                <Typography variant="body2" color="error" fontWeight="bold">
                  Note:
                </Typography>
                <Typography variant="body2" fontStyle="italic">
                  Image can be uploaded of any dimension but we recommend you to
                  upload image with dimension of 1024x1024 & its size must be
                  less than 15MB.
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Shipping Details */}
          <Grid item xs={12} md={7}>
            <Card elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">SHIPPING DETAILS</Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Add shipping details here
              </Typography>

              <FormControl fullWidth margin="normal">
                <InputLabel>WEIGHT UNIT</InputLabel>
                <Select defaultValue="Grams (g)">
                  <MenuItem value="Grams (g)">Grams (g)</MenuItem>
                  <MenuItem value="Kilogram (kg)">Kilogram (kg)</MenuItem>
                  <MenuItem value="Ounce (oz)">Ounce (oz)</MenuItem>
                  <MenuItem value="Pound (lb)">Pound (lb)</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="WEIGHT"
                placeholder="Enter Product Weight Here"
                margin="normal"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddProduct;
