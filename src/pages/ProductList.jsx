import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import { Search, Refresh, Edit } from "@mui/icons-material";

const ProductList = () => {
  const products = [
    {
      image:
        "https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/7/d/r/xl-p-s-navy-blue-shirts-xl-soundryafabric-original-imagkfkuzgvhhkhp.jpeg?q=90&crop=false",
      name: "Leriya Fashion Shirts",
      stock: "In stock (500)",
      price: "699",
      category: "Fashion",
      brand: "Leriya Fashion",
      rating: 5,
      modified: "5/11/2024",
    },
    {
      image:
        "https://shopkar.in/wp-content/uploads/2024/08/HLSH013833_1.jpg",
      name: "Leriya Fashion Shirts",
      stock: "In stock (199)",
      price: "299",
      category: "Fashion",
      brand: "Leriya Fashion",
      rating: 0,
      modified: "4/26/2024",
    },
    // Add more products as needed
  ];

  return (
    <Box padding={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Products Management</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography color="primary">DATA REFRESH</Typography>
          <IconButton color="primary">
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">28/12/2024, 10:59:52 am</Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" color="success">
          ADD NEW PRODUCT
        </Button>
        <TextField
          placeholder="Search Product"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: "300px" }}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography>
          Products: <strong>All 20</strong> |{" "}
          <Typography component="span" color="error" sx={{ textDecoration: "underline" }}>
            Trash: 2
          </Typography>
        </Typography>
        <Box display="flex" gap={1}>
          <Select size="small" defaultValue="Stock" variant="outlined">
            <MenuItem value="Stock">Stock</MenuItem>
          </Select>
          <Select size="small" defaultValue="Product Category" variant="outlined">
            <MenuItem value="Product Category">Product Category</MenuItem>
          </Select>
          <Select size="small" defaultValue="Product Type" variant="outlined">
            <MenuItem value="Product Type">Product Type</MenuItem>
          </Select>
          <Select size="small" defaultValue="Additional Options" variant="outlined">
            <MenuItem value="Additional Options">Additional Options</MenuItem>
          </Select>
          <Button variant="contained" color="primary">
            APPLY
          </Button>
          <Button variant="outlined" color="secondary">
            CLEAR
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ color: "primary.main" }}>PRODUCT NAME</TableCell>
              <TableCell sx={{ color: "primary.main" }}>STOCK</TableCell>
              <TableCell sx={{ color: "primary.main" }}>PRICE</TableCell>
              <TableCell sx={{ color: "primary.main" }}>CATEGORY</TableCell>
              <TableCell sx={{ color: "primary.main" }}>BRAND</TableCell>
              <TableCell sx={{ color: "primary.main" }}>RATING</TableCell>
              <TableCell sx={{ color: "primary.main" }}>LAST MODIFIED</TableCell>
              <TableCell sx={{ color: "primary.main" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={product.image}
                    alt="Product"
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                  <Typography color={product.rating === 0 ? "error" : "text.primary"}>
                    &#9733; ({product.rating})
                  </Typography>
                </TableCell>
                <TableCell>{product.modified}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;