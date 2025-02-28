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
 * StateManagement component for handling state/province data
 * Provides interface for viewing, searching, and filtering state data
 */
const StateManagement = () => {
  const navigate = useNavigate();

  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // State for data and loading indicators
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countriesLoading, setCountriesLoading] = useState(false);

  // Fetch countries on initial load
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch states whenever filters or pagination changes
  useEffect(() => {
    fetchStates();
  }, [currentPage, searchTerm, statusFilter, countryFilter, itemsPerPage]);

  /**
   * Fetches all countries from the API
   */
  const fetchCountries = async () => {
    setCountriesLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.get(`${BASE_URL}/api/countries/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && Array.isArray(response.data.data)) {
        setCountries(response.data.data);
      } else {
        console.error("Error: Countries API response format is invalid");
      }
    } catch (error) {
      handleApiError(error, "countries");
    } finally {
      setCountriesLoading(false);
    }
  };

  /**
   * Fetches states based on current filters and pagination
   */
  const fetchStates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Build query params based on filters
      const queryParams = new URLSearchParams();
      queryParams.append("page", currentPage);
      queryParams.append("limit", itemsPerPage);

      if (searchTerm) {
        queryParams.append("search", searchTerm.trim());
      }

      if (statusFilter !== "All") {
        queryParams.append(
          "isActive",
          statusFilter === "Active" ? "true" : "false"
        );
      }

      if (countryFilter !== "All") {
        queryParams.append("country", countryFilter);
      }

      const response = await axios.get(
        `${BASE_URL}/api/states/admin?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && Array.isArray(response.data.data)) {
        setStates(response.data.data);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 1);
      } else {
        console.error("Error: States API response format is invalid");
      }
    } catch (error) {
      handleApiError(error, "states");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles API errors and logs users out if unauthorized
   * @param {Error} error - The error object
   * @param {string} resource - The resource being fetched
   */
  const handleApiError = (error, resource) => {
    console.error(`Error fetching ${resource}:`, error);
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
    setCurrentPage(1); // Reset to first page when search changes
  };

  /**
   * Handles status filter changes
   * @param {Event} e - The select change event
   */
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  /**
   * Handles country filter changes
   * @param {Event} e - The select change event
   */
  const handleCountryFilterChange = (e) => {
    setCountryFilter(e.target.value);
    setCurrentPage(1);
  };

  /**
   * Clears all filters and resets to default state
   */
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCountryFilter("All");
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
   * Navigates to add state page
   */
  const handleAddState = () => {
    navigate("/add-state");
  };

  /**
   * Navigates to view state page
   * @param {string} stateId - The ID of the state to view
   */
  const handleViewState = (stateId) => {
    navigate(`/view-state/${stateId}`);
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
          <b>State Management</b>
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton 
            color="primary" 
            onClick={fetchStates} 
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
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        {/* Left side: Filters */}
        <Box display="flex" alignItems="center" gap={2}>
          <TableInput
            id="search-state"
            name="search"
            placeholder="Search by state name"
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
            id="country-filter"
            name="countryFilter"
            value={countryFilter}
            onChange={handleCountryFilterChange}
            label="Country"
            MenuItems={[
              { value: "All", label: "All" },
              ...countries.map((country) => ({
                value: country._id,
                label: country.name,
              })),
            ]}
            disabled={countriesLoading}
          />
          <CustomButton 
            variant="outlined" 
            onClick={clearFilters} 
            style={{ height: "55px" }}
          >
            Clear
          </CustomButton>
        </Box>

        {/* Right side: Add button */}
        <CustomButton
          variant="contained"
          color="primary"
          style={{ height: "50px" }}
          onClick={handleAddState}
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
          >
            <Typography variant="body1" fontWeight="medium">
              Total States: {totalCount}
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Typography variant="body1" fontWeight="medium">
              Showing: {states.length} states
            </Typography>
          </Box>

          {/* State Table */}
          <TableContainer component={Paper} elevation={3}>
            <Table aria-label="states table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell>#</TableCell>
                  <TableCell>State Name</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>State Code</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {states.length > 0 ? (
                  states.map((state, index) => (
                    <TableRow key={state._id || index} hover>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{state.name}</TableCell>
                      <TableCell>
                        {state.country ? state.country.name : "N/A"}
                      </TableCell>
                      <TableCell>{state.code}</TableCell>
                      <TableCell>
                        <Chip
                          label={state.isActive ? "Active" : "Inactive"}
                          color={state.isActive ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <CustomButton
                          variant="contained"
                          isSmall
                          onClick={() => handleViewState(state._id)}
                        >
                          View
                        </CustomButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1" py={2}>
                        No states found
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

export default StateManagement;