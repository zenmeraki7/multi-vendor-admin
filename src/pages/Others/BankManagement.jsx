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
  Avatar,
  Pagination,
  Chip,
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";

const BankManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  const banks = [
    { name: "State bank of India", country: "India", isActive: true, icon: "https://img.etimg.com/thumb/msid-101177850,width-1200,height-900,resizemode-4,imgsize-8302/state-bank-of-india-share-price-live-22-jun-2023.jpg" },
    { name: "Federal Bank", country: "India", isActive: false, icon: "https://etimg.etb2bimg.com/photo/114746925.cms" },
    
  ];

  const [filteredBanks, setFilteredBanks] = useState(banks);

  useEffect(() => {
    filterBanks(searchTerm, statusFilter);
  }, [searchTerm, statusFilter]);

  // Search and Filter Logic
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filterBanks = (searchTerm, statusFilter) => {
    let filtered = banks;

    if (searchTerm) {
      filtered = filtered.filter((bank) =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      const isActive = statusFilter === "Active";
      filtered = filtered.filter((bank) => bank.isActive === isActive);
    }

    setFilteredBanks(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setFilteredBanks(banks);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentData = filteredBanks.slice(
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
          <b>Bank Management</b>
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
        {/* Search by Bank Name */}
        <TextField
          placeholder="Search Banks by Name"
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

      {/* Bank Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell>#</TableCell>
              <TableCell>Bank Name</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((bank, index) => (
              <TableRow key={index}>
                <TableCell>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell>{bank.name}</TableCell>
                <TableCell>{bank.country}</TableCell>
                <TableCell>
                  <Avatar
                    src={bank.icon}
                    variant="rounded"
                    sx={{ height: "100px", width: "150px" }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={bank.isActive ? "Active" : "Inactive"}
                    color={bank.isActive ? "success" : "error"}
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
          count={Math.ceil(filteredBanks.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default BankManagement;
