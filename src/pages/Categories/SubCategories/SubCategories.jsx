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

function SubCategories() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [categoryTypeFilter, setCategoryTypeFilter] = useState("All");
  const [categoryType] = useState([
    { name: "Electronics", id: 1 },
    { name: "Fashion", id: 2 },
    { name: "Beauty", id: 3 },
  ]);
  const [categories] = useState([
    { name: "Laptops", id: 1 },
    { name: "Shoes", id: 2 },
    { name: "Face Creams", id: 3 },
  ]);
  const [subCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      category: "Laptops",
      subcategory: "Gaming Laptops",
      description: "High-performance laptops for gaming enthusiasts.",
      iconUrl:
        "https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg",
      status: true,
    },
    {
      id: 2,
      name: "Fashion",
      category: "Shoes",
      subcategory: "Men's Shoes",
      description: "Step up your style with trendy footwear for men.",
      iconUrl:
        "https://cdn.pixabay.com/photo/2022/02/12/21/37/woman-7009979_1280.jpg",
      status: false,
    },
    {
      id: 3,
      name: "Beauty",
      category: "Face Creams",
      subcategory: "Night Cream",
      description: "Reveal radiant skin with our range of face creams.",
      iconUrl:
        "https://cdn.pixabay.com/photo/2018/01/14/00/05/makeup-3081015_1280.jpg",
      status: true,
    },
  ]);
  const [filteredSubCategories, setFilteredSubCategories] =
    useState(subCategories);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterSubCategories(
      e.target.value,
      statusFilter,
      categoryTypeFilter,
      categoryFilter
    );
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    filterSubCategories(
      searchTerm,
      e.target.value,
      categoryTypeFilter,
      categoryFilter
    );
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    filterSubCategories(
      searchTerm,
      statusFilter,
      categoryTypeFilter,
      e.target.value
    );
  };

  const handleCategoryTypeFilterChange = (e) => {
    setCategoryTypeFilter(e.target.value);
    filterSubCategories(
      searchTerm,
      statusFilter,
      e.target.value,
      categoryFilter
    );
  };

  const filterSubCategories = (
    searchTerm,
    statusFilter,
    categoryTypeFilter,
    categoryFilter
  ) => {
    let filtered = subCategories;

    if (categoryTypeFilter !== "All") {
      filtered = filtered.filter(
        (subcategory) => subcategory.name === categoryTypeFilter
      );
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (subcategory) => subcategory.category === categoryFilter
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((subcategory) =>
        subcategory.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      const isActive = statusFilter === "Active";
      filtered = filtered.filter(
        (subcategory) => subcategory.status === isActive
      );
    }

    setFilteredSubCategories(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCategoryTypeFilter("All");
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
        <Typography variant="h4">
          <b>SubCategory Management</b>
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
          <InputLabel>Category Type</InputLabel>
          <Select
            value={categoryTypeFilter}
            onChange={handleCategoryTypeFilterChange}
            label="Category Type"
          >
            <MenuItem value="All">All</MenuItem>
            {categoryType.map((type) => (
              <MenuItem key={type.id} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
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
              <MenuItem key={category.id} value={category.name}>
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
                CATEGORY-TYPE
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
                key={subcategory.id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                  "&:hover": {
                    backgroundColor: "#f1f1f1",
                    transition: "background-color 0.3s",
                  },
                }}
              >
                <TableCell sx={{ color: "text.primary" }}>
                  {index + 1}
                </TableCell>
                <TableCell>{subcategory.name}</TableCell>
                <TableCell>{subcategory.category}</TableCell>
                <TableCell>{subcategory.subcategory}</TableCell>
                <TableCell>{subcategory.description}</TableCell>
                <TableCell>
                  <Avatar
                    alt={subcategory.subcategory}
                    src={subcategory.iconUrl}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={subcategory.status ? "Active" : "Inactive"}
                    color={subcategory.status ? "success" : "error"}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      navigate("/view-subcategory", { state: subcategory })
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
      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={Math.ceil(filteredSubCategories.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default SubCategories;
