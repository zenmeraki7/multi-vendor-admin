import React, { useState } from "react";
import "./SellerPro.css";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";

function SellerPro() {
  const [logo, setLogo] = useState(null);

  const [documents, setDocuments] = useState({
    pan: null,
    gstin: null,
    bankDocument: null,
  });

  const [documentDetails, setDocumentDetails] = useState({
    panNumber: "",
    gstinNumber: "",
  });

  const handleDocumentUpload = (event, key) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setDocuments(prev => ({ ...prev, [key]: fileURL }));
    }
  };

  const handleDocumentDetailsChange = (event, key) => {
    const value = event.target.value;
    setDocumentDetails(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const logoURL = URL.createObjectURL(file);
      setLogo(logoURL);
    }
  };

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Rafiquar",
    email: "rafiquarrahman51@gmail.com",
    phone: "+09 345 346 46",
    address: "ABC street",
  });

  const [isEditingDocuments, setIsEditingDocuments] = useState(false);

  const [isEditingBank, setIsEditingBank] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "qwe",
    accountNumber: "345",
    ifsc: "345",
    bankName: "345",
  });

  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "Company XYZ",
    companyAddress: "Leeds, United Kingdom",
  });

  const handleInputChange = (e, stateObj, field, setStateObj) => {
    setStateObj({ ...stateObj, [field]: e.target.value });
  };

  const handleEditClick = (setEditState) => {
    setEditState(true);
  };

  const handleSaveClick = (setEditState) => {
    setEditState(false);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flex: 1, padding: "20px", }}>
        <Box className="profile-container" sx={{ paddingLeft: "20px" }}>
          <Typography variant="h4" sx={{ color: 'blue' }}>Seller Profile</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleLogoUpload}
                />
                <img
                  src={
                    logo ||
                    "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                  }
                  alt="Profile"
                  className="profile-image"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              </label>
              <Button
                variant="contained"
                sx={{ marginTop: "10px", backgroundColor: "black", color: "white" }}
                onClick={() => document.querySelector('input[type="file"]').click()}
              >
                Add Logo
              </Button>
            </Box>
            <Box
              sx={{
                flex: 2,
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6">Company Name</Typography>
              {isEditingCompany ? (
                <Box className="form-group">
                  <input
                    type="text"
                    value={companyDetails.companyName}
                    onChange={(e) =>
                      handleInputChange(e, companyDetails, "companyName", setCompanyDetails)
                    }
                  />
                </Box>
              ) : (
                <Typography>{companyDetails.companyName}</Typography>
              )}
              <Typography variant="h6">Company Address</Typography>
              {isEditingCompany ? (
                <Box className="form-group">
                  <input
                    type="text"
                    value={companyDetails.companyAddress}
                    onChange={(e) =>
                      handleInputChange(e, companyDetails, "companyAddress", setCompanyDetails)
                    }
                  />
                </Box>
              ) : (
                <Typography>{companyDetails.companyAddress}</Typography>
              )}
              <Button className="editbutton"
                onClick={() =>
                  isEditingCompany ? handleSaveClick(setIsEditingCompany) : handleEditClick(setIsEditingCompany)
                }
                variant="contained"
                sx={{ marginTop: "10px", backgroundColor: "black", color: "white" }}
              >
                {isEditingCompany ? "Save" : "Edit"}
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className="personal-info-container mt-3">
          <Typography variant="h6">Personal Information</Typography>
          {isEditingPersonal ? (
            <Box className="info-content">
              <Box className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  value={personalInfo.firstName}
                  onChange={(e) =>
                    handleInputChange(e, personalInfo, "firstName", setPersonalInfo)
                  }
                />
              </Box>
              <Box className="form-group">
                <label>Email Address:</label>
                <input
                  type="text"
                  value={personalInfo.email}
                  onChange={(e) =>
                    handleInputChange(e, personalInfo, "email", setPersonalInfo)
                  }
                />
              </Box>
              <Box className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  value={personalInfo.phone}
                  onChange={(e) =>
                    handleInputChange(e, personalInfo, "phone", setPersonalInfo)
                  }
                />
              </Box>
              <Box className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  value={personalInfo.address}
                  onChange={(e) =>
                    handleInputChange(e, personalInfo, "address", setPersonalInfo)
                  }
                />
              </Box>
              <Button
                onClick={() => handleSaveClick(setIsEditingPersonal)}
                variant="contained"
                sx={{ marginTop: "10px", backgroundColor: "black", color: "white" }}
              >
                Save
              </Button>
            </Box>
          ) : (
            <Box className="info-content">
              <Typography><strong>First Name:</strong> {personalInfo.firstName}</Typography>
              <Typography><strong>Email Address:</strong> {personalInfo.email}</Typography>
              <Typography><strong>Phone:</strong> {personalInfo.phone}</Typography>
              <Typography><strong>Address:</strong> {personalInfo.address}</Typography>
              <Button
                onClick={() => handleEditClick(setIsEditingPersonal)}
                variant="contained"
                sx={{ marginTop: "10px", backgroundColor: "black", color: "white" }}
              >
                Edit
              </Button>
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <Box className="documents-container" sx={{ flex: 1 }}>
            <Typography variant="h6">Documents</Typography>
            {isEditingDocuments ? (
              <Box className="info-content">
                <Box className="form-group">
                  <label>PAN Number:</label>
                  <Box display="flex" alignItems="center">
                    <input
                      type="text"
                      value={documentDetails.panNumber}
                      onChange={(e) => handleDocumentDetailsChange(e, "panNumber")}
                      placeholder="Enter PAN Number"
                    />
                    <label>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => handleDocumentUpload(e, "pan")}
                      />
                      <img
                        src={documents.pan || "https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_960_720.png"}
                        alt="PAN"
                        height="100px"
                        width="90px"
                      />
                    </label>
                  </Box>
                </Box>
                <Box className="form-group">
                  <label>GSTIN Number:</label>
                  <Box display="flex" alignItems="center">
                    <input
                      type="text"
                      value={documentDetails.gstinNumber}
                      onChange={(e) => handleDocumentDetailsChange(e, "gstinNumber")}
                      placeholder="Enter GSTIN Number"
                    />
                    <label>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => handleDocumentUpload(e, "gstin")}
                      />
                      <img
                        src={documents.gstin || "https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_960_720.png"}
                        alt="GSTIN"
                        height="100px"
                        width="90px"
                      />
                    </label>
                  </Box>
                </Box>
                <Button
                  onClick={() => handleSaveClick(setIsEditingDocuments)}
                  variant="contained"
                  sx={{ marginTop: "10px", backgroundColor: "black", color: "white" }}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <Box className="info-content">
                <Typography><strong>PAN Number:</strong> {documentDetails.panNumber}</Typography>
                <Typography><strong>GSTIN Number:</strong> {documentDetails.gstinNumber}</Typography>
                <Button
                  onClick={() => handleEditClick(setIsEditingDocuments)}
                  variant="contained"
                  sx={{ marginTop: "10px", backgroundColor: "black", color: "white" }}
                >
                  Edit
                </Button>
              </Box>
            )}
          </Box>

          <Box className="bank-details-container" sx={{ flex: 1 }}>
            <Typography variant="h6">Bank Details</Typography>
            {isEditingBank ? (
              <Box className="info-content">
                <Box className="form-group">
                  <label>Account Holder:</label>
                  <input
                    type="text"
                    value={bankDetails.accountHolder}
                    onChange={(e) =>
                      handleInputChange(e, bankDetails, "accountHolder", setBankDetails)
                    }
                  />
                </Box>
                <Box className="form-group">
                  <label>Account Number:</label>
                  <input
                    type="text"
                    value={bankDetails.accountNumber}
                    onChange={(e) =>
                      handleInputChange(e, bankDetails, "accountNumber", setBankDetails)
                    }
                  />
                </Box>
                <Box className="form-group">
                  <label>IFSC Code:</label>
                  <input
                    type="text"
                    value={bankDetails.ifsc}
                    onChange={(e) =>
                      handleInputChange(e, bankDetails, "ifsc", setBankDetails)
                    }
                  />
                </Box>
                <Box className="form-group">
                  <label>Bank Name:</label>
                  <input
                    type="text"
                    value={bankDetails.bankName}
                    onChange={(e) =>
                      handleInputChange(e, bankDetails, "bankName", setBankDetails)
                    }
                  />
                </Box>
                <Box className="form-group">
                  <label>Upload Bank Document:</label>
                  <Box display="flex" alignItems="center">
                    <input type="file" style={{ marginRight: "10px", display: 'none' }} />
                    <label>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => handleDocumentUpload(e, "bankDocument")}
                      />
                      <img
                        src={documents.bankDocument || "https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_960_720.png"}
                        alt="Bank Document"
                        height="100px"
                        width="90px"
                      />
                    </label>
                  </Box>
                </Box>
                <Button
                  onClick={() => handleSaveClick(setIsEditingBank)}
                  variant="contained"
                  sx={{ marginTop: "10px", backgroundColor: "black", color: "white" }}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <Box className="info-content">
                <Typography><strong>Account Holder:</strong> {bankDetails.accountHolder}</Typography>
                <Typography><strong>Account Number:</strong> {bankDetails.accountNumber}</Typography>
                <Typography><strong>IFSC Code:</strong> {bankDetails.ifsc}</Typography>
                <Typography><strong>Bank Name:</strong> {bankDetails.bankName}</Typography>
                <Button
                  onClick={() => handleEditClick(setIsEditingBank)}
                  variant="contained"
                  sx={{ marginTop: "10px", backgroundColor: "black", color: "white" }}
                >
                  Edit
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SellerPro;