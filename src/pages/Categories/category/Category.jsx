import React, { useState } from "react";
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

function Category() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryTypeFilter, setCategoryTypeFilter] = useState("All");
  const [categories] = useState([
    {
      id: 1,
      name: "Electronics",
      category: "Laptops",
      description: "Discover cutting-edge electronics that elevate your lifestyle",
      iconUrl: "https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg",
      status: true,
    },
    {
      id: 2,
      name: "Fashion",
      category: "Men's",
      description: "Unleash your style with the latest fashion trends.",
      iconUrl: "https://cdn.pixabay.com/photo/2022/02/12/21/37/woman-7009979_1280.jpg",
      status: false,
    },
    {
      id: 3,
      name: "Beauty",
      category: "Lipsticks",
      description: "Glow from within with our premium beauty products.",
      iconUrl: "https://cdn.pixabay.com/photo/2018/01/14/00/05/makeup-3081015_1280.jpg",
      status: true,
    },
  ]);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterCategories(e.target.value, statusFilter, categoryTypeFilter);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    filterCategories(searchTerm, e.target.value, categoryTypeFilter);
  };

  const handleCategoryTypeFilterChange = (e) => {
    setCategoryTypeFilter(e.target.value);
    filterCategories(searchTerm, statusFilter, e.target.value);
  };

  const filterCategories = (searchTerm, statusFilter, categoryTypeFilter) => {
    let filtered = categories;

    // Filter by category type
    if (categoryTypeFilter !== "All") {
      filtered = filtered.filter((category) => category.name === categoryTypeFilter);
    }

    // Filter by category
    if (searchTerm) {
      filtered = filtered.filter((category) =>
        category.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "All") {
      const isActive = statusFilter === "Active";
      filtered = filtered.filter((category) => category.status === isActive);
    }

    setFilteredCategories(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCategoryTypeFilter("All");
    setFilteredCategories(categories);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box padding={2}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4"><b>Category Management</b></Typography>
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
          placeholder=" Categories"
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
          sx={{ width: "200px" }} // Reduced width
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
        <FormControl fullWidth variant="outlined" sx={{ width: 150 }}>
          <InputLabel>Category Type</InputLabel>
          <Select
            value={categoryTypeFilter}
            onChange={handleCategoryTypeFilterChange}
            label="Category Type"
            size="small"
          >
            <MenuItem value="All">All</MenuItem>
            {categories
              .map((category) => category.name)
              .filter((value, index, self) => self.indexOf(value) === index) // Unique category types
              .map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={() => filterCategories(searchTerm, statusFilter, categoryTypeFilter)}>Apply</Button>
        <Button variant="outlined" onClick={clearFilters}>Clear</Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: '400px' }}
          onClick={() => navigate("/add-category")}
        >
          <AddIcon /> Add
        </Button>
      </Box>

      {/* Category Table */}
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}></TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>CATEGORY-TYPE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>CATEGORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>DESCRIPTION</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ICON</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>STATUS</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category, index) => (
              <TableRow key={category.id} sx={{
                "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                "&:hover": { backgroundColor: "#f1f1f1", transition: "background-color 0.3s" },
              }}>
                <TableCell sx={{ color: "text.secondary", fontWeight: "bold" }}>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ color: "text.primary", fontWeight: "medium" }}>
                  {category.name}
                </TableCell>
                <TableCell sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                  {category.category}
                </TableCell>
                <TableCell sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                  {category.description}
                </TableCell>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={category.iconUrl}
                    sx={{ width: 80, height: 80, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={category.status ? "Active" : "Inactive"}
                    color={category.status ? "success" : "error"}
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
                    onClick={() => navigate("/view-category", { state: category })}
                    sx={{ textTransform: "none", fontWeight: "medium" }}
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
          count={Math.ceil(filteredCategories.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default Category;
