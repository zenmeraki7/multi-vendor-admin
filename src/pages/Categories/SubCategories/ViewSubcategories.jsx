import React from "react";
import { Box, Typography, Divider, Avatar, Chip, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";

function ViewCategories() {
  const navigate = useNavigate();
  const location = useLocation();
  const subcategory = location.state; // Receive the subcategory data via state

  if (!subcategory) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          No subcategory data found.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          <ArrowBackIcon />
          Back
        </Button>
      </Box>
    );
  }

  return (
    <Box padding={4} maxWidth={800} margin="auto">
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          View Subcategory Details
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{
            background: "linear-gradient(45deg, #556cd6, #19857b)",
            color: "#fff",
          }}
        >
          <ArrowBackIcon />
          Back
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />

      {/* Content */}
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Subcategory Icon */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar
            src={subcategory.iconUrl}
            variant="rounded"
            sx={{
              width: 400,
              height: 450,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              borderRadius: "15px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          />
        </Box>

        {/* Subcategory ID */}
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Subcategory ID:
          </Typography>
          <Typography>{subcategory.id}</Typography>
        </Box>

        {/* Subcategory Name */}
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Subcategory Name:
          </Typography>
          <Typography>{subcategory.subcategory}</Typography>
        </Box>

        {/* Category */}
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Category:
          </Typography>
          <Typography>{subcategory.category}</Typography>
        </Box>

        {/* Description */}
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Description:
          </Typography>
          <Typography>{subcategory.description}</Typography>
        </Box>

        {/* Status */}
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Status:
          </Typography>
          <Chip
            label={subcategory.status ? "Active" : "Inactive"}
            color={subcategory.status ? "success" : "error"}
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "1rem",
              padding: "0.5rem",
              borderRadius: "4px",
           
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ViewCategories;
