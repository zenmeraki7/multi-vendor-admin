import React from "react";
import { Button } from "@mui/material";

const PrivacyButton = ({ onClick, icon, label, variant = "contained" }) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      sx={{
        backgroundColor: variant === "contained" ? "#2563EB" : "transparent",
        color: variant === "contained" ? "#ffffff" : "#2563EB",
        fontWeight: 500,
        borderRadius: "10px",
        padding: "10px 13px",
        fontSize: "14px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px", // Space between icon and text
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: variant === "contained" ? "#1E40AF" : "#E3E8EF",
        },
      }}
    >
      {icon}
      {label}
    </Button>
  );
};

export default PrivacyButton;
