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
 import {logoutUser} from "../../../utils/authUtils";
const BankManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true); // Set loading to true before the API call
        const response = await axios.get(`${BASE_URL}/api/banks/admin`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.data) {
          console.log("Fetched Banks:", response.data.data);
          setBanks(response.data.data);
          setFilteredBanks(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching banks:", error.response || error.message);
        if (error.response && (error.response.status === 404 || error.response.status === 401)) {
          logoutUser(); // Call logoutUser if 404 or 401 status code
        }
      } finally {
        setLoading(false); // Set loading to false after the API call completes
      }
    };

    fetchBanks();
  }, []);

  useEffect(() => {
    filterBanks(searchTerm, statusFilter);
  }, [searchTerm, statusFilter, banks]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filterBanks = (searchTerm, statusFilter) => {
    let filtered = banks || [];

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

  const currentData = (filteredBanks || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box padding={2}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">
          <b>Bank Management</b>
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography color="primary">DATA REFRESH</Typography>
          <IconButton color="primary">
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">{new Date().toLocaleString()}</Typography>
        </Box>
      </Box>

      {/* Search Bar and Filters */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
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

        <Button variant="outlined" onClick={clearFilters}>
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "400px" }}
          onClick={() => navigate("/add-bank")}
        >
          <AddIcon /> Add
        </Button>
      </Box>

      {/* Loading Indicator */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
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
                {currentData.map((bank, index) => (
                  <TableRow key={index}>
                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell>{bank.name}</TableCell>
                    <TableCell>{bank.country.name}</TableCell>
                    <TableCell>
                      <Chip label={bank.isActive ? "Active" : "Inactive"} color={bank.isActive ? "success" : "error"} />
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
        </>
      )}
    </Box>
  );
};

export default BankManagement;
