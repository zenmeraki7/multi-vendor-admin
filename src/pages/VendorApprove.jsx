import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/baseUrl";

// Styled components for custom stepper design
const CustomStepIcon = styled(Box)(({ active }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: active
    ? "linear-gradient(90deg,rgb(188, 27, 237),rgb(115, 31, 210))"
    : "#555555",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  boxShadow: active ? "0 0 8px rgba(66, 16, 165, 0.8)" : "none",
  marginBottom:'30px',
}));

const StepConnector = styled("div")(({ active }) => ({
  flex: 1,
  height: "2px",
  background: active
    ? "linear-gradient(90deg,rgb(222, 29, 225),rgb(166, 18, 174))"
    : "#555555",
  margin: "0 8px",
  marginBottom:'30px',
}));

const steps = [
  { label: "Personal Details", icon: <GroupAddIcon /> },
  { label: "Documents", icon: <AssignmentIcon /> },
  { label: "Bank Details", icon: <AccountBalanceIcon /> },
];

const CustomStepper = ({ activeStep }) => (
  <Box display="flex" alignItems="center" justifyContent="center">
    {steps.map((step, index) => (
      <React.Fragment key={step.label}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <CustomStepIcon active={index <= activeStep}>
            {step.icon}
          </CustomStepIcon>
        </Box>
        {index < steps.length - 1 && (
          <StepConnector active={index < activeStep} />
        )}
      </React.Fragment>
    ))}
  </Box>
);

const VendorApprove = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [vendorDetails, setVendorDetails] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [loading, setLoading] = useState(false);


  const { vendorId } = useParams();
  const token = localStorage.getItem("token");

  // Fetch vendor data from API
  useEffect(() => {
    const fetchVendorData = async () => {
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      try {
        const response = await axios.get(
          `${BASE_URL}/api/vendor/get-one/${vendorId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setVendorDetails(response.data.data); // Update vendorDetails with API response
      } catch (error) {
        console.error("Error fetching vendor data:", error);
        setSnackbar({
          open: true,
          message: "Failed to fetch vendor details",
          severity: "error",
        });
      }
    };

    fetchVendorData();
  }, [token, vendorId]);

  // Snackbar handler
  const handleSnackbarClose = () =>
    setSnackbar({ open: false, message: "", severity: "" });

  // Render details for each step
  const renderPersonalDetails = (details) => {
    return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={3}
      >
        <TextField
          label="Full Name"
          value={details.fullName}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Email"
          value={details.email}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Phone Number"
          value={details.phoneNum}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Address"
          value={details.address}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="City"
          value={details.city}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="State"
          value={details.state?.name || "N/A"}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Country"
          value={details.country?.name || "N/A"}
          InputProps={{ readOnly: true }}
          fullWidth
        />
      </Box>
    );
  };

  const renderDocuments = (vendorDetails) => {
    const { PAN, GSTIN } = vendorDetails;

    if (!PAN || !GSTIN) {
      return (
        <Typography variant="body2" color="error">
          Documents are missing or incomplete.
        </Typography>
      );
    }

    return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={3}
      >
        <TextField
          label="PAN Document Number"
          value={PAN.documentNumber}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <Box>
          <Typography variant="body2" color="textSecondary">
            PAN Document:
          </Typography>
          <img
            src={PAN.documentUrl}
            alt="PAN Document"
            style={{ width: "300px", height: "350px", paddingRight: "15px" }}
          />
        </Box>
        <TextField
          label="GSTIN"
          value={GSTIN.documentNumber}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <Box>
          <Typography variant="body2" color="textSecondary">
            GSTIN Document:
          </Typography>
          <img
            src={GSTIN.documentUrl}
            alt="GSTIN Document"
            style={{ width: "300px", height: "350px", paddingRight: "15px" }}
          />
        </Box>
      </Box>
    );
  };

  const renderBankDetails = (bankDetails) => {
    return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={3}
      >
        <TextField
          label="Account Holder Name"
          value={bankDetails.accountHolderName}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Account Number"
          value={bankDetails.accountNumber}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="IFSC Code"
          value={bankDetails.ifscCode}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Bank Name"
          value={bankDetails.bankName?.name || "N/A"}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <Box>
          <Typography variant="body2" color="textSecondary">
            Bank Document:
          </Typography>
          <img
            src={bankDetails.documentUrl}
            alt="Bank Document"
            style={{ width: "300px", height: "350px" }}
          />
        </Box>
      </Box>
    );
  };

  const renderStepContent = (step) => {
    if (!vendorDetails) {
      return <CircularProgress />;
    }

    switch (step) {
      case 0:
        return renderPersonalDetails(vendorDetails);
      case 1:
        return renderDocuments(vendorDetails);
      case 2:
        return renderBankDetails(vendorDetails.bankDetails);
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  // Handle Approve and Reject Modals
  const handleApprove = () => setOpenApproveModal(true);
  const handleReject = () => setOpenRejectModal(true);

  const handleConfirmApprove = async () => {
    setLoading(true); // Start loading
    try {
      await axios.put(
        `${BASE_URL}/api/vendor/approve/${vendorId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setSnackbar({
        open: true,
        message: "Vendor approved successfully!",
        severity: "success",
      });
      setOpenApproveModal(false); // Close modal after approval
    } catch (error) {
      console.error("Error approving vendor:", error);
      setSnackbar({
        open: true,
        message: "Failed to approve vendor",
        severity: "error",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };
  

  const handleConfirmReject = async () => {
    setLoading(true); // Start loading
    try {
      await axios.put(
        `${BASE_URL}/api/vendor/reject/${vendorId}`,
        { verificationRemarks: rejectReason },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setSnackbar({
        open: true,
        message: `Vendor rejected. Reason: ${rejectReason}`,
        severity: "error",
      });
      setOpenRejectModal(false); // Close modal after rejection
    } catch (error) {
      console.error("Error rejecting vendor:", error);
      setSnackbar({
        open: true,
        message: "Failed to reject vendor",
        severity: "error",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Box padding={3}>
      <Typography variant="h5" align="center">
        Vendor Details
      </Typography>
      <CustomStepper activeStep={activeStep} />
      <Box>{renderStepContent(activeStep)}</Box>
      <Box mt={3} display="flex" justifyContent="center">
        {activeStep === 2 && ( // Only show Approve and Reject buttons on the third step
          <>
            <Button
              variant="contained"
              color="success"
              onClick={handleApprove}
              style={{ marginRight: "10px" }}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleReject}
              style={{ marginRight: "10px" }}
            >
              Reject
            </Button>
          </>
        )}
      </Box>

      {/* Navigation buttons */}
      <Box mt={3} display="flex" justifyContent="center">
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
          Next
        </Button>
      </Box>

      {/* Approve Modal */}
      <Dialog open={openApproveModal} onClose={() => setOpenApproveModal(false)}>
  <DialogTitle>Approve Vendor</DialogTitle>
  <DialogContent>
    <Typography>Are you sure you want to approve this vendor?</Typography>
    {loading && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
        minHeight="50px"
      >
        <CircularProgress size={24} />
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenApproveModal(false)} disabled={loading}>
      Cancel
    </Button>
    <Button onClick={handleConfirmApprove} disabled={loading}>
      Confirm
    </Button>
  </DialogActions>
</Dialog>



      {/* Reject Modal */}
      <Dialog open={openRejectModal} onClose={() => setOpenRejectModal(false)}>
  <DialogTitle>Reject Vendor</DialogTitle>
  <DialogContent>
    <Typography>Enter reason for rejection:</Typography>
    <TextField
      fullWidth
      value={rejectReason}
      onChange={(e) => setRejectReason(e.target.value)}
      multiline
      rows={4}
      disabled={loading}
    />
    {loading && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
        minHeight="50px"
      >
        <CircularProgress size={24} />
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenRejectModal(false)} disabled={loading}>
      Cancel
    </Button>
    <Button onClick={handleConfirmReject} disabled={loading}>
      Confirm
    </Button>
  </DialogActions>
</Dialog>



      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled" // Adding the 'filled' variant
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VendorApprove;
