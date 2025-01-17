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

function SubCategories() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [categories, setCategories] = useState([]); // To store the categories list
  const [subCategories, setSubCategories] = useState([]); // To store all subcategories from API
  const [filteredSubCategories, setFilteredSubCategories] = useState([]); // For filtered results
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  // Fetch subcategories and categories from API
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);

        const response = await axios.get(
          `${BASE_URL}/api/subcategory/all-admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setSubCategories(data.data || []); // Assuming API returns subcategories in `data.data`
        setFilteredSubCategories(data.data || []); // Initialize filtered data

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.data.map((subcategory) => subcategory.category.name))
        ).map((name) => ({
          name,
        }));

        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterSubCategories(e.target.value, statusFilter, categoryFilter);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    filterSubCategories(searchTerm, e.target.value, categoryFilter);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    filterSubCategories(searchTerm, statusFilter, e.target.value);
  };

  const filterSubCategories = (searchTerm, statusFilter, categoryFilter) => {
    let filtered = subCategories;

    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (subcategory) =>
          subcategory.category &&
          subcategory.category.name &&
          subcategory.category.name === categoryFilter
      );
    }

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter((subcategory) =>
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      const isActive = statusFilter === "Active";
      filtered = filtered.filter(
        (subcategory) => subcategory.isActive === isActive
      );
    }

    setFilteredSubCategories(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setFilteredSubCategories(subCategories);
  };

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
        <Typography variant="h4" fontWeight="bold">
          SubCategory Management
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
          {/* Search Bar and Filters */}
          <Box display="flex" alignItems="center" gap={2} mb={2} mt={5}>
            <TextField
              label="Search by Subcategory Name"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label="Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
                label="Category"
              >
                <MenuItem value="All">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="outlined" onClick={clearFilters}>
              Clear
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "400px" }}
              onClick={() => navigate("/add-subcategory")}
            >
              <AddIcon /> Add
            </Button>
          </Box>

          {/* SubCategory Table */}
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              borderRadius: 3,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              marginTop: "55px",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    #
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    CATEGORY
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    SUBCATEGORY
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    DESCRIPTION
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    ICON
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    STATUS
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSubCategories.map((subcategory, index) => (
                  <TableRow
                    key={subcategory._id}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "white" : "background.default",
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{subcategory.category.name}</TableCell>
                    <TableCell>{subcategory.name}</TableCell>
                    <TableCell>{subcategory.description}</TableCell>
                    <TableCell>
                      <Avatar src={subcategory.icon} alt={subcategory.name} />
                    </TableCell>
                    <TableCell>
                      {subcategory.isActive ? (
                        <Chip label="Active" color="success" />
                      ) : (
                        <Chip label="Inactive" color="error" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() =>
                          navigate(`/view-subcategory/${subcategory._id}`)
                        }
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
          <Box display="flex" justifyContent="center" marginTop={3}>
            <Pagination
              count={Math.ceil(filteredSubCategories.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default SubCategories;
