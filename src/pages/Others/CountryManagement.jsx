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

const CountryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Hardcoded data for demonstration
  const countries = [
    { name: "India", code: "IN", isActive: true },
    { name: "United States", code: "US", isActive: true },
    { name: "Canada", code: "CA", isActive: false },
  
  ];

  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    filterCountries(searchTerm, statusFilter);
  }, [searchTerm, statusFilter]);

  // Search and Filter Logic
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filterCountries = (searchTerm, statusFilter) => {
    let filtered = countries;

    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      const isActive = statusFilter === "Active";
      filtered = filtered.filter((country) => country.isActive === isActive);
    }

    setFilteredCountries(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setFilteredCountries(countries);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentData = filteredCountries.slice(
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
          <b>Country Management</b>
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
        {/* Search by Country Name */}
        <TextField
          placeholder="Search Countries by Name"
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
          Clear 
        </Button>
      </Box>

      {/* Country Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
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
            {currentData.map((country, index) => (
              <TableRow key={index}>
                <TableCell>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.code}</TableCell>
                <TableCell>
                  <Chip
                    label={country.isActive ? "Active" : "Inactive"}
                    color={country.isActive ? "success" : "error"}
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
          count={Math.ceil(filteredCountries.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CountryManagement;
