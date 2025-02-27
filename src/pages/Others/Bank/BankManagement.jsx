import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Chip,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/baseUrl";
import { logoutUser } from "../../../utils/authUtils";
import TableInput from "../../../components/SharedComponents/TableInput";
import TableSelect from "../../../components/SharedComponents/TableSelect";

const BankManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;
  const [filters, setFilters] = useState({
    isActive: "all",
    country: "all",
  });

  // Function to fetch banks with filters and pagination
  const fetchBanks = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      // Prepare query parameters based on filters and search
      const params = {
        search: searchTerm,
        page: currentPage,
        limit: itemsPerPage,
        isActive: filters.isActive,
        country: filters.country,
      };

      const response = await axios.get(`${BASE_URL}/api/banks/admin`, {
        params,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        console.log("Fetched Banks:", response.data);
        setBanks(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalCount(response.data.totalCount);
      }
    } catch (error) {
      console.error("Error fetching banks:", error.response || error.message);
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

  // Fetch banks when filters, search, or page changes
  useEffect(() => {
    fetchBanks();
  }, [searchTerm, currentPage, filters]);

  // Fetch countries for the filter dropdown
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/countries/admin`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.data) {
          setCountries(response.data.data);
        }
      } catch (error) {
        console.error(
          "Error fetching countries:",
          error.response || error.message
        );
      }
    };

    fetchCountries();
  }, []);

  // Event handlers for search and filters
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleStatusFilterChange = (e) => {
    setFilters({
      ...filters,
      isActive: e.target.value,
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleCountryFilterChange = (e) => {
    setFilters({
      ...filters,
      country: e.target.value,
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      isActive: "all",
      country: "all",
    });
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRefresh = () => {
    fetchBanks();
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
          <b>Bank Management</b>
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>

          <IconButton color="primary" onClick={handleRefresh}>
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">
            {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Search Bar and Filters */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TableInput
          id="search-category"
          name="search"
          placeholder="Search Category "
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
  name="country"
  value={filters.country}
  onChange={handleCountryFilterChange}
  label="Country"
  MenuItems={[
    { value: "all", label: "All" },
    ...countries.map((country) => ({ value: country._id, label: country.name }))
  ]}
/>


        <Button variant="outlined" onClick={clearFilters}>
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "auto" }}
          onClick={() => navigate("/add-bank")}
        >
          <AddIcon /> Add
        </Button>
      </Box>

      {/* Loading Indicator */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          {/* Bank Table */}
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell>#</TableCell>
                  <TableCell>Bank Name</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {banks.length > 0 ? (
                  banks.map((bank, index) => (
                    <TableRow key={bank._id}>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{bank.name}</TableCell>
                      <TableCell>{bank.country?.name || "N/A"}</TableCell>
                      <TableCell>
                        <Chip
                          label={bank.isActive ? "Active" : "Inactive"}
                          color={bank.isActive ? "success" : "error"}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => navigate(`/view-bank/${bank._id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No banks found
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

          {/* Total count display */}
          {totalCount > 0 && (
            <Box mt={1} display="flex" justifyContent="center">
              <Typography variant="body2" color="textSecondary">
                Showing {banks.length} of {totalCount} banks
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default BankManagement;
