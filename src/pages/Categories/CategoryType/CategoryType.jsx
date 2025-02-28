import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Typography,
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
  CircularProgress,
  Divider,
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { BASE_URL } from "../../../utils/baseUrl";
import { logoutUser } from "../../../utils/authUtils";
import TableSelect from "../../../components/SharedComponents/TableSelect";
import TableInput from "../../../components/SharedComponents/TableInput";
import CustomButton from "../../../components/SharedComponents/CustomButton";

function CategoryType() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when search term changes
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Fetch data with filters
  const fetchCategoryTypes = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found. Please log in.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // Build query params based on filters
      let queryParams = new URLSearchParams();
      queryParams.append("page", currentPage);
      queryParams.append("limit", itemsPerPage);

      if (debouncedSearchTerm) {
        queryParams.append("search", debouncedSearchTerm);
      }

      if (statusFilter !== "All") {
        queryParams.append(
          "isActive",
          statusFilter === "Active" ? "true" : "false"
        );
      }

      const response = await axios.get(
        `${BASE_URL}/api/category-type/all-admin?${queryParams.toString()}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);
      if (response.data && Array.isArray(response.data.data)) {
        setCategoryTypes(response.data.data);
        setTotalCount(response.data.totalCount || 0);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setCategoryTypes([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        logoutUser();
      }
      setCategoryTypes([]);
      setTotalCount(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearchTerm, statusFilter, navigate]);

  // Call the API when filters or pagination changes
  useEffect(() => {
    fetchCategoryTypes();
  }, [fetchCategoryTypes]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // The debounce effect will handle setting currentPage and triggering the search
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when status filter changes
  };

  const clearFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRefresh = () => {
    fetchCategoryTypes();
  };

  // Calculate the range of items being displayed
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

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
          <b>Category Type Management</b>
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton color="primary" onClick={handleRefresh}>
            <Refresh />
          </IconButton>
          <Typography fontWeight="bold">
            {new Date().toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Search Bar and Filters - Always visible */}
      <Box 
        display="flex" 
        flexWrap="wrap"
        justifyContent="space-between" 
        alignItems="center" 
        mb={2}
      >
        <Box display="flex" flexWrap="wrap" alignItems="center" gap={2}>
          <TableInput
            id="search-category"
            name="search"
            placeholder="Search Category Type"
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
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ]}
          />
          <CustomButton
            variant="outlined"
            onClick={clearFilters}
            style={{ height: "55px" }}
          >
            Clear
          </CustomButton>
        </Box>

        <CustomButton
          variant="contained"
          color="primary"
          style={{ height: "50px" }}
          onClick={() => navigate("/add-Categorytype")}
          icon={AddIcon}
        >
          Add
        </CustomButton>
      </Box>

      {/* Total Products and Showing Info - Always visible */}
      <Box 
        display="flex" 
        justifyContent="flex-start" 
        alignItems="center" 
        mb={2}
        mt={3}
      >
        <Typography variant="subtitle1" fontWeight="medium">
          Total: {totalCount} categories
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 2, height: '20px' }} />
        <Typography variant="subtitle1" fontWeight="medium">
          Showing {startItem} to {endItem} of {totalCount}
        </Typography>
      </Box>

      {/* Only show loading spinner where the table would be */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          mt={2}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
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
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold" }}
                  ></TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    NAME
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
                {categoryTypes.length > 0 ? (
                  categoryTypes.map((categoryType, index) => (
                    <TableRow key={categoryType._id}>
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell>{categoryType.name}</TableCell>
                      <TableCell>{categoryType.description}</TableCell>
                      <TableCell>
                        <Avatar src={categoryType.icon || "path/to/default/icon.jpg"} alt={categoryType.name} />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={categoryType.isActive ? "Active" : "Inactive"}
                          color={categoryType.isActive ? "success" : "error"}
                        />
                      </TableCell>
                      <TableCell>
                        <CustomButton
                          isSmall
                          variant="contained"
                          onClick={() =>
                            navigate(`/viewcategorytype/${categoryType._id}`)
                          }
                        >
                          View
                        </CustomButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No category types found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {totalPages > 0 && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default CategoryType;