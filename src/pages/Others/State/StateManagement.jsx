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
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../utils/baseUrl";
import { logoutUser } from "../../../utils/authUtils";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStates();
  }, [currentPage, searchTerm, statusFilter, countryFilter]);

  const fetchStates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // Build query params based on filters
      let queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', itemsPerPage);
      
      if (searchTerm) {
        queryParams.append('search', searchTerm);
      }
      
      if (statusFilter !== "All") {
        queryParams.append('isActive', statusFilter === "Active" ? "true" : "false");
      }
      
      if (countryFilter !== "All") {
        // Assuming the country filter requires the country ID
        // You might need to adjust this based on your API requirements
        queryParams.append('country', countryFilter);
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
          <Typography color="primary">DATA REFRESH</Typography>
          <IconButton color="primary" onClick={fetchStates}>
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">
            {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Search Bar and Filters */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        {/* Search by State Name */}
        <TextField
          placeholder="Search States "
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
          sx={{ width: "250px" }}
        />

        {/* Status Filter Dropdown */}
        <TextField
          select
          label="Status"
          size="small"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          SelectProps={{
            native: true,
          }}
          sx={{ width: "150px" }}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </TextField>
        <TextField
          select
          label="Country"
          size="small"
          value={countryFilter}
          onChange={handleCountryFilterChange}
          SelectProps={{
            native: true,
          }}
          sx={{ width: "150px" }}
        >
          <option value="All">All</option>
          <option value="India">India</option>
          <option value="Australia">Australia</option>
          <option value="Canada">Canada</option>
        </TextField>

        {/* Clear Filters Button */}
        <Button variant="outlined" onClick={clearFilters}>
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "400px" }}
          onClick={() => navigate("/add-state")}
        >
          <AddIcon /> Add
        </Button>
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
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/view-state/${state._id}`)}
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
};

export default StateManagement;