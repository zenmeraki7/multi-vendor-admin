import React from "react";
import { Button } from "@mui/material";

function CustomButton({ onClick, children, isActive = false, isSmall = false, variant = "contained", color = "primary", style = {}, ...props }) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      sx={{
        backgroundColor: isActive ? "#2563EB" : variant === "contained" ? "#2563EB" : "transparent",
        color: isActive || variant === "contained" ? "#ffffff" : "#2563EB",
        fontWeight: isActive ? 600 : 500,
        borderRadius: "10px",
        padding: isSmall ? "6px 12px" : "12px 16px", // Reduced padding if isSmall is true
        fontSize: isSmall ? "12px" : "14px", // Reduce font size for small buttons
        minWidth: isSmall ? "80px" : "auto", // Reduce width for small buttons
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: isActive ? "#1E40AF" : variant === "contained" ? "#1E40AF" : "#E3E8EF",
        },
        ...style, 
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
