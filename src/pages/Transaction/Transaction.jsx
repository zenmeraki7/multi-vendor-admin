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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TableInput from "../../components/SharedComponents/TableInput";
import TableSelect from "../../components/SharedComponents/TableSelect";

const TransactionPage = () => {
  const navigate = useNavigate();

  // States for filtering and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("Last 30 Days");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  // Sample transaction data
  const transactions = [
    {
      id: "ORD-2025-001",
      date: "Feb 12, 2025",
      vendor: "Vendor A",
      items: "iPhone 15 Pro",
      amount: 999.0,
      status: "completed",
    },
    {
      id: "ORD-2025-002",
      date: "Feb 11, 2025",
      vendor: "Vendor B",
      items: "MacBook Air M3",
      amount: 1299.0,
      status: "pending",
    },
    {
      id: "ORD-2025-003",
      date: "Feb 10, 2025",
      vendor: "Vendor C",
      items: "AirPods Pro",
      amount: 249.0,
      status: "cancelled",
    },
  ];

  // Function to refresh transaction data
  const fetchTransactions = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, searchTerm, statusFilter, dateFilter]);

  // Handler functions
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleVendorFilterChange = (e) => {
    setVendorFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setVendorFilter("All");
    setDateFilter("Last 30 Days");
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
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
          <b>Transaction History</b>
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton color="primary" onClick={fetchTransactions}>
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">
            {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Search Bar and Filters */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        {/* Search by Transaction ID or Items */}
        <TableInput
          id="search-transaction"
          name="search"
          placeholder="Search "
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
            { value: "Pending", label: "Pending" },
            { value: "Completed", label: "Completed" },
            { value: "Cancelled", label: "Cancelled" },
          ]}
        />

<TableSelect
  id="date-filter"
  name="dateFilter"
  value={dateFilter}
  onChange={handleDateFilterChange}
  label="Date Range"
  MenuItems={[
    { value: "Last 30 Days", label: "Last 30 Days" },
    { value: "Last 90 Days", label: "Last 90 Days" },
    { value: "This Year", label: "This Year" },
  ]}
/>


        {/* Clear Filters Button */}
        <Button variant="outlined" onClick={clearFilters}>
          Clear
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
          {/* Transaction Table */}
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell>Date</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.vendor}</TableCell>
                    <TableCell>{transaction.items}</TableCell>
                    <TableCell align="right">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={
                          transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)
                        }
                        color={
                          transaction.status === "completed"
                            ? "success"
                            : transaction.status === "pending"
                            ? "warning"
                            : "error"
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          navigate(`/transaction/${transaction.id}`)
                        }
                      >
                        Details
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

export default TransactionPage;
