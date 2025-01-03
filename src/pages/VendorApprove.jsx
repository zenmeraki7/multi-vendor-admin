import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

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
}));

const StepConnector = styled("div")(({ active }) => ({
  flex: 1,
  height: "2px",
  background: active
    ? "linear-gradient(90deg,rgb(222, 29, 225),rgb(166, 18, 174))"
    : "#555555",
  margin: "0 8px",
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
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Vendor details
  const vendorDetails = {
    personalDetails: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      password: "********",
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
      gstinDocumentImage: "https://via.placeholder.com/150", // Replace with actual URL
      panCardDocumentNumber: "PAN123456",
      panCardDocumentImage: "https://via.placeholder.com/150", // Replace with actual URL
    },
    bankDetails: {
      accountHolderName: "John Doe",
      accountNumber: "123456789",
      ifscCode: "IFSC00123",
      bankName: "BankName",
      bankDocument: "https://via.placeholder.com/150", // Replace with actual URL
    },
  };

  // Navigation handlers
  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  // Snackbar handlers
  const handleSnackbarClose = () => setSnackbar({ open: false, message: "", severity: "" });

  // Approve/Reject handlers
  const handleApprove = () => {
    setSnackbar({ open: true, message: "Vendor Approved Successfully", severity: "success" });
    setOpenApproveDialog(false); // Close the approve dialog after confirmation
  };

  const handleReject = () => {
    setSnackbar({ open: true, message: `Vendor Rejected: ${rejectReason}`, severity: "error" });
    setOpenRejectDialog(false); // Close the reject dialog after confirmation
  };

  const handleRejectChange = (event) => {
    setRejectReason(event.target.value);
  };

  // Function to render details with professional design
  const renderDetails = (details) => (
    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3}>
      {Object.entries(details).map(([key, value]) => {
        // Check if the key corresponds to a document image field
        if (key === "gstinDocumentImage" || key === "panCardDocumentImage" || key === "bankDocument") {
          // Render image for document fields
          return (
            <Box key={key} display="flex" flexDirection="column" alignItems="center">
              <Typography variant="body1">{key.replace(/([A-Z])/g, " $1").toUpperCase()}</Typography>
              <img src={value} alt={key} style={{ width: "100%", maxWidth: "250px", borderRadius: "8px", marginTop: "8px" }} />
            </Box>
          );
        } else {
          // Render input for other fields
          return (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, " $1").toUpperCase()} // Format labels
              value={value}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                "& .MuiInputLabel-root": { color: "#555" }, // Label color
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px lightblue",
                  borderColor: "lightblue", // Set border color to light blue
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  borderColor: "lightblue", // Keep border color light blue on focus
                },
                "& .MuiOutlinedInput-root:hover": {
                  borderColor: "lightblue", // Ensure border color stays light blue when hovered
                },
              }}
            />
          );
        }
      })}
    </Box>
  );

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Box>{renderDetails(vendorDetails.personalDetails)}</Box>;
      case 1:
        return <Box>{renderDetails(vendorDetails.documents)}</Box>;
      case 2:
        return (
          <Box>
            {renderDetails(vendorDetails.bankDetails)}
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" color="success" onClick={() => setOpenApproveDialog(true)}>
                Approve
              </Button>
              <Button variant="contained" color="error" onClick={() => setOpenRejectDialog(true)}>
                Reject
              </Button>
            </Box>
          </Box>
        );
      default:
        return <Typography variant="h6">Unknown Step</Typography>;
    }
  };

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      {/* Custom Stepper */}
      <CustomStepper activeStep={activeStep} />

      {/* Step Content */}
      <Box mt={4}>
        {renderStepContent(activeStep)}
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          {activeStep < steps.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Box>

      {/* Approve Confirmation Dialog */}
      <Dialog open={openApproveDialog} onClose={() => setOpenApproveDialog(false)}>
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to approve this vendor?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApproveDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleApprove} color="primary">Approve</Button>
        </DialogActions>
      </Dialog>

      {/* Reject Confirmation Dialog */}
      <Dialog open={openRejectDialog} onClose={() => setOpenRejectDialog(false)}>
        <DialogTitle>Reject Vendor</DialogTitle>
        <DialogContent>
          <Typography>Please provide a reason for rejection:</Typography>
          <TextField
            value={rejectReason}
            onChange={handleRejectChange}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRejectDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleReject} color="primary">Reject</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VendorApprove;
