import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Modal,
  Container,
  Paper,
  IconButton,
  InputAdornment,
  Fade,
  Backdrop,
  Grid,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomInput from "../components/SharedComponents/CustomInput";
import CustomButton from "../components/SharedComponents/CustomButton";

function Privacy() {
  // Modal states
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  // Form states
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordForChange, setCurrentPasswordForChange] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form validation states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Modal handlers
  const handleEmailModalOpen = () => setOpenEmailModal(true);
  const handleEmailModalClose = () => {
    setOpenEmailModal(false);
    setNewEmail("");
    setCurrentPassword("");
    setEmailError("");
  };

  const handlePasswordModalOpen = () => setOpenPasswordModal(true);
  const handlePasswordModalClose = () => {
    setOpenPasswordModal(false);
    setCurrentPasswordForChange("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setConfirmPasswordError("");
  };

  // Form validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  // Form submission handlers
  const handleSaveEmail = () => {
    const error = validateEmail(newEmail);
    if (error) {
      setEmailError(error);
      return;
    }

    if (!currentPassword) {
      setEmailError("Please enter your current password to confirm changes");
      return;
    }

    console.log("New Email:", newEmail);
    console.log("Current Password:", currentPassword);
    // API call would go here
    handleEmailModalClose();
  };

  const handleSavePassword = () => {
    const currentPasswordError = !currentPasswordForChange
      ? "Current password is required"
      : "";
    const newPasswordError = validatePassword(newPassword);
    let confirmError = "";

    if (!confirmPassword) {
      confirmError = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      confirmError = "Passwords do not match";
    }

    setPasswordError(newPasswordError);
    setConfirmPasswordError(confirmError);

    if (currentPasswordError || newPasswordError || confirmError) {
      return;
    }

    console.log("Current Password:", currentPasswordForChange);
    console.log("New Password:", newPassword);
    // API call would go here
    handlePasswordModalClose();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <SettingsIcon
              sx={{
                fontSize: 32,
                color: "primary.main",
                mr: 1,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Account Settings
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <LockIcon sx={{ mr: 1, color: "primary.main" }} />
            Security & Login
          </Typography>

          <Grid container spacing={3}>
            {/* Email Section */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <EmailIcon sx={{ mr: 2, color: "text.secondary", mt: 0.5 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Email Address
                    </Typography>
                    <CustomInput
                      fullWidth
                      value="zenmerakihelp@gmail.com"
                      InputProps={{
                        readOnly: true,
                        sx: { bgcolor: "background.paper" },
                      }}
                      variant="outlined"
                      size="small"
                      sx={{ mb: 4 }}
                    />
                    <div style={{ marginTop: "8px" }}>
                      <CustomButton
                        variant="outlined"
                        onClick={handleEmailModalOpen}
                      >
                        Change Email
                      </CustomButton>
                    </div>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Password Section */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <LockIcon sx={{ mr: 2, color: "text.secondary", mt: 0.5 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Password
                    </Typography>
                    <CustomInput
                      fullWidth
                      type="password"
                      value="•••••••••••••••"
                      InputProps={{
                        readOnly: true,
                        sx: { bgcolor: "background.paper" },
                      }}
                      variant="outlined"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <div style={{ marginTop: "8px" }}>
                      <CustomButton
                        variant="outlined"
                        onClick={handlePasswordModalOpen}
                      >
                        Change Password
                      </CustomButton>
                    </div>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Email Change Modal */}
      <Modal
        open={openEmailModal}
        onClose={handleEmailModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEmailModal}>
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 450 },
              p: 4,
              borderRadius: 2,
              outline: "none",
            }}
            elevation={3}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 3, color: "primary.main" }}
            >
              Change Email Address
            </Typography>

            {/* Wrapper Box to add gap between text fields */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <CustomInput
                label="New Email Address"
                fullWidth
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  setEmailError("");
                }}
                error={!!emailError}
                helperText={emailError}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <CustomInput
                label="Current Password"
                type={showCurrentPassword ? "text" : "password"}
                fullWidth
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        edge="end"
                      >
                        {showCurrentPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <CustomButton variant="outlined" onClick={handleEmailModalClose}>
                Cancel
              </CustomButton>
              <CustomButton variant="contained" onClick={handleSaveEmail}>
                Save Changes
              </CustomButton>
            </Box>
          </Paper>
        </Fade>
      </Modal>

      {/* Password Change Modal */}
      <Modal
        open={openPasswordModal}
        onClose={handlePasswordModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPasswordModal}>
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 450 },
              p: 4,
              borderRadius: 2,
              outline: "none",
            }}
            elevation={3}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 3, color: "primary.main" }}
            >
              Change Password
            </Typography>

            {/* Wrapper Box to add spacing between text fields */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <CustomInput
                label="Current Password"
                type={showCurrentPassword ? "text" : "password"}
                fullWidth
                value={currentPasswordForChange}
                onChange={(e) => setCurrentPasswordForChange(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        edge="end"
                      >
                        {showCurrentPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <CustomInput
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                fullWidth
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError("");
                }}
                error={!!passwordError}
                helperText={passwordError}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <CustomInput
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <CustomButton
                variant="outlined"
                onClick={handlePasswordModalClose}
              > 
                Cancel
              </CustomButton>
              <CustomButton variant="contained" onClick={handleSavePassword}>
                Save Changes
              </CustomButton>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </Container>
  );
}

export default Privacy;
