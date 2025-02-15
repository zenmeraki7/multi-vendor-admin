import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button } from "react-bootstrap";
import { BASE_URL } from "../utils/baseUrl";
import { logoutUser } from "../utils/authUtils";
import toast from "react-hot-toast";

const VendorView = () => {
  const [vendorDetails, setVendorDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  console.log(vendorDetails);
  

  const { vendorId } = useParams();
  const token = localStorage.getItem("token");

  

 

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/vendor/get-one/${vendorId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            }
          }
        );
        setVendorDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        if (error.response && (error.response.status === 404 || error.response.status === 401)) {
          logoutUser(); // Call logoutUser if 404 or 401 status code
        }
      }
    };

    if (vendorId && token) {
      fetchVendorDetails();
    }
  }, [vendorId, token]);

  const handleBlockUnblockClick = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleConfirmBlockUnblock = async () => {
    try {
      const action = vendorDetails.isBlocked ? "Unblocking" : "Blocking";
      toast.loading(`${action} vendor`);

      const response = await axios.put(
        `${BASE_URL}/api/vendor/blocks/${vendorId}`,
        {action},
        { headers: { authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setVendorDetails((prev) => ({ ...prev, isBlocked: !prev.isBlocked }));
        toast.success(`Vendor ${vendorDetails.isBlocked ? "Unblocked" : "Blocked"} Successfully`);
      }
    } catch (error) {
      console.error("Error updating vendor status:", error.response?.data || error.message);
      toast.error("Error updating vendor status");
    } finally {
      setOpenModal(false);
      toast.dismiss();
    }
  };

  if (!vendorDetails) {
    return <Typography>Loading...</Typography>;
  }

  const renderSection = (title, details) => (
    <Box marginBottom={4}>
      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        {title}
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
        {details.map(({ label, value }) => (
          <Box key={label}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {label}
            </Typography>
            {typeof value === "string" ? (
              <Typography variant="body2">{value}</Typography>
            ) : (
              value
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );

  const personalDetails = [
    { label: "Full Name", value: vendorDetails.fullName },
    { label: "Email", value: vendorDetails.email },
    { label: "Phone Number", value: vendorDetails.phoneNum },
    { label: "Address", value: vendorDetails.address },
    { label: "City", value: vendorDetails.city },
    { label: "Zip Code", value: vendorDetails.zipCode },
    { label: "State", value: vendorDetails.state?.name },
    { label: "Country", value: vendorDetails.country?.name },
  ];

  const documents = [
    {
      label: "PAN Document",
      value: (
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            PAN Number: {vendorDetails.PAN?.documentNumber || "N/A"}
          </Typography>
          <img
            src={vendorDetails.PAN?.documentUrl}
            alt="PAN Document"
            style={{
              width: "300px",
              borderRadius: "8px",
              height: "350px",
            }}
          />
        </Box>
      ),
    },
    {
      label: "GSTIN Document",
      value: (
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            GSTIN Number: {vendorDetails.GSTIN?.documentNumber || "N/A"}
          </Typography>
          <img
            src={vendorDetails.GSTIN?.documentUrl}
            alt="GSTIN Document"
            style={{
              width: "300px",
              borderRadius: "8px",
              height: "350px",
            }}
          />
        </Box>
      ),
    },
  ];

  const bankDetails = [
    { label: "Account Holder Name", value: vendorDetails.bankDetails?.accountHolderName },
    { label: "Account Number", value: vendorDetails.bankDetails?.accountNumber },
    { label: "IFSC Code", value: vendorDetails.bankDetails?.ifscCode },
    { label: "Bank Name", value: vendorDetails.bankDetails?.bankName?.name },
    {
      label: "Bank Document",
      value: (
        <img
          src={vendorDetails.bankDetails?.documentUrl}
          alt="Bank Document"
          style={{
            width: "300px",
            borderRadius: "8px",
            height: "350px",
          }}
        />
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        Vendor Details
      </Typography>

      <Box display="flex" alignItems="center" marginBottom={3}>
        <Avatar
          src={
            vendorDetails.companyIcon ||
            "https://cdnl.iconscout.com/lottie/premium/thumb/user-profile-animation-download-in-lottie-json-gif-static-svg-file-formats--account-people-person-glassmorphism-ui-pack-interface-animations-4644453.gif"
          }
          alt="Company Logo"
          sx={{ width: 100, height: 100, marginRight: 2 }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {vendorDetails.companyName}
        </Typography>
      </Box>

      {renderSection("Personal Details", personalDetails)}
      {renderSection("Documents", documents)}
      {renderSection("Bank Details", bankDetails)}

      <Button
        style={{
          marginTop: "20px",
          backgroundColor: vendorDetails.isBlocked ? "#388e3c" : "#d32f2f",
          border: "1px solid",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
        }}
        onClick={handleBlockUnblockClick}
      >
        {vendorDetails.isBlocked ? "Unblock Vendor" : "Block Vendor"}
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm {vendorDetails.isBlocked ? "Unblock" : "Block"}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {vendorDetails.isBlocked ? "unblock" : "block"} this vendor?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Cancel</Button>
          <Button
            onClick={handleConfirmBlockUnblock}
            style={{
              backgroundColor: vendorDetails.isBlocked ? "#388e3c" : "#d32f2f",
              border: "1px solid",
              color: "white",
            }}
          >
            {vendorDetails.isBlocked ? "Unblock" : "Block"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VendorView;
