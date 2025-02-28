import React, { useState, useEffect } from "react";
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
  Pagination,
  Chip,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../utils/baseUrl";
import { logoutUser } from "../../../utils/authUtils";
import TableSelect from "../../../components/SharedComponents/TableSelect";
import TableInput from "../../../components/SharedComponents/TableInput";
import CustomButton from "../../../components/SharedComponents/CustomButton";

/**
 * CountryManagement component for handling country data
 * Provides interface for viewing, searching, and filtering country data
 */
const CountryManagement = () => {
  const navigate = useNavigate();

  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [itemsPerPage] = useState(10);
  
  // State for data and loading indicators
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    isActive: "all",
  });

  // Fetch countries whenever filters, search, or pagination changes
  useEffect(() => {
    fetchCountries();
  }, [searchTerm, currentPage, filters, itemsPerPage]);

  /**
   * Fetches countries based on current filters and pagination
   */
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Prepare query parameters based on filters and search
      const params = new URLSearchParams();
      
      if (searchTerm) {
        params.append("search", searchTerm.trim());
      }
      
      params.append("page", currentPage);
      params.append("limit", itemsPerPage);
      
      if (filters.isActive !== "all") {
        params.append("isActive", filters.isActive);
      }

      const response = await axios.get(`${BASE_URL}/api/countries/admin`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setCountries(response.data.data || []);
        setTotalPages(response.data.totalPages || 0);
        setTotalCount(response.data.totalCount || 0);
      } else {
        console.error("Error: Countries API response format is invalid");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles API errors and logs users out if unauthorized
   * @param {Error} error - The error object
   */
  const handleApiError = (error) => {
    console.error("Error fetching countries:", error);
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 404)
    ) {
      logoutUser();
    }
  };

  /**
   * Handles search input changes
   * @param {Event} e - The input change event
   */
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  /**
   * Handles status filter changes
   * @param {Event} e - The select change event
   */
  const handleStatusFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    
    // Convert UI-friendly values to backend-expected values
    let isActiveValue = "all";
    if (value === "Active") isActiveValue = "true";
    if (value === "Inactive") isActiveValue = "false";

    setFilters({
      ...filters,
      isActive: isActiveValue,
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  /**
   * Clears all filters and resets to default state
   */
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setFilters({
      isActive: "all",
    });
    setCurrentPage(1);
  };

  /**
   * Handles pagination changes
   * @param {Event} event - The pagination change event
   * @param {number} value - The new page number
   */
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  /**
   * Navigates to add country page
   */
  const handleAddCountry = () => {
    navigate("/add-country");
  };

  /**
   * Navigates to view country page
   * @param {string} countryId - The ID of the country to view
   */
  const handleViewCountry = (countryId) => {
    navigate(`/view-country/${countryId}`);
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
          <b>Country Management</b>
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton 
            color="primary" 
            onClick={fetchCountries}
            aria-label="Refresh data"
          >
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">
            {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Search Bar and Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} width="100%">
        {/* Left Side: Search & Filters */}
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
          {/* Search by Country Name */}
          <TableInput
            id="search-country"
            name="search"
            placeholder="Search by country name"
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

          {/* Status Filter Dropdown */}
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

          {/* Clear Filters Button */}
          <CustomButton 
            variant="outlined" 
            onClick={clearFilters} 
            style={{ height: "55px" }}
          >
            Clear
          </CustomButton>
        </Box>

        {/* Right Side: Add Button */}
        <CustomButton
          variant="contained"
          color="primary"
          style={{ height: "50px" }}
          onClick={handleAddCountry}
          icon={AddIcon}
        >
          Add
        </CustomButton>
      </Box>

      {/* Loading Spinner */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Total count and showing information above the table */}
          <Box 
            display="flex" 
            alignItems="center" 
            mb={1} 
            ml={1}
            mt={2}
          >
            <Typography variant="body1" fontWeight="medium">
              Total Countries: {totalCount}
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Typography variant="body1" fontWeight="medium">
              Showing: {countries.length} countries
            </Typography>
          </Box>
          
          {/* Country Table */}
          <TableContainer component={Paper} elevation={3}>
            <Table aria-label="countries table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell>#</TableCell>
                  <TableCell>Country Name</TableCell>
                  <TableCell>Country Code</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countries.length > 0 ? (
                  countries.map((country, index) => (
                    <TableRow key={country._id || index} hover>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{country.name}</TableCell>
                      <TableCell>{country.code}</TableCell>
                      <TableCell>
                        <Chip
                          label={country.isActive ? "Active" : "Inactive"}
                          color={country.isActive ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <CustomButton
                          variant="contained"
                          isSmall
                          onClick={() => handleViewCountry(country._id)}
                        >
                          View
                        </CustomButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body1" py={2}>
                        No countries found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box mt={2} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CountryManagement;