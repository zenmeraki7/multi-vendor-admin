import React, { useEffect, useState, useCallback } from "react";
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
import TableSelect from "../../../components/SharedComponents/TableSelect";
import TableInput from "../../../components/SharedComponents/TableInput";
import CustomButton from "../../../components/SharedComponents/CustomButton";

function Category() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
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
      params.append("page", page);
      params.append("limit", itemsPerPage);

      // Use provided filters or current state
      const search =
        filters?.searchTerm !== undefined
          ? filters.searchTerm
          : debouncedSearchTerm;
      const status =
        filters?.statusFilter !== undefined
          ? filters.statusFilter
          : statusFilter;
      const category =
        filters?.categoryFilter !== undefined
          ? filters.categoryFilter
          : categoryFilter;

      if (search) {
        params.append("search", search);
      }

      if (status !== "All") {
        params.append("isActive", status === "Active" ? "true" : "false");
      }

      if (category !== "All") {
        // Find the categoryType ID that matches the selected name
        const selectedType = categoryTypes.find(
          (type) => type.name === category
        );
        if (selectedType && selectedType._id) {
          params.append("categoryType", selectedType._id);
        }
      }

      const response = await axios.get(`${BASE_URL}/api/category/admin-all`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: params,
      });

      const data = response.data.data || [];
      setCategories(data);
      setFilteredCategories(data);
      setTotalPages(
        response.data.totalPages || Math.ceil(data.length / itemsPerPage)
      );

      // Extract unique category types for the filter dropdown
      if (filters === null) {
        // Only update category types on initial load or refresh
        const uniqueTypes = data
          .map((category) => category.categoryType)
          .filter(
            (type, index, self) =>
              type && self.findIndex((t) => t && t._id === type._id) === index
          );
        setCategoryTypes(uniqueTypes);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        logoutUser();
      }
      setCategories([]);
      setFilteredCategories([]);
      setLoading(false);
    }
  };

  // Set up debounce effect for search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch categories when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      setCurrentPage(1);
      fetchCategories(1, { ...getFilters(), searchTerm: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Actual search will be triggered by the debounce effect
  };

  const handleStatusFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    // Apply filter immediately
    setCurrentPage(1);
    fetchCategories(1, { ...getFilters(), statusFilter: value });
  };

  const handleCategoryFilterChange = (e) => {
    const value = e.target.value;
    setCategoryFilter(value);
    // Apply filter immediately
    setCurrentPage(1);
    fetchCategories(1, { ...getFilters(), categoryFilter: value });
  };

  // Helper function to get current filters
  const getFilters = () => {
    return {
      searchTerm: debouncedSearchTerm,
      statusFilter,
      categoryFilter,
    };
  };

  const clearFilters = () => {
    // Update state and immediately fetch with cleared filters
    const clearedFilters = {
      searchTerm: "",
      statusFilter: "All",
      categoryFilter: "All",
    };

    // Update state
    setSearchTerm("");
    setDebouncedSearchTerm("");
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

          <IconButton
            color="primary"
            onClick={() => fetchCategories(currentPage)}
          >
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
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TableInput
              id="search-category"
              name="search"
              placeholder="Search Category "
              value={searchTerm}
              onChange={handleSearch}
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
            <TableSelect
              id="status-filter"
              name="statusFilter"
              value={statusFilter}
              onChange={handleStatusFilterChange}
              label="Status"
              MenuItems={[
                { value: "All", label: "All" },
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
            />

            <TableSelect
              id="category-filter"
              name="categoryFilter"
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              label="CategoryType"
              MenuItems={[
                { value: "All", label: "All" },
                ...categoryTypes
                  .filter((type) => type && type.name)
                  .map((type) => ({ value: type.name, label: type.name })),
              ]}
            />

<CustomButton 
  variant="outlined" 
  onClick={clearFilters} 
  style={{ height: "55px" }}
>
  Clear
</CustomButton>

<CustomButton 
  variant="contained" 
  color="primary" 
  style={{ marginLeft: "400px", height: "50px" }} 
  onClick={() => navigate("/add-category")}
  icon={AddIcon} // Pass the icon
>
  Add
</CustomButton>

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
                    <TableCell>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
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
                    <CustomButton
                        isSmall
                          variant="contained"
                          onClick={() =>
                            navigate(`/view-category/${category._id}`)                          }
                        >
                          View
                        </CustomButton>

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
