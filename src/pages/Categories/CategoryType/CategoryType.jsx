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
  Avatar,
  Pagination,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { BASE_URL } from "../../../utils/baseUrl"; 

function CategoryType() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // Default is "All"
  const [categoryTypes, setCategoryTypes] = useState([]); // Stores the original data
  const [filteredCategoryTypes, setFilteredCategoryTypes] = useState([]); // For filtered data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch Data from API using axios
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No authentication token found. Please log in.");
      navigate("/login"); // Redirect to the login page
      return;
    }

    axios
      .get(`${BASE_URL}/api/category-type/all-admin`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);  // Check if isActive and icon are present
        if (response.data && Array.isArray(response.data.data)) {
          setCategoryTypes(response.data.data);
          setFilteredCategoryTypes(response.data.data);
        } else {
          setCategoryTypes([]);
          setFilteredCategoryTypes([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Failed to fetch category types. Please try again later.");
      });
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterCategories(e.target.value, statusFilter);
  };

  // Handle Status Filter
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter Logic
  const filterCategories = (searchTerm, statusFilter) => {
    let filtered = [...categoryTypes]; // Ensure it's an array

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((categoryType) =>
        categoryType.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "All") {
      const isActive = statusFilter === "Active";
      filtered = filtered.filter(
        (categoryType) => categoryType.isActive === isActive
      );
    }

    setFilteredCategoryTypes(filtered);
  };

  // Apply Filter
  const applyFilter = () => {
    filterCategories(searchTerm, statusFilter);
  };

  // Clear Filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setFilteredCategoryTypes(categoryTypes); // Reset to original data
  };

  // Handle Page Change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Paginate Data
  const paginatedData = filteredCategoryTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box padding={2}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">
          <b>Category Type Management</b>
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
        <TextField
          placeholder="Search Category Type"
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
          sx={{ width: "300px" }}
        />
        <FormControl fullWidth variant="outlined" sx={{ width: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Status"
            size="small"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={applyFilter}>
          Apply
        </Button>
        <Button variant="outlined" onClick={clearFilters}>
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "400px" }}
          onClick={() => navigate("/add-Categorytype")}
        >
          <AddIcon />
          Add
        </Button>
      </Box>

      {/* Category Type Table */}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "primary.main",
              }}
            >
              <TableCell sx={{ color: "white", fontWeight: "bold" }}></TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>DESCRIPTION</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ICON</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>STATUS</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((categoryType, index) => (
              <TableRow
                key={categoryType._id}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f9f9f9",
                  },
                  "&:hover": {
                    backgroundColor: "#f1f1f1",
                    transition: "background-color 0.3s",
                  },
                }}
              >
                <TableCell sx={{ color: "text.secondary", fontWeight: "bold" }}>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell sx={{ color: "text.primary", fontWeight: "medium" }}>
                  {categoryType.name}
                </TableCell>
                <TableCell sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                  {categoryType.description}
                </TableCell>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={categoryType.icon || "path/to/default/icon.jpg"}  // Fallback to a default icon
                    sx={{
                      width: 80,
                      height: 80,
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={categoryType.isActive ? "Active" : "Inactive"}
                    color={categoryType.isActive ? "success" : "error"}
                    variant="outlined"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      borderWidth: 1.5,
                      fontSize: "0.85rem",
                    }}
                  />
                </TableCell>
               <TableCell>
  <Button
    variant="contained"
    color="primary"
    size="small"
    onClick={() => navigate(`/viewcategorytype/${categoryType._id}`)} // Only pass the ID
    sx={{
      textTransform: "none",
      fontWeight: "medium",
    }}
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
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(filteredCategoryTypes.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default CategoryType;
