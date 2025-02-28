import React, { useState, useEffect } from "react";
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

const StateManagement = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countriesLoading, setCountriesLoading] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchStates();
  }, [currentPage, searchTerm, statusFilter, countryFilter]);

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
        console.error(
          "Error: API response data for countries is not in the expected format."
        );
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        logoutUser();
      }
    } finally {
      setCountriesLoading(false);
    }
  };

  const fetchStates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Build query params based on filters
      let queryParams = new URLSearchParams();
      queryParams.append("page", currentPage);
      queryParams.append("limit", itemsPerPage);

      if (searchTerm) {
        queryParams.append("search", searchTerm);
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
        console.error(
          "Error: API response data is not in the expected format."
        );
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        logoutUser();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleCountryFilterChange = (e) => {
    setCountryFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCountryFilter("All");
    setCurrentPage(1);
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
          <b>State Management</b>
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton color="primary" onClick={fetchStates}>
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
      id="search-category"
      name="search"
      placeholder="Search Category Type"
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
    <CustomButton variant="outlined" onClick={clearFilters} style={{ height: "55px" }}>
      Clear
    </CustomButton>
  </Box>

  {/* Right side: Add button */}
  <CustomButton
    variant="contained"
    color="primary"
    style={{ height: "50px" }}
    onClick={() => navigate("/add-state")}
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
            <Table>
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
                {states.map((state, index) => (
                  <TableRow key={index}>
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
                      />
                    </TableCell>
                    <TableCell>
                      <CustomButton
                        variant="contained"
                        isSmall
                        onClick={() => navigate(`/view-state/${state._id}`)}
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
};

export default StateManagement;