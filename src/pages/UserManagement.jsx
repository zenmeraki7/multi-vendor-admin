import React, { useState } from "react"; 
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Pagination,
  InputAdornment,
  Chip
} from "@mui/material";
import { Search } from "@mui/icons-material";
import TableInput from "../components/SharedComponents/TableInput";
import CustomButton from "../components/SharedComponents/CustomButton";

function UserManagement() {
  const [users, setUsers] = useState([
    {
      fullName: "John Smith",
      email: "john.smith@example.com",
      location: "New York, USA",
      orderCount: 5,
      status: "Active",
    },
    {
      fullName: "Emma Wilson",
      email: "emma.wilson@example.com",
      location: "London, UK",
      orderCount: 3,
      status: "Inactive",
    },
    {
      fullName: "Michael Brown",
      email: "michael.brown@example.com",
      location: "Sydney, Australia",
      orderCount: 8,
      status: "Active",
    },
    {
      fullName: "Sophia Davis",
      email: "sophia.davis@example.com",
      location: "Toronto, Canada",
      orderCount: 2,
      status: "Inactive",
    },
    {
      fullName: "Olivia Taylor",
      email: "olivia.taylor@example.com",
      location: "Paris, France",
      orderCount: 6,
      status: "Active",
    },
    {
      fullName: "Liam Johnson",
      email: "liam.johnson@example.com",
      location: "Berlin, Germany",
      orderCount: 4,
      status: "Active",
    },
    {
      fullName: "Emily Martinez",
      email: "emily.martinez@example.com",
      location: "Madrid, Spain",
      orderCount: 7,
      status: "Inactive",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Search functionality will be implemented in backend
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h4" component="h1">
          User Management
        </Typography>
      </Box>

      {/* Search Bar Section */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2, width: "400px" }}>
        <TableInput
          id="search-user"
          name="search"
          placeholder="Search Users"
          value={searchQuery}
          onChange={handleSearchChange}
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
      </Box>

      {/* User Table Section */}
      <Card>
        <CardHeader />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Full Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Location</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Order Count</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {user.fullName}
                      </Typography>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.location}</TableCell>
                    <TableCell>{user.orderCount}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={user.status === "Active" ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      <CustomButton variant="contained" color="primary" isSmall>
                        View
                      </CustomButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Pagination
              count={Math.ceil(users.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserManagement;
