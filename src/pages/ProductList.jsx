import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Alert,
  Pagination,
  Chip,
} from "@mui/material";
import { Search, Refresh, Edit } from "@mui/icons-material";
import axios from "axios"; // Alternatively, use your axiosInstance
import { BASE_URL } from "../utils/baseUrl";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 5; // Adjust items per page as needed

  // Fetch products from the API
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/api/product/allproduct`, {
        params: { page, limit: itemsPerPage },
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is stored correctly
        },
      });

      const { data, totalPages } = response.data;

      setProducts(data);
      setFilteredProducts(data);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Handle Search
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Handle Page Change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box padding={2}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Products Management</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography color="primary">DATA REFRESH</Typography>
          <IconButton color="primary" >
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">
            {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <TextField
          placeholder="Search Product"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Filters and Actions */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography>
          Products: <strong>{products.length}</strong> |{" "}
          <Typography
            component="span"
            color="error"
            sx={{ textDecoration: "underline" }}
          >
            Trash: {/* Implement trash count if applicable */}0
          </Typography>
        </Typography>
        <Box display="flex" gap={1}>
          {/* Example Filters - Implement actual filtering logic as needed */}
          <Select size="small" defaultValue="" displayEmpty>
            <MenuItem value="">
              <em>Stock</em>
            </MenuItem>
            <MenuItem value="In Stock">In Stock</MenuItem>
            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
          </Select>
          <Select size="small" defaultValue="" displayEmpty>
            <MenuItem value="">
              <em>Product Category</em>
            </MenuItem>
            {/* Populate categories dynamically if possible */}
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
          </Select>
          <Select size="small" defaultValue="" displayEmpty>
            <MenuItem value="">
              <em>Product Type</em>
            </MenuItem>
            <MenuItem value="Type1">Type1</MenuItem>
            <MenuItem value="Type2">Type2</MenuItem>
          </Select>
          <Select size="small" defaultValue="" displayEmpty>
            <MenuItem value="">
              <em>Additional Options</em>
            </MenuItem>
            <MenuItem value="Option1">Option1</MenuItem>
            <MenuItem value="Option2">Option2</MenuItem>
          </Select>
          <Button variant="contained" color="primary">
            APPLY
          </Button>
          <Button variant="outlined" color="secondary">
            CLEAR
          </Button>
        </Box>
      </Box>

      {/* Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ color: "primary.main" }}>PRODUCT NAME</TableCell>
              <TableCell sx={{ color: "primary.main" }}>STOCK</TableCell>
              <TableCell sx={{ color: "primary.main" }}>PRICE</TableCell>
              <TableCell sx={{ color: "primary.main" }}>CATEGORY</TableCell>
              <TableCell sx={{ color: "primary.main" }}>SELLER</TableCell>
              <TableCell sx={{ color: "primary.main" }}>STATUS</TableCell>
              <TableCell sx={{ color: "primary.main" }}>
                LAST MODIFIED
              </TableCell>
              <TableCell sx={{ color: "primary.main" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={product.thumbnail.url}
                    alt={product.title}
                    sx={{ width: 60, height: 60 }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback-image.png";
                    }}
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>
                  {product.stock > 0
                    ? `In stock (${product.stock})`
                    : "Out of stock"}
                </TableCell>
                <TableCell>₹{product.discountedPrice}</TableCell>
                <TableCell>
                  {product?.categoryType?.name || "Unavailable"}
                </TableCell>
                <TableCell>
                  {product?.seller?.companyName || "Unknown"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={product.isApproved ? "Approved" : "Pending"}
                    color={product.isApproved ? "success" : "error"}
                    variant="outlined"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      borderWidth: 2,
                    }}
                  />
                </TableCell>
                <TableCell>
                  {new Date(product.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => console.log("View button clicked")} // Replace with your logic
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ProductList;
