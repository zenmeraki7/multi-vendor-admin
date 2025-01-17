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
  CircularProgress, 
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { BASE_URL } from "../../../utils/baseUrl"; 

function CategoryType() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [filteredCategoryTypes, setFilteredCategoryTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); 
  const itemsPerPage = 10;

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found. Please log in.");
      navigate("/login");
      return;
    }

    setLoading(true); 
    axios
      .get(`${BASE_URL}/api/category-type/all-admin`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setCategoryTypes(response.data.data);
          setFilteredCategoryTypes(response.data.data);
        } else {
          setCategoryTypes([]);
          setFilteredCategoryTypes([]);
        }
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch category types. Please try again later.");
        setLoading(false); 
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

      {/* Loader */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          {/* Search Bar and Filters */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              placeholder="Search Category Type"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                size="small"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={() => filterCategories(searchTerm, statusFilter)}>
              Apply
            </Button>
            <Button variant="outlined" onClick={() => clearFilters()}>
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
                <TableRow sx={{ backgroundColor: "primary.main" }}>
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
                  <TableRow key={categoryType._id}>
                    <TableCell>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{categoryType.name}</TableCell>
                    <TableCell>{categoryType.description}</TableCell>
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        src={categoryType.icon || "path/to/default/icon.jpg"}
                        sx={{ width: 80, height: 80 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={categoryType.isActive ? "Active" : "Inactive"}
                        color={categoryType.isActive ? "success" : "error"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/viewcategorytype/${categoryType._id}`)}
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
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default CategoryType;
