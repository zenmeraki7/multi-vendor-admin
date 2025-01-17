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
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";

const StateManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Hardcoded data for demonstration
  const states = [
    { name: "Kerala", country: "India", code: "IN", isActive: true },
    { name: "Tamil Nadu", country: "India", code: "IN", isActive: false },
 
  ];

  const [filteredStates, setFilteredStates] = useState(states);

  useEffect(() => {
    filterStates(searchTerm, statusFilter);
  }, [searchTerm, statusFilter]);

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
          <IconButton color="primary">
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
            {currentData.map((state, index) => (
              <TableRow key={index}>
                <TableCell>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell>{state.name}</TableCell>
                <TableCell>{state.country}</TableCell>
                <TableCell>{state.code}</TableCell>
                <TableCell>
                  <Chip
                    label={state.isActive ? "Active" : "Inactive"}
                    color={state.isActive ? "success" : "error"}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" size="small">
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
    </Box>
  );
};

export default StateManagement;
