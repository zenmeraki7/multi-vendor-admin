import React, { useState, useEffect } from "react";
import { Search } from "@mui/icons-material";
import axios from "axios";
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
  Pagination,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/baseUrl";
import { logoutUser } from "../utils/authUtils";

function VendorDetails() {
  const [vendors, setVendors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Filters with ID values
  const [state, setState] = useState("all");
  const [country, setCountry] = useState("all");
  const [status, setStatus] = useState("all");

  // State and country options fetched from API
  const [stateOptions, setStateOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  // Fetch State & Country Options
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [statesRes, countriesRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/states`),
          axios.get(`${BASE_URL}/api/countries`),
        ]);

        setStateOptions(statesRes.data || []);
        setCountryOptions(countriesRes.data || []);
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };
    fetchFilters();
  }, []);

  // Fetch vendors from API using Axios
  useEffect(() => {
    const fetchVendors = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authorization token is missing. Please log in.");
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/vendor/all`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          params: {
            isVerified: status !== "all" ? status : undefined,
            state: state !== "all" ? state : undefined, // Send state ID
            country: country !== "all" ? country : undefined, // Send country ID
            page,
            limit: rowsPerPage,
          },
        });

        setVendors(response.data.data || []);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 404) {
            logoutUser();
          } else if (err.response.status === 403) {
            setError("You do not have permission to view the vendors.");
          } else {
            setError("Failed to fetch vendors.");
          }
        } else {
          setError("Network error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [state, country, status, page, rowsPerPage, navigate]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleView = (isVerified, id) => {
    navigate(isVerified ? `/vendor-view/${id}` : `/vendor-approve/${id}`);
  };

  const getStatusChip = (isVerified) => {
    return <Chip label={isVerified ? "Approved" : "Pending"} color={isVerified ? "success" : "warning"} />;
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setPage(1); // Reset to first page on filter change
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h4">Vendor Management</Typography>
        <Typography variant="body1" color="text.secondary">
          {new Date().toLocaleString()}
        </Typography>
      </Box>

      {loading && <Typography>Loading vendors...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Card>
        <CardHeader
          action={
            <Button variant="contained">
              <Link style={{ textDecoration: "none", color: "white" }} to={"/add-seller"}>
                ADD SELLER
              </Link>
            </Button>
          }
        />
        <CardContent>
          {/* Search & Filters */}
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
            <TextField
              placeholder="Search vendors..."
              fullWidth
              value={searchText}
              onChange={handleSearchChange}
              variant="outlined"
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>State</InputLabel>
              <Select value={state} onChange={handleFilterChange(setState)}>
                <MenuItem value="all">All</MenuItem>
                {stateOptions.map((s) => (
                  <MenuItem key={s._id} value={s._id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Country</InputLabel>
              <Select value={country} onChange={handleFilterChange(setCountry)}>
                <MenuItem value="all">All</MenuItem>
                {countryOptions.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select value={status} onChange={handleFilterChange(setStatus)}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="true">Approved</MenuItem>
                <MenuItem value="false">Pending</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography>Vendors: <strong>{vendors.length}</strong></Typography>

          {/* Vendor Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Total Sales</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendors.length > 0 ? vendors.map((vendor, index) => (
                  <TableRow key={index}>
                    <TableCell>{vendor.companyName}</TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{vendor.salesData?.totalSales || 0}</TableCell>
                    <TableCell>{vendor.state?.name}</TableCell>
                    <TableCell>{vendor.country?.name}</TableCell>
                    <TableCell>{getStatusChip(vendor.isVerified)}</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleView(vendor.isVerified, vendor._id)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">No vendors found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Pagination count={10} page={page} onChange={handlePageChange} color="primary" />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default VendorDetails;
