import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Import useParams for getting the vendorId
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Button } from "react-bootstrap";

const VendorView = () => {
  const [vendorDetails, setVendorDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { vendorId } = useParams(); 
  const token = localStorage.getItem("token"); // Get the token from local storage

  useEffect(() => {
    const fetchVendorDetails = async () => {
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/vendor/get-one/${vendorId}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        setVendorDetails(response.data.data); 
      } catch (error) {
        console.error("Error fetching vendor details:", error);
      }
    };

    if (vendorId && token) {
      fetchVendorDetails();
    }
  }, [vendorId, token]);

  const handleBlockClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmBlock = () => {
    console.log("Vendor blocked");
    setOpenModal(false);
  };

  if (!vendorDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        Vendor Details
      </Typography>

      <Box display="flex" alignItems="center" marginBottom={3}>
        <Avatar
          src={vendorDetails.companyIcon || "https://cdnl.iconscout.com/lottie/premium/thumb/user-profile-animation-download-in-lottie-json-gif-static-svg-file-formats--account-people-person-glassmorphism-ui-pack-interface-animations-4644453.gif"}
          alt="Company Logo"
          sx={{ width: 100, height: 100, marginRight: 2 }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {vendorDetails.companyName}
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Personal Details
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4} sx={{ marginBottom: 4 }}>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Full Name</Typography>
          <Typography variant="body2">{vendorDetails.fullName}</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Email</Typography>
          <Typography variant="body2">{vendorDetails.email}</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Phone Number</Typography>
          <Typography variant="body2">{vendorDetails.phoneNum}</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Address</Typography>
          <Typography variant="body2">{vendorDetails.address}</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>City</Typography>
          <Typography variant="body2">{vendorDetails.city}</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Zip Code</Typography>
          <Typography variant="body2">{vendorDetails.zipCode}</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>State</Typography>
          <Typography variant="body2">{vendorDetails.state.name}</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Country</Typography>
          <Typography variant="body2">{vendorDetails.country.name}</Typography>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ marginBottom: 2, marginTop: 4, fontWeight: "bold" }}>
        Documents
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4} sx={{ marginBottom: 4 }}>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>PAN Document</Typography>
          <img
            src={vendorDetails.PAN.documentUrl}
            alt="PAN Document"
            style={{ width: "300px", borderRadius: "8px", marginTop: "8px", height:'350px'}}
          />
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>GSTIN Document</Typography>
          <img
            src={vendorDetails.GSTIN.documentUrl}
            alt="GSTIN Document"
            style={{ width: "300px", borderRadius: "8px", marginTop: "8px", height:'350px' }}
          />
        </Box>
      </Box>

      <Typography variant="h6" sx={{ marginBottom: 2, marginTop: 4, fontWeight: "bold" }}>
        Bank Details
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4} sx={{ marginBottom: 4 }}>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Account Holder Name</Typography>
          <Typography variant="body2">{vendorDetails.bankDetails.accountHolderName}</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Account Number</Typography>
          <Typography variant="body2">{vendorDetails.bankDetails.accountNumber}</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>IFSC Code</Typography>
          <Typography variant="body2">{vendorDetails.bankDetails.ifscCode}</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Bank Name</Typography>
          <Typography variant="body2">{vendorDetails.bankDetails.bankName.name}</Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Bank Document</Typography>
          <img
            src={vendorDetails.bankDetails.documentUrl}
            alt="Bank Document"
            style={{ width: "300px", borderRadius: "8px", marginTop: "8px", height:'350px' }}
          />
        </Box>
      </Box>

      {/* Block Vendor Button */}
      <Button
        style={{
          marginTop: "20px",
          backgroundColor: "#d32f2f",
          border: "1px solid #d32f2f",
          color: "white",
          textAlign: "center",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
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
              backgroundColor: "#d32f2f",
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
