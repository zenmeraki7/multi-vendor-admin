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
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/authUtils";
import TableSelect from "../components/SharedComponents/TableSelect";
import TableInput from "../components/SharedComponents/TableInput";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10; // Adjust items per page as needed

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
      console.log(err);
      
      if (error.response && (error.response.status === 404 || error.response.status === 401)) {
        logoutUser(); // Call logoutUser if 404 or 401 status code
      }
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
          <IconButton color="primary">
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">
            {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
      <TableInput
  id="search-product"
  name="searchTerm"
  placeholder="Search Product"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  label="Search"
  type="text"
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
          <TableSelect
  id="stock-filter"
  name="stock"
  value=""
  onChange={() => {}}
  label="Stock"
  MenuItems={[
    { value: "In Stock", label: "In Stock" },
    { value: "Out of Stock", label: "Out of Stock" }
  ]}
/>

<TableSelect
  id="product-category-filter"
  name="productCategory"
  value=""
  onChange={() => {}}
  label="CategoryType"
  MenuItems={[
    { value: "Fashion", label: "Fashion" },
    { value: "Electronics", label: "Electronics" }
  ]}
/>

<TableSelect
  id="category-filter"
  name="category"
  value=""
  onChange={() => {}}
  label="Category"
  MenuItems={[
    { value: "Type1", label: "Type1" },
    { value: "Type2", label: "Type2" }
  ]}
/>

<TableSelect
  id="subcategory-filter"
  name="subcategory"
  value=""
  onChange={() => {}}
  label="SubCategory"
  MenuItems={[
    { value: "Option1", label: "Option1" },
    { value: "Option2", label: "Option2" }
  ]}
/>

<TableSelect
  id="status-filter"
  name="status"
  value=""
  onChange={() => {}}
  label="Status"
  MenuItems={[
    { value: "Option1", label: "Inactive" },
    { value: "Option2", label: "Active" }
  ]}
/>

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
            <TableRow sx={{ backgroundColor: "primary.main" }} >
              <TableCell></TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>PRODUCT NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>STOCK</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>PRICE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>CATEGORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>SELLER</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>STATUS</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                LAST MODIFIED
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ACTIONS</TableCell>
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
                    onClick={() => navigate(`/view-product/${product._id}`)} // Replace with your logic
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
