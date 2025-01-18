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
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { BASE_URL } from "../../../utils/baseUrl";

const CountryManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    filterCountries(searchTerm, statusFilter);
  }, [searchTerm, statusFilter]);

  
  const fetchCountries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/countries/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      
      if (Array.isArray(response.data.data)) {
        setCountries(response.data.data);  
        setFilteredCountries(response.data.data);  
        console.log(response.data.data);
        
      } else {
        console.error("API response is not an array", response.data);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  


  
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

  
const currentData = Array.isArray(filteredCountries)
? filteredCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
: [];

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
          <IconButton color="primary" onClick={fetchCountries}>
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
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "400px" }}
          onClick={() => navigate("/add-country")}
        >
          <AddIcon /> Add
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
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate("/view-country")}
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
