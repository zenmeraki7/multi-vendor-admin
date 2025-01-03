import React, { useState } from "react";
import { Search, Download, Refresh } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
} from "@mui/material";

function VendorDetails() {
  const initialVendors = [
    {
      fullName: "John Smith",
      email: "john.smith@company.com",
      companyName: "Tech Solutions Inc",
      city: "San Francisco",
      state: "California",
      country: "United States",
      status: "Accepted",
      industry: "Technology",
    },
    {
      fullName: "Emma Wilson",
      email: "emma.w@innovate.co",
      companyName: "Innovate Co",
      city: "New York",
      state: "New York",
      country: "United States",
      status: "Pending",
      industry: "Healthcare",
    },
  ];

  const [vendors, setVendors] = useState(initialVendors);
  const [filters, setFilters] = useState({
    companyName: "",
    location: "",
    industry: "",
    status: "",
  });
  const [searchText, setSearchText] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleApplyFilters = () => {
    const filteredVendors = initialVendors.filter((vendor) => {
      return (
        (filters.companyName
          ? vendor.companyName.includes(filters.companyName)
          : true) &&
        (filters.location ? vendor.city.includes(filters.location) : true) &&
        (filters.industry
          ? vendor.industry.includes(filters.industry)
          : true) &&
        (filters.status ? vendor.status === filters.status : true) &&
        (searchText
          ? vendor.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
            vendor.email.toLowerCase().includes(searchText.toLowerCase())
          : true)
      );
    });
    setVendors(filteredVendors);
  };

  const handleClearFilters = () => {
    setFilters({
      companyName: "",
      location: "",
      industry: "",
      status: "",
    });
    setSearchText("");
    setVendors(initialVendors);
  };

  const handleExport = () => {
    console.log("Exporting data...");
    // Add export logic here
  };

  const getStatusChip = (status) => {
    const colors = {
      Accepted: "success",
      Pending: "warning",
    };
    return <Chip label={status} color={colors[status]} />;
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedVendors = vendors.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const currentDateTime = new Date().toLocaleString();

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Vendor Management
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body1"
            color="primary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            DATA REFRESH
            <Refresh sx={{ ml: 1, cursor: "pointer" }} />
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ ml: 2 }}>
            {currentDateTime}
          </Typography>
        </Box>
      </Box>

      {/* Filters */}
      <Card>
        <CardHeader
          action={
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleExport}
                sx={{ width: 150, marginRight: 30 }}
              >
                Export
              </Button>
              <FormControl fullWidth variant="outlined" sx={{ width: 170 }}>
                <InputLabel>Company Name</InputLabel>
                <Select
                  name="companyName"
                  value={filters.companyName}
                  onChange={handleFilterChange}
                  label="Company Name"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Tech Solutions Inc">
                    Tech Solutions Inc
                  </MenuItem>
                  <MenuItem value="Innovate Co">Innovate Co</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" sx={{ width: 110 }}>
                <InputLabel>Location</InputLabel>
                <Select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  label="Location"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="San Francisco">San Francisco</MenuItem>
                  <MenuItem value="New York">New York</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" sx={{ width: 110 }}>
                <InputLabel>Industry</InputLabel>
                <Select
                  name="industry"
                  value={filters.industry}
                  onChange={handleFilterChange}
                  label="Industry"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" sx={{ width: 100 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  label="Status"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="">Accepted</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
              <Button variant="outlined" onClick={handleApplyFilters}>
                Apply
              </Button>
              <Button variant="outlined" onClick={handleClearFilters}>
                Clear
              </Button>
            </Box>
          }
        />
        <CardContent>
          <Box
            sx={{ display: "flex", gap: 2, marginBottom: 2, width: "400px" }}
          >
            <Box sx={{ position: "relative", flex: 1 }}>
              <Search
                sx={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "gray",
                }}
              />
              <TextField
                placeholder="Search vendors..."
                fullWidth
                value={searchText}
                onChange={handleSearchChange}
                variant="outlined"
                sx={{ paddingLeft: 4 }}
              />
            </Box>
          </Box>
          <Typography>
            Vendors: <strong>{vendors.length}</strong>
          </Typography>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedVendors.length > 0 ? (
                  paginatedVendors.map((vendor, index) => (
                    <TableRow key={index}>
                      <TableCell>{vendor.fullName}</TableCell>
                      <TableCell>{vendor.email}</TableCell>
                      <TableCell>{vendor.companyName}</TableCell>
                      <TableCell>{vendor.city}</TableCell>
                      <TableCell>{vendor.state}</TableCell>
                      <TableCell>{vendor.country}</TableCell>
                      <TableCell>{getStatusChip(vendor.status)}</TableCell>
                      {/* Action Column */}
                      <TableCell>
                        <Button variant="contained" color="primary">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No vendors found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Pagination
              count={Math.ceil(vendors.length / rowsPerPage)}
              page={page + 1}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default VendorDetails;
