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
import { BASE_URL } from "../../../utils/baseUrl"; // Import base URL

const StateManagement = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [states, setStates] = useState([]); // State to store fetched states
  const [filteredStates, setFilteredStates] = useState([]); // State to store filtered states
  const [loading, setLoading] = useState(false); // Loading state for spinner

  // Fetch States from API
  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    filterStates(searchTerm, statusFilter);
  }, [searchTerm, statusFilter]);

  // API Fetching Logic
  const fetchStates = async () => {
    setLoading(true); // Set loading to true while fetching data
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      const response = await axios.get(`${BASE_URL}/api/states/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ensure the response contains the expected data
      if (response.data && Array.isArray(response.data.data)) {
        setStates(response.data.data); // Set fetched states
        setFilteredStates(response.data.data); // Set filtered states
      } else {
        console.error(
          "Error: API response data is not in the expected format."
        );
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Search and Filter Logic
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filterStates = (searchTerm, statusFilter) => {
    let filtered = states;

    if (searchTerm) {
      filtered = filtered.filter((state) =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      const isActive = statusFilter === "Active";
      filtered = filtered.filter((state) => state.isActive === isActive);
    }

    setFilteredStates(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setFilteredStates(states);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentData = filteredStates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          placeholder="Search States by Name"
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

        {/* Clear Filters Button */}
        <Button variant="outlined" onClick={clearFilters}>
          Clear Filters
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
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
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
                {currentData.map((state, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{state.name}</TableCell>
                    <TableCell>
                      {state.country ? state.country.name : "N/A"}
                    </TableCell>{" "}
                    {/* Access country name correctly */}
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
              count={Math.ceil(filteredStates.length / itemsPerPage)}
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
