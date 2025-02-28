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
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { BASE_URL } from "../../../utils/baseUrl";
import { logoutUser } from "../../../utils/authUtils";
import TableSelect from "../../../components/SharedComponents/TableSelect";
import TableInput from "../../../components/SharedComponents/TableInput";
import CustomButton from "../../../components/SharedComponents/CustomButton";
const CountryManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;
  const [filters, setFilters] = useState({
    isActive: "all",
  });

  // Fetch countries with filters and pagination
  const fetchCountries = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      // Prepare query parameters based on filters and search
      const params = {
        search: searchTerm,
        page: currentPage,
        limit: itemsPerPage,
        isActive: filters.isActive,
      };

      const response = await axios.get(`${BASE_URL}/api/countries/admin`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        console.log("Fetched Countries:", response.data);
        setCountries(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalCount(response.data.totalCount);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        logoutUser();
      }
      setLoading(false);
    }
  };

  // Fetch countries when filters, search, or page changes
  useEffect(() => {
    fetchCountries();
  }, [searchTerm, currentPage, filters]);

  // Handler for search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handler for status filter change
  const handleStatusFilterChange = (e) => {
    const value = e.target.value;
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

  // Reset all filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      isActive: "all",
    });
    setCurrentPage(1);
  };

  // Handle pagination
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
          <b>Country Management</b>
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>

          <IconButton color="primary" onClick={fetchCountries}>
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
    <CustomButton variant="outlined" onClick={clearFilters} style={{ height: "55px" }}>
      Clear
    </CustomButton>
  </Box>

  {/* Right Side: Add Button */}
  <CustomButton
    variant="contained"
    color="primary"
    style={{ height: "50px" }}
    onClick={() => navigate("/add-country")}
    icon={AddIcon}
  >
    Add
  </CustomButton>
</Box>


      {/* CircularProgress when loading */}
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
                {countries.length > 0 ? (
                  countries.map((country, index) => (
                    <TableRow key={country._id}>
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
                        <CustomButton
                          variant="contained"
                          isSmall
                          onClick={() =>
                            navigate(`/view-country/${country._id}`)
                          }
                        >
                          View
                        </CustomButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No countries found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {totalPages > 0 && (
            <Box mt={2} display="flex" justifyContent="center">
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
};

export default CountryManagement;