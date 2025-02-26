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
import axios from "axios";
import { BASE_URL } from "../../../utils/baseUrl";
import { logoutUser } from "../../../utils/authUtils";

function Category() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryTypes, setCategoryTypes] = useState([]);

  const itemsPerPage = 10;

  const fetchCategories = async (page = 1, filters = null) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found. Please log in.");
      navigate("/login");
      return;
    }
    setLoading(true);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', itemsPerPage);
      
      // Use provided filters or current state
      const search = filters?.searchTerm !== undefined ? filters.searchTerm : searchTerm;
      const status = filters?.statusFilter !== undefined ? filters.statusFilter : statusFilter;
      const category = filters?.categoryFilter !== undefined ? filters.categoryFilter : categoryFilter;
      
      if (search) {
        params.append('search', search);
      }
      
      if (status !== "All") {
        params.append('isActive', status === "Active" ? "true" : "false");
      }
      
      if (category !== "All") {
        // Find the categoryType ID that matches the selected name
        const selectedType = categoryTypes.find(type => type.name === category);
        if (selectedType && selectedType._id) {
          params.append('categoryType', selectedType._id);
        }
      }

      const response = await axios.get(`${BASE_URL}/api/category/admin-all`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: params
      });
      
      const data = response.data.data || [];
      setCategories(data);
      setFilteredCategories(data);
      setTotalPages(response.data.totalPages || Math.ceil(data.length / itemsPerPage));
      
      // Extract unique category types for the filter dropdown
      if (filters === null) { // Only update category types on initial load or refresh
        const uniqueTypes = data
          .map(category => category.categoryType)
          .filter((type, index, self) => 
            type && self.findIndex(t => t && t._id === type._id) === index
          );
        setCategoryTypes(uniqueTypes);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      if (error.response && (error.response.status === 404 || error.response.status === 401)) {
        logoutUser();
      }
      setCategories([]);
      setFilteredCategories([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const applyFilters = () => {
    setCurrentPage(1);
    fetchCategories(1);
  };

  const clearFilters = () => {
    // Update state and immediately fetch with cleared filters
    const clearedFilters = {
      searchTerm: "",
      statusFilter: "All",
      categoryFilter: "All"
    };
    
    // Update state
    setSearchTerm("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setCurrentPage(1);
    
    // Fetch with cleared filters immediately
    fetchCategories(1, clearedFilters);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchCategories(value);
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
          <IconButton color="primary" onClick={() => fetchCategories(currentPage)}>
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">
            {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress color="primary" />
        </Box>
      ) : (
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
              sx={{ width: "200px" }}
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
                {categoryTypes
                  .filter(type => type && type.name)
                  .map(type => (
                    <MenuItem key={type._id} value={type.name}>
                      {type.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={applyFilters}
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
                {filteredCategories.map((category, index) => (
                  <TableRow key={category._id}>
                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
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
              count={totalPages}
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