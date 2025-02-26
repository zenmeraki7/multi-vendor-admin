import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { BASE_URL } from "../../../utils/baseUrl";
import { logoutUser } from "../../../utils/authUtils";

function SubCategories() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Fetch subcategories and categories from API
  const fetchSubCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      // Build query parameters for filtering
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      // Add search parameter if exists
      if (searchTerm) {
        params.search = searchTerm;
      }

      // Add status filter if not "All"
      if (statusFilter !== "All") {
        params.isActive = statusFilter === "Active" ? "true" : "false";
      }

      // Add category filter if not "All"
      if (categoryFilter !== "All") {
        // Find the category ID that matches the selected category name
        const selectedCategory = categories.find(cat => cat.name === categoryFilter);
        if (selectedCategory && selectedCategory._id) {
          params.category = selectedCategory._id;
        }
      }

      const response = await axios.get(
        `${BASE_URL}/api/subcategory/all-admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        }
      );

      const data = response.data;
      setSubCategories(data.data || []);
      setTotalPages(data.totalPages || 1);

      // If this is the first load, get the categories for the filter dropdown
      if (categories.length === 0) {
        // Fetch all categories from a separate endpoint or extract from results
        // For now, we'll extract unique categories from the results
        const uniqueCategories = Array.from(
          new Set(data.data.map((subcategory) => subcategory.category.name))
        ).map((name, index) => ({
          name,
          _id: data.data.find(sub => sub.category.name === name)?.category?._id || index,
        }));

        setCategories(uniqueCategories);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        logoutUser();
      }
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchSubCategories();
  }, [currentPage]); // Re-fetch when page changes

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentPage === 1) {
        fetchSubCategories();
      } else {
        // Reset to page 1 when search/filters change
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, statusFilter, categoryFilter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCategoryFilter("All");
    // If we're already on page 1, manually trigger a fetch
    if (currentPage === 1) {
      fetchSubCategories();
    } else {
      // Otherwise, changing the page will trigger a fetch
      setCurrentPage(1);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRefresh = () => {
    fetchSubCategories();
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
        <Typography variant="h4" fontWeight="bold">
          SubCategory Management
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography color="primary">DATA REFRESH</Typography>
          <IconButton color="primary" onClick={handleRefresh}>
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">
            {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          {/* Search Bar and Filters */}
          <Box display="flex" alignItems="center" gap={2} mb={2} mt={5}>
            <TextField
              label="Search by Subcategory Name"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label="Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
                label="Category"
              >
                <MenuItem value="All">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="outlined" onClick={clearFilters}>
              Clear
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "400px" }}
              onClick={() => navigate("/add-subcategory")}
            >
              <AddIcon /> Add
            </Button>
          </Box>

          {/* SubCategory Table */}
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              borderRadius: 3,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              marginTop: "55px",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    #
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    CATEGORY
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    SUBCATEGORY
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    DESCRIPTION
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    ICON
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    STATUS
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subCategories.length > 0 ? (
                  subCategories.map((subcategory, index) => (
                    <TableRow
                      key={subcategory._id}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "white" : "background.default",
                      }}
                    >
                      <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{subcategory.category.name}</TableCell>
                      <TableCell>{subcategory.name}</TableCell>
                      <TableCell>{subcategory.description}</TableCell>
                      <TableCell>
                        <Avatar src={subcategory.icon} alt={subcategory.name} />
                      </TableCell>
                      <TableCell>
                        {subcategory.isActive ? (
                          <Chip label="Active" color="success" />
                        ) : (
                          <Chip label="Inactive" color="error" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() =>
                            navigate(`/view-subcategory/${subcategory._id}`)
                          }
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No subcategories found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box display="flex" justifyContent="center" marginTop={3}>
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

export default SubCategories;