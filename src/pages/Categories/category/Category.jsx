import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
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
  CircularProgress,
  Divider,
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
  const [totalCount, setTotalCount] = useState(0);

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
      setTotalCount(response.data.totalCount || data.length);

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
    } finally {
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

  // Calculate displayed items range
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

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

      {/* Search Bar and Filters - Always visible */}
      <Box 
        display="flex" 
        flexWrap="wrap"
        justifyContent="space-between" 
        alignItems="center" 
        mb={2}
      >
        <Box display="flex" flexWrap="wrap" alignItems="center" gap={2}>
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
        </Box>

        <CustomButton 
          variant="contained" 
          color="primary" 
          style={{ height: "50px" }} 
          onClick={() => navigate("/add-category")}
          icon={AddIcon}
        >
          Add
        </CustomButton>
      </Box>
      
      {/* Total Products and Showing Info - Always visible */}
      <Box 
        display="flex" 
        justifyContent="flex-start" 
        alignItems="center" 
        mb={2}
        mt={3}
      >
        <Typography variant="subtitle1" fontWeight="medium">
          Total Categories: {totalCount}
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 2, height: '20px' }} />
        <Typography variant="subtitle1" fontWeight="medium">
          Showing {startItem} to {endItem} of {totalCount}
        </Typography>
      </Box>

      {/* Only show loading spinner where the table would be */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          mt={2}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          {/* Category Table */}
          <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "primary.main",
                  }}
                >
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category Type</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Icon</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category, index) => (
                    <TableRow key={category._id}>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{category?.categoryType?.name}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>
                        <Avatar src={category.icon} alt={category.name} />
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
                            navigate(`/view-category/${category._id}`)
                          }
                        >
                          View
                        </CustomButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No categories found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {totalPages > 0 && (
            <Box mt={2} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default Category;