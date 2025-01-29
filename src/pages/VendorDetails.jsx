import React, { useState, useEffect } from "react";
import { Search, Download, Refresh } from "@mui/icons-material";
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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; 
import { BASE_URL } from "../utils/baseUrl";

function VendorDetails() {
  const [vendors, setVendors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  // Fetch vendors from API using Axios
  useEffect(() => {
    const fetchVendors = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      console.log(token);

      if (!token) {
        setError("Authorization token is missing. Please log in.");
        navigate("/login"); // Redirect to login if token is missing
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/vendor/all`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);

        setVendors(response.data.data || []); 
      } catch (err) {
        if (err.response) {
          // Handle specific error responses
          if (err.response.status === 401) {
            setError("Session expired. Please log in again.");
            localStorage.removeItem("token"); // Remove expired token
            navigate("/login"); // Redirect to login page
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
  }, [navigate]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleView = ( isVerified,id) => {
    if (isVerified) {
        navigate(`/vendor-view/${id}`);
    } else {
      navigate(`/vendor-approve/${id}`); // Navigate to the approval page
    }
  };
  

  const getStatusChip = (isVerified) => {
    const status = isVerified ? "Approved" : "Pending";
    const colors = {
      Approved: "success",
      Pending: "warning",
    };
    return <Chip label={status} color={colors[status]} />;
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleExport = () => {
    console.log("Exporting data...");
    // Add export logic here
  };

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

      {/* Error or Loading State */}
      {loading && <Typography>Loading vendors...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {/* Vendor Table */}
      <Card>
        <CardHeader
          action={
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="contained">
                <Link style={{textDecoration:"none",color:"white"}} to={"/add-seller"}>ADD SELLER </Link> 
              </Button>
            </Box>
          }
        />
        <CardContent>
          {/* Search */}
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
          <TableContainer sx={{ overflowX: "auto" , marginTop:"40px"}}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Company Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Sales</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>State</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Country</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendors.length > 0 ? (
                  vendors.map((vendor, index) => (
                    <TableRow key={index}>
                      <TableCell>{vendor.companyName}</TableCell>
                      <TableCell>{vendor.email}</TableCell>

                      <TableCell>{vendor.salesData?.totalSales || 0}</TableCell>
                      <TableCell>{vendor.state.name}</TableCell>
                      <TableCell>{vendor.country.name}</TableCell>
                      <TableCell>{getStatusChip(vendor.isVerified)}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleView(vendor.isVerified,vendor._id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      No vendors found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination */}
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
