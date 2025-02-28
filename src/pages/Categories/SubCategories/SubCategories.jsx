import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
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
import { BASE_URL } from "../../../utils/baseUrl";
import { logoutUser } from "../../../utils/authUtils";
import TableInput from "../../../components/SharedComponents/TableInput";
import TableSelect from "../../../components/SharedComponents/TableSelect";
import CustomButton from "../../../components/SharedComponents/CustomButton";

function SubCategories() {
  // Navigation hook for changing pages
  const navigate = useNavigate();
  
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;
  
  // This function fetches subcategories from the server
  const fetchSubCategories = async (page = 1, filters = null) => {
    try {
      // Show loading spinner
      setLoading(true);
      
      // Get authentication token
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found. Please log in.");
        navigate("/login");
        return;
      }

      // Use provided filters or current state
      const search = filters?.searchTerm !== undefined
        ? filters.searchTerm
        : debouncedSearchTerm;
      const status = filters?.statusFilter !== undefined
        ? filters.statusFilter
        : statusFilter;
      const category = filters?.categoryFilter !== undefined
        ? filters.categoryFilter
        : categoryFilter;

      // Create an object for our query filters
      const params = {
        page: page,
        limit: itemsPerPage,
      };

      // Only add search parameter if user typed something
      if (search) {
        params.search = search;
      }

      // Only add status filter if not "All"
      if (status !== "All") {
        params.isActive = status === "Active" ? "true" : "false";
      }

      // Only add category filter if not "All"
      if (category !== "All") {
        // Find the category ID that matches the selected category name
        const selectedCategory = categories.find(
          (cat) => cat.name === category
        );
        if (selectedCategory && selectedCategory._id) {
          params.category = selectedCategory._id;
        }
      }

      // Make API request to get subcategories
      const response = await axios.get(
        `${BASE_URL}/api/subcategory/all-admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        }
      );

      // Store the received data
      const data = response.data;
      setSubCategories(data.data || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.totalCount || 0);

      // If this is the first time loading or explicit refresh, get the categories for the filter dropdown
      if (filters === null && categories.length === 0) {
        // Extract unique categories from the results
        const uniqueCategories = Array.from(
          new Set(data.data.map((subcategory) => subcategory.category.name))
        ).map((name, index) => ({
          name,
          _id:
            data.data.find((sub) => sub.category.name === name)?.category
              ?._id || index,
        }));

        setCategories(uniqueCategories);
      }

      // Hide loading spinner
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      
      // If unauthorized, log the user out
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        logoutUser();
      }
      
      // Hide loading spinner
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

  // Fetch subcategories when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      setCurrentPage(1);
      fetchSubCategories(1, { ...getFilters(), searchTerm: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm]);

  // Initial data load when component first renders
  useEffect(() => {
    fetchSubCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to get current filters
  const getFilters = () => {
    return {
      searchTerm: debouncedSearchTerm,
      statusFilter,
      categoryFilter,
    };
  };

  // Handler functions for user interactions
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update search term when user types
    // Actual search will be triggered by the debounce effect
  };

  const handleStatusFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    // Apply filter immediately
    setCurrentPage(1);
    fetchSubCategories(1, { ...getFilters(), statusFilter: value });
  };

  const handleCategoryFilterChange = (e) => {
    const value = e.target.value;
    setCategoryFilter(value);
    // Apply filter immediately
    setCurrentPage(1);
    fetchSubCategories(1, { ...getFilters(), categoryFilter: value });
  };

  const clearFilters = () => {
    // Update state and immediately fetch with cleared filters
    const clearedFilters = {
      searchTerm: "",
      statusFilter: "All",
      categoryFilter: "All",
    };

    // Reset all filters to default
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setCurrentPage(1);
    
    // Fetch with cleared filters immediately
    fetchSubCategories(1, clearedFilters);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update current page when user clicks pagination
    fetchSubCategories(value);
  };

  const handleRefresh = () => {
    // Reload data with current filters
    fetchSubCategories(currentPage);
  };

  // Calculate displayed items range
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  // The component's UI
  return (
    <Box padding={2}>
      {/* Header Section - Title and current time */}
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
          <IconButton color="primary" onClick={handleRefresh}>
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">
            {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Search Bar and Filters Section - Always visible */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={5}>
        {/* Left side filters group */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Search input */}
          <TableInput
            id="search-category"
            name="search"
            placeholder="Search SubCategory"
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
          
          {/* Status filter dropdown */}
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

          {/* Category filter dropdown */}
          <TableSelect
            id="category-filter"
            name="categoryFilter"
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
            label="Category"
            MenuItems={[
              { value: "All", label: "All" },
              ...categories.map((category) => ({
                value: category.name,
                label: category.name,
              })),
            ]}
          />
          
          {/* Clear filters button */}
          <CustomButton
            variant="outlined"
            onClick={clearFilters}
            style={{ height: "55px" }}
          >
            Clear
          </CustomButton>
        </Box>
        
        {/* Right side - Add button */}
        <CustomButton
          variant="contained"
          color="primary"
          style={{ height: "55px" }}
          onClick={() => navigate("/add-subcategory")}
          icon={AddIcon}
        >
          Add
        </CustomButton>
      </Box>

      {/* Loading indicator or table content */}
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
          {/* Results count display */}
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            mb={2}
            mt={3}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              Total SubCategories: {totalCount}
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2, height: '20px' }} />
            <Typography variant="subtitle1" fontWeight="medium">
              Showing {startItem} to{" "}
              {endItem} of {totalCount}
            </Typography>
          </Box>

          {/* Table of SubCategories */}
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              borderRadius: 3,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              marginTop: "20px",
            }}
          >
            <Table>
              {/* Table Header */}
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
              
              {/* Table Body - Subcategory rows */}
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
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
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
                        <CustomButton
                          variant="contained"
                          isSmall
                          color="primary"
                          onClick={() =>
                            navigate(`/view-subcategory/${subcategory._id}`)
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
                      No subcategories found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination controls */}
          {totalPages > 0 && (
            <Box display="flex" justifyContent="center" marginTop={3}>
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

export default SubCategories;