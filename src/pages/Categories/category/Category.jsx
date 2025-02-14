import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Pagination,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios"; // Import Axios for API calls
import { BASE_URL } from "../../../utils/baseUrl";
import { logoutUser } from "../../../utils/authUtils";

function Category() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  // Fetch Categories
  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found. Please log in.");
      navigate("/login");
      return;
    }
    setLoading(true); 

    try {
      const response = await axios.get(`${BASE_URL}/api/category/admin-all`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data || []; 
      setCategories(data);
      setFilteredCategories(data);
      setLoading(false); 

    } catch (error) {
      console.error("Error fetching categories:", error);
      if (error.response && (error.response.status === 404 || error.response.status === 401)) {
        logoutUser(); // Call logoutUser if 404 or 401 status code
      }
      setCategories([]);
      setFilteredCategories([]);
      setLoading(false); 

    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Search and Filter Logic
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterCategories(e.target.value, statusFilter, categoryFilter);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    filterCategories(searchTerm, e.target.value, categoryFilter);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    filterCategories(searchTerm, statusFilter, e.target.value);
  };

  const filterCategories = (searchTerm, statusFilter, categoryFilter) => {
    let filtered = categories;

    // Filter by category type
    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (category) => category.categoryType.name === categoryFilter
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "All") {
      const isActive = statusFilter === "Active";
      filtered = filtered.filter((category) => category.isActive === isActive);
    }

    setFilteredCategories(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setFilteredCategories(categories);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box padding={2}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">
          <b>Category Management</b>
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography color="primary">DATA REFRESH</Typography>
          <IconButton color="primary" onClick={fetchCategories}>
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">
            {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Box>
 {loading?(
<Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress color="primary" />
        </Box>
 ):(
  <>
  {/* Search Bar and Filters */}
  <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          placeholder="Search Categories"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: "200px" }} // Adjusted width
        />
        <FormControl fullWidth variant="outlined" sx={{ width: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Status"
            size="small"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" sx={{ width: 150 }}>
          <InputLabel>Category Type</InputLabel>
          <Select
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
            label="Category Type"
            size="small"
          >
            <MenuItem value="All">All</MenuItem>
            {categories
              .map((category) =>
                category.categoryType ? category.categoryType.name : null
              )
              .filter(
                (value, index, self) => value && self.indexOf(value) === index
              ) // Ensure unique types and skip null values
              .map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() =>
            filterCategories(searchTerm, statusFilter, categoryFilter)
          }
        >
          Apply
        </Button>
        <Button variant="outlined" onClick={clearFilters}>
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "400px" }}
          onClick={() => navigate("/add-category")}
        >
          <AddIcon /> Add
        </Button>
      </Box>

      {/* Category Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "primary.main",
              }}
            >
              <TableCell>#</TableCell>
              <TableCell>Category Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((category, index) => (
                <TableRow key={category._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category?.categoryType?.name}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <Avatar
                      src={category.icon}
                      variant="rounded"
                      sx={{ height: "100px", width: "100px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={category.isActive ? "Active" : "Inactive"}
                      color={category.isActive ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/view-category/${category._id}`)}
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
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredCategories.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
  </>
 )}

      
    </Box>
  );
}

export default Category;
