import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Button } from "react-bootstrap";

// Function to render the details in a two-column format
const renderDetails = (details, isBankDetails = false) => (
  <Box
    display="grid"
    gridTemplateColumns={isBankDetails ? "repeat(2, 1fr)" : "repeat(2, 1fr)"}
    gap={4}
    sx={{ marginBottom: 4 }}
  >
    {Object.entries(details).map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, " $1").toUpperCase();

      if (isBankDetails && key === "bankDocument") {
        return (
          <Box key={key}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {label}
            </Typography>
            <img
              src={value}
              alt={key}
              style={{
                width: "300px",
                borderRadius: "8px",
                marginTop: "8px",
              }}
            />
          </Box>
        );
      }

      return value.includes("http") ? (
        <Box
          key={key}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {label}
          </Typography>
          <img
            src={value}
            alt={key}
            style={{
              width: "300px",
              borderRadius: "8px",
              marginTop: "8px",
            }}
          />
        </Box>
      ) : (
        <Box key={key}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            {value}
          </Typography>
        </Box>
      );
    })}
  </Box>
);

const VendorView = () => {
  const [openModal, setOpenModal] = useState(false);

  const vendorDetails = {
    personalDetails: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phoneNum: "1234567890",
      address: "123 Vendor Street",
      zipCode: "123456",
      city: "CityName",
      state: "StateName",
      country: "India",
      companyName: "Vendor Inc.",
    },
    documents: {
      gstinDocumentNumber: "GST123456789",
      gstinDocumentImage: "https://via.placeholder.com/150",
      panCardDocumentNumber: "PAN123456",
      panCardDocumentImage: "https://via.placeholder.com/150",
    },
    bankDetails: {
      accountHolderName: "John Doe",
      accountNumber: "123456789",
      ifscCode: "IFSC00123",
      bankName: "BankName",
      bankDocument: "https://via.placeholder.com/150",
    },
  };

  const products = [
    {
      image:
        "https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/7/d/r/xl-p-s-navy-blue-shirts-xl-soundryafabric-original-imagkfkuzgvhhkhp.jpeg?q=90&crop=false",
      name: "Leriya Fashion Shirts",
      stock: "In stock (500)",
      price: "699",
      category: "Fashion",
      brand: "Leriya Fashion",
      rating: 5,
      modified: "5/11/2024",
    },
    {
      image: "https://shopkar.in/wp-content/uploads/2024/08/HLSH013833_1.jpg",
      name: "Leriya Fashion Shirts",
      stock: "In stock (199)",
      price: "299",
      category: "Fashion",
      brand: "Leriya Fashion",
      rating: 0,
      modified: "4/26/2024",
    },
  ];

  const handleBlockClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmBlock = () => {
    // Add the blocking logic here
    console.log("Vendor blocked");
    setOpenModal(false);
  };

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        Vendor Details
      </Typography>

      {/* Company Name and Logo */}
      <Box display="flex" alignItems="center" marginBottom={3}>
        <Avatar
          src="https://via.placeholder.com/50" // Replace with actual logo URL
          alt="Company Logo"
          sx={{ width: 100, height: 100, marginRight: 2 }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {vendorDetails.personalDetails.companyName}
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Personal Details
      </Typography>
      {renderDetails(vendorDetails.personalDetails)}

      <Typography
        variant="h6"
        sx={{ marginBottom: 2, marginTop: 4, fontWeight: "bold" }}
      >
        Documents
      </Typography>
      {renderDetails(vendorDetails.documents)}

      <Typography
        variant="h6"
        sx={{ marginBottom: 2, marginTop: 4, fontWeight: "bold" }}
      >
        Bank Details
      </Typography>
      {renderDetails(vendorDetails.bankDetails, true)}

      {/* Product Table */}
      <Typography
        variant="h6"
        sx={{ marginTop: 4, marginBottom: 2, fontWeight: "bold" }}
      >
        Products
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>PRODUCT NAME</TableCell>
              <TableCell>STOCK</TableCell>
              <TableCell>PRICE</TableCell>
              <TableCell>CATEGORY</TableCell>
              <TableCell>BRAND</TableCell>
              <TableCell>RATING</TableCell>
              <TableCell>LAST MODIFIED</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={product.image}
                    alt="Product"
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                  <Typography
                    color={product.rating === 0 ? "error" : "text.primary"}
                  >
                    &#9733; ({product.rating})
                  </Typography>
                </TableCell>
                <TableCell>{product.modified}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Block Vendor Button */}
      <Button
        style={{
          marginTop: "20px",
          backgroundColor: "#d32f2f", // Darker red
          border: "1px solid #d32f2f",
          color: "white",
          textAlign: "center",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "10px 20px", // More padding for better feel
          fontSize: "16px",
          borderRadius: "5px", // Rounded corners for modern feel
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", // Slight shadow
        }}
        onClick={handleBlockClick}
      >
        Block Vendor
      </Button>

      {/* Confirmation Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm Block</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to block this vendor?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmBlock} 
          style={{
            backgroundColor: "#d32f2f", // Darker red
            border: "1px solid #d32f2f",
            color: "white",
          }}
          
          >
            Block
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VendorView;
